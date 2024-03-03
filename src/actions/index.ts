"use server";
import prisma from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { nanoid, random } from "nanoid";
import { randomUUID } from "crypto";
import { validateRequest } from "@/lib/validate-request";

export interface ActionResult {
	error?: string;
	message?: string;
	linkPayload?:
		| ({
				shortedLink: {
					shortUrl: string;
					linkId: string;
				} | null;
		  } & {
				id: string;
				displayName: string;
				url: string;
				clickCount: number;
				userId: string;
		  })
		| null
		| undefined;
}

interface LinkData {
	displayName: string;
	url: string;
	userId: string;
	linkMetadata?: {
		create: {
			title: string;
			description: string;
			og: string;
		};
	};
}

export async function signup(
	prevState: any,
	formData: FormData,
): Promise<ActionResult> {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const email = formData.get("email") as string;
	const occupation = formData.get("occupation") as string;

	const existingUser = await prisma.user.findFirst({
		where: {
			userName: username,
		},
	});

	if (existingUser) {
		return {
			error: "The username already exist",
		};
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	await prisma.user.create({
		data: {
			id: userId,
			userName: username,
			hashedPassword,
			firstName,
			lastName,
			occupation,
			email,
		},
	});

	//!I don not want a onstant log in

	// const session = await lucia.createSession(userId, {});
	// const sessionCookie = lucia.createSessionCookie(session.id);
	// cookies().set(
	//   sessionCookie.name,
	//   sessionCookie.value,
	//   sessionCookie.attributes
	// );
	return { message: "User created successfully" };
}

export async function login(
	prevState: any,
	formData: FormData,
): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const existingUser = await prisma.user.findFirst({
		where: { userName: username.toLocaleLowerCase() },
	});

	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is none-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password",
		};
	}

	const validPassword = await new Argon2id().verify(
		existingUser.hashedPassword,
		password,
	);
	if (!validPassword) {
		return {
			error: "Incorrect username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/dashboard");
}

export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return;
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/log-in");
}

export async function addNewLink(
	userId: string,
	prevState: any,
	formData: FormData,
) {
	const [url, displayName, title, description, og] = [
		formData.get("url"),
		formData.get("displayName"),
		formData.get("title"),
		formData.get("description"),
		formData.get("og"),
	];

	const withMetadata =
		typeof title === "string" &&
		typeof description === "string" &&
		typeof og === "string" &&
		typeof displayName === "string";

	if (typeof url === "string" && typeof displayName === "string") {
		const linkData = {
			id: randomUUID(),
			displayName,
			url,
			userId,
		};

		const shortedLink = {
			shortUrl: nanoid(10),
		};

		try {
			const link = withMetadata
				? await prisma.link.create({
						data: {
							...linkData,
							shortedLink: { create: shortedLink },
							linkMetadata: {
								create: {
									title,
									description,
									og,
									id: randomUUID(),
								},
							},
						},
						include: {
							shortedLink: true,
						},
				  })
				: await prisma.link.create({
						data: {
							...linkData,
							shortedLink: { create: shortedLink },
						},
						include: { shortedLink: true },
				  });

			console.log(link);

			return { linkPayload: link, message: "Link added succesfully" };
		} catch (err) {
			if (err instanceof Error) {
				return { error: err.message };
			}
			return { error: "Something went wrong" };
		}
	}

	return { error: "URL must be a string" };
}

export async function deleteLink(linkId: string): Promise<ActionResult> {
	try {
		await prisma.link.delete({
			where: {
				id: linkId,
			},
		});

		return { message: "Link deleted" };
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message };
		}

		return { error: "Something went wrong" };
	}
}

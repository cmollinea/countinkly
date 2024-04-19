"use server";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { lucia } from "@/lib/auth";
import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validate-request";
//@ts-expect-error
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

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

	const hashedPassword = await bcrypt.hash(password, 10);
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

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	redirect("/dashboard");
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

	const validPassword = await bcrypt.compare(
		password,
		existingUser.hashedPassword,
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

export async function addLike(linkId: string, userId: string) {
	try {
		const res = await prisma.likes.create({
			data: {
				id: randomUUID(),
				userId,
				linkId,
			},
		});
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message };
		}
		return { error: "Unknown Error" };
	}
}

export async function removeLike(likeId: string) {
	try {
		const res = await prisma.likes.delete({
			where: { id: likeId },
		});
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message };
		}
		return { error: "Unknown Error" };
	}
}

export async function addComment(
	linkId: string,
	userId: string,
	prevState: any,
	formData: FormData,
) {
	const content = formData.get("content");

	if (typeof content === "string") {
		try {
			const res = await prisma.comments.create({
				data: {
					id: randomUUID(),
					linkId,
					userId,
					content,
				},
			});

			return { message: "Your Comment was added" };
		} catch (err) {
			if (err instanceof Error) {
				return { error: err.message };
			}
			return { error: "Unknown Error" };
		}
	}
	return { error: "Content is missing" };
}

export async function removeComment(id: string) {
	try {
		const res = await prisma.comments.delete({
			where: {
				id,
			},
		});
		return { message: "Your comment was deleted" };
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message };
		}
		return { error: "Unknown Error" };
	}
}

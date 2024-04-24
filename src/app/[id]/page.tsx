import { createRecord } from "@/lib/create-record";
import { getOriginalUrl } from "@/lib/get-original-url";
import { incrementView } from "@/lib/increment-view";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

type Props = {
	params: {
		id: string;
	};
	searchParams: {
		source: string | undefined;
	};
};

export async function generateMetadata({
	params,
}: Partial<Props>): Promise<Metadata> {
	const linkMetadata = await prisma.linkMetadata.findFirst({
		where: { linkId: params?.id },
	});
	if (linkMetadata) {
		return {
			title: linkMetadata.title,
			description: linkMetadata.description,
			openGraph: {
				title: linkMetadata.title,
				description: linkMetadata.description,
				images: linkMetadata.og,
			},
			twitter: {
				title: linkMetadata.title,
				description: linkMetadata.description,
				images: linkMetadata.og,
			},
		};
	}

	return {
		title: "Countinkly",
		description:
			"This url is tracked by Countinkly, your visit will be counted",
	};
}

async function VisitCounter({ params, searchParams }: Props) {
	// const link = await getOriginalUrl(params.id);
	// if (typeof link === "string") {
	// 	return notFound();
	// }

	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let country;
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let error;

	// if (forwardedFor || realIp) {
	// 	const res = await fetch(`http://ip-api.com/json/${forwardedFor || realIp}`);
	// 	console.log(res);

	// 	if (!res.ok) {
	// 		throw new Error("Unknown Error");
	// 	}
	// 	country = await res.json();

	// 	if (country.data.origin?.status === "fail") {
	// 		throw new Error("Unknown Error");
	// 	}
	// }

	// createRecord(link.id, link.userId, searchParams.source || "Unknown");
	// incrementView(link.id);
	// redirect(link.url);
	const res = await fetch(`http://ip-api.com/json/${forwardedFor || realIp}`);
	const a = await res.json();

	try {
		const res = await fetch(`http://ip-api.com/json/${forwardedFor || realIp}`);
		if (!res.ok) {
			throw new Error("Unknown Error");
		}
		country = await res.json();

		if (country.status === "fail") {
			throw new Error(country.message);
		}
	} catch (err) {
		if (err instanceof Error) {
			error = err.message;
		} else {
			error = "Unknown Error";
		}
	}
	return (
		<div className="flex flex-col space-y-10 items-center place-content-center">
			<p>{forwardedFor}</p>
			<p>{realIp}</p>
			{country && (
				<code className="max-w-lg w-full">{JSON.stringify(country)}</code>
			)}
			{error && <p>{error}</p>}
		</div>
	);
}
export default VisitCounter;

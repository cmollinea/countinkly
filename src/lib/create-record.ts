import { headers } from "next/headers";
import prisma from "@/lib/prisma";

type IpResponse = {
	status?: string;
	country?: string;
	countryCode?: string;
	region?: string;
	regionName?: string;
	city?: string;
	zip?: string;
	lat?: number;
	lon?: number;
	timezone?: string;
	isp?: string;
	org?: string;
	as?: string;
	query?: string;
	message?: string;
	error?: string;
};

export async function createRecord(
	linkId: string,
	userId: string,
	source: string,
) {
	let ipResponse: IpResponse;
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");

	try {
		const res = await fetch(`http://ip-api.com/json/${forwardedFor || realIp}`);
		if (!res.ok) {
			throw new Error("Unknown Error");
		}
		ipResponse = await res.json();

		if (ipResponse.status === "fail") {
			throw new Error(ipResponse.message);
		}
	} catch (err) {
		if (err instanceof Error) {
			console.log(err);
		}
		ipResponse = { error: "Unknown" };
	}

	const record = await prisma?.clicks.create({
		data: {
			origin: (ipResponse.country as string) || "",
			timestamp: new Date(),
			source,
			linkId: linkId,
			userId,
		},
	});
}

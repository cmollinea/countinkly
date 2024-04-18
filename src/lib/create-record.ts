import { headers } from "next/headers";
import prisma from "@/lib/prisma";


export async function createRecord(
	linkId: string,
	userId: string,
	source: string,
) {
	let country: any;
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");

	try {
		if (forwardedFor || realIp) {
			const res = await fetch(
				`http://ip-api.com/json/${forwardedFor ? forwardedFor.split(",")[0].trim() : realIp ? realIp.trim() : ''}`,
			)
			if(!res.ok) {
				throw new Error('Unknown Error')
			}
			country = await res.json()

			if (country.data.origin.status === 'fail') {
				throw new Error('Unknown Error')
			}
				
		}  else {
			country = "Unknown";
		}
	} catch (err) {
		country = 'Unknown'
	}

	const record = await prisma?.clicks.create({
		data: {
			origin: (country as string) || "",
			timestamp: new Date(),
			source,
			linkId: linkId,
			userId,
		},
	});
}

import { headers } from "next/headers";

export async function createRecord(
	linkId: string,
	userId: string,
	source: string,
) {
	let country: any;
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");
	if (forwardedFor) {
		country = fetch(
			`http://ip-api.com/json/${forwardedFor.split(",")[0].trim()}`,
		)
			.then((res) => res.json())
			.then((data) => data.country);
	} else if (realIp) {
		country = fetch(`http://ip-api.com/json/${realIp.trim()}`)
			.then((res) => res.json())
			.then((data) => data.country);
	} else {
		country = "Unknown";
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

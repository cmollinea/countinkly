import prisma from "./prisma";

type AccountGrouth = {
	date: Date;
	count: string;
};

export async function getAccountGrouth(userId: string) {
	const data = await prisma.$queryRaw<
		AccountGrouth[]
	>`SELECT DATE("timestamp") as date, COUNT(*) as count from prisma."Clicks" where "userId" = ${userId} GROUP BY DATE("timestamp")`;
	return data;
}

export async function getLinkGrouth(linkId: string) {
	const data = await prisma.$queryRaw<
		AccountGrouth[]
	>`SELECT DATE("timestamp") as date, COUNT(*) as count from prisma."Clicks" where "linkId" = ${linkId} GROUP BY DATE("timestamp")`;
	return data;
}

export async function getLinksClicks(userId: string) {
	const links = await prisma.link.groupBy({
		by: ["id", "clickCount", "displayName"],
		where: { userId },
	});

	return links;
}

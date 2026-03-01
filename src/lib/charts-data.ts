import type { DateRange } from "./date-range";
import prisma from "./prisma";

type AccountGrouth = {
	date: Date;
	count: string;
};

export async function getAccountGrouth(userId: string, dateRange?: DateRange) {
	if (!dateRange) {
		const data = await prisma.$queryRaw<AccountGrouth[]>`SELECT DATE("timestamp") as date, COUNT(*) as count from "Clicks" where "userId" = ${userId} GROUP BY DATE("timestamp")`;
		return data;
	}
	const data = await prisma.$queryRaw<AccountGrouth[]>`SELECT DATE("timestamp") as date, COUNT(*) as count from "Clicks" where "userId" = ${userId} AND "timestamp" >= ${dateRange.from} AND "timestamp" <= ${dateRange.to} GROUP BY DATE("timestamp")`;
	return data;
}

export async function getLinkGrouth(linkId: string, dateRange?: DateRange) {
	if (!dateRange) {
		const data = await prisma.$queryRaw<AccountGrouth[]>`SELECT DATE("timestamp") as date, COUNT(*) as count from "Clicks" where "linkId" = ${linkId} GROUP BY DATE("timestamp")`;
		return data;
	}
	const data = await prisma.$queryRaw<AccountGrouth[]>`SELECT DATE("timestamp") as date, COUNT(*) as count from "Clicks" where "linkId" = ${linkId} AND "timestamp" >= ${dateRange.from} AND "timestamp" <= ${dateRange.to} GROUP BY DATE("timestamp")`;
	return data;
}

type LinksClicksItem = {
	id: string;
	displayName: string;
	clickCount: number;
};

export async function getLinksClicks(
	userId: string,
	dateRange?: DateRange,
): Promise<LinksClicksItem[]> {
	if (!dateRange) {
		const links = await prisma.link.groupBy({
			by: ["id", "clickCount", "displayName"],
			where: { userId },
		});
		return links as LinksClicksItem[];
	}

	const clicksByLink = await prisma.clicks.groupBy({
		by: ["linkId"],
		_count: { linkId: true },
		where: {
			userId,
			timestamp: { gte: dateRange.from, lte: dateRange.to },
		},
	});
	const linkIds = clicksByLink.map((c) => c.linkId);
	const links = await prisma.link.findMany({
		where: { id: { in: linkIds }, userId },
		select: { id: true, displayName: true },
	});
	const linkMap = new Map(links.map((l) => [l.id, l.displayName]));
	return clicksByLink.map((c) => ({
		id: c.linkId,
		displayName: linkMap.get(c.linkId) ?? "Unknown",
		clickCount: c._count.linkId,
	}));
}

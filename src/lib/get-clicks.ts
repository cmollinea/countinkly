import type { DateRange } from "./date-range";
import prisma from "./prisma";

function timestampWhere(dateRange?: DateRange) {
	if (!dateRange) return undefined;
	return {
		gte: dateRange.from,
		lte: dateRange.to,
	};
}

export async function getDailyClicks(id: string, dateRange?: DateRange) {
	const date = new Date();
	const baseWhere = {
		userId: id,
		timestamp: dateRange
			? { gte: dateRange.from, lte: dateRange.to }
			: {
					gte: new Date(
						`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
					),
				},
	};

	const dailyClicks = await prisma?.clicks.count({
		where: baseWhere,
	});

	return dailyClicks;
}

export async function getTotalClicks(id: string, dateRange?: DateRange) {
	const where: { userId: string; timestamp?: { gte: Date; lte: Date } } = {
		userId: id,
	};
	const ts = timestampWhere(dateRange);
	if (ts) where.timestamp = ts;
	const totalClicks = await prisma?.clicks.count({ where });
	return totalClicks;
}

export async function getLinkTotalCLicks(id: string, dateRange?: DateRange) {
	const where: { linkId: string; timestamp?: { gte: Date; lte: Date } } = {
		linkId: id,
	};
	const ts = timestampWhere(dateRange);
	if (ts) where.timestamp = ts;
	const totalClicks = await prisma?.clicks.count({ where });
	return totalClicks;
}

export async function getClicks(linkId: string, dateRange?: DateRange) {
	const where: { linkId: string; timestamp?: { gte: Date; lte: Date } } = {
		linkId,
	};
	const ts = timestampWhere(dateRange);
	if (ts) where.timestamp = ts;
	const clicksWithInfo = await prisma?.clicks.findMany({
		where,
	});

	return clicksWithInfo;
}

export async function getCountries(id: string, dateRange?: DateRange) {
	const where: { userId: string; timestamp?: { gte: Date; lte: Date } } = {
		userId: id,
	};
	const ts = timestampWhere(dateRange);
	if (ts) where.timestamp = ts;
	const data = await prisma.clicks.groupBy({
		by: ["origin"],
		where,
	});

	return data.length;
}

export async function getLinkCountries(id: string, dateRange?: DateRange) {
	const where: { linkId: string; timestamp?: { gte: Date; lte: Date } } = {
		linkId: id,
	};
	const ts = timestampWhere(dateRange);
	if (ts) where.timestamp = ts;
	const data = await prisma.clicks.groupBy({
		by: ["origin"],
		where,
	});

	return data.length;
}

export async function getLinks(id: string) {
	const data = await prisma.user.findFirst({
		where: { id },
		select: { Links: true },
	});

	return data?.Links.length;
}

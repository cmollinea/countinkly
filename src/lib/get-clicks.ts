import prisma from "./prisma";

export async function getDailyClicks(id: string) {
	const date = new Date();

	const dailyClicks = await prisma?.clicks.count({
		where: {
			userId: id,
			timestamp: {
				gte: new Date(
					`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
				),
			},
		},
	});

	return dailyClicks;
}

export async function getTotalClicks(id: string) {
	const totalClicks = await prisma?.clicks.count({ where: { userId: id } });
	return totalClicks;
}

export async function getLinkTotalCLicks(id: string) {
	const totalClicks = await prisma?.clicks.count({ where: { linkId: id } });
	return totalClicks;
}

export async function getClicks(linkId: string) {
	const clicksWithInfo = await prisma?.clicks.findMany({
		where: { linkId },
	});

	return clicksWithInfo;
}

export async function getCountries(id: string) {
	const data = await prisma.clicks.groupBy({
		by: ["origin"],
		where: { userId: id },
	});

	return data.length;
}

export async function getLinkCountries(id: string) {
	const data = await prisma.clicks.groupBy({
		by: ["origin"],
		where: { linkId: id },
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

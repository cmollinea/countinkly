export async function getDailyClicks(id: string) {
	const date = new Date();

	const clicks = await prisma?.clicks.count({
		where: {
			userId: id,
			timestamp: {
				gte: new Date(
					`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
				),
			},
		},
	});

	return clicks;
}

export async function getClicks(linkId: string) {
	const clicks = await prisma?.clicks.findMany({ where: { linkId: linkId } });

	return clicks;
}

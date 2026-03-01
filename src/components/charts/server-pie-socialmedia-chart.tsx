import type { DateRange } from "@/lib/date-range";
import { ClientPieSocialMediaChart } from "./client-pie-socialmedia-chart";
import prisma from "@/lib/prisma";

type Props = {
	userId: string;
	dateRange?: DateRange;
};

export const ServerPieSocialMediaChart = async ({
	userId,
	dateRange,
}: Props) => {
	const where: { userId: string; timestamp?: { gte: Date; lte: Date } } = {
		userId,
	};
	if (dateRange)
		where.timestamp = { gte: dateRange.from, lte: dateRange.to };
	const data = await prisma?.clicks.groupBy({
		where,
		by: ["source"],
		_count: { source: true },
	});

	const mappedData = data?.map((item) => {
		return { source: item.source, count: item._count.source };
	});

	return <>{mappedData && <ClientPieSocialMediaChart data={mappedData} />}</>;
};

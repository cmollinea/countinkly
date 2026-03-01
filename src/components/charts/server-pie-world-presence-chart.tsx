import type { DateRange } from "@/lib/date-range";
import prisma from "@/lib/prisma";
import { ClientPieWorldPresenceChart } from "./client-pie-world-presence-chart";

type Props = {
	userId: string;
	dateRange?: DateRange;
};

export const ServerPieWorldPresence = async ({
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
		by: ["origin"],
		_count: { origin: true },
	});

	const mappedData = data?.map((item) => {
		return { origin: item.origin, count: item._count.origin };
	});

	return <>{mappedData && <ClientPieWorldPresenceChart data={mappedData} />}</>;
};

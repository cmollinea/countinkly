import type { DateRange } from "@/lib/date-range";
import { ClientLinkPieWorldPresence } from "./client-link-pie-world-presence";
import prisma from "@/lib/prisma";

type Props = {
	linkId: string;
	name: string;
	dateRange?: DateRange;
};

export const ServerLinkPieWorldPresence = async ({
	linkId,
	name,
	dateRange,
}: Props) => {
	const where: { linkId: string; timestamp?: { gte: Date; lte: Date } } = {
		linkId,
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

	return (
		<>
			{mappedData && (
				<ClientLinkPieWorldPresence
					name={name}
					data={mappedData}
					className=" max-w-screen-2xl"
				/>
			)}
		</>
	);
};

import type { DateRange } from "@/lib/date-range";
import { ClientLinkPieSocialMediaChart } from "./client-link-pie-socialmedia";
import prisma from "@/lib/prisma";

type Props = {
	linkId: string;
	name: string;
	dateRange?: DateRange;
};

export const ServerLinkPieSocialMediaChart = async ({
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
		by: ["source"],
		_count: { source: true },
	});

	const mappedData = data?.map((item) => {
		return { source: item.source, count: item._count.source };
	});

	return (
		<>
			{mappedData && (
				<ClientLinkPieSocialMediaChart
					className=" max-w-screen-2xl"
					name={name}
					data={mappedData}
				/>
			)}
		</>
	);
};

import prisma from "@/lib/prisma";
import { ClientPieWorldPresenceChart } from "./client-pie-world-presence-chart";

type Props = {
	userId: string;
};

export const ServerPieWorldPresence = async ({ userId }: Props) => {
	const data = await prisma?.clicks.groupBy({
		where: { userId },
		by: ["origin"],
		_count: { origin: true },
	});

	const mappedData = data?.map((item) => {
		return { origin: item.origin, count: item._count.origin };
	});

	return <>{mappedData && <ClientPieWorldPresenceChart data={mappedData} />}</>;
};

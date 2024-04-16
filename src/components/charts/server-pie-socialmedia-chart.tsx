import { ClientPieSocialMediaChart } from "./client-pie-socialmedia-chart";
import prisma from "@/lib/prisma";

type Props = {
	userId: string;
};

export const ServerPieSocialMediaChart = async ({ userId }: Props) => {
	const data = await prisma?.clicks.groupBy({
		where: { userId },
		by: ["source"],
		_count: { source: true },
	});

	const mappedData = data?.map((item) => {
		return { source: item.source, count: item._count.source };
	});

	return <>{mappedData && <ClientPieSocialMediaChart data={mappedData} />}</>;
};

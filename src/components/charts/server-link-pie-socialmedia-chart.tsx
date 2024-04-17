import { ClientLinkPieSocialMediaChart } from "./client-link-pie-socialmedia";
import prisma from "@/lib/prisma";

type Props = {
	linkId: string;
	name: string;
};

export const ServerLinkPieSocialMediaChart = async ({
	linkId,
	name,
}: Props) => {
	const data = await prisma?.clicks.groupBy({
		where: { linkId },
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

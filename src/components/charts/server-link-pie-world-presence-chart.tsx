import { ClientLinkPieWorldPresence } from "./client-link-pie-world-presence";

type Props = {
	linkId: string;
	name: string;
};

export const ServerLinkPieWorldPresence = async ({ linkId, name }: Props) => {
	const data = await prisma?.clicks.groupBy({
		where: { linkId },
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

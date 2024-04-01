import { getLinkGrouth } from "@/lib/charts-data";
import { GrouthChart } from "./grouth-chart";

type Props = {
	linkId: string;
};

export const ServerLinkGrouth = async ({ linkId }: Props) => {
	const data = await getLinkGrouth(linkId);

	const parsedData = data.map((item) => {
		const date = new Date(item.date);
		return {
			date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
			count: parseInt(item.count),
		};
	});

	return (
		<>
			<GrouthChart className="max-w-screen-2xl" data={parsedData} />{" "}
		</>
	);
};

import type { DateRange } from "@/lib/date-range";
import { getLinkGrouth } from "@/lib/charts-data";
import { GrouthChart } from "./grouth-chart";

type Props = {
	linkId: string;
	dateRange?: DateRange;
};

export const ServerLinkGrouth = async ({ linkId, dateRange }: Props) => {
	const data = await getLinkGrouth(linkId, dateRange);

	const parsedData = data.map((item) => {
		const date = new Date(item.date);
		return {
			date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
			count: parseInt(item.count),
		};
	});

	return (
		<GrouthChart
			className="max-w-screen-2xl w-full lg:max-w-full"
			data={parsedData}
		/>
	);
};

import type { DateRange } from "@/lib/date-range";
import { getAccountGrouth } from "@/lib/charts-data";
import { GrouthChart } from "./grouth-chart";

type Props = {
	userId: string;
	dateRange?: DateRange;
};

export const ServerAccountGrouth = async ({ userId, dateRange }: Props) => {
	const data = await getAccountGrouth(userId, dateRange);

	const parsedData = data.map((item) => {
		const date = new Date(item.date);
		return {
			date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
			count: parseInt(item.count),
		};
	});

	return (
		<>
			<GrouthChart data={parsedData} />{" "}
		</>
	);
};

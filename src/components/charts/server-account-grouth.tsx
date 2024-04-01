import { getAccountGrouth } from "@/lib/charts-data";
import { GrouthChart } from "./grouth-chart";

type Props = {
	userId: string;
};

export const ServerAccountGrouth = async ({ userId }: Props) => {
	const data = await getAccountGrouth(userId);

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

import type { DateRange } from "@/lib/date-range";
import { getLinksClicks } from "@/lib/charts-data";
import { LinksBarChart } from "./links-barchart";

type Props = {
	userId: string;
	dateRange?: DateRange;
};

export const ServerLinksBarchar = async ({ userId, dateRange }: Props) => {
	const links = await getLinksClicks(userId, dateRange);

	const mappedLinks = links.map((item) => {
		return { link: item.displayName, count: item.clickCount };
	});

	return (
		<>
			<LinksBarChart data={mappedLinks} />
		</>
	);
};

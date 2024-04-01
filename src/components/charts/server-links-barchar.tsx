import { getLinksClicks } from "@/lib/charts-data";
import { LinksBarChart } from "./links-barchart";

type Props = {
	userId: string;
};

export const ServerLinksBarchar = async ({ userId }: Props) => {
	const links = await getLinksClicks(userId);

	const mappedLinks = links.map((item) => {
		return { link: item.displayName, count: item.clickCount };
	});

	return (
		<>
			<LinksBarChart data={mappedLinks} />
		</>
	);
};

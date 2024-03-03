import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
	id: string;
	clicksGetter: (id: string) => Promise<number | undefined>;
	title: string;
	Icon: LucideIcon;
};

export const ClicksCard = async ({ id, clicksGetter, title, Icon }: Props) => {
	const clicks = await clicksGetter(id);
	return (
		<Card className="max-w-xs w-full place-self-center md:place-self-start">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<span>
					<Icon />
				</span>
			</CardHeader>
			<CardContent>{clicks}</CardContent>
		</Card>
	);
};

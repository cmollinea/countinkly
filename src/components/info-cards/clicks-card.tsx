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
		<Card className="w-full place-self-center md:place-self-start bg-muted/10">
			<CardHeader className="flex-row justify-between items-center">
				<CardTitle className="text-xl">{title}</CardTitle>
				<span className="bg-primary/20 dark:stext-primary-foreground/80 backdrop-blur-xl p-4 rounded-full">
					<Icon size={24} />
				</span>
			</CardHeader>
			<CardContent>
				<p className="text-3xl">{clicks}</p>
			</CardContent>
		</Card>
	);
};

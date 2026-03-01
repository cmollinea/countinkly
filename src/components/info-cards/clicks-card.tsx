import {
	Card,
	CardContent,
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
		<Card className="w-full place-self-center md:place-self-start border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200">
			<CardHeader className="flex-row justify-between items-start pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground leading-tight">
					{title}
				</CardTitle>
				<span className="bg-primary/10 border border-primary/20 p-2.5 rounded-xl shrink-0">
					<Icon size={16} className="text-primary" />
				</span>
			</CardHeader>
			<CardContent className="pt-0">
				<p className="text-3xl font-bold tabular-nums tracking-tight font-heading">
					{clicks ?? 0}
				</p>
			</CardContent>
		</Card>
	);
};

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
		<Card className="w-full place-self-center md:place-self-start bg-muted/10 border-border/50 shadow-sm hover:shadow-md transition-shadow">
			<CardHeader className="flex-row justify-between items-center pb-2">
				<CardTitle className="text-base font-medium text-muted-foreground">
					{title}
				</CardTitle>
				<span className="bg-primary/20 dark:text-primary-foreground/80 backdrop-blur-xl p-3 rounded-full shrink-0">
					<Icon size={20} className="text-primary" />
				</span>
			</CardHeader>
			<CardContent className="pt-0">
				<p className="text-3xl font-bold tabular-nums tracking-tight">
					{clicks ?? 0}
				</p>
			</CardContent>
		</Card>
	);
};

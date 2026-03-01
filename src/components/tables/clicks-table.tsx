import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { DateRange } from "@/lib/date-range";
import { getClicks } from "@/lib/get-clicks";
import { format } from "date-fns";
import { Calendar, Globe2, LucideNetwork } from "lucide-react";

type Props = {
	linkId: string;
	dateRange?: DateRange;
};

export const ClicksTable = async ({ linkId, dateRange }: Props) => {
	const clicks = await getClicks(linkId, dateRange);

	return clicks.length > 0 ? (
		<Table className="self-center">
			<TableCaption>
				{clicks.length} Clicks Earned
				{dateRange && (
					<span className="block text-muted-foreground text-xs font-normal mt-1">
						Showing data for the selected time range
					</span>
				)}
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>
						<span className="flex items-center space-x-0.5">
							<Calendar size={16} className=" text-primary" />
							<span>Timestamp</span>
						</span>
					</TableHead>
					<TableHead>
						<span className="flex items-center space-x-0.5">
							<Globe2 size={16} className=" text-primary" />
							<span>From</span>
						</span>
					</TableHead>
					<TableHead>
						<span className="flex items-center space-x-0.5">
							<LucideNetwork size={16} className=" text-primary" />
							<span>Source</span>
						</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{clicks.map((click, index) => (
					<TableRow
						key={click.id}
						className={`${index % 2 === 0 ? "bg-muted/50" : ""} border-y-muted transition-colors hover:bg-muted`}
					>
						<TableCell className="tabular-nums">
							{format(new Date(click.timestamp), "dd/MM/yyyy HH:mm")}
						</TableCell>
						<TableCell>{click.origin}</TableCell>
						<TableCell>{click.source}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<p className="text-muted-foreground">No clicks to show in this range</p>
	);
};

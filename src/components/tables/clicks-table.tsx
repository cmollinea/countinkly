import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getClicks } from "@/lib/get-clicks";
import { Calendar, Globe2, LucideNetwork } from "lucide-react";

type Props = {
	linkId: string;
};

export const ClicksTable = async ({ linkId }: Props) => {
	const clicks = await getClicks(linkId);

	return clicks ? (
		<Table className="self-center">
			<TableCaption>{clicks.length} Clicks Earned</TableCaption>
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
						className={`${index % 2 === 0 ? "bg-muted" : ""} border-y-muted`}
					>
						<TableCell className="">{click.timestamp.toString()}</TableCell>
						<TableCell>{click.origin}</TableCell>
						<TableCell className="">{click.source}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<p>No clicks to show</p>
	);
};

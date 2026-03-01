import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const placeholders = [0, 1, 2];

export const DiscoverSkelleton = () => {
	return (
		<section className="w-full grid gap-6">
			{placeholders.map((i) => (
				<Card
					className="w-full rounded-2xl border border-border/60 shadow-sm"
					key={i}
				>
					<CardHeader className="flex-row gap-5 pb-3">
						<Skeleton className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl shrink-0" />
						<div className="flex-1 grid gap-2 min-w-0">
							<Skeleton className="h-6 w-3/4 rounded-md" />
							<Skeleton className="h-4 w-32 rounded-md" />
							<Skeleton className="h-4 w-full rounded-md" />
							<Skeleton className="h-4 w-full rounded-md" />
						</div>
					</CardHeader>
					<div className="flex gap-4 justify-around border-t border-border/50 py-3">
						<Skeleton className="h-8 w-16 rounded-md" />
						<Skeleton className="h-8 w-16 rounded-md" />
						<Skeleton className="h-8 w-16 rounded-md" />
					</div>
				</Card>
			))}
		</section>
	);
};

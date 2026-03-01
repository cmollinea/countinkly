import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const placeholders = Array.from({ length: 12 }, (_, i) => i);

export const DiscoverSkeleton = () => {
	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
			{placeholders.map((i) => (
				<Card
					className="w-full rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col"
					key={i}
				>
					<div className="h-1.5 shrink-0 bg-muted" />
					<Skeleton className="aspect-video w-full shrink-0 rounded-none" />
					<CardHeader className="flex-1 flex flex-col gap-2 pb-2 pt-3">
						<Skeleton className="h-5 w-4/5 rounded-md" />
						<Skeleton className="h-3 w-full rounded-md" />
						<Skeleton className="h-3 w-full rounded-md" />
						<Skeleton className="h-3 w-20 rounded-md mt-1" />
					</CardHeader>
					<div className="flex gap-4 justify-around border-t border-border/50 py-3">
						<Skeleton className="h-8 w-14 rounded-md" />
						<Skeleton className="h-8 w-14 rounded-md" />
						<Skeleton className="h-8 w-14 rounded-md" />
					</div>
				</Card>
			))}
		</section>
	);
};

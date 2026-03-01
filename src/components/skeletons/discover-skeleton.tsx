import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const placeholders = Array.from({ length: 12 }, (_, i) => i);

export const DiscoverSkeleton = () => {
	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
			{placeholders.map((i) => (
				<Card
					className="w-full rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col"
					key={i}
				>
					<div className="relative aspect-[5/3] w-full overflow-hidden bg-muted/40">
						<Skeleton className="absolute inset-0 rounded-none" />
						<div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1.5">
							<Skeleton className="h-4 w-3/4 rounded-md bg-white/20" />
							<Skeleton className="h-3 w-full rounded-md bg-white/15" />
						</div>
					</div>
					<div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
						<Skeleton className="h-3 w-20 rounded-md" />
					</div>
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

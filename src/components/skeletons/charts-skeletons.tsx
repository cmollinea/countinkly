import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const ChartsSkeleton = ({ className }: { className?: string }) => {
	return (
		<Skeleton
			className={cn("w-full max-w-lg h-[280px] rounded-xl", className)}
		/>
	);
};

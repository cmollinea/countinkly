import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const a = [0, 1, 2];

export const CommentSkeleton = () => {
	return (
		<div className="lg:overflow-y-auto relative lg:h-[calc(100vh-64px)] lg:max-w-xl lg:w-full lg:border-l lg:px-6 pb-10 lg:pt-4 lg:border-gray-500/20">
			<Skeleton className="w-20 h-2" />
			<div className="grid gap-4 pb-10 pt-4">
				{a.map((i) => {
					return (
						<Card
							key={i}
							className=" bg-card/50 border-card-foreground/5 relative p-2"
						>
							<CardHeader className="py-0">
								<div className="flex items-center space-x-2">
									<Skeleton className=" w-10 h-10 rounded-full" />
									<Skeleton className="h-4 w-32" />
								</div>
							</CardHeader>
							<CardContent className="pb-0 pt-2 font-normal">
								<Skeleton className="w-full h-8" />
							</CardContent>
							<CardFooter className="place-content-end pt-2 pb-0">
								<Skeleton className="w-28 h-2" />
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

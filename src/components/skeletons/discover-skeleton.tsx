import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const a = [0, 1, 2];

export const DiscoverSkelleton = () => {
	return (
		<section className="w-full grid gap-4">
			{a.map((a) => (
				<Card
					className="w-full place-self-center bg-card/50 border-card-foreground/20 max-w-3xl"
					key={a}
				>
					<CardHeader className="flex-row space-x-4">
						<Skeleton>
							<div className="w-32 h-32 rounded-md" />
						</Skeleton>
						<div className="w-2/3 grid rounded-md gap-2 h-fit">
							<Skeleton>
								<div className="w-full h-8 rounded-md" />
							</Skeleton>
							<Skeleton>
								<div className="w-full h-4 rounded-md" />
							</Skeleton>
							<Skeleton>
								<div className="w-full h-4 rounded-md" />
							</Skeleton>
						</div>
					</CardHeader>
				</Card>
			))}
		</section>
	);
};

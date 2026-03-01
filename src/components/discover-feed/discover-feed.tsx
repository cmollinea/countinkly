import { Card } from "@/components/ui/card";
import { ClientDiscoverCardFooter } from "./client-discover-card-footer";
import { getChartColorFromString } from "@/lib/chart-colors";
import prisma from "@/lib/prisma";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
	userId: string;
	currentpage: number;
};

const PER_PAGE = 20;

export const DiscoverFeed = async ({ userId, currentpage }: Props) => {
	const links = await prisma?.link.findMany({
		take: PER_PAGE,
		skip: (currentpage - 1) * PER_PAGE,
		include: {
			_count: { select: { Likes: true, Comments: true } },
			linkMetadata: true,
			shortedLink: true,
		},
		orderBy: { createdAt: "asc" },
	});

	const userLikes = await prisma?.likes.findMany({
		where: { userId: userId },
	});

	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
			{links?.map((link) => {
				const likeIndex = userLikes?.findIndex(
					(like) => like.linkId === link.id,
				);
				const accentColor = getChartColorFromString(link.id);
				return (
					<Card
						className="group w-full rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-border overflow-hidden flex flex-col"
						key={link.id}
					>
						<Link
							href={`/dashboard/discover/${link.id}`}
							className="block flex-1 min-h-0"
						>
							<div className="relative aspect-[5/3] w-full overflow-hidden bg-muted/40">
								<img
									alt={`${link.displayName}`}
									src={link.linkMetadata?.og || "/not-image.jpg"}
									className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
								/>
								{/* gradient overlay + title & description on photo */}
								<div
									className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
									aria-hidden
								/>
								<div
									className="absolute bottom-0 left-0 right-0 p-3 pl-3 flex flex-col gap-0.5 border-l-[3px]"
									style={{ borderLeftColor: accentColor }}
								>
									<span className="font-heading text-sm font-semibold text-white leading-tight line-clamp-2 drop-shadow-sm">
										{link.displayName}
									</span>
									<span className="text-xs text-white/80 line-clamp-1">
										{link.linkMetadata?.description || "No description"}
									</span>
								</div>
							</div>
						</Link>
						<div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/50">
							<Link
								target="_blank"
								href={`${
									process.env.NEXT_PUBLIC_VERCEL_URL ||
									process.env.NEXT_PUBLIC_DOMAIN
								}/${link.shortedLink?.shortUrl}?source=Countinkly`}
								className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline"
							>
								Visit page
								<ExternalLink size={12} />
							</Link>
						</div>
						<ClientDiscoverCardFooter
							shortedUrl={link.shortedLink?.shortUrl}
							likes={link._count.Likes}
							comments={link._count.Comments}
							linkId={link.id}
							userId={userId}
							likeId={
								likeIndex !== undefined && likeIndex >= 0 && userLikes
									? userLikes[likeIndex].id
									: undefined
							}
							isLikedByUser={likeIndex !== undefined ? likeIndex >= 0 : false}
						/>
					</Card>
				);
			})}
		</section>
	);
};

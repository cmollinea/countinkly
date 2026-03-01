import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
						className="group w-full rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary/30 overflow-hidden flex flex-col"
						key={link.id}
					>
						<div
							className="h-1.5 shrink-0"
							style={{ backgroundColor: accentColor }}
							aria-hidden
						/>
						<Link
							href={`/dashboard/discover/${link.id}`}
							className="block flex-1 min-h-0"
						>
							<div className="relative aspect-video w-full overflow-hidden bg-muted/50">
								<img
									alt={`${link.displayName}`}
									src={link.linkMetadata?.og || "/not-image.jpg"}
									className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
								/>
							</div>
						</Link>
						<CardHeader className="flex-1 flex flex-col gap-1.5 pb-2 pt-3">
							<Link href={`/dashboard/discover/${link.id}`}>
								<CardTitle className="font-heading text-base font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors">
									{link.displayName}
								</CardTitle>
							</Link>
							<p className="text-xs text-muted-foreground line-clamp-2 italic">
								{link.linkMetadata?.description || "No description provided"}
							</p>
							<Link
								target="_blank"
								href={`${
									process.env.NEXT_PUBLIC_VERCEL_URL ||
									process.env.NEXT_PUBLIC_DOMAIN
								}/${link.shortedLink?.shortUrl}?source=Countinkly`}
								className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline w-fit mt-0.5"
							>
								Visit page
								<ExternalLink size={12} />
							</Link>
						</CardHeader>
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

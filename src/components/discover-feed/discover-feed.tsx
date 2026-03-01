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

export const DiscoverFeed = async ({ userId, currentpage }: Props) => {
	const links = await prisma?.link.findMany({
		take: 10,
		skip: (currentpage - 1) * 10,
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
		<section className="w-full grid gap-6">
			{links?.map((link) => {
				const likeIndex = userLikes?.findIndex(
					(like) => like.linkId === link.id,
				);
				const accentColor = getChartColorFromString(link.id);
				return (
					<Card
						className="w-full rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md hover:border-primary/20"
						style={{ borderLeftWidth: "4px", borderLeftColor: accentColor }}
						key={link.id}
					>
						<CardHeader className="flex-row gap-5 pb-3">
							<img
								alt={`${link.displayName} Og`}
								src={link.linkMetadata?.og || "/not-image.jpg"}
								className="aspect-square w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0"
							/>
							<div className="min-w-0 flex-1 grid gap-1">
								<CardTitle className="font-heading text-lg font-semibold leading-tight">
									{link.displayName}
								</CardTitle>
								<Link
									target="_blank"
									href={`${
										process.env.NEXT_PUBLIC_VERCEL_URL ||
										process.env.NEXT_PUBLIC_DOMAIN
									}/${link.shortedLink?.shortUrl}?source=Countinkly`}
									className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary hover:underline w-fit"
								>
									Visit this page
									<ExternalLink size={14} />
								</Link>
								<CardContent className="px-0 pt-1 text-sm text-muted-foreground leading-relaxed italic">
									{link.linkMetadata?.description || "No description provided"}
								</CardContent>
							</div>
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

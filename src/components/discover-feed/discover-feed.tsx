import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ClientDiscoverCardFooter } from "./client-discover-card-footer";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import prisma from "@/lib/prisma";

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
		<section className="w-full grid gap-4">
			{links?.map((link) => {
				const likeIndex = userLikes?.findIndex(
					(like) => like.linkId === link.id,
				);
				return (
					<Card
						className="w-full place-self-center bg-card/50 border-card-foreground/20 max-w-3xl"
						key={link.id}
					>
						<CardHeader className="flex-row space-x-4">
							<img
								alt={`${link.displayName} Og`}
								src={link.linkMetadata?.og || "/not-image.jpg"}
								className="aspect-square w-32 h-32 rounded-md"
							/>
							<div>
								<CardTitle>{link.displayName}</CardTitle>
								<small className="opacity-50 w-fit">
									<Link
										target="_blank"
										href={`${
											process.env.NEXT_PUBLIC_VERCEL_URL ||
											process.env.NEXT_PUBLIC_DOMAIN
										}/${link.shortedLink?.shortUrl}?source=Countinkly`}
										className="flex items-center space-x-0.5 hover:underline"
									>
										<span>Visit this page</span>
										<ExternalLink size={14} />
									</Link>
								</small>
								<CardContent className="px-0 italic">
									{link.linkMetadata?.description || "Not description provided"}
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

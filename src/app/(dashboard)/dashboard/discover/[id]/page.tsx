import { BackButton } from "@/components/dashboard/back-button";
import { CommentForm } from "@/components/forms/comment-form";
import { CommentsContainer } from "@/components/discover-feed/comments-container";
import { CommentSkeleton } from "@/components/skeletons/comments-skeleton";
import { ExternalLink } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { ShareButton } from "@/components/discover-feed/share-button";
import { Suspense } from "react";
import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";
import prisma from "@/lib/prisma";

type Props = {
	params: { id: string };
};

async function LinkComments({ params }: Props) {
	const { user } = await validateRequest();

	if (!user) {
		redirect("/log-in");
	}

	const link = await prisma?.link.findFirst({
		where: {
			id: params.id,
		},
		include: {
			shortedLink: true,
			linkMetadata: true,
		},
	});

	if (!link) {
		return notFound();
	}

	return (
		<section className="max-lg:px-4 md:pl-10 w-full overflow-y-auto lg:overflow-y-hidden relative">
			<BackButton />
			<div className="mx-auto max-w-5xl lg:flex lg:justify-between max-md:grid max-md:gap-12 max-md:mt-6 pt-14">
				<div className="lg:max-w-xl lg:w-full grid h-fit gap-8">
					<div className="rounded-2xl border border-border/60 bg-card shadow-sm p-5 flex flex-wrap gap-4">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt={`${link?.displayName} Og`}
							src={link?.linkMetadata?.og || "/not-image.jpg"}
							className="aspect-square w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0"
						/>
						<div className="min-w-0 flex-1 space-y-2">
							<h1 className="font-heading text-2xl font-bold tracking-tight">
								{link?.displayName}
							</h1>
							<Link
								target="_blank"
								className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary hover:underline w-fit"
								href={`${
									process.env.NEXT_PUBLIC_VERCEL_URL ||
									process.env.NEXT_PUBLIC_DOMAIN
								}/${link?.shortedLink?.shortUrl}?source=Countinkly`}
							>
								Visit this page
								<ExternalLink size={14} />
							</Link>
							<div className="pt-1">
								<ShareButton shortedUrl={link?.shortedLink?.shortUrl || ""} />
							</div>
						</div>
					</div>
					<CommentForm linkId={params.id} userId={user.id} />
				</div>
				<Suspense fallback={<CommentSkeleton />}>
					<CommentsContainer linkId={params.id} userId={user.id} />
				</Suspense>
			</div>
		</section>
	);
}
export default LinkComments;

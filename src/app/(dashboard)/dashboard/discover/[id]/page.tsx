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
			<div className="lg:flex lg:justify-between max-md:grid max-md:gap-12 max-md:mt-6">
				<div className="lg:max-w-xl lg:w-full grid h-fit gap-8 pt-14">
					<div className="flex space-x-4 relative">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt={`${link?.displayName} Og`}
							src={link?.linkMetadata?.og || "/not-image.jpg"}
							className="aspect-square w-32 h-32 rounded-md"
						/>
						<div className="space-y-1">
							<span className=" text-2xl font-bold">{link?.displayName}</span>
							<Link
								target="_blank"
								className="opacity-50 w-fit flex items-center space-x-0.5 hover:underline"
								href={`${
									process.env.NEXT_PUBLIC_DOMAIN || process.env.VERCEL_URL
								}/${link?.shortedLink?.shortUrl}?source=Countinkly`}
							>
								<span>Visit this page</span>
								<ExternalLink size={14} />
							</Link>
							<ShareButton shortedUrl={link?.shortedLink?.shortUrl || ""} />
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

import { BackButton } from "@/components/dashboard/back-button";
import { CommentsContainer } from "@/components/discover-feed/comments-container";
import { ShareButton } from "@/components/discover-feed/share-button";
import { CommentForm } from "@/components/forms/comment-form";
import { validateRequest } from "@/lib/validate-request";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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

	return (
		<section className="max-lg:px-4 md:pl-10 w-full overflow-y-auto lg:overflow-y-hidden relative">
			<BackButton />
			<div className="lg:flex lg:justify-between max-md:grid max-md:gap-12 max-md:mt-6">
				<div className="lg:max-w-xl lg:w-full grid h-fit gap-8 pt-14">
					<div className="flex space-x-4 relative">
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
								href={`${process.env.NEXT_PUBLIC_DOMAIN}/${link?.shortedLink?.shortUrl}?source=Countinkly`}
							>
								<span>Visit this page</span>
								<ExternalLink size={14} />
							</Link>
							<ShareButton shortedUrl={link?.shortedLink?.shortUrl || ""} />
						</div>
					</div>
					<CommentForm linkId={params.id} userId={user.id} />
				</div>
				<CommentsContainer linkId={params.id} userId={user.id} />
			</div>
		</section>
	);
}
export default LinkComments;

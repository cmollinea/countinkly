import { BackButton } from "@/components/dashboard/back-button";
import { CommentsContainer } from "@/components/discover-feed/comments-container";
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
		<section className=" overflow-y-auto py-16 px-4 md:px-10 w-full">
			<BackButton />
			<div className="grid">
				<span>Here goes an image</span>
				<h1 className=" text-2xl font-bold">{link?.displayName}</h1>
				<Link
					target="_blank"
					className="opacity-50 w-fit flex items-center space-x-0.5 hover:underline"
					href={`${process.env.NEXT_PUBLIC_DOMAIN}/${link?.shortedLink?.shortUrl}?source=Countinkly`}
				>
					<span>Visit this page</span>
					<ExternalLink size={14} />
				</Link>
				<CommentForm linkId={params.id} userId={user.id} />
				<CommentsContainer linkId={params.id} userId={user.id} />
			</div>
		</section>
	);
}
export default LinkComments;

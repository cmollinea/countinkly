import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { MessageCircleDashed, Trash2 } from "lucide-react";

type Props = {
	linkId: string;
	userId: string;
};

export const CommentsContainer = async ({ linkId, userId }: Props) => {
	const comments = await prisma?.comments.findMany({
		where: { linkId },
		include: {
			user: {
				select: {
					userName: true,
				},
			},
		},
	});
	return (
		<>
			{comments ? (
				<div className="grid gap-4 lg:overflow-y-auto relative lg:h-[calc(100vh-64px)] lg:max-w-xl lg:w-full lg:border-l lg:px-6 pb-10 lg:pt-4 lg:border-card-foreground/5">
					<small className="text-primary">{comments?.length} comments</small>
					{comments?.map((comment) => {
						const date = new Date(comment.timestamp);
						return (
							<Card
								key={comment.id}
								className=" bg-card/50 border-card-foreground/5 relative p-2"
							>
								{userId === comment.userId && (
									<Trash2 className="top-2 right-4 absolute" size={12} />
								)}
								<CardHeader className="py-0">
									<div className="flex items-center space-x-2">
										<img
											alt="Avatar"
											src={`https://api.dicebear.com/7.x/bottts-neutral/png?seed=${comment.user.userName}`}
											height={30}
											width={30}
											className=" rounded-full"
										/>
										<p>{comment.user.userName}</p>
									</div>
								</CardHeader>
								<CardContent className="pb-0 pt-2 font-normal">
									<small>{comment.content}</small>
								</CardContent>
								<CardFooter className="place-content-end pb-0">
									<small className=" text-[10px] opacity-70">
										{date.toLocaleDateString()} {date.toLocaleTimeString()}
									</small>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			) : (
				<>
					<MessageCircleDashed size={35} />
					<h3>Be the first one on let a comment</h3>
				</>
			)}
		</>
	);
};
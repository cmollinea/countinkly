import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Trash2 } from "lucide-react";

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
		<div>
			{comments?.map((comment) => {
				const date = new Date(comment.timestamp);
				return (
					<Card
						key={comment.id}
						className=" bg-card/50 border-card-foreground/20 relative"
					>
						{userId === comment.userId && (
							<Trash2 className="top-2 right-4 absolute" size={12} />
						)}
						<CardHeader>
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
						<CardContent>
							<p>{comment.content}</p>
						</CardContent>
						<CardFooter className="place-content-end">
							<small className=" text-xs opacity-70">
								{date.toLocaleDateString()} {date.toLocaleTimeString()}
							</small>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
};

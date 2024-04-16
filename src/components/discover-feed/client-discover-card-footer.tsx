"use client";

import { Heart, MessageSquareText, Share, Share2 } from "lucide-react";
import { CardFooter } from "../ui/card";
import { useState } from "react";
import { addLike, removeLike } from "@/actions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShareButton } from "./share-button";
import Link from "next/link";

type Props = {
	likes: number;
	comments: number;
	isLikedByUser: boolean;
	linkId: string;
	userId: string;
	likeId?: string;
	shortedUrl?: string;
};

export const ClientDiscoverCardFooter = ({
	likes,
	comments,
	isLikedByUser,
	linkId,
	userId,
	likeId,
	shortedUrl,
}: Props) => {
	const [isLiked, setIsLiked] = useState(isLikedByUser);
	const [likesCount, setlikesCount] = useState(likes);
	const router = useRouter();
	const pathname = usePathname();

	//! ATTEMPT OF OPTIMISTIC UPDATE HANDCRAFTED

	const handleLike = async () => {
		if (!isLiked) {
			setIsLiked(true);
			setlikesCount((prev) => prev + 1);

			const error = await addLike(linkId, userId);

			if (error) {
				setIsLiked(false);
				setlikesCount((prev) => prev - 1);
				toast.error(error.error);
				return;
			}
			router.refresh();

			return;
		}

		if (likeId) {
			setIsLiked(false);
			setlikesCount((prev) => prev - 1);

			const error = await removeLike(likeId);

			if (error) {
				setIsLiked(true);
				setlikesCount((prev) => prev + 1);
				toast.error(error.error);
				return;
			}

			router.refresh();

			return;
		}
	};

	return (
		<CardFooter className="text-sm gap-4 justify-around place-content-center items-center select-none border-t border-card-foreground/10 py-1">
			<Link
				href={`${pathname}/${linkId}`}
				className="flex items-center py-2 gap-0.5 hover:bg-primary/5 hover:text-primary transition-colors ease-in-out group place-content-center w-fit rounded-full p-0.5"
			>
				<MessageSquareText size={20} /> <span>{comments}</span>
			</Link>

			<div className="flex items-center py-2 place-content-center cursor-pointer hover:bg-green-500/5 transition-all ease-in-out p-0.5 rounded-full hover:text-green-500 h-9 w-9">
				<ShareButton
					className="hover:text-green-500"
					shortedUrl={shortedUrl || ""}
					ownHeader={{
						title: "Share this link",
						description:
							"Support the owner by sharing this page on your social media using Countinkly",
					}}
				/>
			</div>
			<div className="flex items-center py-2 gap-0.5 place-content-center w-fit hover:text-red-500 transition-colors ease-in-out cursor-pointer hover:bg-red-500/5 p-0.5 rounded-full">
				<Heart
					size={20}
					onClick={() => handleLike()}
					className={`${
						isLiked ? "text-red-500 fill-red-500" : ""
					} transition-all ease-out  active:scale-95 `}
				/>
				<span>{likesCount}</span>
			</div>
		</CardFooter>
	);
};

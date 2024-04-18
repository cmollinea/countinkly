"use client";
import { removeComment } from "@/actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

type Props = {
	commentId: string;
};

export const DeleteCommentButton = ({ commentId }: Props) => {
	const router = useRouter();

	const handleDelete = useCallback(async () => {
		const { message, error } = await removeComment(commentId);
		if (message) {
			toast.success(message);
			return router.refresh();
		}
		if (error) {
			toast.error(error);
			return router.refresh();
		}
	}, [commentId, router]);

	return (
		<button type="button" onClick={() => handleDelete()}>
			<Trash2 className="top-2 right-4 absolute" size={12} />
		</button>
	);
};

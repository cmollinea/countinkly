"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { addComment } from "@/actions";
import { commentSchema } from "@/zod";
import { useRouter } from "next/navigation";

type Props = {
	userId: string;
	linkId: string;
};

export function CommentForm({ userId, linkId }: Props) {
	const addCommentWithArguments = addComment.bind(null, linkId, userId);
	const router = useRouter();

	const { form, handleAction, isPending } = useFormWithAction(
		addCommentWithArguments,
		commentSchema,
	);

	const handleSubmit = async (values: { [x: string]: any }) => {
		await handleAction(values);
		router.refresh();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-2 p-4 border border-card-foreground/10 rounded-xl"
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Leave a comment</FormLabel>
							<FormControl>
								<Textarea
									placeholder="I think this is a great website..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Please consider share this website to support the creator
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					{isPending ? "Sending..." : "Comment"}
				</Button>
			</form>
		</Form>
	);
}

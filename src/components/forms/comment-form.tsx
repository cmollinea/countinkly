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

//todo Make a better ui

type Props = {
	userId: string;
	linkId: string;
};

export function CommentForm({ userId, linkId }: Props) {
	const addCommentWithArguments = addComment.bind(null, linkId, userId);

	const { form, handleAction, isPending } = useFormWithAction(
		addCommentWithArguments,
		commentSchema,
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleAction)}
				className="w-2/3 space-y-6"
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								You can <span>@mention</span> other users and organizations.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">{isPending ? "Sending..." : "Submit"}</Button>
			</form>
		</Form>
	);
}

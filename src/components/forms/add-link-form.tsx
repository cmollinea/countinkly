"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FormDrawer } from "../ui/form-drawer";
import { Input } from "@/components/ui/input";
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { addNewLink } from "@/actions";
import { linkSchema } from "@/zod";
import { LinkOptionalFields } from "./link-optional-fields";
import { useLinkDialog } from "@/hooks/use-link-dialog";
import { NewLinkDialog } from "../new-link-dialog";

export function AddLinkForm({ userId }: { userId: string }) {
	const handleAddNewLink = addNewLink.bind(null, userId);
	const { form, formState, isPending, handleAction } = useFormWithAction(
		handleAddNewLink,
		linkSchema,
	);

	const { open, setOpen } = useLinkDialog(formState);

	return (
		<>
			<FormDrawer>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleAction)}
						className="space-y-2 max-md:px-4"
					>
						<FormField
							control={form.control}
							name="displayName"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel>Display Name</FormLabel>
									<FormControl>
										<Input
											placeholder="A way to identify your link"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="url"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input
											placeholder="https://procastinatordev.vercel.app"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<LinkOptionalFields form={form} />

						<Button
							disabled={isPending}
							type="submit"
							size={"lg"}
							className="w-full"
						>
							{isPending && (
								<span className="h-5 w-5 border-dashed border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin" />
							)}
							<span>{isPending ? "Wait a second" : "Add"}</span>
						</Button>
					</form>
				</Form>
			</FormDrawer>
			<NewLinkDialog
				open={open}
				setOpen={setOpen}
				shortUrl={formState.linkPayload?.shortedLink?.shortUrl}
			/>
		</>
	);
}

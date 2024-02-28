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
import { Input } from "@/components/ui/input";
import { useLogIn } from "@/hooks/use-log-in";

export const LogInForm = () => {
	const { handleLogIn, form, isPending } = useLogIn();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleLogIn)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Your Username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Your Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isPending}
					type="submit"
					size={"lg"}
					className="w-full"
				>
					{isPending && (
						<span className="h-5 w-5 border-dashed border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin" />
					)}
					<span>{isPending ? "Wait a second" : "Log In"}</span>
				</Button>
			</form>
		</Form>
	);
};

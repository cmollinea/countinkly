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
import { toast } from "sonner";
import { useEffect } from "react";
import { useSignUp } from "@/hooks/use-sign-up";

export function SignUpForm() {
	const { form, handleSignUp, formState, isPending } = useSignUp();

	useEffect(() => {
		if (!formState.error && !formState.message) {
			return;
		}

		if (formState.message) {
			toast(formState.message);
		}

		if (formState.error) {
			toast.error(formState.error);
		}
	}, [formState]);
	return (
		<Form {...form}>
			<form
				// action={signupWithState}
				onSubmit={form.handleSubmit(handleSignUp)}
				className="space-y-6 mt-10 max-w-md mx-auto w-full"
			>
				<div className="space-y-2">
					{" "}
					<FormField
						control={form.control}
						name="firstName"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="Jhon" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-Mail</FormLabel>
								<FormControl>
									<Input placeholder="jhondoe@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
									<Input
										type="password"
										placeholder="Your Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Repeat Your Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="occupation"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>Occupation</FormLabel>
								<FormControl>
									<Input
										className="mb-8"
										placeholder="Developer, Cm, Content Creator..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={isPending}
					type="submit"
					size={"lg"}
					className="w-full space-x-2 flex items-center"
				>
					{isPending && (
						<span className="h-5 w-5 border-dashed border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin" />
					)}
					<span>{isPending ? "Wait a second" : "Sign Up"}</span>
				</Button>{" "}
			</form>
		</Form>
	);
}

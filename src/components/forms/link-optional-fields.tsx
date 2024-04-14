"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Label } from "../ui/label";

type Props = {
	control: Control<
		{
			[x: string]: any;
		},
		any
	>;
};

//TODO Search on React-Hook-Form Docs what to do with optional fields becouse if a user turns on the switch make the fields required

export const LinkOptionalFields = ({ control }: Props) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<span className="flex items-center space-x-2 py-2">
				{" "}
				<Label htmlFor="switch">Use your metadata</Label>
				<Switch
					id="switch"
					checked={show}
					onCheckedChange={() => setShow((prev) => !prev)}
				/>
			</span>
			{show ? (
				<>
					<FormField
						control={control}
						name="title"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Your site metadata title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="description"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Your site metadata description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="og"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>OG</FormLabel>
								<FormControl>
									<Input
										placeholder="A secure URL to your site metadata image"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</>
			) : null}
		</>
	);
};

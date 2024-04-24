"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../ui/label";

type Props = {
	form: UseFormReturn<
		{
			[x: string]: any;
		},
		any,
		undefined
	>;
};

//TODO Refactor the function that handles the unregister

export const LinkOptionalFields = ({ form }: Props) => {
	const [show, setShow] = useState(false);

	const handleCheck = () => {
		if (show) {
			form.unregister(["title", "description", "og"]);
		}
		setShow((prev) => !prev);
	};

	return (
		<>
			<span className="flex items-center space-x-2 py-2">
				{" "}
				<Label htmlFor="switch">Use your metadata</Label>
				<Switch
					id="switch"
					checked={show}
					onCheckedChange={() => handleCheck()}
				/>
			</span>
			{show ? (
				<>
					<FormField
						control={form.control}
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
						control={form.control}
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
						control={form.control}
						name="og"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel>OG</FormLabel>
								<FormControl>
									<Input
										inputMode="url"
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

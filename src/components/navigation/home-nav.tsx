"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { User } from "lucia";

type Props = {
	user: User | null;
};

export const HomeNav = ({ user }: Props) => {
	return (
		<div className="flex items-center place-content-center space-x-4 font-semibold max-md:hidden">
			<Link href={"/"}> Home</Link>
			{user ? (
				<Link
					className={buttonVariants({
						variant: "default",
					})}
					href={"/dashboard"}
				>
					Dashboard
				</Link>
			) : (
				<>
					<Link href={"/log-in"}>Log In</Link>
					<Link
						className={buttonVariants({
							variant: "default",
						})}
						href={"/sign-up"}
					>
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
};

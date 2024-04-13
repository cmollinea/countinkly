"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Home, LayoutDashboard, MenuIcon } from "lucide-react";
import { SmNav } from "./sm-nav";

type Props = {
	isLogged: boolean;
};

export const HomeNav = ({ isLogged }: Props) => {
	return (
		<>
			<div className="flex items-center place-content-center space-x-4 font-semibold max-md:hidden">
				<HomeLinks isLogged={isLogged} />
			</div>
			<SmNav>
				<div className="flex flex-col w-fit space-y-4 mt-10 mx-4">
					<HomeLinks isLogged={isLogged} />
				</div>
			</SmNav>
		</>
	);
};

const HomeLinks = ({ isLogged }: { isLogged: boolean }) => {
	return (
		<>
			<Link
				className="max-md:text-2xl max-md:p-4 max-md:flex max-md:items-center max-md:space-x-2"
				href={"/"}
			>
				<Home size={28} className="md:hidden" />
				Home
			</Link>
			{isLogged ? (
				<Link
					className={buttonVariants({
						variant: "default",
						className:
							"max-md:bg-transparent max-md:text-2xl max-md:p-4 max-md:flex max-md:items-center max-md:space-x-2 max-md:hover:bg-inherit",
					})}
					href={"/dashboard"}
				>
					<LayoutDashboard size={28} />
					Dashboard
				</Link>
			) : (
				<>
					<Link className="max-md:text-2xl" href={"/log-in"}>
						Log In
					</Link>
					<Link
						className={buttonVariants({
							variant: "default",
							className: "max-md:text-2xl",
						})}
						href={"/sign-up"}
					>
						Sign Up
					</Link>
				</>
			)}
		</>
	);
};

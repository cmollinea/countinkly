"use client";

import { Link2Icon, LucidePieChart, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardNav = () => {
	return (
		<div className="md:flex md:flex-col place-content-start space-y-1 border-gray-500/20 px-10 max-w-[200px] w-full h-[calc(100vh-64px)] hidden py-16 border-r ">
			<DashboardLinks />
		</div>
	);
};

export const DashboardLinks = () => {
	const path = usePathname();

	return (
		<>
			<Link
				className={`flex max-md:text-2xl max-md:space-x-1 transition-all ease-in-out p-2 rounded-md ${
					path === "/dashboard"
						? " md:bg-primary/80 md:text-primary-foreground text-primary"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard"}
			>
				<LucidePieChart size={28} className="md:hidden" />
				<span>General</span>
			</Link>
			<Link
				className={`flex max-md:text-2xl max-md:space-x-1 transition-all ease-in-out p-2 rounded-md ${
					path.includes("/dashboard/links")
						? " bg-primary/80 text-primary-foreground"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard/links"}
			>
				<Link2Icon size={28} className="md:hidden" />
				<span>Your Links</span>
			</Link>
			<Link
				className={`flex max-md:text-2xl max-md:space-x-1 transition-all ease-in-out p-2 rounded-md ${
					path.includes("/dashboard/discover")
						? " bg-primary/80 text-primary-foreground"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard/discover"}
			>
				<SearchIcon size={28} className="md:hidden" />
				<span>Discover</span>
			</Link>
		</>
	);
};

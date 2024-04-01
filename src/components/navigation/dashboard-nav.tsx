"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardNav = () => {
	const path = usePathname();
	return (
		<div className="md:flex md:flex-col place-content-start space-y-1 border-gray-500/20 px-10 max-w-[200px] w-full h-[calc(100vh-64px)] hidden py-16 border-r ">
			<Link
				className={` transition-all ease-in-out p-2 rounded-md ${
					path === "/dashboard"
						? " bg-primary/80 text-primary-foreground"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard"}
			>
				General
			</Link>
			<Link
				className={` transition-all ease-in-out p-2 rounded-md ${
					path.includes("/dashboard/links")
						? " bg-primary/80 text-primary-foreground"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard/links"}
			>
				Your Links
			</Link>
			<Link
				className={` transition-all ease-in-out p-2 rounded-md ${
					path === "/dashboard/discover"
						? " bg-primary/80 text-primary-foreground"
						: "hover:opacity-80 hover:bg-muted/50"
				}`}
				href={"/dashboard/discover"}
			>
				Discover
			</Link>
		</div>
	);
};

"use client";

import { Link2Icon, LucidePieChart, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardNav = () => {
	return (
		<div className="md:flex md:flex-col place-content-start space-y-1 border-border/60 px-3 max-w-[200px] w-full h-[calc(100vh-64px)] hidden py-8 border-r">
			<p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
				Navigation
			</p>
			<DashboardLinks />
		</div>
	);
};

const navLinks = [
	{ href: "/dashboard", label: "General", Icon: LucidePieChart, exact: true },
	{ href: "/dashboard/links", label: "Your Links", Icon: Link2Icon, exact: false },
	{ href: "/dashboard/discover", label: "Discover", Icon: SearchIcon, exact: false },
];

export const DashboardLinks = () => {
	const path = usePathname();

	return (
		<>
			{navLinks.map(({ href, label, Icon, exact }) => {
				const isActive = exact ? path === href : path.includes(href);
				return (
					<Link
						key={href}
						className={`flex items-center gap-2.5 max-md:text-2xl max-md:gap-3 transition-all ease-in-out px-2 py-2 rounded-lg text-sm font-medium ${
							isActive
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:text-foreground hover:bg-muted/60"
						}`}
						href={href}
					>
						<Icon
							size={16}
							className={`shrink-0 max-md:hidden ${isActive ? "text-primary" : ""}`}
						/>
						<Icon size={28} className="md:hidden" />
						<span>{label}</span>
					</Link>
				);
			})}
		</>
	);
};

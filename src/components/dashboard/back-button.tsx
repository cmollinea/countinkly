"use client";

import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BackButton = () => {
	const pathame = usePathname();
	const pathArr = pathame.split("/");

	const backLink = pathArr.slice(0, pathArr.length - 1).join("/");

	return (
		<Link href={backLink} className={buttonVariants({ variant: "ghost" })}>
			<ChevronLeft size={16} />
			<span>Back</span>
		</Link>
	);
};

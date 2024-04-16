"use client";

import { useState } from "react";
import { NewLinkDialog } from "../new-link-dialog";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	shortedUrl: string;
	ownHeader?: {
		title: string;
		description: string;
	};
};

export const ShareButton = ({ className, shortedUrl, ownHeader }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Share2
				onClick={() => setIsOpen(true)}
				className={cn(
					"cursor-pointer hover:text-primary transition-colors ease-in-out",
					className,
				)}
				size={20}
			/>

			<NewLinkDialog
				ownHeader={ownHeader}
				open={isOpen}
				setOpen={setIsOpen}
				shortUrl={shortedUrl}
			/>
		</>
	);
};

"use client";

import { useState } from "react";
import { NewLinkDialog } from "../new-link-dialog";
import { Share2 } from "lucide-react";

type Props = {
	shortedUrl: string;
};

export const ShareButton = ({ shortedUrl }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Share2
				onClick={() => setIsOpen(true)}
				className=" cursor-pointer hover:text-primary transition-colors ease-in-out"
				size={20}
			/>

			<NewLinkDialog open={isOpen} setOpen={setIsOpen} shortUrl={shortedUrl} />
		</>
	);
};

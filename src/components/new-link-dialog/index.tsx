import { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { socialMedia } from "@/constants";
import { SocialLink } from "./social-link";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	shortUrl?: string;
};

export const NewLinkDialog = ({ open, setOpen, shortUrl }: Props) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-xs sm:max-w-sm max-md:px-6">
				<DialogHeader>
					<DialogTitle>Share your link</DialogTitle>
					<DialogDescription>
						Share each url on your social media
					</DialogDescription>
				</DialogHeader>
				{socialMedia.map((item) => {
					const url = `${process.env.NEXT_PUBLIC_DOMAIN}/${shortUrl}?source=${item.title}`;
					return <SocialLink url={url} Icon={item.icon} key={item.title} />;
				})}
			</DialogContent>
		</Dialog>
	);
};

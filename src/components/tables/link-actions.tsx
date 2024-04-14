import { ShareIcon, InfoIcon, TrashIcon, Share2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { NewLinkDialog } from "../new-link-dialog";
import { DeleteConfirmation } from "../delete-confirmation";

export const LinkAction = ({
	shortUrl,
	deleteAction,
	navigateAction,
}: {
	shortUrl: string;
	deleteAction: () => void;
	navigateAction: () => void;
}) => {
	const [openLinkInfo, setOpenLinkInfo] = useState(false);
	const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

	return (
		<>
			<Button
				onClick={() => setOpenLinkInfo(true)}
				className="h-7 w-7 hover:bg-primary hover:text-primary-foreground transition-all ease-linear"
				variant={"outline"}
				size={"icon"}
			>
				<Share2Icon size={16} />
			</Button>
			<Button
				className="h-7 w-7 hover:bg-primary hover:text-primary-foreground transition-all ease-linear"
				onClick={navigateAction}
				variant={"outline"}
				size={"icon"}
			>
				<InfoIcon size={16} />
			</Button>
			<Button
				onClick={() => setOpenConfirmationDelete(true)}
				className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground transition-all ease-linear bg-accent text-accent-foreground"
				variant={"outline"}
				size={"icon"}
			>
				<TrashIcon size={16} />
			</Button>
			<NewLinkDialog
				open={openLinkInfo}
				setOpen={setOpenLinkInfo}
				shortUrl={shortUrl}
			/>
			<DeleteConfirmation
				deleteAction={deleteAction}
				openConfirmDelete={openConfirmationDelete}
				setOpenConfirmDelete={setOpenConfirmationDelete}
			/>
		</>
	);
};

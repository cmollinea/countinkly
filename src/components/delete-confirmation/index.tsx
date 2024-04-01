"use client";

import { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

type Props = {
	openConfirmDelete: boolean;
	setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>;
};

export const DeleteConfirmation = ({
	openConfirmDelete,
	setOpenConfirmDelete,
}: Props) => {
	return (
		<Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
			<DialogContent className="max-w-xs sm:max-w-sm max-md:px-6">
				<DialogHeader>
					<DialogTitle className="flex items-center space-x-2">
						<span>
							<AlertTriangle className="text-red-500" />
						</span>
						<span>Are you sure?</span>
					</DialogTitle>
					<DialogDescription>
						This action can be undone, please confirm that you want to delete
						this link. You will lost all data related to it.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={() => setOpenConfirmDelete(false)} variant={"ghost"}>
						Cancel
					</Button>
					<Button variant={"destructive"}>Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

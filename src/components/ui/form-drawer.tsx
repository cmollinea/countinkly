"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

export const FormDrawer = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Add new Link</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] max-md:px-6">
					<DialogHeader>
						<DialogTitle>Add new Link</DialogTitle>
						<DialogDescription>
							Add a new link to track filling this form
						</DialogDescription>
					</DialogHeader>
					{children}{" "}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button className=" rounded-full fixed bottom-4 right-4 h-12 w-12 text-xl z-20">
					+
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-md:px-6">
				<DrawerHeader className="text-left">
					<DrawerTitle>Add new Link</DrawerTitle>
					<DrawerDescription>
						Add a new link to track filling this form
					</DrawerDescription>
				</DrawerHeader>
				{children}
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

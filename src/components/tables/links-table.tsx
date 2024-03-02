"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import {
	ClipboardCopyIcon,
	EyeOpenIcon,
	InfoCircledIcon,
	TrashIcon,
} from "@radix-ui/react-icons";
import { deleteLink } from "@/actions";
import { useLinkAction } from "@/hooks/use-link-actions";

type Props = {
	links: {
		id: string;
		displayName: string;
		url: string;
		clicks: number;
		shortedUrl: string;
	}[];
};

export function LinksTable({ links }: Props) {
	const {
		isNavigating,
		isDeleting,
		startDeleting,
		handleNavigation,
		handleDeleteLink,
	} = useLinkAction();

	return (
		<Table className="self-center">
			<TableCaption>
				{isNavigating
					? "Cargando Link"
					: isDeleting
					  ? "Deleting Link"
					  : "Your Links"}
			</TableCaption>
			<TableHeader className=" bg-primary">
				<TableRow>
					<TableHead>Display Name</TableHead>
					<TableHead>Url</TableHead>
					<TableHead>ShortedUrl</TableHead>
					<TableHead className="text-center">Actions</TableHead>
					<TableHead className="text-right">Clicks</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{links.map((link) => (
					<TableRow key={link.displayName} className="">
						<TableCell className="font-medium">{link.displayName}</TableCell>
						<TableCell>{link.url}</TableCell>
						<TableCell>{link.shortedUrl}</TableCell>
						<TableCell className="flex gap-1 items-center place-content-center">
							<Button
								className="h-7 w-7 hover:bg-primary hover:text-primary-foreground transition-all ease-linear"
								variant={"outline"}
								size={"icon"}
							>
								<ClipboardCopyIcon />
							</Button>
							<Button
								className="h-7 w-7 hover:bg-primary hover:text-primary-foreground transition-all ease-linear"
								onClick={() => handleNavigation(`/dashboard/links/${link.id}`)}
								variant={"outline"}
								size={"icon"}
							>
								<InfoCircledIcon />
							</Button>
							<Button
								onClick={async () => {
									startDeleting(async () => handleDeleteLink(link.id));
								}}
								className={`h-7 w-7 hover:bg-destructive hover:text-destructive-foreground transition-all ease-linear bg-accent text-accent-foreground ${
									isDeleting && "animate-pulse"
								}`}
								variant={"destructive"}
								size={"icon"}
							>
								<TrashIcon />
							</Button>
						</TableCell>
						<TableCell className="text-right">{link.clicks}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className="">
				<TableRow>
					<TableCell colSpan={4}>Total</TableCell>
					<TableCell className="text-right">
						{links.reduce((acummulator, clicks) => {
							return acummulator + clicks.clicks;
						}, 0)}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

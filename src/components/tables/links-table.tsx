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
import { useLinkAction } from "@/hooks/use-link-actions";
import { LinkAction } from "./link-actions";
import { LoadingIndicator } from "../navigation/loading-indicator";

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
		<>
			<Table className="self-center">
				<TableCaption>Already tracking {links.length} links</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Display Name</TableHead>
						<TableHead className="text-center">Actions</TableHead>

						<TableHead>Url</TableHead>
						<TableHead className="text-right">Clicks</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{links.map((link) => (
						<TableRow key={link.displayName} className="">
							<TableCell className="font-medium">{link.displayName}</TableCell>

							<TableCell className="flex gap-1 items-center place-content-center">
								<LinkAction
									shortUrl={link.shortedUrl}
									deleteAction={() =>
										startDeleting(() => handleDeleteLink(link.id))
									}
									navigateAction={() =>
										handleNavigation(`/dashboard/links/${link.id}`)
									}
								/>
							</TableCell>

							<TableCell>{link.url}</TableCell>

							<TableCell className="text-right">{link.clicks}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className="">
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">
							{links.reduce((acummulator, clicks) => {
								return acummulator + clicks.clicks;
							}, 0)}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
			<LoadingIndicator isLoading={isNavigating || isDeleting}>
				<small className="text-xs">
					{isNavigating
						? "Loading link info"
						: isDeleting
						  ? "Deleting Link"
						  : "Something is Happening"}
				</small>
			</LoadingIndicator>
		</>
	);
}

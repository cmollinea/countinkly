"use client";

import { Button } from "../ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
	totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
	const { currentPage, isPending, navigatingTo, handleNavigation } =
		usePagination();

	return (
		<div className="flex items-center justify-center gap-3 mt-2">
			<Button
				variant="outline"
				size="sm"
				className="rounded-lg"
				disabled={currentPage <= 1 || isPending}
				onClick={() => handleNavigation("prev")}
			>
				<ChevronLeft size={16} />
				<span className="sr-only">Previous</span>
				{isPending && navigatingTo === "prev" ? "..." : "Prev"}
			</Button>
			<span className="text-sm font-medium text-muted-foreground min-w-[6rem] text-center">
				Page {currentPage} of {totalPages}
			</span>
			<Button
				variant="outline"
				size="sm"
				className="rounded-lg"
				disabled={currentPage >= totalPages || isPending}
				onClick={() => handleNavigation("next")}
			>
				{isPending && navigatingTo === "next" ? "..." : "Next"}
				<ChevronRight size={16} />
				<span className="sr-only">Next</span>
			</Button>
		</div>
	);
};

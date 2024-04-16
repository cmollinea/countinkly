"use client";

import { Button } from "../ui/button";
import { usePagination } from "@/hooks/use-pagination";

type Props = {
	totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
	const { currentPage, isPending, navigatingTo, handleNavigation } =
		usePagination();

	return (
		<div className="flex items-center place-content-center mt-6 gap-2">
			<Button
				variant={"outline"}
				disabled={currentPage <= 1}
				onClick={() => handleNavigation("prev")}
			>
				{isPending && navigatingTo === "prev" ? "..." : "Prev"}
			</Button>
			<small>{currentPage}</small>
			<Button
				variant={"outline"}
				disabled={currentPage >= totalPages}
				onClick={() => handleNavigation("next")}
			>
				{isPending && navigatingTo === "next" ? "..." : "Next"}
			</Button>
		</div>
	);
};

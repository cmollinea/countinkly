'use client'
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export const usePagination = () => {
    const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const [isPending, startTransition] = useTransition();
	const [navigatingTo, setNavigatingTo] = useState<"" | "next" | "prev">("");

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const handleNavigation = (to: "next" | "prev") => {
		switch (to) {
			case "next":
				setNavigatingTo("next");
				startTransition(() =>
					router.push(
						`${pathname}?${createQueryString(
							"page",
							`${Number(searchParams.get("page")) + 1}`,
						)}`,
					),
				);
				break;

			case "prev":
				setNavigatingTo("prev");
				startTransition(() =>
					router.push(
						`${pathname}?${createQueryString(
							"page",
							`${Number(searchParams.get("page")) - 1}`,
						)}`,
					),
				);
				break;
		}
	};

    return {isPending, navigatingTo, handleNavigation, currentPage}
}
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { RangeKey } from "@/lib/date-range";
import { isRangeKey, DEFAULT_RANGE } from "@/lib/date-range";
import { cn } from "@/lib/utils";

const OPTIONS: { value: RangeKey; label: string }[] = [
	{ value: "24h", label: "Last 24h" },
	{ value: "week", label: "Last 7 days" },
	{ value: "month", label: "Last 30 days" },
];

type Props = {
	className?: string;
};

export function RangeFilter({ className }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const current = searchParams.get("range");
	const value = isRangeKey(current) ? current : DEFAULT_RANGE;

	const setRange = (range: RangeKey) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("range", range);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-1 rounded-lg border border-input bg-muted/30 p-1",
				className,
			)}
			role="group"
			aria-label="Time range filter"
		>
			{OPTIONS.map((opt) => (
				<button
					key={opt.value}
					type="button"
					onClick={() => setRange(opt.value)}
					className={cn(
						"rounded-md px-3 py-2 text-sm font-medium transition-colors",
						value === opt.value
							? "bg-primary text-primary-foreground shadow"
							: "hover:bg-muted hover:text-foreground",
					)}
				>
					{opt.label}
				</button>
			))}
		</div>
	);
}

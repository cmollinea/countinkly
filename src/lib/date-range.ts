import { subHours, subDays } from "date-fns";

export type DateRange = { from: Date; to: Date };

export type RangeKey = "24h" | "week" | "month";

const RANGE_KEYS: RangeKey[] = ["24h", "week", "month"];

export function isRangeKey(value: string | null | undefined): value is RangeKey {
	return value != null && RANGE_KEYS.includes(value as RangeKey);
}

export function getDateRange(range: RangeKey): DateRange {
	const to = new Date();
	let from: Date;
	switch (range) {
		case "24h":
			from = subHours(to, 24);
			break;
		case "week":
			from = subDays(to, 7);
			break;
		case "month":
			from = subDays(to, 30);
			break;
		default:
			from = subDays(to, 7);
	}
	return { from, to };
}

export const DEFAULT_RANGE: RangeKey = "week";

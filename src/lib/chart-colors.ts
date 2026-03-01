/**
 * Shared palette for charts (bar, pie, area). Distinct hues for accessibility.
 */
const CHART_PALETTE = [
	"hsl(236 79% 62%)",   // primary blue
	"hsl(160 84% 39%)",   // green
	"hsl(24 95% 53%)",    // orange
	"hsl(280 67% 58%)",   // purple
	"hsl(346 77% 50%)",   // rose
	"hsl(199 89% 48%)",   // cyan
	"hsl(43 96% 56%)",    // amber
	"hsl(262 83% 58%)",   // violet
	"hsl(142 71% 45%)",   // emerald
	"hsl(0 72% 51%)",     // red
	"hsl(217 91% 60%)",   // blue
	"hsl(47 92% 53%)",    // yellow
] as const;

export function getChartColor(index: number): string {
	return CHART_PALETTE[Math.abs(index) % CHART_PALETTE.length];
}

/**
 * Stable color from a string (e.g. linkId) so the same link always gets the same color.
 */
export function getChartColorFromString(str: string): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return CHART_PALETTE[Math.abs(hash) % CHART_PALETTE.length];
}

"use client";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	ChartCard,
	ChartCardContent,
	ChartCardHeader,
	ChartCardIcon,
	ChartCardTitle,
} from "./chart-card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { MousePointerClick } from "lucide-react";
import { useMemo } from "react";

type Props = { data: { link: string; count: number }[] };

const CHART_KEYS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
	"var(--chart-6)",
	"var(--chart-7)",
	"var(--chart-8)",
	"var(--chart-9)",
	"var(--chart-10)",
	"var(--chart-11)",
	"var(--chart-12)",
] as const;

export const LinksBarChart = ({ data }: Props) => {
	const { chartData, chartConfig } = useMemo(() => {
		const config: ChartConfig = {
			count: { label: "Visits" },
		};
		const mapped = data.map((item, i) => {
			const key = `item${i}`;
			(config as Record<string, { label: string; color: string }>)[key] = {
				label: item.link,
				color: CHART_KEYS[i % CHART_KEYS.length],
			};
			return {
				...item,
				fillKey: key,
				fill: `var(--color-${key})`,
			};
		});
		return { chartData: mapped, chartConfig: config };
	}, [data]);

	return (
		<ChartCard>
			<ChartCardHeader>
				<ChartCardTitle>Visits per link</ChartCardTitle>
				<ChartCardIcon>
					<MousePointerClick />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent>
				<ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
					<BarChart data={chartData} accessibilityLayer margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="link"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="count" nameKey="fillKey" fill="fill" radius={[4, 4, 0, 0]} strokeWidth={0} />
					</BarChart>
				</ChartContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

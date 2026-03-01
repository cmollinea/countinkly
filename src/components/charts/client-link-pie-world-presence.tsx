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
import { Globe } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useMemo } from "react";

type Props = {
	data: { origin: string; count: number }[];
	name: string;
	className?: string;
};

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

export const ClientLinkPieWorldPresence = ({
	data,
	name,
	className,
}: Props) => {
	const { chartData, chartConfig } = useMemo(() => {
		const config: ChartConfig = { count: { label: "Clicks" } };
		const mapped = data.map((item, i) => {
			const key = `slice${i}`;
			(config as Record<string, { label: string; color: string }>)[key] = {
				label: item.origin,
				color: CHART_KEYS[i % CHART_KEYS.length],
			};
			return { ...item, fillKey: key, fill: `var(--color-${key})` };
		});
		return { chartData: mapped, chartConfig: config };
	}, [data]);

	const total = useMemo(() => chartData.reduce((acc, d) => acc + d.count, 0), [chartData]);

	if (chartData.length === 0) {
		return (
			<ChartCard className={className}>
				<ChartCardHeader>
					<ChartCardTitle>{name} World Presence</ChartCardTitle>
					<ChartCardIcon><Globe /></ChartCardIcon>
				</ChartCardHeader>
				<ChartCardContent className={className}>
					<p className="text-muted-foreground text-sm">No clicks earned</p>
				</ChartCardContent>
			</ChartCard>
		);
	}

	return (
		<ChartCard className={className}>
			<ChartCardHeader>
				<ChartCardTitle>{name} World Presence</ChartCardTitle>
				<ChartCardIcon><Globe /></ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent className={className}>
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] w-full"
				>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={chartData}
							dataKey="count"
							nameKey="fillKey"
							innerRadius={60}
							strokeWidth={2}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
													{total.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
													Clicks
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

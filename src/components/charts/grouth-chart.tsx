"use client";

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useId } from "react";
import { TrendingUpIcon } from "lucide-react";

type Props = {
	data: { date: string; count: number }[];
	className?: string;
};

const chartConfig = {
	date: { label: "Date" },
	count: {
		label: "Visits",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export const GrouthChart = ({ data, className }: Props) => {
	const gradientId = useId().replace(/:/g, "");

	return (
		<ChartCard className={className ?? ""}>
			<ChartCardHeader>
				<ChartCardTitle>Account Grouth</ChartCardTitle>
				<ChartCardIcon>
					<TrendingUpIcon />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent className="max-w-screen-2xl lg:max-w-full w-full">
				<ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
					<AreaChart data={data} accessibilityLayer>
						<defs>
							<linearGradient id={`fillCount-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-count)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-count)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								if (typeof value !== "string") return value;
								const parts = value.split("-");
								if (parts.length >= 3)
									return `${parts[0]}/${Number(parts[1])}/${parts[2]?.slice(-2)}`;
								return value;
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Area
							dataKey="count"
							type="natural"
							fill={`url(#fillCount-${gradientId})`}
							stroke="var(--color-count)"
							strokeWidth={2}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

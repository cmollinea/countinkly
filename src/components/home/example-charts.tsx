"use client";

import { useEffect, useState } from "react";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const areaData = [
	{ name: "Day 0", Visits: 20 },
	{ name: "Day 1", Visits: 40 },
	{ name: "Day 2", Visits: 80 },
	{ name: "Day 3", Visits: 160 },
	{ name: "Day 4", Visits: 320 },
	{ name: "Day 5", Visits: 640 },
	{ name: "Day 6", Visits: 1280 },
];

const barDataRaw = [
	{ name: "Your Link 0", Visits: 20 },
	{ name: "Your Link 1", Visits: 40 },
	{ name: "Your Link 2", Visits: 80 },
	{ name: "Your Link 3", Visits: 20 },
	{ name: "Your Link 4", Visits: 50 },
	{ name: "Your Link 5", Visits: 86 },
	{ name: "Your Link 6", Visits: 45 },
];
const barData = barDataRaw.map((d, i) => ({
	...d,
	fillKey: `bar${i}`,
	fill: `var(--color-bar${i})`,
}));

const areaChartConfig = {
	name: { label: "Day" },
	Visits: {
		label: "Visits",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

const barChartConfig = {
	Visits: { label: "Visits" },
	bar0: { label: "Your Link 0", color: "var(--chart-1)" },
	bar1: { label: "Your Link 1", color: "var(--chart-2)" },
	bar2: { label: "Your Link 2", color: "var(--chart-3)" },
	bar3: { label: "Your Link 3", color: "var(--chart-4)" },
	bar4: { label: "Your Link 4", color: "var(--chart-5)" },
	bar5: { label: "Your Link 5", color: "var(--chart-6)" },
	bar6: { label: "Your Link 6", color: "var(--chart-7)" },
} satisfies ChartConfig;

export const ExampleCharts = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
	}, []);

	return (
		<section className="flex w-full items-start place-content-center max-lg:items-center max-lg:flex-col lg:space-x-20 px-4">
			<div className="max-w-screen-2xl md:max-w-md">
				<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
					<span className="text-primary">Countinkly&apos;s</span> Display of
					Analytics through{" "}
					<span className="py-2 bg-gradient-to-r from-primary to-primary bg-[length:100%_5px] bg-bottom bg-no-repeat">
						Striking Graphics
					</span>
				</h2>
			</div>
			{show ? (
				<div className="flex flex-col items-center place-content-center space-y-4 max-w-screen-2xl md:max-w-md w-full max-lg:mt-10">
					<Card className="w-full max-w-screen-2xl md:max-w-md rounded-2xl shadow-sm border-border/50">
						<CardHeader>
							<CardTitle className="font-semibold text-xl font-heading">
								Your Total <span className="text-primary">Grouth</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[180px] md:h-[200px] max-w-screen-2xl md:max-w-md w-full">
							<ChartContainer config={areaChartConfig} className="aspect-auto h-full w-full">
								<AreaChart data={areaData} accessibilityLayer>
									<defs>
										<linearGradient id="exampleAreaFill" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-Visits)" stopOpacity={0.8} />
											<stop offset="95%" stopColor="var(--color-Visits)" stopOpacity={0.1} />
										</linearGradient>
									</defs>
									<CartesianGrid vertical={false} />
									<XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} hide />
									<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
									<Area
										type="natural"
										dataKey="Visits"
										fill="url(#exampleAreaFill)"
										stroke="var(--color-Visits)"
										strokeWidth={2}
									/>
									<ChartLegend content={<ChartLegendContent />} />
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card className="w-full max-w-screen-2xl md:max-w-md rounded-2xl shadow-sm border-border/50">
						<CardHeader>
							<CardTitle className="font-semibold text-xl font-heading">
								Daily <span className="text-primary">Visits</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[180px] md:h-[200px] max-w-screen-2xl md:max-w-md w-full">
							<ChartContainer config={barChartConfig} className="aspect-auto h-full w-full">
								<BarChart data={barData} accessibilityLayer margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
									<CartesianGrid vertical={false} />
									<XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} hide />
									<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="Visits"
										nameKey="fillKey"
										fill="fill"
										radius={[4, 4, 0, 0]}
										strokeWidth={0}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			) : (
				<div className="flex flex-col items-center space-y-4 max-w-screen-2xl md:max-w-md w-full max-lg:mt-10">
					<div className="max-w-screen-2xl md:max-w-md w-full">
						<Skeleton className="h-[240px] md:h-[280px] w-full" />
					</div>
					<div className="max-w-screen-2xl md:max-w-md w-full">
						<Skeleton className="h-[240px] md:h-[280px] w-full" />
					</div>
				</div>
			)}
		</section>
	);
};

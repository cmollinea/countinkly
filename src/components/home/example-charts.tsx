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
import { TrendingUpIcon } from "lucide-react";

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
		<section className="w-full max-w-6xl mx-auto px-4">
			{/* Section header */}
			<div className="text-center mb-14">
				<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
					<TrendingUpIcon size={13} className="text-primary" />
					<span className="text-sm font-semibold text-primary">Live Preview</span>
				</div>
				<h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
					Beautiful analytics,{" "}
					<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
						out of the box
					</span>
				</h2>
				<p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
					Stunning, interactive charts that turn your raw click data into clear,
					actionable stories.
				</p>
			</div>

			{/* Charts layout */}
			<div className="flex w-full items-start place-content-center max-lg:items-center max-lg:flex-col lg:space-x-8">
				{/* Left text */}
				<div className="max-w-xs flex-shrink-0 max-lg:mb-8 max-lg:text-center">
					<h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
						<span className="text-primary">Countinkly&apos;s</span> display of
						analytics through{" "}
						<span className="relative">
							<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
								striking graphics
							</span>
						</span>
					</h3>
					<p className="mt-4 text-sm text-muted-foreground leading-relaxed">
						Every link tells a story. Our charts make sure you can read it clearly —
						from total growth curves to per-link daily breakdowns.
					</p>
					<div className="mt-6 flex flex-col gap-3">
						{[
							{ label: "Area Charts", desc: "Track growth over time" },
							{ label: "Bar Charts", desc: "Compare link performance" },
							{ label: "More coming", desc: "Geo maps, funnels..." },
						].map((item) => (
							<div key={item.label} className="flex items-start gap-3 text-left">
								<div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
								<div>
									<p className="text-sm font-semibold text-foreground">{item.label}</p>
									<p className="text-xs text-muted-foreground">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Charts */}
				{show ? (
					<div className="flex flex-col items-center space-y-4 max-w-screen-2xl md:max-w-md w-full">
						<Card className="w-full rounded-2xl shadow-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
							<CardHeader>
								<CardTitle className="font-semibold text-xl font-heading flex items-center gap-2">
									Your Total{" "}
									<span className="text-primary">Growth</span>
									<TrendingUpIcon size={16} className="text-emerald-500" />
								</CardTitle>
							</CardHeader>
							<CardContent className="h-[180px] md:h-[200px] w-full">
								<ChartContainer
									config={areaChartConfig}
									className="aspect-auto h-full w-full"
								>
									<AreaChart data={areaData} accessibilityLayer>
										<defs>
											<linearGradient
												id="exampleAreaFill"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="var(--color-Visits)"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-Visits)"
													stopOpacity={0.05}
												/>
											</linearGradient>
										</defs>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="name"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											hide
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent indicator="dot" />}
										/>
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
						<Card className="w-full rounded-2xl shadow-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
							<CardHeader>
								<CardTitle className="font-semibold text-xl font-heading">
									Daily <span className="text-primary">Visits</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="h-[180px] md:h-[200px] w-full">
								<ChartContainer
									config={barChartConfig}
									className="aspect-auto h-full w-full"
								>
									<BarChart
										data={barData}
										accessibilityLayer
										margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="name"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											hide
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
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
					<div className="flex flex-col items-center space-y-4 max-w-screen-2xl md:max-w-md w-full">
						<Skeleton className="h-[240px] md:h-[280px] w-full rounded-2xl" />
						<Skeleton className="h-[240px] md:h-[280px] w-full rounded-2xl" />
					</div>
				)}
			</div>
		</section>
	);
};

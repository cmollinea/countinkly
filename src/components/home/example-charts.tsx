"use client";
import { useEffect, useState } from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getChartColor } from "@/lib/chart-colors";

const data = [
	{
		name: "Day 0",
		Visits: 20,
	},
	{
		name: "Day 1",
		Visits: 40,
	},
	{
		name: "Day 2",
		Visits: 80,
	},
	{
		name: "Day 3",
		Visits: 160,
	},
	{
		name: "Day 4",
		Visits: 320,
	},
	{
		name: "Day 5",
		Visits: 640,
	},
	{
		name: "Day 6",
		Visits: 1280,
	},
];

const barData = [
	{
		name: "Your Link 0",
		Visits: 20,
	},
	{
		name: "Your Link 1",
		Visits: 40,
	},
	{
		name: "Your Link 2",
		Visits: 80,
	},
	{
		name: "Your Link 3",
		Visits: 20,
	},
	{
		name: "Your Link 4",
		Visits: 50,
	},
	{
		name: "Your Link 5",
		Visits: 86,
	},
	{
		name: "Your Link 6",
		Visits: 45,
	},
];

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
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<AreaChart data={data}>
									<defs>
										<linearGradient id="exampleAreaFill" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor={getChartColor(0)} stopOpacity={0.4} />
											<stop offset="100%" stopColor={getChartColor(0)} stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis dataKey="name" className="text-xs" hide />
									<YAxis hide />
									<Tooltip wrapperClassName="text-black" />
									<Legend />
									<Area
										type="monotone"
										dataKey="Visits"
										stroke={getChartColor(0)}
										strokeWidth={2}
										fill="url(#exampleAreaFill)"
										activeDot={{ r: 6, fill: getChartColor(0) }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className="w-full max-w-screen-2xl md:max-w-md rounded-2xl shadow-sm border-border/50">
						<CardHeader>
							<CardTitle className="font-semibold text-xl font-heading">
								Daily <span className="text-primary">Visits</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[180px] md:h-[200px] max-w-screen-2xl md:max-w-md w-full">
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<BarChart data={barData}>
									<XAxis dataKey="name" className="text-xs" hide />
									<YAxis hide />
									<Tooltip wrapperClassName="text-black" />
									<Legend />
									<Bar dataKey="Visits">
										{barData.map((_, i) => (
											<Cell key={i} fill={getChartColor(i)} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>
			) : (
				<div className="flex flex-col items-center space-y-4 max-w-screen-2xl md:max-w-md w-full max-lg:mt-10">
					<div className=" max-w-screen-2xl md:max-w-md w-full">
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

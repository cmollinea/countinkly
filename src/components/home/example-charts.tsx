"use client";
import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
		<section className="flex w-full items-start place-content-center max-lg:items-center max-lg:flex-col lg:space-x-20">
			<div className="max-w-md">
				<h3 className="text-4xl font-extrabold">
					<span className="text-primary">Countinkly&apos;s</span> Display of
					Analytics through{" "}
					<span className="py-2 bg-gradient-to-r from-primary to-primary bg-[length:100%_5px] bg-bottom bg-no-repeat">
						Striking Graphics
					</span>
				</h3>
			</div>
			{show ? (
				<div className="flex flex-col items-center place-content-center space-y-4 max-w-md w-full max-lg:mt-10">
					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle className="font-semibold text-xl">
								Your Total <span className="text-primary">Grouth</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[180px] md:h-[200px] max-w-md w-full">
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<LineChart data={data}>
									<XAxis dataKey="name" className="text-xs" hide />
									<Tooltip wrapperClassName=" text-black" /> <Legend />
									<Line
										strokeWidth={2}
										type="linear"
										dataKey="Visits"
										stroke="#525CEB"
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle className="font-semibold text-xl">
								Daily <span className="text-primary">Visits</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[180px] md:h-[200px] max-w-md w-full">
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<BarChart data={barData}>
									<XAxis dataKey="name" className="text-xs" hide />
									<YAxis hide />
									<Tooltip wrapperClassName=" text-black" />
									<Legend />
									<Bar dataKey="Visits" fill="#525CEB" />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>
			) : (
				<div className="flex flex-col items-center space-y-4 max-w-md w-full max-lg:mt-10">
					<div className=" max-w-md w-full">
						<Skeleton className="h-[240px] md:h-[280px] w-full" />
					</div>
					<div className="max-w-md w-full">
						<Skeleton className="h-[240px] md:h-[280px] w-full" />
					</div>
				</div>
			)}
		</section>
	);
};

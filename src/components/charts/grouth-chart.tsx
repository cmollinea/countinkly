"use client";

import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";
import { TrendingUpIcon } from "lucide-react";
import {
	ChartCard,
	ChartCardHeader,
	ChartCardContent,
	ChartCardTitle,
	ChartCardIcon,
} from "./chart-card";
import { useTheme } from "next-themes";

type Props = {
	data: { date: string; count: number }[];
	className?: string;
};

export const GrouthChart = ({ data, className }: Props) => {
	const { theme } = useTheme();
	return (
		<ChartCard className={className ? className : ""}>
			<ChartCardHeader>
				<ChartCardTitle>Account Grouth</ChartCardTitle>
				<ChartCardIcon>
					<TrendingUpIcon />
				</ChartCardIcon>{" "}
			</ChartCardHeader>
			<ChartCardContent className=" max-w-screen-2xl">
				<ResponsiveContainer height={"100%"} width={"100%"}>
					<LineChart data={data}>
						<XAxis label={"Clicks"} dataKey="date" className="text-xs" hide />
						<Tooltip wrapperClassName=" text-black" /> <Legend />
						<Line
							strokeWidth={2}
							type="monotone"
							dataKey="count"
							stroke="#525CEB"
							name="Visits"
							activeDot={{
								r: 8,
								style: { fill: "var(--theme-primary)" },
							}}
							style={
								{
									stroke: "var(--theme-primary)",
									"--theme-primary": "hsl(236 79% 62%)",
								} as React.CSSProperties
							}
						/>
					</LineChart>
				</ResponsiveContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

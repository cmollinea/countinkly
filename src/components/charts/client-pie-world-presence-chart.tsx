"use client";

import { Globe } from "lucide-react";
import {
	ChartCard,
	ChartCardContent,
	ChartCardHeader,
	ChartCardIcon,
	ChartCardTitle,
} from "./chart-card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getChartColor } from "@/lib/chart-colors";

type Props = {
	data: {
		[propName: string]: string | number;
	}[];
};

export const ClientPieWorldPresenceChart = ({ data }: Props) => {
	const keys = data[0] ? (Object.entries(data[0]) as [string, string | number][]) : undefined;

	return (
		<ChartCard>
			<ChartCardHeader>
				<ChartCardTitle>World Presence</ChartCardTitle>
				<ChartCardIcon>
					<Globe />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent>
				{keys !== undefined ? (
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<PieChart width={200} height={200}>
							<Pie
								nameKey={keys[0][0]}
								dataKey={keys[1][0]}
								data={data}
								innerRadius={50}
								outerRadius={80}
								paddingAngle={5}
								stroke="transparent"
							>
								{data.map((_, i) => (
									<Cell key={i} fill={getChartColor(i)} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				) : (
					<p>No Clicks Earned</p>
				)}
			</ChartCardContent>
		</ChartCard>
	);
};

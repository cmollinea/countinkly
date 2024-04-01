"use client";

import { Globe } from "lucide-react";
import {
	ChartCard,
	ChartCardContent,
	ChartCardHeader,
	ChartCardIcon,
	ChartCardTitle,
} from "./chart-card";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
	data: {
		[propName: string]: string | number;
	}[];
};

export const ClientPieWorldPresenceChart = ({ data }: Props) => {
	const keys = Object.entries(data[0]);

	return (
		<ChartCard>
			<ChartCardHeader>
				<ChartCardTitle>World Presence</ChartCardTitle>
				<ChartCardIcon>
					<Globe />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart width={200} height={200}>
						<Pie
							nameKey={keys[0][0]}
							dataKey={keys[1][0]}
							data={data}
							innerRadius={50}
							outerRadius={80}
							fill="hsl(236 79% 62%)"
							paddingAngle={2}
							stroke="hsl(236 79% 62%)"
						/>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

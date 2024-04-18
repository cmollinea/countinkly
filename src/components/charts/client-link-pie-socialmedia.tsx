"use client";
import { Network } from "lucide-react";
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
	name: string;
	className?: string;
};

export const ClientLinkPieSocialMediaChart = ({
	data,
	name,
	className,
}: Props) => {
	let keys: [string, string | number][] | undefined;

	if (data[0]) {
		keys = Object.entries(data[0]);
	}
	return (
		<ChartCard className={className}>
			<ChartCardHeader>
				<ChartCardTitle>{name} in Social Media</ChartCardTitle>
				<ChartCardIcon>
					<Network />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent className={className}>
				{keys !== undefined ? (
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<PieChart width={200} height={200}>
							<Pie
								nameKey={keys[0][0]}
								dataKey={keys[1][0]}
								data={data}
								innerRadius={50}
								outerRadius={80}
								fill="hsl(236 79% 62%)"
								paddingAngle={5}
								stroke="hsl(236 79% 62%)"
							/>
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

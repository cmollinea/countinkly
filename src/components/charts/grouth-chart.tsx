"use client";

import {
	Area,
	AreaChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { TrendingUpIcon } from "lucide-react";
import {
	ChartCard,
	ChartCardContent,
	ChartCardHeader,
	ChartCardIcon,
	ChartCardTitle,
} from "./chart-card";
import { getChartColor } from "@/lib/chart-colors";

type Props = {
	data: { date: string; count: number }[];
	className?: string;
};

const AREA_COLOR = getChartColor(0);

export const GrouthChart = ({ data, className }: Props) => {
	return (
		<ChartCard className={className ? className : ""}>
			<ChartCardHeader>
				<ChartCardTitle>Account Grouth</ChartCardTitle>
				<ChartCardIcon>
					<TrendingUpIcon />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent className="max-w-screen-2xl lg:max-w-full w-full">
				<ResponsiveContainer height={"100%"} width={"100%"}>
					<AreaChart data={data}>
						<defs>
							<linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor={AREA_COLOR} stopOpacity={0.4} />
								<stop offset="100%" stopColor={AREA_COLOR} stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="date" className="text-xs" hide />
						<YAxis hide />
						<Tooltip wrapperClassName="text-black" />
						<Legend />
						<Area
							type="monotone"
							dataKey="count"
							name="Visits"
							stroke={AREA_COLOR}
							strokeWidth={2}
							fill="url(#growthFill)"
							activeDot={{ r: 6, fill: AREA_COLOR }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

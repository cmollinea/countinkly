"use client";

import {
	BarChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts";
import { MousePointerClick } from "lucide-react";
import {
	ChartCard,
	ChartCardContent,
	ChartCardHeader,
	ChartCardIcon,
	ChartCardTitle,
} from "./chart-card";

type Props = { data: { link: string; count: number }[] };

export const LinksBarChart = ({ data }: Props) => {
	return (
		<ChartCard>
			<ChartCardHeader>
				<ChartCardTitle>Visits per link</ChartCardTitle>
				<ChartCardIcon>
					<MousePointerClick />
				</ChartCardIcon>
			</ChartCardHeader>
			<ChartCardContent>
				<ResponsiveContainer height={"100%"} width={"100%"}>
					<BarChart barSize={50} data={data}>
						<XAxis dataKey="link" className="text-xs" hide />
						<YAxis hide />
						<Tooltip wrapperClassName=" text-black" />
						<Legend />
						<Bar dataKey="count" name={"Visits"} fill="#525CEB" />
					</BarChart>
				</ResponsiveContainer>
			</ChartCardContent>
		</ChartCard>
	);
};

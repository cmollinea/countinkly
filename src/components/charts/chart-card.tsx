"use client";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const ChartCard = ({ children, className }: Props) => {
	return (
		<Card className={cn("w-full lg:max-w-md h-full bg-muted/10", className)}>
			{children}
		</Card>
	);
};

export const ChartCardHeader = ({ children }: Props) => {
	return (
		<CardHeader className="flex-row justify-between items-center">
			{children}
		</CardHeader>
	);
};

export const ChartCardTitle = ({ children }: Props) => {
	return <CardTitle className="font-semibold text-xl">{children}</CardTitle>;
};

export const ChartCardIcon = ({ children }: Props) => {
	return (
		<span className="bg-primary/20 dark:stext-primary-foreground/80 backdrop-blur-xl p-4 rounded-full">
			{children}
		</span>
	);
};

export const ChartCardContent = ({ children, className }: Props) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);

	return (
		<CardContent className={cn("h-[200px] lg:max-w-md", className)}>
			{ready ? (
				children
			) : (
				<div className={cn("lg:max-w-md w-full", className)}>
					<Skeleton className="h-[190px] w-full" />
				</div>
			)}
		</CardContent>
	);
};

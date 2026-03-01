"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Unlock, ViewIcon } from "lucide-react";

const cards = [
	{
		title: "Unlock the power of data",
		content: `Countinkly simplifies your analytics experience by allowing you to effortlessly track every aspect of your links' performance. Gain valuable insights and make informed decisions based on real data.`,
		icon: Unlock,
	},
	{
		title: "Keep your Metadata",
		content:
			"Your page metadata is safe with us! Easily shorten your links while preserving all important information, ensuring that your brand identity remains intact.",
		icon: ShieldCheck,
	},
	{
		title: "Visualize your success",
		content:
			"Watch your growth unfold with intuitive graphics that display your progress over time. Easily identify trends and patterns to optimize your link tracking strategy for maximum impact.",
		icon: ViewIcon,
	},
];

export const FeaturesCard = () => {
	return (
		<section className="grid lg:grid-cols-3 gap-8 lg:gap-12 w-full place-content-center px-4 max-w-6xl mx-auto">
			<div className="bg-primary w-full flex place-content-center py-12 rounded-2xl shadow-sm lg:col-span-3">
				<h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground tracking-tight">
					Track, Analyze, Grow
				</h2>
			</div>
			{cards.map((card) => (
				<Card
					key={card.title}
					className="rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
				>
					<CardHeader>
						<CardTitle className="font-heading flex items-center gap-3 text-xl font-semibold">
							<card.icon size={28} className="text-primary shrink-0" />
							{card.title}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground leading-relaxed">
							{card.content}
						</p>
					</CardContent>
				</Card>
			))}
		</section>
	);
};

"use client";

import { ShieldCheck, Unlock, Users2, ViewIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<section className="grid lg:grid-cols-3 max-w-fit gap-y-4 lg:gap-y-24 w-full place-content-center lg:space-x-4 px-4">
			<div className="bg-primary w-full  flex place-content-center py-10 rounded-xl shadow-md lg:col-span-3 mx-auto">
				<h3 className="font-bold text-3xl md:text-4xl text-primary-foreground">
					Track, Analyze, Grow
				</h3>
			</div>
			{cards.map((card) => (
				<Card key={card.title} className="lg:max-w-sm relative overflow-hidden">
					<CardHeader className="">
						<CardTitle className="flex items-center space-x-2 pl-5 pb-2 ">
							{" "}
							<card.icon size={32} /> <p>{card.title}</p>
						</CardTitle>
						<CardContent className="pb-0">
							<p>{card.content}</p>
						</CardContent>
					</CardHeader>
					<span className="h-28 w-28 bg-primary/50 rounded-full absolute -top-4 -left-4 blur-3xl dark:block hidden" />
				</Card>
			))}
		</section>
	);
};

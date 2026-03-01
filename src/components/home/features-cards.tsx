"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ShieldCheck,
	Unlock,
	BarChart2,
	ZapIcon,
	GlobeIcon,
	CodeIcon,
} from "lucide-react";

const cards = [
	{
		title: "Unlock the power of data",
		content:
			"Track every click, referrer, and device. Get the full picture of how your links perform across every channel — in real time.",
		icon: Unlock,
		color: "text-blue-500",
		bg: "bg-blue-500/10",
		border: "border-blue-500/20",
	},
	{
		title: "Keep your Metadata",
		content:
			"Your page metadata is preserved automatically. Shorten any URL while keeping your brand identity, OG tags, and page title intact.",
		icon: ShieldCheck,
		color: "text-emerald-500",
		bg: "bg-emerald-500/10",
		border: "border-emerald-500/20",
	},
	{
		title: "Visualize your success",
		content:
			"Beautiful, interactive charts that make your data come alive. Spot trends, compare performance, and share insights with your team.",
		icon: BarChart2,
		color: "text-violet-500",
		bg: "bg-violet-500/10",
		border: "border-violet-500/20",
	},
	{
		title: "Blazing fast redirects",
		content:
			"Built on edge infrastructure for sub-millisecond redirects. Your audience never waits, and your data is never lost.",
		icon: ZapIcon,
		color: "text-yellow-500",
		bg: "bg-yellow-500/10",
		border: "border-yellow-500/20",
	},
	{
		title: "Global reach",
		content:
			"Analyze clicks from any country in the world. Understand where your audience lives and tailor your campaigns accordingly.",
		icon: GlobeIcon,
		color: "text-cyan-500",
		bg: "bg-cyan-500/10",
		border: "border-cyan-500/20",
	},
	{
		title: "Open Source",
		content:
			"Fully open source under MIT license. Self-host it, fork it, extend it. Your data stays yours — always.",
		icon: CodeIcon,
		color: "text-rose-500",
		bg: "bg-rose-500/10",
		border: "border-rose-500/20",
	},
];

export const FeaturesCard = () => {
	return (
		<section className="w-full max-w-6xl mx-auto px-4">
			{/* Section header */}
			<div className="text-center mb-14">
				<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
					<span className="text-sm font-semibold text-primary">Features</span>
				</div>
				<h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
					Track, Analyze,{" "}
					<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
						Grow
					</span>
				</h2>
				<p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
					Everything you need to understand your audience and optimize your links —
					no complicated setup required.
				</p>
			</div>

			{/* Cards grid */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{cards.map((card) => (
					<Card
						key={card.title}
						className="group rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
					>
						<CardHeader className="pb-3">
							<div
								className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.bg} border ${card.border} mb-3`}
							>
								<card.icon size={20} className={card.color} />
							</div>
							<CardTitle className="font-heading text-lg font-semibold text-foreground">
								{card.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed text-sm">
								{card.content}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

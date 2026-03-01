"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	ArrowRightIcon,
	GithubIcon,
	SparklesIcon,
	ZapIcon,
	BarChart2Icon,
	ShieldCheckIcon,
} from "lucide-react";

const stats = [
	{ label: "Open Source", value: "100%", icon: GithubIcon },
	{ label: "Analytics", value: "Real-time", icon: BarChart2Icon },
	{ label: "Privacy First", value: "Always", icon: ShieldCheckIcon },
];

export const Hero = () => {
	return (
		<section className="relative overflow-hidden w-full">
			{/* Background glow orbs */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute top-1/3 left-1/5 w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[90px] pointer-events-none" />
			<div className="absolute top-1/3 right-1/5 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[90px] pointer-events-none" />

			{/* Floating tech badges */}
			<div className="absolute top-24 left-8 md:left-20 hidden md:flex items-center gap-2 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-lg backdrop-blur-sm text-xs font-medium text-muted-foreground animate-pulse">
				<div className="w-2 h-2 rounded-full bg-green-400" />
				<span>99.9% Uptime</span>
			</div>
			<div className="absolute top-36 right-8 md:right-20 hidden md:flex items-center gap-2 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-lg backdrop-blur-sm text-xs font-medium text-muted-foreground">
				<ZapIcon size={12} className="text-yellow-400" />
				<span>Instant tracking</span>
			</div>

			<div className="mx-auto max-w-screen-xl px-4 py-28 flex items-center min-h-[calc(100vh-64px)]">
				<div className="mx-auto max-w-3xl text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-8">
						<SparklesIcon size={13} className="text-primary" />
						<span className="text-sm font-semibold text-primary tracking-wide">
							Open Source Link Analytics
						</span>
					</div>

					{/* Title */}
					<h1 className="font-heading text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl py-2 leading-[1.1]">
						<span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
							Track Every Click.
						</span>
						<br />
						<span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
							Grow Smarter.
						</span>
					</h1>

					{/* Subtitle */}
					<p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
						The open source, privacy-first link tracking platform. Get{" "}
						<span className="text-foreground font-medium">real-time analytics</span>,
						beautiful charts, and actionable insights — completely free.
					</p>

					{/* CTAs */}
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<Link
							className={buttonVariants({
								variant: "default",
								size: "lg",
								className:
									"rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5",
							})}
							href="/sign-up"
						>
							<SparklesIcon size={16} />
							Get Started — It&apos;s Free
							<ArrowRightIcon size={16} />
						</Link>
						<Link
							className={buttonVariants({
								variant: "outline",
								size: "lg",
								className:
									"rounded-xl text-foreground font-medium hover:bg-muted transition-all hover:-translate-y-0.5",
							})}
							href="https://github.com/cmollinea/countinkly"
							target="_blank"
						>
							<GithubIcon size={16} />
							Star on GitHub
						</Link>
					</div>

					{/* Stats */}
					<div className="mt-16 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
						{stats.map((stat) => (
							<div key={stat.label} className="flex flex-col items-center gap-1">
								<div className="flex items-center gap-1.5">
									<stat.icon size={14} className="text-primary" />
									<span className="text-xl md:text-2xl font-bold font-heading text-foreground">
										{stat.value}
									</span>
								</div>
								<span className="text-xs md:text-sm text-muted-foreground">
									{stat.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

import { Button } from "@/components/ui/button";
import { Github, BarChart2Icon, ShieldCheckIcon, ZapIcon, ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "$/public/iPhone-180x180px.png";
import { LogInForm } from "@/components/forms/log-in-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | Countinkly",
	description:
		"Countinkly, log in to see your links data and discover new stuff",
};

const perks = [
	{ icon: BarChart2Icon, text: "Real-time analytics dashboard" },
	{ icon: ShieldCheckIcon, text: "Privacy-first, no data selling" },
	{ icon: ZapIcon, text: "Instant redirects, zero latency" },
];

export default function LogIn() {
	return (
		<div className="min-h-screen bg-background grid lg:grid-cols-2">
			{/* Left panel */}
			<div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-cyan-400/5 border-r border-border/60 p-12 overflow-hidden">
				{/* Background orbs */}
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />
				{/* Grid pattern */}
				<div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage:
							"radial-gradient(circle, hsl(217 91% 60% / 0.3) 1px, transparent 1px)",
						backgroundSize: "32px 32px",
					}}
				/>

				<div className="relative z-10 text-center max-w-sm">
					<Link href="/">
						<Image
							src={logo.src}
							height={logo.height}
							width={logo.width}
							alt="Countinkly Logo"
							className="w-16 h-16 mx-auto mb-6 rounded-2xl shadow-lg"
						/>
					</Link>
					<h2 className="font-heading text-3xl font-bold tracking-tight mb-3">
						Welcome back to{" "}
						<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
							Countinkly
						</span>
					</h2>
					<p className="text-muted-foreground text-sm mb-8 leading-relaxed">
						Your link analytics are waiting. Sign in to see what&apos;s been happening.
					</p>

					<div className="space-y-3 text-left">
						{perks.map((perk) => (
							<div key={perk.text} className="flex items-center gap-3 bg-card/60 rounded-xl px-4 py-3 border border-border/60 backdrop-blur-sm">
								<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
									<perk.icon size={14} className="text-primary" />
								</div>
								<span className="text-sm font-medium text-foreground">{perk.text}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right panel — form */}
			<div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 relative">
				<Link
					href="/"
					className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeftIcon size={14} />
					Back to home
				</Link>

				{/* Mobile logo */}
				<div className="lg:hidden text-center mb-8">
					<Link href="/">
						<Image
							src={logo.src}
							height={logo.height}
							width={logo.width}
							alt="Countinkly Logo"
							className="w-12 h-12 mx-auto mb-3 rounded-xl"
						/>
					</Link>
				</div>

				<div className="max-w-md w-full mx-auto">
					<div className="mb-8">
						<h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
							Sign in to your account
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Don&apos;t have an account?{" "}
							<Link
								href="/sign-up"
								className="font-medium text-primary hover:underline"
							>
								Create one for free
							</Link>
						</p>
					</div>

					<div className="space-y-6">
						<LogInForm />
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border/60" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									or continue with
								</span>
							</div>
						</div>
						<Button variant="outline" size="lg" disabled className="w-full">
							<Github size={16} />
							<span>GitHub (Coming soon)</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

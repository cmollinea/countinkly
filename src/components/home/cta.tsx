import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

export const Cta = () => {
	return (
		<div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
			<div className="relative isolate px-6 py-24 text-center rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl overflow-hidden">
				{/* Decorative dots grid */}
				<div
					className="absolute inset-0 -z-10 opacity-30"
					style={{
						backgroundImage:
							"radial-gradient(circle, hsl(var(--primary) / 0.4) 1px, transparent 1px)",
						backgroundSize: "28px 28px",
					}}
				/>

				{/* Glow blobs */}
				<div className="max-w-[500px] opacity-30 w-full h-72 bg-primary rounded-full blur-3xl absolute left-1/2 -translate-x-1/2 bottom-0 -z-10 pointer-events-none" />
				<div className="w-64 h-64 opacity-20 bg-cyan-400 rounded-full blur-3xl absolute -left-10 top-0 -z-10 pointer-events-none" />
				<div className="w-48 h-48 opacity-15 bg-blue-300 rounded-full blur-3xl absolute -right-10 top-10 -z-10 pointer-events-none" />

				{/* Badge */}
				<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-6">
					<ZapIcon size={13} className="text-primary" />
					<span className="text-sm font-semibold text-primary">Free forever. No credit card.</span>
				</div>

				<h2 className="font-heading mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
					Start tracking your links{" "}
					<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
						today
					</span>
				</h2>
				<p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
					Join Countinkly and turn every link into data. Set up in seconds,
					insights within minutes.
				</p>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<Link
						href="/sign-up"
						className={buttonVariants({
							variant: "default",
							className:
								"rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5",
							size: "lg",
						})}
					>
						<SparklesIcon size={16} />
						Create Free Account
						<ArrowRightIcon size={16} />
					</Link>
					<Link
						href="/log-in"
						className={buttonVariants({
							variant: "outline",
							className: "rounded-xl font-medium transition-all hover:-translate-y-0.5",
							size: "lg",
						})}
					>
						Sign In
					</Link>
				</div>

				{/* Trust row */}
				<p className="mt-8 text-xs text-muted-foreground">
					Open source · Self-hostable · No vendor lock-in
				</p>
			</div>
		</div>
	);
};

import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const Cta = () => {
	return (
		<div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
			<div className="relative isolate px-6 py-20 text-center rounded-3xl border border-border/60 bg-card shadow-sm sm:px-16 overflow-hidden">
				<h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
					Join Countinkly today!
				</h2>
				<p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-8">
					Level up your link tracking
				</p>
				<div className="mt-8 flex items-center justify-center gap-x-6">
					<Link
						href="/sign-up"
						className={buttonVariants({
							variant: "default",
							className: "rounded-xl font-semibold",
							size: "lg",
						})}
					>
						Sign Up
						<ArrowRightIcon size={18} />
					</Link>
				</div>
				<div className="max-w-[600px] opacity-40 w-full h-80 bg-primary rounded-full blur-3xl absolute left-1/2 -translate-x-1/2 -z-10 pointer-events-none" />
			</div>
		</div>
	);
};

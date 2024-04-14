import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const Cta = () => {
	return (
		<div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
			<div className="relative isolate px-6 py-20 text-center rounded-3xl border border-foreground/20 bg-background sm:px-16 sm:shadow-sm overflow-hidden">
				<h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
					Join Countinkly today!
				</h2>

				<h3 className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-500">
					Level up your link tracking 🚀
				</h3>

				<div className="mt-8 flex items-center justify-center gap-x-6">
					<Link
						href={"/sign-up"}
						className={buttonVariants({
							variant: "default",
							className: "font-semibold text-foreground",
							size: "lg",
						})}
					>
						Sign Up
						<ArrowRightIcon size={16} />
					</Link>
				</div>
				<div className="max-w-[600px] opacity-60 w-full dark:opacity-40 h-80 bg-primary rounded-full blur-3xl absolute left-1/2 -translate-x-1/2 -z-10" />
			</div>
		</div>
	);
};

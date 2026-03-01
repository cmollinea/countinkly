import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
			{/* Background glow */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%_/_0.08),transparent_70%)]" />

			<p className="font-heading font-black text-primary text-[120px] leading-none tabular-nums">
				404
			</p>
			<h1 className="text-xl font-bold font-heading text-foreground mt-2">
				Page not found
			</h1>
			<p className="text-muted-foreground text-sm mt-2 mb-6">
				This address can&apos;t be reached. It may have been moved or deleted.
			</p>
			<Link
				href="/"
				className={buttonVariants({
					variant: "default",
					className: "rounded-xl font-semibold",
				})}
			>
				<ArrowLeftIcon size={16} />
				Back to Home
			</Link>
		</div>
	);
}
export default NotFound;

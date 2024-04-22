import { buttonVariants } from "@/components/ui/button";
import { Redo2 } from "lucide-react";
import Link from "next/link";

function NotFound() {
	return (
		<div className="flex flex-col items-center place-content-center min-h-screen bg-background">
			<p className=" font-black text-primary text-7xl">404</p>
			<small className="text-destructive">
				This adress can&apos;t be reached
			</small>
			<Link
				href={"/"}
				className={buttonVariants({
					variant: "outline",
					className: "mt-4 font-bold",
				})}
			>
				<Redo2 size={16} />
				<span>Back Home</span>
			</Link>
		</div>
	);
}
export default NotFound;

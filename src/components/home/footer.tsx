import Image from "next/image";
import logo from "$/public/iPhone-180x180px.png";
import Link from "next/link";

export const Footer = () => {
	return (
		<footer className="border-t border-border/60 bg-background rounded-t-xl">
			<div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between gap-6">
					<div className="flex justify-center sm:justify-start items-center gap-2">
						<Image
							src={logo.src}
							height={logo.height}
							width={logo.width}
							alt="Countinkly logo"
							className="w-10 h-10"
						/>
						<span className="font-heading font-bold text-xl">Countinkly</span>
					</div>
					<div className="mt-4 text-center text-sm text-muted-foreground lg:mt-0 lg:text-right">
						<p>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
						<p className="mt-1">Powered by a lot of ☕🚀</p>
						<Link
							className="inline-block mt-1 hover:text-primary transition-colors hover:underline"
							target="_blank"
							href="https://countinkly.vercel.app/wfsZpe6X6W?source=Countinkly"
						>
							Made by @proc4astinator
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

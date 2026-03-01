import Image from "next/image";
import logo from "$/public/iPhone-180x180px.png";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="border-t border-border/60 bg-background">
			<div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
					{/* Brand */}
					<div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
						<div className="flex items-center gap-2">
							<Image
								src={logo.src}
								height={logo.height}
								width={logo.width}
								alt="Countinkly logo"
								className="w-9 h-9 rounded-lg"
							/>
							<span className="font-heading font-bold text-xl">Countinkly</span>
						</div>
						<span className="hidden sm:block text-border">|</span>
						<p className="text-xs text-muted-foreground max-w-xs text-center sm:text-left">
							Open source link tracking. Free, fast, and privacy-first.
						</p>
					</div>

					{/* Right side */}
					<div className="flex flex-col items-center sm:items-end gap-2 text-sm text-muted-foreground">
						<Link
							href="https://github.com/cmollinea/countinkly"
							target="_blank"
							className="flex items-center gap-1.5 hover:text-primary transition-colors"
						>
							<GithubIcon size={14} />
							<span className="text-xs">Star on GitHub</span>
						</Link>
						<p className="text-xs">
							Copyright &copy; {new Date().getFullYear()} Countinkly. All rights reserved.
						</p>
						<Link
							className="text-xs hover:text-primary transition-colors hover:underline"
							target="_blank"
							href="https://countinkly.vercel.app/wfsZpe6X6W?source=Countinkly"
						>
							Made with ☕ by @proc4astinator
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

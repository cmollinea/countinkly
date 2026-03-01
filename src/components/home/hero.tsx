"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import heroContent from "@/content/hero.json";
import { GithubIcon, SparklesIcon } from "lucide-react";

export const Hero = () => {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-32 flex items-center min-h-[calc(100vh-64px)]">
				<div className="mx-auto max-w-3xl text-center">
					<h1
						// biome-ignore lint/security/noDangerouslySetInnerHtml: content from CMS
						dangerouslySetInnerHTML={{ __html: heroContent.title }}
						className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl py-4 leading-tight"
					/>
					<p
						// biome-ignore lint/security/noDangerouslySetInnerHtml: content from CMS
						dangerouslySetInnerHTML={{ __html: heroContent.shortDescription }}
						className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
					/>
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<Link
							className={buttonVariants({
								variant: "default",
								size: "lg",
								className: "rounded-xl font-semibold",
							})}
							href="/sign-up"
						>
							<SparklesIcon size={18} />
							{heroContent.primaryButton}
						</Link>
						<Link
							className={buttonVariants({
								variant: "outline",
								size: "lg",
								className: "rounded-xl text-foreground font-medium hover:bg-muted",
							})}
							href="https://github.com/cmollinea/countinkly"
							target="_blank"
						>
							<GithubIcon size={18} />
							{heroContent.secondaryButtton}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

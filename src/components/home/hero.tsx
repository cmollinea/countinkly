"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import heroContent from "@/content/hero.json";
import { GithubIcon, SparklesIcon } from "lucide-react";

export const Hero = () => {
	return (
		<section className="">
			<div className="mx-auto max-w-screen-xl px-4 py-32 flex items-center h-[calc(100vh-64px)]">
				<div className="mx-auto max-w-3xl text-center">
					<h1
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: heroContent.title }}
						className="text-3xl font-black sm:text-6xl py-4"
					/>

					<p
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: heroContent.shortDescription }}
						className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed"
					/>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							className={buttonVariants({ variant: "default", size: "lg" })}
							href="/sign-up"
						>
							<SparklesIcon size={16} />
							{heroContent.primaryButton}
						</Link>

						<Link
							className={buttonVariants({
								variant: "outline",
								size: "lg",
								className: " text-foreground",
							})}
							href="https://github.com/cmollinea/countinkly"
							target="_blank"
						>
							<GithubIcon size={16} />
							{heroContent.secondaryButtton}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

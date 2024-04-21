import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "$/public/iPhone-180x180px.png";
import { LogInForm } from "@/components/forms/log-in-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Your Links are Waiting for You | Countinkly",
	description:
		"Countinkly, log in to see your links data and discover new stuff",
};

export default function LogIn() {
	return (
		<div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Link href={"/"}>
					<Image
						className="mx-auto h-10 w-auto"
						src={logo.src}
						alt="Countinkly Logo"
						height={logo.height}
						width={logo.width}
					/>
				</Link>
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm leading-5 max-w">
					<Link
						href="/sign-up"
						className="font-medium text-primary hover:underline transition ease-in-out duration-150"
					>
						Or create a new acccount
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border border-foreground/10">
				<div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<LogInForm />
					<div className="flex flex-col w-full mt-4 items-center place-content-center">
						<Button variant={"outline"} size={"lg"} disabled className="w-full">
							<Github />
							<span>Use Github (Soon)</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

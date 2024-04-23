import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Toaster } from "sonner";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Countinkly | Your Link Tracking Powerhouse",
	description:
		"The Open Source and User-Friendly Link Tracking Solution that Streamlines Your Analytics Journey",
	applicationName: "Countinkly",
	authors: {
		name: "@proc4stinator",
		url: "https://procastinatordev.vercel.app",
	},
	openGraph: {
		title: "Countinkly | Your Link Tracking Powerhouse",
		description:
			"The Open Source and User-Friendly Link Tracking Solution that Streamlines Your Analytics Journey",
	},
	twitter: {
		title: "Countinkly | Your Link Tracking Powerhouse",
		description:
			"The Open Source and User-Friendly Link Tracking Solution that Streamlines Your Analytics Journey",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${GeistSans.className} relative`}>
				<ThemeProvider attribute="class" defaultTheme="light">
					<Suspense fallback={null}>
						<ProgressBar />
					</Suspense>{" "}
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

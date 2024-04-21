"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { useEffect } from "react";

export default function ErrorFallback({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center place-content-center w-full h-full min-h-[calc(100vh-64px)] space-y-2">
			<Frown size={120} className="text-destructive" />
			<h2 className="text-4xl font-semibold">Something went wrong!</h2>
			{error.message && (
				<small className="text-destructive animate-pulse">
					{error.message}
				</small>
			)}
			<Button
				variant={"outline"}
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	);
}

import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { useState } from "react";

export const useClipboard = (text: string) => {
	const [copied, setCopied] = useState(false);
	const source = new URL(text).searchParams.get("source");

	const handleClipboard = async () => {
		await copyToClipboard(text, source || "Unknown")
			.then(() => setCopied(true))
			.then(() =>
				setTimeout(() => {
					setCopied(false);
				}, 3000),
			);
	};
	return { copied, handleClipboard };
};

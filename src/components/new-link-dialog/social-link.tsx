import { Clipboard, ClipboardCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

export const SocialLink = ({
	url,
	Icon,
}: { url: string; Icon: () => JSX.Element }) => {
	const { copied, handleClipboard } = useClipboard(url);

	return (
		<div className="flex items-start justify-between text-xs">
			<span className="flex items-start space-x-3">
				<Icon />

				<p>{url}</p>
			</span>

			<TooltipProvider>
				<Tooltip open={copied}>
					<TooltipTrigger asChild>
						<Button
							disabled={copied}
							variant={"outline"}
							size={"icon"}
							className="h-6 w-6"
							onClick={() => handleClipboard()}
						>
							{copied ? (
								<ClipboardCheckIcon size={16} />
							) : (
								<Clipboard size={16} />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent className="text-[8px]">
						<p>Copied</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

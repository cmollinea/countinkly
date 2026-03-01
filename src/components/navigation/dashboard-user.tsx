"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/actions";
import { User } from "lucia";
import { useTransition } from "react";
import { LogOutIcon, ChevronDownIcon } from "lucide-react";

export const DashboardUser = ({ user }: { user: User | null }) => {
	const [isPending, startTransition] = useTransition();
	function handleLogOut() {
		startTransition(async () => await logout());
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-2 px-2 py-1.5 h-auto rounded-lg hover:bg-muted/60 max-md:bg-muted/40"
				>
					<Avatar className="h-7 w-7 max-md:h-10 max-md:w-10 ring-2 ring-primary/20">
						<AvatarImage
							src={`https://api.dicebear.com/7.x/bottts-neutral/png?seed=${user?.username}`}
						/>
						<AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
							{user?.username.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span className="text-sm font-medium max-md:text-xl">
						{isPending ? (
							<span className="text-destructive animate-pulse">Signing out…</span>
						) : (
							user?.username
						)}
					</span>
					<ChevronDownIcon size={14} className="text-muted-foreground max-md:hidden" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
					Signed in as
					<p className="font-semibold text-foreground truncate">{user?.username}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Button
						className="w-full cursor-pointer"
						variant="destructive"
						size="sm"
						onClick={handleLogOut}
					>
						<LogOutIcon size={14} />
						Sign Out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

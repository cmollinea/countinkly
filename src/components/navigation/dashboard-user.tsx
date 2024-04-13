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
import { ChevronDown } from "lucide-react";

export const DashboardUser = ({ user }: { user: User | null }) => {
	const [isPending, startTransition] = useTransition();
	function handleLogOut() {
		startTransition(async () => await logout());
	}
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"ghost"}
						className="py-8 md:py-5 md:px-2 space-x-1 max-md:bg-card-foreground/5"
					>
						<span>
							<Avatar className="h-12 w-12 md:h-8 md:w-8">
								<AvatarImage
									src={`https://api.dicebear.com/7.x/bottts-neutral/png?seed=${user?.username}`}
								/>
								<AvatarFallback>
									{user?.username.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</span>
						<p className="max-md:text-2xl">
							{isPending ? (
								<span className=" text-destructive animate-pulse">
									Getting Out
								</span>
							) : (
								user?.username
							)}
						</p>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-full max-md:w-60">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className=" focus:bg-inherit w-full">
						<Button
							className="w-full"
							variant={"destructive"}
							type="submit"
							onClick={() => handleLogOut()}
						>
							Log Out
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

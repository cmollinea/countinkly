import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import blacklogo from "$/public/iPhone-180x180px.png";
import Image from "next/image";

type Props = {
	children: React.ReactNode;
};

export const SmNav = ({ children }: Props) => {
	return (
		<Sheet>
			<SheetTrigger
				asChild
				className="md:hidden data-[state=open]:rotate-90 transition-transform ease-in-out"
			>
				<MenuIcon className=" cursor-pointer" />
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader className="flex-row items-center space-x-2">
					<span className="relative w-10 h-10">
						<Image src={blacklogo.src} alt="logo" fill />
					</span>
					<h1 className="text-2xl font-bold">Countinkly</h1>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
};

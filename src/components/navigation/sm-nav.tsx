import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

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
				<SheetHeader>
					<h1>Countinkly</h1>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
};

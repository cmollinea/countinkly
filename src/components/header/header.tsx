import blacklogo from "$/public/iPhone-180x180px.png";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
export const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header className="flex backdrop-blur-sm border-b border-gray-500/20 shadow-sm justify-between px-10 h-16 items-center sticky top-0 z-50">
			<Link href={"/"} className="flex items-center space-x-2">
				<span className="relative w-10 h-10 max-md:w-8 max-md:h-8">
					<Image src={blacklogo.src} alt="logo" fill className="maxmd" />
				</span>
				<p className="md:text-xl font-bold">Countinkly</p>
			</Link>
			<div className="flex space-x-1 items-center">
				<ThemeToggle />
				{children}
			</div>
		</header>
	);
};

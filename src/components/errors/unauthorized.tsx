import { Drama } from "lucide-react";
import { BackButton } from "../dashboard/back-button";

export const Unauthorized = () => {
	return (
		<div className="flex flex-col items-center place-content-center w-full h-full min-h-[calc(100vh-64px)] relative">
			<Drama className="text-destructive" size={150} />
			<p>Uh Oh! It seems that this link isn&apos;t yours</p>
			<small className=" text-destructive">Stay away!!!</small>
			<BackButton />
		</div>
	);
};

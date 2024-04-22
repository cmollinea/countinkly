import { Squirrel } from "lucide-react";

function NotFound() {
	return (
		<div className="flex flex-col items-center place-content-center h-[calc(100vh-64px)] w-full">
			<Squirrel size={16} className="text-primary" />
			<p className=" font-black text-primary text-7xl">404</p>
			<small className="text-destructive">
				This adress can&apos;t be reached
			</small>{" "}
		</div>
	);
}
export default NotFound;

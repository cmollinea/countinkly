import { DiscoverFeed } from "@/components/discover-feed/discover-feed";
import { validateRequest } from "@/lib/validate-request";
import { Handshake } from "lucide-react";
import { redirect } from "next/navigation";

//TODO have searchParams as argument, and pass down to discover feed for sorting purposes

const Discover = async () => {
	const { user } = await validateRequest();
	if (!user) {
		redirect("/log-in");
	}

	const linkCount = await prisma?.link.count();

	//TODO 	Create tabs for links All | Popular | Most Comments

	return (
		<section className="w-full px-4 grid gap-10 py-16 mx-auto overflow-y-auto">
			<div className="text-center grid">
				<h1 className="text-2xl ">Currently tracking {linkCount} links</h1>
				<small className="opacity-50">Support others sharing! </small>

				<Handshake size={14} className=" place-self-center opacity-50" />
			</div>
			<DiscoverFeed userId={user.id} />
		</section>
	);
};
export default Discover;

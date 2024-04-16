import { DiscoverFeed } from "@/components/discover-feed/discover-feed";
import { Pagination } from "@/components/navigation/pagination";
import { DiscoverSkelleton } from "@/components/skeletons/discover-skeleton";
import { validateRequest } from "@/lib/validate-request";
import { Handshake } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
	searchParams: {
		page?: string;
	};
};

const Discover = async ({ searchParams }: Props) => {
	const { user } = await validateRequest();
	if (!user) {
		redirect("/log-in");
	}

	const linkCount = (await prisma?.link.count()) || 0;
	const totalPages = Math.floor(linkCount / 10);
	const currentPage = searchParams.page ? Number(searchParams.page) : 1;

	//TODO 	Create tabs for links All | Popular | Most Comments

	return (
		<section className="w-full px-4 overflow-y-auto">
			<div className="grid gap-10 py-16 mx-auto h-fit">
				<div className="text-center grid">
					<h1 className="text-2xl ">Currently tracking {linkCount} links</h1>
					<small className="opacity-50">Support others sharing! </small>

					<Handshake size={14} className=" place-self-center opacity-50" />
					{totalPages > 1 && <Pagination totalPages={totalPages} />}
				</div>
				<Suspense fallback={<DiscoverSkelleton />} key={currentPage}>
					<DiscoverFeed currentpage={currentPage} userId={user.id} />
				</Suspense>
			</div>
		</section>
	);
};
export default Discover;

import { DiscoverFeed } from "@/components/discover-feed/discover-feed";
import { Pagination } from "@/components/navigation/pagination";
import { DiscoverSkelleton } from "@/components/skeletons/discover-skeleton";
import { validateRequest } from "@/lib/validate-request";
import { Handshake, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import prisma from "@/lib/prisma";

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
	const totalPages = Math.max(1, Math.ceil(linkCount / 10));
	const currentPage = searchParams.page ? Number(searchParams.page) : 1;

	return (
		<section className="w-full px-4 overflow-y-auto">
			<div className="mx-auto max-w-4xl grid gap-12 py-16 h-fit">
				<div className="text-center grid gap-6">
					<div className="grid gap-2">
						<h1 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl text-foreground">
							Discover links
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg">
							Support others by sharing and engaging with their links.
						</p>
					</div>
					<div className="flex items-center justify-center gap-2">
						<span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium">
							<Link2 size={16} className="text-primary" />
							{linkCount} links tracked
						</span>
						<Handshake size={18} className="text-muted-foreground" />
					</div>
					{totalPages > 1 && (
						<Suspense fallback={<div className="h-10" />}>
							<Pagination totalPages={totalPages} />
						</Suspense>
					)}
				</div>
				<div className="grid gap-6">
					<Suspense fallback={<DiscoverSkelleton />} key={currentPage}>
						<DiscoverFeed currentpage={currentPage} userId={user.id} />
					</Suspense>
				</div>
			</div>
		</section>
	);
};
export default Discover;

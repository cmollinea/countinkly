import { AddLinkForm } from "@/components/forms/add-link-form";
import { LinksTable } from "@/components/tables";
import { getUserLinks } from "@/lib/get-user-links";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { Link2Icon } from "lucide-react";

async function LinksPage() {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/?code=401");
	}

	const links = await getUserLinks(user?.id);

	const linksData = links.map((link) => {
		return {
			id: link.id,
			displayName: link.displayName,
			url: link.url,
			clicks: link._count.clicks,
			shortedUrl: link.shortedLink?.shortUrl as string,
		};
	});

	return (
		<section className="py-10 md:overflow-y-auto w-full">
			<div className="flex flex-col w-full px-4 lg:px-10">
				{/* Page header */}
				<div className="flex items-center justify-between mb-8 pb-6 border-b border-border/60">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
							Dashboard
						</p>
						<h1 className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
							<Link2Icon size={20} className="text-primary" />
							Your Links
						</h1>
						<p className="text-sm text-muted-foreground mt-1">
							{linksData.length} link{linksData.length !== 1 ? "s" : ""} tracked
						</p>
					</div>
					<AddLinkForm userId={user.id} />
				</div>

				<LinksTable links={linksData} />
			</div>
		</section>
	);
}
export default LinksPage;

import { AddLinkForm } from "@/components/forms/add-link-form";
import { LinksTable } from "@/components/tables";
import { getUserLinks } from "@/lib/get-user-links";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

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
		<section className="py-16 md:overflow-y-auto w-full">
			<div className="flex flex-col place-content-center items-center w-full px-4 lg:px-20">
				<span className=" self-end">
					<AddLinkForm userId={user.id} />
				</span>
				<LinksTable links={linksData} />
			</div>
		</section>
	);
}
export default LinksPage;

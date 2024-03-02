import { LinksTable } from "@/components/tables";
import { getUserLinks } from "@/lib/getUserLinks";
import { validateRequest } from "@/lib/validateRequest";
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

	console.log(links);

	return (
		<section className="py-16">
			<div className="flex place-content-center items-center w-full px-20">
				<LinksTable links={linksData} />
			</div>
		</section>
	);
}
export default LinksPage;

import { LinksTable } from "@/components/tables";
import { getUserLinks } from "@/lib/get-user-links";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
//TODO Use a loading.tsx for this route

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
			<div className="flex place-content-center items-center w-full px-4 lg:px-20">
				<LinksTable links={linksData} />
			</div>
		</section>
	);
}
export default LinksPage;

import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validateRequest";
import { addNewLink } from "@/actions";
import { AddLinkForm } from "@/components/forms/add-link-form";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/log-in");
	}

	const handleAddNewLink = addNewLink.bind(null, user.id);

	return (
		<section className="grid gap-4">
			<div className="flex items-center justify-between px-4">
				<span />
				<div className="grid gap-2">
					<AddLinkForm userId={user.id} />
				</div>
			</div>
		</section>
	);
}

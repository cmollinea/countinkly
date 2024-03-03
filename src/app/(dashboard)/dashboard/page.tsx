import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validate-request";
import { AddLinkForm } from "@/components/forms/add-link-form";
import { ClicksCard } from "@/components/info-cards/clicks-card";
import { SparklesIcon } from "lucide-react";
import { getDailyClicks } from "@/lib/get-clicks";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/log-in");
	}

	return (
		<section className="grid gap-4">
			<div className="flex items-center justify-between px-4">
				<span />
				<div className="grid gap-2">
					<AddLinkForm userId={user.id} />
				</div>
			</div>
			<ClicksCard
				id={user.id}
				title="Clicks earned Today"
				Icon={SparklesIcon}
				clicksGetter={getDailyClicks}
			/>
		</section>
	);
}

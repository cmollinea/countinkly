import { AddLinkForm } from "@/components/forms/add-link-form";
import { ClicksCard } from "@/components/info-cards/clicks-card";
import {
	getCountries,
	getDailyClicks,
	getLinks,
	getTotalClicks,
} from "@/lib/get-clicks";
import { Link2Icon, Zap, Calculator, LocateIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validate-request";
import { ServerAccountGrouth } from "@/components/charts/server-account-grouth";
import { ServerLinksBarchar } from "@/components/charts/server-links-barchar";
import { ServerPieSocialMediaChart } from "@/components/charts/server-pie-socialmedia-chart";
import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { ServerPieWorldPresence } from "@/components/charts/server-pie-world-presence-chart";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/log-in");
	}

	return (
		<section className="flex flex-col w-full space-y-4 px-4 md:overflow-y-scroll py-16">
			<div className="flex items-center justify-between px-10">
				<div>
					<p className="text-3xl font-bold">
						Hey there!{" "}
						<span className=" text-primary">{`${user.firstName} ${user.lastName}`}</span>
					</p>
				</div>
				<div className="grid gap-2">
					<AddLinkForm userId={user.id} />
				</div>
			</div>

			<DashboardContainer>
				<div className="flex flex-col space-y-4 max-w-md w-full">
					{" "}
					<ClicksCard
						id={user.id}
						title="Clicks earned Today"
						Icon={Zap}
						clicksGetter={getDailyClicks}
					/>
					<ClicksCard
						id={user.id}
						title="Total clicks earned "
						Icon={Link2Icon}
						clicksGetter={getTotalClicks}
					/>
				</div>
				<div className="flex flex-col space-y-4 max-w-md w-full">
					<ClicksCard
						id={user.id}
						title="Link Count"
						Icon={Calculator}
						clicksGetter={getLinks}
					/>
					<ClicksCard
						id={user.id}
						title="Reached Countries"
						Icon={LocateIcon}
						clicksGetter={getCountries}
					/>
				</div>
				<ServerAccountGrouth userId={user.id} />
			</DashboardContainer>

			<DashboardContainer>
				<ServerLinksBarchar userId={user.id} />
				<ServerPieWorldPresence userId={user.id} />
				<ServerPieSocialMediaChart userId={user.id} />
			</DashboardContainer>
		</section>
	);
}

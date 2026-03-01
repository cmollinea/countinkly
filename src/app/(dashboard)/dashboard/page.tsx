import { AddLinkForm } from "@/components/forms/add-link-form";
import { ClicksCard } from "@/components/info-cards/clicks-card";
import {
	getCountries,
	getDailyClicks,
	getLinks,
	getTotalClicks,
} from "@/lib/get-clicks";
import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { RangeFilter } from "@/components/dashboard/range-filter";
import { getDateRange, isRangeKey, DEFAULT_RANGE } from "@/lib/date-range";
import { Link2Icon, Zap, Calculator, LocateIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { ServerAccountGrouth } from "@/components/charts/server-account-grouth";
import { ServerLinksBarchar } from "@/components/charts/server-links-barchar";
import { ServerPieSocialMediaChart } from "@/components/charts/server-pie-socialmedia-chart";
import { ServerPieWorldPresence } from "@/components/charts/server-pie-world-presence-chart";
import { validateRequest } from "@/lib/validate-request";
import { Suspense } from "react";
import { ClicksCardSkeleton } from "@/components/skeletons/clicks-cards-skeleton";
import { ChartsSkeleton } from "@/components/skeletons/charts-skeletons";

type PageProps = {
	searchParams?: Promise<{ range?: string }> | { range?: string };
};

export default async function Page({ searchParams }: PageProps) {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/log-in");
	}

	const resolved =
		searchParams && typeof (searchParams as Promise<unknown>).then === "function"
			? await (searchParams as Promise<{ range?: string }>)
			: (searchParams as { range?: string }) ?? {};
	const range = isRangeKey(resolved.range) ? resolved.range : DEFAULT_RANGE;
	const dateRange = getDateRange(range);

	return (
		<section className="flex flex-col w-full space-y-8 px-4 md:overflow-y-scroll py-10">
			{/* Page header */}
			<div className="flex flex-col gap-5 md:px-10 border-b border-border/60 pb-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
							Dashboard
						</p>
						<h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
							Hey,{" "}
							<span className="text-primary">{`${user.firstName} ${user.lastName}`}</span>{" "}
							👋
						</h1>
						<p className="text-sm text-muted-foreground mt-1">
							Here&apos;s what&apos;s happening with your links today.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<RangeFilter />
						<AddLinkForm userId={user.id} />
					</div>
				</div>
			</div>

			{/* Stats cards + growth chart */}
			<div className="space-y-4 md:px-10">
				<div className="flex items-center gap-2 mb-4">
					<div className="w-1 h-5 rounded-full bg-primary" />
					<h2 className="text-sm font-semibold text-foreground">Overview</h2>
				</div>
				<DashboardContainer>
					<div className="flex flex-col space-y-4 lg:max-w-md w-full">
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={user.id}
								title="Clicks in period"
								Icon={Zap}
								clicksGetter={(id) => getDailyClicks(id, dateRange)}
							/>
						</Suspense>
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={user.id}
								title="Total clicks earned"
								Icon={Link2Icon}
								clicksGetter={(id) => getTotalClicks(id, dateRange)}
							/>
						</Suspense>
					</div>
					<div className="flex flex-col space-y-4 lg:max-w-md w-full">
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={user.id}
								title="Link Count"
								Icon={Calculator}
								clicksGetter={getLinks}
							/>
						</Suspense>
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={user.id}
								title="Reached Countries"
								Icon={LocateIcon}
								clicksGetter={(id) => getCountries(id, dateRange)}
							/>
						</Suspense>
					</div>
					<Suspense fallback={<ChartsSkeleton className="h-[360px] mt-4" />}>
						<ServerAccountGrouth userId={user.id} dateRange={dateRange} />
					</Suspense>
				</DashboardContainer>
			</div>

			{/* Charts */}
			<div className="space-y-4 md:px-10">
				<div className="flex items-center gap-2 mb-4">
					<div className="w-1 h-5 rounded-full bg-primary" />
					<h2 className="text-sm font-semibold text-foreground">Analytics</h2>
				</div>
				<DashboardContainer>
					<Suspense fallback={<ChartsSkeleton />}>
						<ServerLinksBarchar userId={user.id} dateRange={dateRange} />
					</Suspense>
					<Suspense fallback={<ChartsSkeleton />}>
						<ServerPieWorldPresence userId={user.id} dateRange={dateRange} />
					</Suspense>
					<Suspense fallback={<ChartsSkeleton />}>
						<ServerPieSocialMediaChart userId={user.id} dateRange={dateRange} />
					</Suspense>
				</DashboardContainer>
			</div>
		</section>
	);
}

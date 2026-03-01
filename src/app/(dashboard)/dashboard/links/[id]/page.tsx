import { BackButton } from "@/components/dashboard/back-button";
import { RangeFilter } from "@/components/dashboard/range-filter";
import { ServerLinkGrouth } from "@/components/charts/server-link-grouth";
import { ServerLinkPieSocialMediaChart } from "@/components/charts/server-link-pie-socialmedia-chart";
import { ServerLinkPieWorldPresence } from "@/components/charts/server-link-pie-world-presence-chart";
import { Unauthorized } from "@/components/errors/unauthorized";
import { ClicksCard } from "@/components/info-cards/clicks-card";
import { ChartsSkeleton } from "@/components/skeletons/charts-skeletons";
import { ClicksCardSkeleton } from "@/components/skeletons/clicks-cards-skeleton";
import { ClicksTable } from "@/components/tables/clicks-table";
import { getDateRange, isRangeKey, DEFAULT_RANGE } from "@/lib/date-range";
import { getLinkCountries, getLinkTotalCLicks } from "@/lib/get-clicks";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-request";
import { CalculatorIcon, Globe2Icon } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
	params: Promise<{ id: string }> | { id: string };
	searchParams?: Promise<{ range?: string }> | { range?: string };
};

async function LinksPage({ params, searchParams }: Props) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/log-in");
	}

	const resolvedParams =
		typeof (params as Promise<unknown>).then === "function"
			? await (params as Promise<{ id: string }>)
			: (params as { id: string });

	const link = await prisma.link.findFirst({
		where: { id: resolvedParams.id },
	});

	if (!link) {
		return notFound();
	}

	if (link.userId !== user.id) {
		return <Unauthorized />;
	}

	const resolvedSearch =
		searchParams && typeof (searchParams as Promise<unknown>).then === "function"
			? await (searchParams as Promise<{ range?: string }>)
			: (searchParams as { range?: string }) ?? {};
	const range = isRangeKey(resolvedSearch.range) ? resolvedSearch.range : DEFAULT_RANGE;
	const dateRange = getDateRange(range);

	return (
		<section className="py-16 md:overflow-y-auto w-full px-4 md:px-10 grid gap-10 relative">
			<BackButton />
			<div className="flex flex-col gap-4">
				<div>
					<h1 className=" text-2xl font-bold">
						<span className=" text-primary">{link.displayName}</span> Information.
					</h1>
					<small className="opacity-60">{link.url}</small>
				</div>
				<RangeFilter />
			</div>
			<div className="flex flex-col items-center place-content-center space-y-5 w-full">
				<div className="flex max-lg:space-y-5 max-lg:flex-col lg:space-x-5 w-full max-w-screen-2xl">
					<div className="flex flex-col space-y-5 w-full">
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={link.id}
								title={`${link.displayName} Total Clicks`}
								clicksGetter={(id) => getLinkTotalCLicks(id, dateRange)}
								Icon={CalculatorIcon}
							/>
						</Suspense>
						<Suspense fallback={<ClicksCardSkeleton />}>
							<ClicksCard
								id={link.id}
								title={`${link.displayName} Reached Countries`}
								clicksGetter={(id) => getLinkCountries(id, dateRange)}
								Icon={Globe2Icon}
							/>
						</Suspense>
					</div>
					<Suspense fallback={<ChartsSkeleton className="h-full" />}>
						<ServerLinkPieWorldPresence
							linkId={link.id}
							name={link.displayName}
							dateRange={dateRange}
						/>
					</Suspense>
					<Suspense fallback={<ChartsSkeleton className="h-full" />}>
						<ServerLinkPieSocialMediaChart
							linkId={link.id}
							name={link.displayName}
							dateRange={dateRange}
						/>
					</Suspense>
				</div>
				<div className="max-h-fit w-full">
					<Suspense fallback={<ChartsSkeleton className="max-w-full" />}>
						<ServerLinkGrouth linkId={link.id} dateRange={dateRange} />
					</Suspense>
				</div>
			</div>
			<div className="grid gap-5">
				<h1 className=" text-2xl font-bold">
					<span className=" text-primary">{link.displayName}</span> Clicks Info.
				</h1>
				<ClicksTable linkId={link.id} dateRange={dateRange} />
			</div>
		</section>
	);
}

export default LinksPage;

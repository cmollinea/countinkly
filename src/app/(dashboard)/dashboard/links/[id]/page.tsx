import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ServerLinkGrouth } from "@/components/charts/server-link-grouth";
import { ServerLinkPieSocialMediaChart } from "@/components/charts/server-link-pie-socialmedia-chart";
import { ServerLinkPieWorldPresence } from "@/components/charts/server-link-pie-world-presence-chart";
import { ClicksCard } from "@/components/info-cards/clicks-card";
import { getLinkCountries, getLinkTotalCLicks } from "@/lib/get-clicks";
import { CalculatorIcon, Globe2Icon } from "lucide-react";
import { ClicksTable } from "@/components/tables/clicks-table";

type Props = {
	params: {
		id: string;
	};
};

async function LinksPage({ params }: Props) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/log-in");
	}

	const today = new Date();

	const link = await prisma.link.findFirst({
		where: { id: params.id },
	});

	const clicks = await prisma.clicks.findMany({ where: { linkId: params.id } });

	if (!link) {
		return <p>404</p>;
	}

	if (link.userId !== user.id) {
		return <p>Unauthorized</p>;
	}

	console.log(link);

	return (
		<section className="py-16 md:overflow-y-auto w-full px-4 md:px-10 grid gap-10">
			<div>
				<h1 className=" text-2xl font-bold">
					<span className=" text-primary">{link.displayName}</span> Information.
				</h1>
				<small className="opacity-60">{link.url}</small>
			</div>
			<div className="flex flex-col items-center place-content-center space-y-5 w-full">
				<div className="flex max-lg:space-y-5 max-lg:flex-col lg:space-x-5 w-full max-w-screen-2xl">
					<div className="flex flex-col space-y-5 w-full">
						<ClicksCard
							id={link.id}
							title={`${link.displayName} Total Clicks`}
							clicksGetter={getLinkTotalCLicks}
							Icon={CalculatorIcon}
						/>
						<ClicksCard
							id={link.id}
							title={`${link.displayName} Reached Countries`}
							clicksGetter={getLinkCountries}
							Icon={Globe2Icon}
						/>
					</div>
					<ServerLinkPieWorldPresence
						linkId={link.id}
						name={link.displayName}
					/>
					<ServerLinkPieSocialMediaChart
						linkId={link.id}
						name={link.displayName}
					/>
				</div>
				<div className="max-h-fit w-full flex items-center place-content-center">
					<ServerLinkGrouth linkId={link.id} />
				</div>
			</div>
			<div className="grid gap-5">
				<h1 className=" text-2xl font-bold">
					<span className=" text-primary">{link.displayName}</span> Clicks Info.
				</h1>
				<ClicksTable linkId={link.id} />
			</div>
		</section>
	);
}

export default LinksPage;

import { Header } from "@/components/header/header";
import { Cta } from "@/components/home/cta";
import { ExampleCharts } from "@/components/home/example-charts";
import { FeaturesCard } from "@/components/home/features-cards";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { HomeNav } from "@/components/navigation/home-nav";
import { validateRequest } from "@/lib/validate-request";

export default async function Home() {
	const { user } = await validateRequest();

	return (
		<>
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#514f4f21_1px,transparent_1px),linear-gradient(to_bottom,#514f4f21_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#252525_1px/50,transparent_1px),linear-gradient(to_bottom,#252525/50_1px,transparent_1px)] bg-[size:14px_24px]" />
			<Header>
				<HomeNav isLogged={Boolean(user)} />
			</Header>
			<main className="flex flex-col items-center space-y-24 pb-20">
				<Hero />

				<FeaturesCard />

				<ExampleCharts />

				<Cta />
			</main>

			<Footer />
		</>
	);
}

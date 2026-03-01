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
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#3b82f612_1px,transparent_1px),linear-gradient(to_bottom,#3b82f612_1px,transparent_1px)] bg-[size:40px_40px]" />
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

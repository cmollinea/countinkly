import { Header } from "@/components/header/header";
import {
	DashboardLinks,
	DashboardNav,
} from "@/components/navigation/dashboard-nav";
import { DashboardUser } from "@/components/navigation/dashboard-user";
import { SmNav } from "@/components/navigation/sm-nav";
import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";
import { redirect } from "next/navigation";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();
	if (!user) {
		redirect("/log-in");
	}
	return (
		<>
			<Header>
				<div className=" max-md:hidden">
					<DashboardUser user={user} />
				</div>
				<SmNav>
					<div className=" absolute bottom-4">
						<DashboardUser user={user} />
					</div>
					<div className="flex flex-col mt-10 w-fit">
						<DashboardLinks />
					</div>
				</SmNav>
			</Header>
			<section className="flex md:h-[calc(100vh-64px)] w-full">
				<DashboardNav />
				{children}
			</section>
		</>
	);
}
export default DashboardLayout;
import { Header } from "@/components/header/header";
import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { DashboardUser } from "@/components/navigation/dashboard-user";
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
				<DashboardUser user={user} />
			</Header>
			<section className="flex md:h-[calc(100vh-64px)]">
				<DashboardNav />
				{children}
			</section>
		</>
	);
}
export default DashboardLayout;

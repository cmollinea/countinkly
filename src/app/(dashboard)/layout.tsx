import { Header } from "@/components/header/header";
import { DashboardUser } from "@/components/navigation/dashboard-user";
import { validateRequest } from "@/lib/validateRequest";
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
			<div className="flex items-center place-content-start space-x-2 px-10 py-4">
				<Link href={"/dashboard"}>General</Link>
				<Link href={"/dashboard/links"}>Your Links</Link>
				<Link href={"/dashboard/discover"}>Discover</Link>
			</div>
			{children}
		</>
	);
}
export default DashboardLayout;

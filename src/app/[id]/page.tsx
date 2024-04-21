import { createRecord } from "@/lib/create-record";
import { getOriginalUrl } from "@/lib/get-original-url";
import { incrementView } from "@/lib/increment-view";
import { notFound, redirect } from "next/navigation";

type Props = {
	params: {
		id: string;
	};
	searchParams: {
		source: string | undefined;
	};
};

async function VisitCounter({ params, searchParams }: Props) {
	const link = await getOriginalUrl(params.id);
	if (typeof link === "string") {
		return notFound();
	}

	createRecord(link.id, link.userId, searchParams.source || "Unknown");
	incrementView(link.id);
	redirect(link.url);
	return null;
}
export default VisitCounter;

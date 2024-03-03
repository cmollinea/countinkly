import { createRecord } from "@/lib/create-record";
import { getOriginalUrl } from "@/lib/get-original-url";
import { incrementView } from "@/lib/increment-view";
import { redirect } from "next/navigation";

type Props = {
	params: {
		id: string;
	};
};

async function VisitCounter({ params }: Props) {
	const link = await getOriginalUrl(params.id);
	if (typeof link === "string") {
		return <p>{link}</p>;
	}

	createRecord(link.id, link.userId);
	incrementView(link.id);
	redirect(link.url);
	return null;
}
export default VisitCounter;

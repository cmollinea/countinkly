import { createRecord } from "@/lib/create-record";
import { getOriginalUrl } from "@/lib/get-original-url";
import { incrementView } from "@/lib/increment-view";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type Props = {
	params: {
		id: string;
	};
	searchParams: {
		source: string | undefined;
	};
};

export async function generateMetadata({
	params,
}: Partial<Props>): Promise<Metadata> {
	const linkMetadata = await prisma.linkMetadata.findFirst({
		where: { linkId: params?.id },
	});
	if (linkMetadata) {
		return {
			title: linkMetadata.title,
			description: linkMetadata.description,
			openGraph: {
				title: linkMetadata.title,
				description: linkMetadata.description,
				images: linkMetadata.og,
			},
			twitter: {
				title: linkMetadata.title,
				description: linkMetadata.description,
				images: linkMetadata.og,
			},
		};
	}

	return {
		title: "Countinkly",
		description:
			"This url is tracked by Countinkly, your visit will be counted",
	};
}

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

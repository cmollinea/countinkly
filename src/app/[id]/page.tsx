import { headers } from "next/headers";

type Props = {
	params: {
		id: string;
	};
	searchParams: {
		source: string | undefined;
	};
};

async function VisitCounter({ params, searchParams }: Props) {
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");
	return (
		<div className="flex flex-col space-y-10 items-center place-content-center">
			<p>{forwardedFor}</p>
			<p>{realIp}</p>
		</div>
	);
}
export default VisitCounter;

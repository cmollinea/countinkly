import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
	return (
		<section className="w-full h-full flex flex-col items-center place-content-center space-y-2">
			<Spinner />
			<p>Loading Your Links</p>
		</section>
	);
};
export default Loading;

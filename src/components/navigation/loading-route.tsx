import { Spinner } from "../ui/spinner";

type Props = {
	children: React.ReactNode;
};

export const LoadingRouteIndicator = ({ children }: Props) => {
	return (
		<section className="w-full min-h-full flex flex-col items-center place-content-center space-y-2">
			<Spinner />
			{children}
		</section>
	);
};

import { Spinner } from "../ui/spinner";

type Props = {
	isLoading: boolean;
	children: React.ReactNode;
};

export const LoadingIndicator = ({ isLoading, children }: Props) => {
	return (
		<div
			className={`fixed z-[500] bottom-4 right-4 flex flex-col space-y-1 bg-accent p-2 rounded-xl transition-transform ease-in-out ${
				isLoading
					? "translate-y-0 opacity-100 animate-pulse"
					: " translate-y-10 opacity-0"
			}`}
		>
			<Spinner />
			{children}
		</div>
	);
};

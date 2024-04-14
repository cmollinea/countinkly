export const DashboardContainer = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<div className="flex max-lg:flex-col items-center md:px-10 gap-4">
			{children}
		</div>
	);
};

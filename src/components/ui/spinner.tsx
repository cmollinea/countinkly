export const Spinner = () => {
	return (
		<div className="flex space-x-0.5 justify-center items-center">
			<span className="sr-only">Loading...</span>
			<div className="h-2 w-2 bg-accent-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
			<div className="h-2 w-2 bg-accent-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
			<div className="h-2 w-2 bg-accent-foreground rounded-full animate-bounce" />
		</div>
	);
};
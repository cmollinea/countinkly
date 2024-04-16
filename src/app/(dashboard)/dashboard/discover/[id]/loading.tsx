"use client";
import { LoadingRouteIndicator } from "@/components/navigation/loading-route";
import { loadingMessages } from "@/constants";

const Loading = () => {
	const randomMessage =
		loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

	return (
		<LoadingRouteIndicator>
			<p>{randomMessage}</p>
		</LoadingRouteIndicator>
	);
};
export default Loading;

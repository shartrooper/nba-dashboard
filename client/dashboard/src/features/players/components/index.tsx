import { Spinner } from "@/components/Elements/Spinner";
import useFetchPlayers from "../hook/useFetchPlayers"
import { InView } from "react-intersection-observer";
import FeedCard from "./feedCard";

export const PlayersFeed = () => {
	const { data, fetchMore, loading } = useFetchPlayers();
	const loadMore = () => {
		if (!data) return;
		const { meta } = data;
		const { nextPage } = meta;
		fetchMore({ variables: { offset: nextPage, limit: 25 } });
	};


	if (loading) {
		return <Spinner size='lg' />
	}

	return <div className="overflow-auto h-[92vh]">
		<p>NBA Players Feed</p>
		{data?.players.map((player, index) => <FeedCard key={`${player.firstName}-${player.lastName}-${index}`} player={player}></FeedCard>)}
		{data?.players && (
			<InView
				rootMargin="300px 0px"
				onChange={async (inView) => inView && loadMore()}
			/>
		)}
	</div>
}
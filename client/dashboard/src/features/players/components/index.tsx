import { Spinner } from "@/components/Elements/Spinner";
import useFetchPlayers from "../hook/useFetchPlayers"
import { ParsedPlayer } from "../types";
import { InView } from "react-intersection-observer";

type Player = ParsedPlayer;

const FeedCard = (player: Player) => <div>
	<p>{`${player.firstName} - ${player.lastName} Team:"${player.team.name}"`}</p>
</div>

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
		{data?.players.map(player => <FeedCard {...player}></FeedCard>)}
		{data?.players && (
        <InView
          onChange={async (inView) => inView && loadMore()}
        />
      )}
	</div>
}
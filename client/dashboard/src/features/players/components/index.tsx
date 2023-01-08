import { Spinner } from "@/components/Elements/Spinner";
import { useEffect, useRef } from "react";
import useFetchPlayers from "../hook/useFetchPlayers"
import { ParsedPlayer } from "../types";

type Player = ParsedPlayer;

const FeedCard = (player: Player) => <div>
	<p>{`${player.firstName} - ${player.lastName} Team:"${player.team.name}"`}</p>
</div>

export const PlayersFeed = () => {
	const { data, fetchMore, loading } = useFetchPlayers({});
	const bottomBoundaryRef = useRef(null);

	const scrollObserver = (node: Element) => {
		new IntersectionObserver(entries => {
			entries.forEach(en => {
				if (en.intersectionRatio > 0) {
					console.log('boundary reached');
					if (!data) return;
					const { meta } = data;
					const { nextPage, perPage } = meta;
					fetchMore({ variables: { page: nextPage, per_page: perPage } });
				}
			});
		}).observe(node)
	};

	useEffect(() => {
		if (bottomBoundaryRef.current) scrollObserver(bottomBoundaryRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bottomBoundaryRef]);

	if (loading) {
		return <Spinner size='lg' />
	}

	return <div className="overflow-auto h-[92vh]">
		<p>NBA Players Feed</p>
		{data?.players.map(player => <FeedCard {...player}></FeedCard>)}
		{data?.players && <div id='page-bottom-boundary' ref={bottomBoundaryRef} />}
	</div>
}
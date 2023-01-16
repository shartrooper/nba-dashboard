import { Spinner } from "@/components/Elements/Spinner";
import useFetchPlayers from "../hook/useFetchPlayers"
import { InView } from "react-intersection-observer";
import FeedCard from "./feedCard";
import SearchInput from "@/components/search/searchInput";


export const PlayersFeed = () => {
	const { data, fetchMore, loading, refetch } = useFetchPlayers();
	const loadMore = () => {
		if (!data) return;
		const { meta } = data;
		const { nextPage } = meta;
		nextPage && fetchMore({ variables: { offset: nextPage, limit: 25 } });
	};

	const searchPlayer = (searchTerm?: string) => {
		refetch({ search: searchTerm });
	};

	if (loading) {
		return <Spinner size='lg' />
	}

	return <div className="overflow-auto h-[92vh]">
		<p>NBA Players Feed</p>
		<SearchInput cb={searchPlayer} placeholder="Input name to search player..."/>
		{data?.players.map((player, index) => <FeedCard key={`${player.firstName}-${player.lastName}-${index}`} player={player}></FeedCard>)}
		{data?.players && (
			<InView
				rootMargin="300px 0px"
				onChange={async (inView) => inView && loadMore()}
			/>
		)}
	</div>
}
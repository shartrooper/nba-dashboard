import { Spinner } from "@/components/Elements/Spinner";
import useFetchPlayers from "../hook/useFetchPlayers"
import { InView } from "react-intersection-observer";
import FeedCard from "./feedCard";
import SearchInput from "@/components/search/searchInput";
import { DropdownWrapper } from "@/components/Disclosure";

export const FeedContainer = () => {
	const { data, fetchMore, loading: onMountLoading, refetch, loadingMore } = useFetchPlayers();
	const loadMore = () => {
		if (!data) return;
		const { meta } = data;
		const { nextPage } = meta;

		if (nextPage) {
			fetchMore({ variables: { offset: nextPage, limit: 25 } });
		}
	};

	const searchPlayer = (searchTerm?: string) => {
		refetch({ search: searchTerm });
		loadingMore.toggle(true);
	};

	if (onMountLoading) {
		return <Spinner size='lg' />
	}

	const PlayersFeed = () => {
		if (!data?.players) {
			return null;
		}
		return <div>
			{data.players.map((player, index) => <FeedCard key={`${player.firstName}-${player.lastName}-${index}`} player={player}></FeedCard>)}
			<InView
				rootMargin="300px 0px"
				onChange={async (inView) => inView && loadMore()}
			/>
		</div>
	}

	return <>
		<p>NBA Players Feed</p>
		<div className="fixed m-4" >
			<DropdownWrapper description="Search player">
				<div className="flex flex-wrap gap-4">
					<SearchInput cb={searchPlayer} placeholder="Input player name..." />
					{loadingMore.state && <Spinner size="md" className="text-current" />}
				</div>
			</DropdownWrapper>
		</div>
		<PlayersFeed />
	</>
}
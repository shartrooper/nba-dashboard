import { DropdownWrapper } from "@/components/Disclosure"
import { useChartDataStore } from "@/store"
import { teamsLogosImageRoutes } from "@/utils"
import useFetchPlayerStats from "../hook/useFetchPlayerStats"
import { ParsedPlayerStatsResponse } from "../types"
import ChartViewer from "./ChartViewer"
import { DateSeasonForm, FetchDTOValues } from "./Seasonform"
import { Spinner } from "@/components/Elements/Spinner"
import { useNavigatorStore } from "@/store/navigator"


export const Container = ({ id }: { id: number }) => {
	const { addChunk } = useChartDataStore();
	const dispatchToChartDataStore = (chunk?: ParsedPlayerStatsResponse) => {
		if (!chunk) return;
		const { player, stats, meta } = chunk;
		addChunk({ stats, meta }, player.team.name);
	}
	const { data, refetch, fetchMore, loading, loadingMore } = useFetchPlayerStats({ id }, dispatchToChartDataStore);
	const reset = useNavigatorStore(state => state.reset);
	if (loading) return <Spinner size="lg" />

	if (!data) return null;

	const { player: profile } = data;
	const { firstName, lastName, position, team } = profile;

	const loadMore = () => {
		const { nextPage } = data.meta;
		if (nextPage) {
			loadingMore.toggle(true);
			fetchMore({ variables: { page: nextPage } })
		}
	}

	const queryNewData = (dto: FetchDTOValues) => {
		reset();
		loadingMore.toggle(true);
		refetch(dto);
	}

	return <>
		<p>{firstName} {lastName}</p>
		<p>Position: {position}</p>
		<img alt={`${team.name} logo`} src={teamsLogosImageRoutes[team.name]} className="w-14 h-14"></img>
		<DropdownWrapper description="Season Input">
			<DateSeasonForm fetch={queryNewData} playerId={id} isLoading={loadingMore.state} />
		</DropdownWrapper>
		<ChartViewer loadMoreCallback={loadMore} isLoading={loadingMore.state} />
	</>
}
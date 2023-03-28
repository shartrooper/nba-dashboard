import { DropdownWrapper } from "@/components/Disclosure"
import { useChartDataStore } from "@/store"
import { teamsLogosImageRoutes } from "@/utils"
import useFetchPlayerStats from "../hook/useFetchPlayerStats"
import { ParsedPlayerStatsResponse } from "../types"
import ChartViewer from "./ChartViewer"
import { DateSeasonForm } from "./Seasonform"


export const Container = ({ id }: { id: number }) => {
	const { addChunk } = useChartDataStore();
	const dispatchToChartDataStore = (chunk?: ParsedPlayerStatsResponse) => {
		if (!chunk) return;
		const { player, stats, meta } = chunk;
		addChunk({ stats, meta }, player.team.name);
	}
	const { data, refetch } = useFetchPlayerStats({ id }, dispatchToChartDataStore);
	if (!data) return null;
	const { player: profile } = data;
	const { firstName, lastName, position, team } = profile;

	return <>
		<p>{firstName} {lastName}</p>
		<p>Position: {position}</p>
		<img alt={`${team.name} logo`} src={teamsLogosImageRoutes[team.name]} className="w-14 h-14"></img>
		<DropdownWrapper description="Season Input">
			<DateSeasonForm fetch={refetch} playerId={id} />
		</DropdownWrapper>
		<ChartViewer />
	</>
}
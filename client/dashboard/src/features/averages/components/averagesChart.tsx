import { mapIntoValuesArray } from "@/utils";
import useFetchPlayerAverages from "../hook/useFetchPlayersAverages"


type Tboundaries = string | number | symbol

type Props<Tkeys extends Tboundaries> = {
	season: number,
	playerIds: Record<Tkeys, number>
}

export function AveragesChartContainer<K extends Tboundaries>({ season, playerIds }: Props<K>) {
	type PlayersIdsProps = typeof playerIds;
	const { data } = useFetchPlayerAverages<PlayersIdsProps>({
		season,
		player_ids: mapIntoValuesArray<PlayersIdsProps, number>(playerIds),
		...playerIds
	});
	console.log(data);
	return <div>
		PLACEHOLDER
	</div>
}
import { mapIntoValuesArray } from "@/utils";
import useFetchPlayerAverages from "../hook/useFetchPlayersAverages"
import useLazyFetchPlayers from "@/features/players/hook/useLazyFetchPlayers";
import PlayerComboBox from "./playerBox";

type Tboundaries = string | number | symbol

type Props<Tkeys extends Tboundaries> = {
	season: number,
	playerIds: Record<Tkeys, number>
}

export function AveragesChartContainer<K extends Tboundaries>({ season, playerIds }: Props<K>) {
	type PlayersIdsProps = typeof playerIds;
	const { data, loading: playerAveragesLoader } = useFetchPlayerAverages<PlayersIdsProps>({
		season,
		player_ids: mapIntoValuesArray<PlayersIdsProps, number>(playerIds),
		...playerIds
	});

	const [, loading, playerSuggestions, refetch] = useLazyFetchPlayers();

	const onUpdatePlayerSuggestions = (query: string) => {
		refetch({ search: query });
	}

	if (!data) {
		return null;
	}

	const { players } = data;
	
	return <div>
		{
			players.map(player =>
				<PlayerComboBox
					initialPlayer={player}
					suggestions={playerSuggestions}
					loading={loading}
					onInputChange={onUpdatePlayerSuggestions}
				/>)
		}
	</div>
}
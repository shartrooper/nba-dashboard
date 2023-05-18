import { mapIntoValuesArray } from "@/utils";
import useFetchPlayerAverages from "../hook/useFetchPlayersAverages"
import useLazyFetchPlayers from "@/features/players/hook/useLazyFetchPlayers";
import PlayerComboBox from "./playerBox";
import { ParsedAveragedPlayer } from "../types";
import { useState } from "react";

type Tboundaries = string | number | symbol

type Props<Tkeys extends Tboundaries> = {
	season: number,
	initialPlayersIds: Record<Tkeys, number>
}

export function AveragesChartContainer<K extends Tboundaries>({ season, initialPlayersIds }: Props<K>) {
	type PlayersIdsProps = typeof initialPlayersIds;
	const [playersIds, setPlayersIds] = useState<PlayersIdsProps>(initialPlayersIds);
	const { data, loading: loadingPlayerAverages, refetch: refetchPlayersAverages } = useFetchPlayerAverages<PlayersIdsProps>({
		season,
		player_ids: mapIntoValuesArray<PlayersIdsProps, number>(playersIds),
		...playersIds
	});

	const [, loading, playerSuggestions, refetchPlayers] = useLazyFetchPlayers();

	const onUpdatePlayerSuggestions = (query: string) => {
		refetchPlayers({ search: query });
	}

	const onUpdatePlayerSelection = (selected: ParsedAveragedPlayer, index?: number) => {
		//NOTE: index is never undefined in this case.
		index = index as number | never;
		const player_ids = mapIntoValuesArray<PlayersIdsProps, number>(playersIds);
		player_ids[index] = selected.id;
		const targetPlayer = Object.keys(playersIds)[index];
		const updatedPlayerIds = { ...playersIds, [targetPlayer]: selected.id } as PlayersIdsProps;
		setPlayersIds(updatedPlayerIds);
		refetchPlayersAverages({ player_ids, ...updatedPlayerIds });
	}

	if (!data) {
		return loadingPlayerAverages ? <p>Loading..</p> : null;
	}

	const { players } = data;

	return <div>
		{
			players.map((player, index) =>
				<PlayerComboBox
					player={player}
					suggestions={playerSuggestions}
					loading={loading}
					onInputChange={onUpdatePlayerSuggestions}
					onSelectorChange={onUpdatePlayerSelection}
					itemIndex={index}
				/>)
		}
	</div>
}
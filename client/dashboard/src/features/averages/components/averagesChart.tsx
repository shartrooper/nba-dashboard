import { mapIntoValuesArray } from "@/utils";
import useFetchPlayerAverages from "../hook/useFetchPlayersAverages"
import useLazyFetchPlayers from "@/features/players/hook/useLazyFetchPlayers";
import PlayerComboBox from "./playerBox";
import { ParsedAveragedPlayer } from "../types";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

	const { players, seasonAverages } = data;

	const chartData: { name: string, pts: number, turnover: number, gamesPlayed: number }[] = seasonAverages.map(average => {
		const { pts, turnover, gamesPlayed, playerId } = average;
		const matchedPlayer = players.find(player => player.id === playerId) as ParsedAveragedPlayer | never;
		const { firstName, lastName } = matchedPlayer;
		const name = `${firstName} ${lastName}`;
		return {
			pts,
			turnover,
			gamesPlayed,
			name
		}
	});

	return <div>
		<ResponsiveContainer height={250} width={'70%'}>
			<BarChart data={chartData}>
				<CartesianGrid strokeDasharray="6 6" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="pts" fill="#fb923c" />
				<Bar dataKey="gamesPlayed" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
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
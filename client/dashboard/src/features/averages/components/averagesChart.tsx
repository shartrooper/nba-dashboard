import { mapIntoValuesArray } from "@/utils";
import useFetchPlayerAverages from "../hook/useFetchPlayersAverages"
import useLazyFetchPlayers from "@/features/players/hook/useLazyFetchPlayers";
import PlayerComboBox from "./playerBox";
import { ParsedAveragedPlayer } from "../types";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Spinner } from "@/components/Elements/Spinner";
import clsx from "clsx";

type Tboundaries = string | number | symbol

type Props<Tkeys extends Tboundaries> = {
	season: number,
	initialPlayersIds: Record<Tkeys, number>
}

const containerStyle = "text-center"

export function AveragesChartContainer<K extends Tboundaries>({ season, initialPlayersIds }: Props<K>) {
	type PlayersIdsProps = typeof initialPlayersIds;
	const [playersIds, setPlayersIds] = useState<PlayersIdsProps>(initialPlayersIds);
	const { data, loading: loadingPlayerAverages, refetch: refetchPlayersAverages } = useFetchPlayerAverages<PlayersIdsProps>({
		season,
		player_ids: mapIntoValuesArray<PlayersIdsProps, number>(playersIds),
		...playersIds
	});
	const [getPlayers, loading, playerSuggestions, refetchPlayers] = useLazyFetchPlayers();
	const [selectedPlayer, setSelectedPlayer] = useState<{ player: ParsedAveragedPlayer, pos: number }>();

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

	useEffect(() => { getPlayers() }, [getPlayers]);

	if (!data) {
		return loadingPlayerAverages ?
			<div className={clsx(containerStyle, "grid place-items-center")} >
				<Spinner size="lg" />
				<span className="text-basketball-dim font-semibold" >Building chart...</span>
			</div>
			: null;
	}

	const { players, seasonAverages } = data;

	const chartData: { name: string, pts: number, turnover: number, gamesPlayed: number }[] = players.map((player, index) => {
		const { firstName, lastName } = player;
		const name = `${index} ${firstName} ${lastName}`;
		const matchedStats = seasonAverages.find(stat => stat.playerId === player.id);
		if (!matchedStats) {
			return {
				pts: 0,
				turnover: 0,
				gamesPlayed: 0,
				name
			}
		}
		const { pts, turnover, gamesPlayed, } = matchedStats;
		return {
			pts,
			turnover,
			gamesPlayed,
			name
		}
	});

	return <div className={containerStyle}>
		<p>Current Season's players averages</p>
		<ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-chalkboard">
			<li>* 6 randomly picked players are showcased</li>
			<li>* You can input your desired player to update the chart</li>
		</ul>
		<ResponsiveContainer height={250} width={'100%'}>
			<BarChart
				onClick={target => {
					const label = target.activeLabel as string;
					const [index, labelFirstName, labelLastName] = label.split(' ');

					const foundPlayer: ParsedAveragedPlayer = players.find(player => {
						const { firstName, lastName } = player;
						return labelFirstName === firstName && labelLastName === lastName
					}) as ParsedAveragedPlayer | never;

					setSelectedPlayer({
						player: foundPlayer, pos: parseInt(index)
					})
				}}
				margin={{ left: -35 }}
				data={chartData}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip labelClassName="text-midnight" />
				<Legend />
				<Bar dataKey="pts" fill="#fb923c" />
				<Bar dataKey="gamesPlayed" fill="#82ca9d" />
				<Bar dataKey="turnover" fill="#ff5734" />
			</BarChart>
		</ResponsiveContainer>
		<div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
			<PlayerComboBox
				player={selectedPlayer?.player ?? players[0]}
				suggestions={playerSuggestions}
				loading={loading}
				onInputChange={onUpdatePlayerSuggestions}
				onSelectorChange={onUpdatePlayerSelection}
				itemIndex={selectedPlayer?.pos ?? 0}
			/>
		</div>
	</div>
}
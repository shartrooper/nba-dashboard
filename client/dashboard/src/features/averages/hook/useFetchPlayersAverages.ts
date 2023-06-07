import { GET_SIX_PLAYERS_AVERAGES } from '../api';
import { useFetchService } from '@/utils';
import { AveragedPlayerRecord, AveragesResponse, ParsedAveragedPlayer, ParsedAverages } from '../types';

type RequestParams = {
	season: number,
	player_ids: number[]
}

export type PlayerIds<TplayerIds> = { [Property in keyof TplayerIds]: number }

interface ParsedSeasonAverages {
	players: ParsedAveragedPlayer[],
	seasonAverages: ParsedAverages[]
}

const parsePlayerAveragesData = (response?: Record<string, AveragedPlayerRecord | AveragesResponse>) => {
	if (!response) return;

	const parsedResponse = Object.keys(response).reduce((prev, current) => {
		if ('data' in response[current]) {
			const { data } = response[current] as AveragesResponse;
			const seasonAverages = data.map(stat => ({ playerId: stat.player_id, gamesPlayed: stat.games_played, pts: stat.pts, turnover: stat.turnover }))
			return { ...prev, seasonAverages }
		}
		const playerData = response[current] as AveragedPlayerRecord;
		const { id, team } = playerData;
		const nextPlayer = { id, team, firstName: playerData.first_name, lastName: playerData.last_name };
		return { ...prev, players: [...prev.players, nextPlayer] }
	}, { players: [], seasonAverages: [] } as ParsedSeasonAverages);

	return parsedResponse;
}

const useFetchPlayers = <T>(params: RequestParams & PlayerIds<T>) => {
	const { data, refetch, loading } = useFetchService(params, GET_SIX_PLAYERS_AVERAGES)
	return { data: parsePlayerAveragesData(data), refetch, loading };
}

export default useFetchPlayers;
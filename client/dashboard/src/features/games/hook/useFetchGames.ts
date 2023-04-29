import { useFetchService } from '@/utils/helpers';
import { POLL_GAMES } from '../api';
import { GetPollGamesPayload, ParsedGame } from '../types';

export type RequestParams = {
	start_date?: string,
	end_date?: string,
	seasons?: number[],
	team_ids?: number[],
	postseason?: boolean,
}

const parsePollGamesResponse = (data: unknown): ParsedGame[] | undefined => {
	const response = data as GetPollGamesPayload;
	if (!response?.games) {
		return;
	}
	const gamesPayload: ParsedGame[] = response.games.records.map(game => ({
		...game,
		homeTeam: game.home_team,
		visitorTeam: game.visitor_team,
		visitorTeamScore: game.visitor_team_score,
		homeTeamScore: game.home_team_score
	}));
	return gamesPayload;
}

export const usePollGames = (params: RequestParams) => {
	const { data, loading } = useFetchService(params, POLL_GAMES, { pollInterval: 630000 })
	return { data: parsePollGamesResponse(data), loading };
}
import { useNotificationStore } from '@/store';
import { handleErrorService } from '@/utils/helpers';
import { DocumentNode, QueryFunctionOptions, useQuery } from '@apollo/client';
import { useState } from 'react';
import { POLL_GAMES } from '../api';
import { GetPollGamesPayload, ParsedGame } from '../types';

export type RequestParams = {
	start_date?: string,
	end_date?: string,
	seasons?: number[],
	team_ids?: number[],
	postseason?: boolean,
}

const useFetchGames = (params: RequestParams, query: DocumentNode, configOption: QueryFunctionOptions) => {
	const { addNotification } = useNotificationStore();
	const onError = handleErrorService(addNotification);
	const [state, toggle] = useState(false);
	const { data, loading, fetchMore, refetch } = useQuery(query, {
		variables: { ...params },
		onError,
		onCompleted: () => {
			toggle(false);
		},
		...configOption
	});
	return { data, loading, fetchMore, refetch, loadingMore: { state, toggle } }
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
	const { data, loading } = useFetchGames(params, POLL_GAMES, { pollInterval: 8000 })
	return { data: parsePollGamesResponse(data), loading };
}
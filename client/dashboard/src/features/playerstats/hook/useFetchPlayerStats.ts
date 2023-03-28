import { parsedPlayerData } from '@/features/players/hook/useFetchPlayer';
import { GetPlayerPayload, ParsedPlayer } from '@/features/players/types';
import { useNotificationStore } from '@/store';
import { handleError } from '@/utils';
import { getErrorMsg, getInfoMsg } from '@/utils/helpers';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PLAYER_PROFILE_STATS } from '../api';
import { ParsedPlayerStatsResponse, PlayerStatsPayload } from '../types';

export type RequestParams = {
	id: number,
	start_date?: string,
	end_date?: string,
	seasons?: number[]
}

export const parsedPlayerStatData = (data: unknown): ParsedPlayerStatsResponse | undefined => {
	const response = data as PlayerStatsPayload & GetPlayerPayload;

	if (!response) {
		return;
	}

	const { player, playersStats } = response;
	const metaPayload = playersStats.meta;

	return {
		player: parsedPlayerData({ player }) as ParsedPlayer,
		stats: playersStats.records,
		meta: {
			nextPage: metaPayload.next_page,
			currentPage: metaPayload.current_page,
			perPage: metaPayload.per_page
		}
	}
};

const useFetchPlayerStats = (params: RequestParams, cb: (data?: ParsedPlayerStatsResponse) => void) => {
	const { addNotification } = useNotificationStore();
	const [state, toggle] = useState(false);
	const { data, loading, fetchMore, refetch } = useQuery(GET_PLAYER_PROFILE_STATS, {
		variables: { ...params, playerIds: [params.id] },
		onError: (error) => {
			const errorResponses = handleError(error);
			if (errorResponses.length === 1 && errorResponses[0].statusCode === 401) {
				addNotification(getInfoMsg('Expired Token', 'Please login again.'));
				return;
			}
			errorResponses.forEach((item) => {
				addNotification(getErrorMsg(`Error status ${item.statusCode}`, item.message));
			});
		},
		onCompleted: data => {
			toggle(false);
			cb(parsedPlayerStatData(data));
		}
	});
	return { data: parsedPlayerStatData(data), fetchMore, refetch, loading, loadingMore: { state, toggle } };
};

export default useFetchPlayerStats;

import { useNotificationStore } from '@/store';
import { handleError } from '@/utils';
import { getErrorMsg, getInfoMsg } from '@/utils/helpers';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PLAYER_STATS } from '../api';
import { ParsedPlayerStatsResponse, PlayerStatsPayload } from '../types';

export type RequestParams = {
	playerIds: string[],
	start_date?: string,
	end_date?: string,
	seasons?: number[]
}

const parsedPlayerStatData = (data: unknown): ParsedPlayerStatsResponse | undefined => {
	const response = data as PlayerStatsPayload;
	if (!response?.playersStats) {
		return;
	}
	const metaPayload = response.playersStats.meta ;
	return {
		stats: response.playersStats.records,
		meta: {
			nextPage: metaPayload.next_page,
			currentPage: metaPayload.current_page,
			perPage: metaPayload.per_page
		}
	}
};

const useFetchPlayerStats = (params: RequestParams) => {
	const { addNotification } = useNotificationStore();
	const [state, toggle] = useState(false);
	const { data, loading, fetchMore, refetch } = useQuery(GET_PLAYER_STATS, {
		variables: { ...params },
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
		onCompleted: () => {
			toggle(false);
		}
	});
	return { data: parsedPlayerStatData(data), fetchMore, refetch, loading, loadingMore: { state, toggle } };
};

export default useFetchPlayerStats;

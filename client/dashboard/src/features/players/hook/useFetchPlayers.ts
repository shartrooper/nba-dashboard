import { useNotificationStore } from '@/store';
import { handleError } from '@/utils';
import { getErrorMsg, getInfoMsg } from '@/utils/helpers';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PLAYERS } from '../api';
import { GetPlayersPayload, ParsedPlayer, ParsedPlayersResponse } from '../types';

export type RequestParams = {
	search?: string,
	offset?: number,
	limit?: number
}

const parsedPlayersData = (data: unknown): ParsedPlayersResponse | undefined => {
	const response = data as GetPlayersPayload;
	if (!response?.players) {
		return;
	}
	const playersPayload: ParsedPlayer[] = response.players.records.map((record) => ({ ...record, firstName: record.first_name, lastName: record.last_name }));
	const metaPayload = response.players.meta;
	return {
		players: playersPayload,
		meta: {
			nextPage: metaPayload.next_page,
			currentPage: metaPayload.current_page,
			perPage: metaPayload.per_page
		}
	}
};

const useFetchPlayers = (params: RequestParams = { limit: 100 }) => {
	const { addNotification } = useNotificationStore();
	const [state, toggle] = useState(false);
	const { data, loading, fetchMore, refetch } = useQuery(GET_PLAYERS, {
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
	return { data: parsedPlayersData(data), fetchMore, refetch, loading, loadingMore: { state, toggle } };
};

export default useFetchPlayers;

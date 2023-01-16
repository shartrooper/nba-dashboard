import { useNotificationStore } from '@/store';
import { handleError } from '@/utils';
import { getErrorMsg, getInfoMsg } from '@/utils/helpers';
import { useQuery } from '@apollo/client';
import { GET_PLAYER } from '../api';
import { GetPlayerPayload, ParsedPlayer } from '../types';


const parsedPlayerData = (data: unknown): ParsedPlayer | undefined => {
	const response = data as GetPlayerPayload;
	if (!response?.player) {
		return;
	}
	const player = response.player;
	return {
		firstName: player.first_name,
		lastName: player.last_name,
		...player
	}
};

const useFetchPlayers = (id: string) => {
	const { addNotification } = useNotificationStore();
	const { data, loading } = useQuery(GET_PLAYER, {
		variables: { id },
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
	});
	return { data: parsedPlayerData(data), loading };
};

export default useFetchPlayers;
import { useNotificationStore } from '@/store';
import { useQuery } from '@apollo/client';
import { GET_PLAYER } from '../api';
import { GetPlayerPayload, ParsedPlayer } from '../types';
import { handleErrorService } from '@/utils';


export const parsedPlayerData = (data: unknown): ParsedPlayer | undefined => {
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

const useFetchPlayers = (id: number) => {
	const { addNotification } = useNotificationStore();
	const onError = handleErrorService(addNotification);
	const { data, loading } = useQuery(GET_PLAYER, {
		variables: { id },
		onError
	});
	return { data: parsedPlayerData(data), loading };
};

export default useFetchPlayers;
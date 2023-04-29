import { GET_SIX_PLAYERS_AVERAGES } from '../api';
import { useFetchService } from '@/utils';

type RequestParams = {
	season: number,
	player_ids: number[]
}

export type PlayerIds <TplayerIds> = { [Property in keyof TplayerIds]: number }

const useFetchPlayers = <T>(params: RequestParams & PlayerIds<T>) => {
	const { data, refetch, loading } = useFetchService(params, GET_SIX_PLAYERS_AVERAGES)
	return { data, refetch, loading };
}

export default useFetchPlayers;
import { useFetchService } from "@/utils";
import { GET_PLAYERS_FULL } from "../api";
import { RequestParams } from '@/features/players/hook/useFetchPlayers';
import { FullPlayerRecord, Records } from "@/types";

type FullPlayerPayload = Records<FullPlayerRecord>;

const parsedPlayersData = (payload?: { players: FullPlayerPayload }) => {
	if (!payload) return;
	return payload.players.records.map((record: FullPlayerRecord) => ({ ...record, firstName: record.first_name, lastName: record.last_name }));
}

const useFullFetchPlayers = (params: RequestParams) => {
	const { data, loading } = useFetchService(params, GET_PLAYERS_FULL, { fetchPolicy: 'no-cache' });

	return { players: parsedPlayersData(data), loading };
}

export default useFullFetchPlayers;
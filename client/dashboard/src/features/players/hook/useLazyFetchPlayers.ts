import { useNotificationStore } from "@/store";
import { RequestParams, parsedPlayersData } from "./useFetchPlayers";
import { handleErrorService } from "@/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_PLAYERS } from "../api";

const useLazyFetchPlayers = (params: RequestParams = { limit: 50 }) => {
	const { addNotification } = useNotificationStore();
	const onError = handleErrorService(addNotification);

	const [getPlayers, { loading, data, refetch }] = useLazyQuery(GET_PLAYERS,
		{
			variables: { ...params },
			onError
		}
	)

	return [getPlayers, loading, parsedPlayersData(data)?.players, refetch] as const;
}

export default useLazyFetchPlayers;
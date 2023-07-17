import { useLazyQuery } from "@apollo/client";
import { SEASON_AVERAGES } from "../api";
import { RequestParams } from "./useFetchPlayersAverages";
import { useNotificationStore } from "@/store";
import { handleErrorService } from "@/utils";
import { SeasonAverages } from "@/types";



const useLazyFetchSeasonAverages = (params?: RequestParams) => {
	const { addNotification } = useNotificationStore();
	const onError = handleErrorService(addNotification);

	const [getAverages, { loading, data, refetch }] = useLazyQuery(SEASON_AVERAGES,
		{
			fetchPolicy: 'cache-and-network',
			variables: { ...params },
			onError
		}
	)

	return [getAverages, loading, data?.seasonAverages.data as SeasonAverages, refetch] as const;
}

export default useLazyFetchSeasonAverages;
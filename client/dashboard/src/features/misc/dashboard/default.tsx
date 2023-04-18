import { GamesBoardContainer } from "@/features/games/components";
import { usePollGames } from "@/features/games/hook/useFetchGames";
import { getWeekInterval } from "@/utils";
import dayjs from "dayjs";


export const MainContainer = () => {
	const [start_date, end_date] = getWeekInterval(dayjs());
	const { data } = usePollGames({ start_date, end_date });

	if (!data) {
		return null;
	}

	const { season } = data[0]
	return <div><GamesBoardContainer games={data} currentSeason={season} /></div>
};
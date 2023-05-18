import { idKeys } from "@/features/averages/api";
import { AveragesChartContainer } from "@/features/averages/components";
import { GamesBoardContainer } from "@/features/games/components";
import { usePollGames } from "@/features/games/hook/useFetchGames";
import { MAX_PLAYERS, getWeekInterval } from "@/utils";
import dayjs from "dayjs";
import { useRef } from "react";

const getRandomPlayerIds = () => idKeys.reduce((ids, param) => ({ ...ids, [param]: Math.floor(Math.random() * MAX_PLAYERS) }), {});

export const MainContainer = () => {
	const [start_date, end_date] = getWeekInterval(dayjs());
	const { data } = usePollGames({ start_date, end_date });
	const initialPlayerIdsValues = useRef(getRandomPlayerIds());
	
	if (!data) {
		return null;
	}

	const { season } = data[0];

	return <div className="flex justify-center">
		<GamesBoardContainer games={data} currentSeason={season} />
		<AveragesChartContainer<keyof typeof initialPlayerIdsValues.current> season={season} initialPlayersIds={initialPlayerIdsValues.current} />
	</div>
};
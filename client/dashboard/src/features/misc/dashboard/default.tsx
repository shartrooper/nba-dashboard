import { idKeys } from "@/features/averages/api";
import { AveragesChartContainer } from "@/features/averages/components";
import { GamesBoardContainer } from "@/features/games/components";
import { usePollGames } from "@/features/games/hook/useFetchGames";
import { MAX_PLAYERS, getWeekInterval } from "@/utils";
import dayjs from "dayjs";

const getRandomPlayerIds = () => idKeys.reduce((ids, param) => ({ ...ids, [param]: Math.floor(Math.random() * MAX_PLAYERS) }), {});

const INITIALIZE_PLAYERS_AVERAGES = getRandomPlayerIds();

export const MainContainer = () => {
	const [start_date, end_date] = getWeekInterval(dayjs());
	const { data } = usePollGames({ start_date, end_date });

	if (!data) {
		return null;
	}

	const { season } = data[0]
	return <div>
		<GamesBoardContainer games={data} currentSeason={season} />
		<AveragesChartContainer<keyof typeof INITIALIZE_PLAYERS_AVERAGES> season={season} playerIds={INITIALIZE_PLAYERS_AVERAGES} />
	</div>
};
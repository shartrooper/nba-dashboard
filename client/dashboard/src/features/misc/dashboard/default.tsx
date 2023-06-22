import { Spinner } from "@/components/Elements/Spinner";
import Input from "@/components/Input/generic";
import { idKeys } from "@/features/averages/api";
import { AveragesChartContainer } from "@/features/averages/components";
import { GamesBoardContainer } from "@/features/games/components";
import { usePollGames } from "@/features/games/hook/useFetchGames";
import { MAX_PLAYERS, getWeekInterval, parseDate } from "@/utils";
import { TicketIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

const getRandomPlayerIds = () => idKeys.reduce((ids, param) => ({ ...ids, [param]: Math.floor(Math.random() * MAX_PLAYERS) }), {});

export const MainContainer = () => {
	const [weekInterval, setWeekInterval] = useState<string[]>(getWeekInterval(parseDate.today));
	const [start_date, end_date] = weekInterval;
	const { data, loading } = usePollGames({ start_date, end_date });
	const initialPlayerIdsValues = useRef(getRandomPlayerIds());

	const handleWeekChange = ({ target: { value } }: { target: { value?: string } }) => {
		value && setWeekInterval(getWeekInterval(value));
	};
	const DashboardContent: React.FC = () => {
		if (!data?.length) {
			return <div className="text-center grid place-items-center mt-6" >
				{loading ? <Spinner size="lg" /> : <><TicketIcon className="h-8 w-8" />There aren't any games scheduled for this week.</>}
			</div>;
		}
		const { season } = data[0];
		return <>
			<GamesBoardContainer games={data} boardTitle={`Season ${data[0].season} games, from ${parseDate.dayAndMonth(start_date)} to ${parseDate.dayAndMonth(end_date)}`} />
			<AveragesChartContainer<keyof typeof initialPlayerIdsValues.current> season={season} initialPlayersIds={initialPlayerIdsValues.current} />
		</>
	}

	return <div className="flex flex-col">
		<Input type="date" onChange={handleWeekChange} />
		<DashboardContent />
	</div>
};
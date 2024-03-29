import Input from "@/components/Input/generic";
import { idKeys } from "@/features/averages/api";
import { AveragesChartContainer } from "@/features/averages/components";
import ChartLoader from "@/features/averages/components/chartLoader";
import { GamesBoardContainer } from "@/features/games/components";
import { usePollGames } from "@/features/games/hook/useFetchGames";
import { screenLoaderSlice } from "@/store";
import { MAX_PLAYERS, getWeekInterval, parseDate } from "@/utils";
import { TicketIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const getRandomPlayerIds = () => idKeys.reduce((ids, param) => ({ ...ids, [param]: Math.floor(Math.random() * MAX_PLAYERS) }), {});

export const MainContainer = () => {
	const [weekInterval, setWeekInterval] = useState<string[]>(getWeekInterval(parseDate.today));
	const [start_date, end_date] = weekInterval;
	const { data, loading } = usePollGames({ start_date, end_date });
	const [playersIds, setPlayersIds] = useState(getRandomPlayerIds());
	const { toggle } = screenLoaderSlice(state => state);
	const handleWeekChange = ({ target: { value } }: { target: { value?: string } }) => {
		value && setWeekInterval(getWeekInterval(value));
	};

	useEffect(() => toggle(loading), [loading, toggle]);

	const handlePlayersChange = (updatePlayersIds: Record<keyof typeof setPlayersIds, number>) => {
		setPlayersIds(updatePlayersIds);
	}
	const DashboardContent: React.FC = () => {
		if (!data?.length) {
			return <div className="text-center grid place-items-center mt-6" >
				<><TicketIcon className="h-8 w-8" />There aren't any games scheduled for this week.</>
			</div>;
		}
		const { season } = data[0];
		return <>
			<GamesBoardContainer games={data} boardTitle={`Season ${data[0].season} games, from ${parseDate.dayAndMonth(start_date)} to ${parseDate.dayAndMonth(end_date)}`} />
			<div className="relative">
				<ChartLoader loaderText="Building chart..."/>
				<AveragesChartContainer<keyof typeof playersIds> season={season} playersIds={playersIds} setPlayersIds={handlePlayersChange} />
			</div>
		</>
	}

	return <div className="flex flex-col">
		<Input type="date" onChange={handleWeekChange} />
		<DashboardContent />
	</div>
};
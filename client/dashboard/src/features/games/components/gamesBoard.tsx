import { usePollGames } from "../hook/useFetchGames"

export const GamesBoardContainer = () => {
	const { data } = usePollGames({ start_date: '2023-10-04', end_date: '2023-10-04' });
	return <div>Currents Game Board</div>
};
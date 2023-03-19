import useFetchPlayer from "@/features/players/hook/useFetchPlayer";
import { useParams } from "react-router-dom";
import { DateSeasonForm } from "./Seasonform";

export const PlayerStatsContainer = () => {
	const { playerId } = useParams();
	const setPlayerId = playerId ?? '';
	const { data } = useFetchPlayer(setPlayerId);

	if (!data) {
		return null;
	}

	return (
		<>
			<DateSeasonForm player={data} />
		</>
	);
}
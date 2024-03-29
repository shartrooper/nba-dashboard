import { useParams } from "react-router-dom";
import { Container } from "./container";

export const PlayerStatsWrapper = () => {
	const { playerId } = useParams();

	if (!playerId) return null;

	return (
		<div>
			<Container id={parseInt(playerId)} />
		</div>
	);
}
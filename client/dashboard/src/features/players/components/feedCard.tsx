import { ParsedPlayer } from '../types'
import { teamsLogosImageRoutes } from '@/utils';
import { Link } from 'react-router-dom';

const FeedCard = ({ player }: { player: ParsedPlayer }) => {
	const { firstName, lastName, id, position, team: { name: teamName } } = player;
	return (
		<div className="pt-8">
			<div className="border-2 border-chalkboard w-full flex justify-around items-center">
				<Link className="nav-link" to={`../player/${id}`} >
					<p> {firstName} {lastName} </p>
				</Link>
				<p>Pos: {position || "N/A"}</p>
				<img alt={`${teamName} logo`} src={teamsLogosImageRoutes[teamName]} className="w-14 h-14"></img>
			</div>
		</div>
	)
};

export default FeedCard;
import { ParsedPlayer } from '../types'
import { teamsLogosImageRoutes } from '@/utils';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const FeedCard = ({ player }: { player: ParsedPlayer }) => {
	const { firstName, lastName, id, position, team: { name: teamName } } = player;

	const FeedItem: React.FC<PropsWithChildren<{}>> = ({ children }) => <div className="grid place-items-center">{children}</div>;

	return (
		<div className="pt-8">
			<div className="border-2 border-chalkboard grid grid-cols-3">
				<FeedItem>
					<Link className="nav-link" to={`../player/${id}`} >
						<p>{firstName} {lastName}</p>
					</Link>
				</FeedItem>
				<FeedItem>
					<p>Pos: {position || "N/A"}</p>
				</FeedItem>
				<FeedItem>
					<img alt={`${teamName} logo`} src={teamsLogosImageRoutes[teamName]} className="w-14 h-14"></img>
				</FeedItem>
			</div>
		</div>
	)
};

export default FeedCard;
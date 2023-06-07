import { PlayerRecord, queryFields } from '@/features/players/types';
import { SeasonAverages } from '@/types';

export const getAverages = "seasonAverages";
export const fragmentName = "PlayerData"
const playerQueryFields = queryFields.slice(0, -1);
export const playerQueryArgs = (id: number) => `id: $id${id}`
export const seasonAveragesParams = ['$season: Int!', '$player_ids: [Int!]'];

export const averagesQueryFields = [
	`data {
		pts
		games_played
		player_id
		turnover
	}`
];

export const averageStatsParams = [
	"$playerIds: [Int!]",
	"$season: Int!"
];

export const PLAYER_FRAGMENT = `
	fragment ${fragmentName} on Player {
		${playerQueryFields.join(' ')}
	}
`;

type PlayerPoints = Pick<SeasonAverages, 'player_id' | 'games_played' | 'pts' | 'turnover'>

export type AveragesResponse = { data: PlayerPoints[] }

export type AveragedPlayerRecord = Omit<PlayerRecord, 'position'>

export type ParsedAverages = Omit<PlayerPoints, 'player_id' | 'games_played'> & {
	playerId: number,
	gamesPlayed: number
}

export type ParsedAveragedPlayer = Omit<AveragedPlayerRecord, 'first_name' | 'last_name'> & {
	firstName: string,
	lastName: string
}
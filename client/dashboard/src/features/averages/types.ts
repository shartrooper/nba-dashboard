import { PlayerRecord, queryFields } from '@/features/players/types';
import { SeasonAverages } from '@/types';
import { objectKeys } from '@/utils';

export const getAverages = "seasonAverages";
export const fragmentName = "PlayerData"
const playerQueryFields = queryFields.slice(0, -1);
export const playerQueryArgs = (id: number) => `id: $id${id}`
export const seasonAveragesParams = ['$season: Int!', '$player_ids: [Int!]'];


const averageFields = {
	player_id: "player_id",
	games_played: "games_played",
	ast: "ast",
	blk: "blk",
	dreb: "dreb",
	fg3_pct: "fg3_pct",
	fg3a: "fg3a",
	fg3m: "fg3m",
	fg_pct: "fg_pct",
	fga: "fga",
	fgm: "fgm",
	ft_pct: "ft_pct",
	fta: "ft_pct",
	ftm: "ft_pct",
	min: "min",
	oreb: "oreb",
	pf: "pf",
	pts: "pts",
	reb: "reb",
	stl: "stl",
	turnover: "turnover"
}


const { pts, games_played, player_id, turnover } = averageFields;

export const averagesQueryFields = [
	`data {
		${pts}
		${games_played}
		${player_id}
		${turnover}
	}`
];

export const seasonAveragesQueryFields = [
	`data {
		${objectKeys(averageFields).reduce((str, field) => `${str}${field} `, '')}
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
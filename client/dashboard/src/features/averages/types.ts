import { queryFields } from '@/features/players/types';

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
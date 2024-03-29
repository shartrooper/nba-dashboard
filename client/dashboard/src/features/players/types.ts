import { FullPlayerRecord, Metadata, ParsedMetaData, ResponsePayload } from "@/types";

export const getPlayers = 'players';
export const getPlayer = 'player';

export const queryFields = ['id', 'first_name', 'last_name', 'team {name}', 'position'];

const playerQueryBody = `{ ${queryFields.join(' ')} }`;

export const playersQueryBody = [
	`records ${playerQueryBody}`,
	'meta { next_page current_page per_page }'
];

export const playerQueryId = '$id: Int!';

export const playersQueryParams = [
	'$search: String', '$offset: Int', '$limit: Int'
];

export type PlayerRecord = Omit<FullPlayerRecord, 'height' | 'weight'>;

export type GetPlayerPayload = {
	player: PlayerRecord
}

export type GetPlayersPayload = {
	players: ResponsePayload<PlayerRecord, Omit<Metadata, 'total_count'>>
};

export type ParsedPlayer = Omit<PlayerRecord, 'first_name' | 'last_name'> &
{
	firstName: string;
	lastName: string;
}

export type ParsedPlayersResponse = {
	players: ParsedPlayer[];
	meta: ParsedMetaData;
}
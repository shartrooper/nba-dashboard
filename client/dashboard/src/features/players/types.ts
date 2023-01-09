import { Metadata } from "@/types";

export const getPlayers = 'players';

export const playersQueryBody = [
	'records { id first_name last_name team { name } }',
	'meta { next_page current_page per_page }'
];

export const playersQueryParams = [
	'$search: String', '$offset: Int', '$limit: Int'
];

export type PlayerRecord = {
	id: number,
	first_name: string,
	last_name: string,
	team: { name: string }
};

export type GetPlayersPayload = {
	players: {
		records: PlayerRecord[],
		meta: Omit<Metadata, 'total_count'>
	}
};

export type ParsedPlayer = Omit<PlayerRecord, 'first_name' | 'last_name'> &
{
	firstName: string;
	lastName: string;
}

type ParsedMetaData = {
	nextPage: number,
	currentPage: number,
	perPage: number
}

export type ParsedPlayersResponse = {
	players: ParsedPlayer[];
	meta: ParsedMetaData;
}
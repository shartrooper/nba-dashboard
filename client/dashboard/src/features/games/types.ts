import { Game, ResponsePayload, Team } from "@/types";

export const getGames = 'games';
export const getGame = 'game';

export const queryFields = [
	'id',
	'home_team {name}',
	'visitor_team {name}',
	'period',
	'home_team_score',
	'visitor_team_score',
	'time',
	'status',
	'season'
];

const polledGameQueryBody = `{${queryFields.join(' ')}}`;

export const polledGamesQueryBody = [
	`records ${polledGameQueryBody}`,
];

export type PollGameRecord = Game<Pick<Team, 'name'>>;

export type GetPollGamesPayload = {
	games: Omit<ResponsePayload<PollGameRecord, unknown>, 'meta'>
};

export const gamesQueryParams = ['$start_date: String', '$end_date: String', '$seasons: [Int!]', '$team_id: [Int!]', 'postseason: Boolean'];

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
	'date',
	'time',
	'status',
	'season',
	'postseason'
];

const polledGameQueryBody = `{${queryFields.join(' ')}}`;

export const polledGamesQueryBody = [
	`records ${polledGameQueryBody}`,
];

type TeamName = Pick<Team, 'name'>;

export type PollGameRecord = Game<TeamName>;

export type GetPollGamesPayload = {
	games: Omit<ResponsePayload<PollGameRecord, unknown>, 'meta'>
};

export const gamesQueryParams = ['$start_date: String', '$end_date: String', '$seasons: [Int!]', '$team_ids: [Int!]', '$postseason: Boolean'];

export type ParsedGame = Omit<Game<TeamName>, 'home_team' | 'visitor_team' | 'home_team_score' | 'visitor_team_score'> & {
	homeTeam: TeamName,
	visitorTeam: TeamName,
	homeTeamScore: number,
	visitorTeamScore: number,
}
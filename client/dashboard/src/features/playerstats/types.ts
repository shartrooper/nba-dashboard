import { Metadata, ParsedMetaData, PlayerStats, ResponsePayload } from '@/types/index';

export const getPlayerStats = "playersStats";

export const playerStatsQueryParams = ['$player_ids: [Int!]', '$start_date: String', '$end_date: String', '$seasons: [Int!]'];

const StatsQueryBody = `{ 
  ast
  blk 
  dreb 
  fg3_pct 
  fg3a 
  fg3m 
  fg_pct 
  fga 
  fgm 
  ft_pct 
  fta 
  ftm 
  game {
  	date
  	home_team_id
  	home_team_score
  	visitor_team_score
  	visitor_team_id 
	} 
	min 
	oreb 
	pf 
	pts 
	reb 
	stl 
	turnover 
}`;

export const playerStatsQueryBody = [
	`records ${StatsQueryBody}`,
	'meta { next_page current_page per_page }'
];

export type StatsRecord = Omit<PlayerStats, 'id'>;

export type PlayerStatsPayload = {
	playersStats: ResponsePayload<StatsRecord, Omit<Metadata, 'total_count'>>
};

export type ParsedPlayerStatsResponse = {
	stats: StatsRecord[],
	meta: ParsedMetaData
}
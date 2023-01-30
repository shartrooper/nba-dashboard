export type Metadata = {
	next_page: number | null;
	total_count: number;
	current_page: number;
	per_page: number;
}


export type Game = {
	id: number;
	date: string;
	// home_team: Team;
	home_team_score: number;
	period: number;
	postseason: boolean;
	season: number;
	status: string;
	//NOTE: Is an empty string when game has not started or is complete.
	time: string;
	// visitor_team: Team;
	visitor_team_score: number;
}

type GameStats = Pick<
	Game,
	'id' | 'date' | 'season' | 'visitor_team_score' | 'home_team_score'
> & {
	home_team_id: string;
	visitor_team_id: string;
};

export type PlayerStats = {
	id: number;
	ast: number;
	blk: number;
	dreb: number;
	fg3_pct: number;
	fg3a: number;
	fg3m: number;
	fg_pct: number;
	fga: number;
	fgm: number;
	ft_pct: number;
	fta: number;
	ftm: number;
	game: GameStats;
	min: string;
	oreb: number;
	pf: number;
	pts: number;
	reb: number;
	stl: number;
	turnover: number;
}


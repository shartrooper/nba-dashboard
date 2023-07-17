export type Metadata = {
	next_page: number | null;
	total_count: number;
	current_page: number;
	per_page: number;
}

export type Team = {
	id: number,
	abbreviation: string
	city: string,
	conference: string,
	division: string,
	full_name: string,
	name: string
}

export type Game<T> = {
	id: number;
	date: string;
	home_team: T;
	home_team_score: number;
	period: number;
	postseason: boolean;
	season: number;
	status: string;
	//NOTE: Is an empty string when game has not started or is complete.
	time: string;
	visitor_team: T;
	visitor_team_score: number;
}

type Included = 'id' | 'date' | 'season' | 'visitor_team_score' | 'home_team_score'

type GameStats = Pick<
	Game<Team>,
	Included
> & {
	home_team_id: string;
	visitor_team_id: string;
};

export type FullPlayerRecord = {
	id: number,
	first_name: string,
	last_name: string,
	position: string,
	team: { name: string },
	height: string | null,
	weight: string | null
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

export type SeasonAverages = Omit<PlayerStats, 'game'> & { player_id: number, games_played: number }

export type Records<P> = {
	records: P[]
}

export type ResponsePayload<P, M> = {
	meta: M
} & Records<P>

export type ParsedMetaData = {
	nextPage: number | null,
	currentPage: number,
	perPage: number
}
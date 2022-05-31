export class Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export class Player {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  team: Team;
  weight_pounds: number | null;
  height?: string | null;
  weight?: string | null;
}

export class PayloadMetadata {
  total_pages: number;
  current_page: number;
  next_page: null | number;
  per_page: number;
  total_count: number;
}

export class GetManyPayload<D> {
  data: D[];
  meta: PayloadMetadata;
}

export class Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  //NOTE: Is an empty string when game has not started or is complete.
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
}

export class PlayerStats {
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
  game: Game;
  min: number;
  oreb: number;
  pf: number;
  player: Player;
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}

export type SeasonAverage = Omit<PlayerStats, 'game' | 'player' | 'team'> & {
  games_played: number;
  player_id: number;
};

export class SeasonAveragesPayload {
  data: SeasonAverage[];
}

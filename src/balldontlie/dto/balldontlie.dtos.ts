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

export type GameStats = Pick<
  Game,
  'id' | 'date' | 'season' | 'visitor_team_score' | 'home_team_score'
> & {
  home_team_id: string;
  visitor_team_id: string;
};

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
  game: GameStats;
  min: string;
  oreb: number;
  pf: number;
  player: Player;
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}

export type SeasonAverage = Omit<
  PlayerStats,
  'game' | 'player' | 'team' | 'id'
> & {
  games_played: number;
  player_id: number;
  season: number;
};

export class SeasonAveragesPayload {
  data: SeasonAverage[];
}

export const teams = {
  1: 'Hawks',
  2: 'Celtics',
  3: 'Nets',
  4: 'Hornets',
  5: 'Bulls',
  6: 'Cavaliers',
  7: 'Mavericks',
  8: 'Nuggets',
  9: 'Pistons',
  10: 'Warriors',
  11: 'Rockets',
  12: 'Pacers',
  13: 'Clippers',
  14: 'Lakers',
  15: 'Grizzlies',
  16: 'Heat',
  17: 'Bucks',
  18: 'Timberwolves',
  19: 'Pelicans',
  20: 'Knicks',
  21: 'Thunder',
  22: 'Magic',
  23: '76ers',
  24: 'Suns',
  25: 'Blazers',
  26: 'Kings',
  27: 'Spurs',
  28: 'Raptors',
  29: 'Jazz',
  30: 'Wizards',
};

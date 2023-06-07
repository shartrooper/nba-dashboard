import {
  Field,
  Float,
  Int,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { BasePayload } from '../../balldontlie/dto';
import { Game } from '../../games/entities';
import { Player } from '../../players/entities';
import { Team } from '../../teams/entities';

@ObjectType()
class GameStats extends PickType(Game, [
  'id',
  'date',
  'season',
  'visitor_team_score',
  'home_team_score',
] as const) {
  @Field()
  home_team_id: string;
  @Field()
  visitor_team_id: string;
}

@ObjectType()
export class PlayerStats {
  @Field(() => Int)
  id: number;
  @Field(() => Float, { nullable: true })
  ast: number;
  @Field(() => Float, { nullable: true })
  blk: number;
  @Field(() => Float, { nullable: true })
  dreb: number;
  @Field(() => Float, { nullable: true })
  fg3_pct: number;
  @Field(() => Float, { nullable: true })
  fg3a: number;
  @Field(() => Float, { nullable: true })
  fg3m: number;
  @Field(() => Float, { nullable: true })
  fg_pct: number;
  @Field(() => Float, { nullable: true })
  fga: number;
  @Field(() => Float, { nullable: true })
  fgm: number;
  @Field(() => Float, { nullable: true })
  ft_pct: number;
  @Field(() => Float, { nullable: true })
  fta: number;
  @Field(() => Float, { nullable: true })
  ftm: number;
  @Field(() => GameStats)
  game: GameStats;
  @Field({ nullable: true })
  min: string;
  @Field(() => Float, { nullable: true })
  oreb: number;
  @Field(() => Float, { nullable: true })
  pf: number;
  @Field(() => Player)
  player: Player;
  @Field(() => Float, { nullable: true })
  pts: number;
  @Field(() => Float, { nullable: true })
  reb: number;
  @Field(() => Float, { nullable: true })
  stl: number;
  @Field(() => Team)
  team: Team;
  @Field(() => Float, { nullable: true })
  turnover: number;
}

@ObjectType()
export class SeasonAverages extends OmitType(PlayerStats, [
  'game',
  'player',
  'team',
  'id',
] as const) {
  @Field(() => Int)
  games_played: number;
  @Field(() => Int)
  player_id: number;
  @Field(() => Int)
  season: number;
}

@ObjectType()
export class StatsPayload extends PartialType(BasePayload) {
  @Field(() => [PlayerStats])
  records: PlayerStats[];
}

@ObjectType()
export class SeasonsAvgPayload {
  @Field(() => [SeasonAverages])
  data: SeasonAverages[];
}

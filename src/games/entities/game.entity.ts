import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { BasePayload } from '../../balldontlie/dto';
import { Team } from '../../teams/entities';

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  // Dates from BallDontLie api format: "2018-10-19 00:00:00 UTC"
  date: string;
  @Field(() => Team, { nullable: true })
  home_team: Team;
  @Field(() => Int)
  home_team_score: number;
  @Field(() => Int)
  period: number;
  @Field()
  postseason: boolean;
  @Field(() => Int)
  season: number;
  @Field()
  status: string;
  @Field()
  time: string;
  @Field(() => Team, { nullable: true })
  visitor_team: Team;
  @Field(() => Int)
  visitor_team_score: number;
}

@ObjectType()
export class GamesPayload extends PartialType(BasePayload) {
  @Field(() => [Game])
  records: Game[];
}

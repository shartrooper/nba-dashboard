import { ObjectType, Field, Int, PartialType } from '@nestjs/graphql';
import { BasePayload } from 'src/balldontlie/dto';
import { Team } from 'src/teams/entities';

@ObjectType()
export class Player {
  @Field(() => Int, { description: 'Id num for registered player' })
  id: number;
  @Field()
  first_name: string;
  @Field({ nullable: true })
  height?: string;
  @Field({ nullable: true })
  weight?: string;
  @Field()
  last_name: string;
  @Field()
  position: string;
  @Field(() => Team)
  team: Team;
}

@ObjectType()
export class PlayersPayload extends PartialType(BasePayload) {
  @Field(() => [Player])
  records: Player[];
}

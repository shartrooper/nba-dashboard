import { ObjectType, Field, Int, PartialType } from '@nestjs/graphql';
import { BasePayload } from '../../balldontlie/dto';

@ObjectType()
export class Team {
  @Field(() => Int, { description: 'Id number of team' })
  id: number;
  @Field()
  abbreviation: string;
  @Field()
  city: string;
  @Field()
  conference: string;
  @Field()
  division: string;
  @Field()
  full_name: string;
  @Field()
  name: string;
}

@ObjectType()
export class TeamsPayload extends PartialType(BasePayload) {
  @Field(() => [Team])
  records: Team[];
}

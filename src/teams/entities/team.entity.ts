import { ObjectType, Field, Int } from '@nestjs/graphql';

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

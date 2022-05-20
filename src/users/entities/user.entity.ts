import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  username: string;
}

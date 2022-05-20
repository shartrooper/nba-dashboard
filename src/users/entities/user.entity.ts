import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'my user' })
export class MyUserPayload {
  @Field(() => ID)
  id: string;
  @Field()
  username: string;
}

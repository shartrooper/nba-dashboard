import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class UserCredential {
  @Field(() => ID)
  id: string;
  @Field()
  username: string;
}

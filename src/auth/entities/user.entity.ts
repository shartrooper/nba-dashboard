import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'token' })
export class AccessToken {
  @Field()
  access_token: string;
}

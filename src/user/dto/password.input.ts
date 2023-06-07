import { InputType, Field, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CredentialsInput {
  @Field(() => ID)
  id: string;
  @Field()
  @MaxLength(8)
  password: string;
  @Field()
  @MaxLength(8)
  newPassword: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(20)
  username: string;
  @Field()
  @MaxLength(8)
  password: string;
}

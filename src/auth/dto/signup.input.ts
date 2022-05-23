import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(20)
  username: string;
  @Field()
  @MaxLength(8)
  password: string;
}

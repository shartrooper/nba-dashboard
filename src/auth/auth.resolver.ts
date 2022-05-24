import { HttpCode, HttpStatus } from '@nestjs/common';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserInput } from './dto';
import { AccessToken } from './entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  async signUp(@Args('createUserInput') createUserInput: UserInput) {
    return this.authService.signUp(createUserInput);
  }
  @HttpCode(HttpStatus.OK)
  @Mutation(() => AccessToken)
  async signIn(@Args('userInput') userInput: UserInput) {
    return this.authService.signIn(userInput);
  }
}

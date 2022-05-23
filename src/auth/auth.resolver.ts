import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto';
import { UserCredential } from './entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserCredential)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }

  @Query(() => String)
  async signIn() {
    return 'query-data';
  }
}

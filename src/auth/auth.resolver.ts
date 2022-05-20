import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login() {
    return 'This operation should return logged in userdata';
  }

  @Query(() => Boolean)
  logout() {
    return true;
  }
}

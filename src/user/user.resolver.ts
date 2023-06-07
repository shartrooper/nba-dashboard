import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args, ID } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/guard';
import { MyUserPayload } from './entity/myuser';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => MyUserPayload)
  async getMe(@CurrentUser() user: MyUserPayload) {
    return user;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => MyUserPayload)
  async changePassword(
    @Args('id', { type: () => ID }) id: string,
    @Args('password', { type: () => String }) password: string,
    @Args('newPassword', { type: () => String }) newPassword: string,
  ) {
    return this.userService.changePassword({ id, password, newPassword });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => MyUserPayload)
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.deleteUser(id);
  }
}

import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/guard';
import { MyUserPayload } from './entity/myuser';

@Resolver()
export class UserResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => MyUserPayload)
  async getMe(@CurrentUser() user: MyUserPayload) {
    return user;
  }
}

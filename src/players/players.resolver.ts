import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player, PlayersPayload } from './entities/player.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => PlayersPayload, { name: 'players' })
  async getPlayers(
    @Args('offset', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) per_page?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.playersService.findAll({ page, per_page, search });
  }

  @Query(() => Player, { name: 'player' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.playersService.findOne(id);
  }
}

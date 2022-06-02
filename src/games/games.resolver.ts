import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guard';
import { Game, GamesPayload } from './entities';
import { GamesService } from './games.service';
@UseGuards(GqlAuthGuard)
@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Query(() => GamesPayload, { name: 'games' })
  async getPlayers(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('per_page', { type: () => Int, nullable: true }) per_page?: number,
    @Args('seasons', { type: () => [Int], nullable: true })
    seasons?: number[],
    @Args('team_ids', { type: () => [Int], nullable: true })
    team_ids?: number[],
    @Args('postseason', { type: () => Boolean, nullable: true })
    postseason?: boolean,
    @Args('start_date', { type: () => String, nullable: true })
    start_date?: string,
    @Args('end_date', { type: () => String, nullable: true })
    end_date?: string,
  ) {
    return this.gamesService.findAll({
      page,
      per_page,
      seasons,
      team_ids,
      postseason,
      start_date,
      end_date,
    });
  }

  @Query(() => Game, { name: 'game' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOne(id);
  }
}

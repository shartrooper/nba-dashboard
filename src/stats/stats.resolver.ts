import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guard';
import { PlayerStats } from '../balldontlie/dto';
import { SeasonsAvgPayload, StatsPayload } from './entities';
import { StatsService } from './stats.service';
@UseGuards(GqlAuthGuard)
@Resolver(() => PlayerStats)
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}
  @Query(() => StatsPayload, { name: 'playersStats' })
  async getPlayers(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('per_page', { type: () => Int, nullable: true }) per_page?: number,
    @Args('player_ids', { type: () => [Int], nullable: true })
    player_ids?: number[],
    @Args('game_ids', { type: () => [Int], nullable: true })
    game_ids?: number[],
    @Args('seasons', { type: () => [Int], nullable: true })
    seasons?: number[],
    @Args('postseason', { type: () => Boolean, nullable: true })
    postseason?: boolean,
    @Args('start_date', { type: () => String, nullable: true })
    start_date?: string,
    @Args('end_date', { type: () => String, nullable: true })
    end_date?: string,
  ) {
    return this.statsService.findAll({
      page,
      per_page,
      player_ids,
      game_ids,
      seasons,
      postseason,
      start_date,
      end_date,
    });
  }

  @Query(() => SeasonsAvgPayload, { name: 'seasonAverages' })
  async findAverages(
    @Args('season', { type: () => Int }) season: number,
    @Args('player_ids', { type: () => [Int], nullable: true })
    player_ids?: number[],
  ) {
    return this.statsService.findAverages({ season, player_ids });
  }
}

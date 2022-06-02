import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team, TeamsPayload } from './entities/team.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard';
@UseGuards(GqlAuthGuard)
@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => TeamsPayload, { name: 'teams' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('per_page', { type: () => Int, nullable: true }) per_page?: number,
  ) {
    return this.teamsService.findAll({ page, per_page });
  }

  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.findOne(id);
  }
}

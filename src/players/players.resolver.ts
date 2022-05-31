import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player, PlayersPayload } from './entities/player.entity';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => PlayersPayload, { name: 'players' })
  async getPlayers() {
    return this.playersService.findAll();
  }

  @Query(() => Player, { name: 'player' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.playersService.findOne(id);
  }
}

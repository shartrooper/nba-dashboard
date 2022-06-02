import { Injectable } from '@nestjs/common';
import { BalldontlieService } from '../balldontlie/balldontlie.service';
import { Player, PlayersPayload } from './entities';

@Injectable()
export class PlayersService {
  constructor(private ballDontLie: BalldontlieService) {}

  async findAll(args: {
    [key: string]: number | string;
  }): Promise<PlayersPayload> {
    try {
      const players = await this.ballDontLie.getAllPlayers(args);
      return { records: players.data, meta: players.meta };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Player> {
    try {
      const player = await this.ballDontLie.findPlayer(id);
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { BalldontlieService } from '../balldontlie/balldontlie.service';
import { Game, GamesPayload } from './entities';

@Injectable()
export class GamesService {
  constructor(private ballDontLie: BalldontlieService) {}

  async findAll(args: {
    [key: string]: number | string | number[] | boolean;
  }): Promise<GamesPayload> {
    try {
      const players = await this.ballDontLie.findGames(args);
      return { records: players.data, meta: players.meta };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Game> {
    try {
      const player = await this.ballDontLie.findGame(id);
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }
}

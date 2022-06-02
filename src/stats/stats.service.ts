import { Injectable } from '@nestjs/common';
import { BalldontlieService } from '../balldontlie/balldontlie.service';
import { SeasonsAvgPayload, StatsPayload } from './entities';

@Injectable()
export class StatsService {
  constructor(private ballDontLie: BalldontlieService) {}

  async findAll(args: {
    [key: string]: number | string | number[] | boolean;
  }): Promise<StatsPayload> {
    try {
      const players = await this.ballDontLie.stats(args);
      return { records: players.data, meta: players.meta };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAverages(args: {
    [key: string]: number | string | number[] | boolean;
  }): Promise<SeasonsAvgPayload> {
    try {
      const player = await this.ballDontLie.seasonAverages(args);
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }
}

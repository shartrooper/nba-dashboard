import { Injectable } from '@nestjs/common';
import { BalldontlieService } from 'src/balldontlie/balldontlie.service';
import { Player, PlayersPayload } from './entities';

@Injectable()
export class PlayersService {
  constructor(private ballDontLie: BalldontlieService) {}

  async findAll(): Promise<PlayersPayload> {
    try {
      const players = await this.ballDontLie.getAllPlayers();
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

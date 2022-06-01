import { Injectable } from '@nestjs/common';
import { BalldontlieService } from '../balldontlie/balldontlie.service';
import { Team, TeamsPayload } from './entities';

@Injectable()
export class TeamsService {
  constructor(private ballDontLie: BalldontlieService) {}
  async findAll(args: {
    [key: string]: number | string;
  }): Promise<TeamsPayload> {
    try {
      const teams = await this.ballDontLie.getTeams(args);
      return { records: teams.data, meta: teams.meta };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Team> {
    try {
      const team = await this.ballDontLie.findTeam(id);
      return team;
    } catch (error) {
      throw new Error(error);
    }
  }
}

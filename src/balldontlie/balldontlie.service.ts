import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { GetManyPayload, Player, Team } from './dtos';

type ParamObject = { [key: string]: string | number };

@Injectable()
export class BalldontlieService {
  constructor(private httpService: HttpService) {}

  private baseUrl = 'https://www.balldontlie.io/api/v1/';

  private params: ParamObject | number | undefined;

  private setupReqParams(): string {
    if (!this.params || !Object.keys(this.params).length) return '';
    if (typeof this.params === 'number') return `/${this.params}`;

    const paramEntries = Object.entries(this.params);
    const len = paramEntries.length;

    return paramEntries.reduce(
      (acc: string, pair: [string, string | number], index) => {
        const [key, value] = pair;
        const chainingAmpersand = index < len - 1 ? '&' : '';
        return acc + `${key}=${value}${chainingAmpersand}`;
      },
      '?',
    );
  }

  private fetchFromApi(ep: string) {
    const reqParams = this.setupReqParams();
    return lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}${ep}${reqParams}`)
        .pipe(map((resp) => resp.data)),
    );
  }

  async getAllPlayers(params?: ParamObject): Promise<GetManyPayload<Player>> {
    this.params = params;
    try {
      const players = await this.fetchFromApi('players');
      return players;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTeams(params?: ParamObject): Promise<GetManyPayload<Team>> {
    this.params = params;
    try {
      const teams = await this.fetchFromApi('teams');
      return teams;
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    this.params = id;
    return `This action returns a #${id} balldontlie`;
  }

  update(id: number) {
    return `This action updates a #${id} balldontlie`;
  }

  remove(id: number) {
    return `This action removes a #${id} balldontlie`;
  }
}

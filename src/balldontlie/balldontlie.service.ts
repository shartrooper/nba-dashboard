import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Game, GetManyPayload, Player, Team } from './dto';

type ParamValue = string | number | number[];

type ParamObject = { [key: string]: ParamValue };

@Injectable()
export class BalldontlieService {
  constructor(private httpService: HttpService) {}

  private baseUrl = 'https://www.balldontlie.io/api/v1/';

  private params: ParamObject | number | undefined;

  private setupReqParams(): string {
    if (typeof this.params === 'number') return `/${this.params}`;
    if (!this.params || !Object.keys(this.params).length) return '';

    const paramEntries = Object.entries(this.params);

    return paramEntries
      .reduce((acc: string, pair: [string, ParamValue]) => {
        const [key, value] = pair;
        const buildParamString = (key: string, value: string | number) => {
          return `${key}=${value}&`;
        };

        if (typeof value !== 'object') {
          return acc + buildParamString(key, value);
        }

        return (
          acc +
          value.reduce((acc, current) => {
            return acc + buildParamString(key, current);
          }, '')
        );
      }, '?')
      .slice(0, -1);
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

  async findPlayer(id: number): Promise<Player> {
    this.params = id;
    try {
      const player = await this.fetchFromApi('players');
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findTeam(id: number): Promise<Team> {
    this.params = id;
    try {
      const team = await this.fetchFromApi('teams');
      return team;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findGames(params?: ParamObject): Promise<GetManyPayload<Game>> {
    this.params = params;
    try {
      const games = await this.fetchFromApi('games');
      return games;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findGame(id: number): Promise<Game> {
    this.params = id;
    try {
      const games = await this.fetchFromApi('games');
      return games;
    } catch (error) {
      throw new Error(error);
    }
  }
}

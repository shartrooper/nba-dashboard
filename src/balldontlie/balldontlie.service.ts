import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import {
  Game,
  GetManyPayload,
  Player,
  PlayerStats,
  SeasonAveragesPayload,
  Team,
  teams,
} from './dto';

type ParamValue = string | number | number[] | boolean;

type ParamObject = { [key: string]: ParamValue };

@Injectable()
export class BalldontlieService {
  constructor(private httpService: HttpService) {}

  private baseUrl = 'https://www.balldontlie.io/api/v1/';

  private params: ParamObject | number | undefined;

  private checkArgs(argsObject?: ParamObject): ParamObject {
    return (
      argsObject &&
      Object.keys(argsObject).reduce((acc: ParamObject, key: string) => {
        if (argsObject[key]) {
          // Array key params should be in the format "key[]"
          const formatKey =
            typeof argsObject[key] === 'object' ? `${key}[]` : key;
          return { ...acc, [formatKey]: argsObject[key] };
        }
        return acc;
      }, {})
    );
  }

  private serializePlayerRecord = (player: Player): Player => {
    const { height_feet, height_inches, weight_pounds } = player;
    return {
      ...player,
      height:
        height_feet && height_inches && `${height_feet}'${height_inches}".`,
      weight: weight_pounds && `${weight_pounds}lb.`,
    };
  };

  private setupReqParams(): string {
    if (typeof this.params === 'number') return `/${this.params}`;
    if (!this.params || !Object.keys(this.params).length) return '';

    const paramEntries = Object.entries(this.params);
    return (
      paramEntries
        .reduce((acc: string, pair: [string, ParamValue]) => {
          const [key, value] = pair;
          const buildParamString = (
            key: string,
            value: string | number | boolean,
          ) => {
            return `${key}=${value}&`;
          };

          if (typeof value !== 'object') {
            return acc + buildParamString(key, value);
          }
          /*NOTE: If the value is an array, every value's item will join a string.
          Following this pattern: "&key=item1&key=item2"...*/
          return (
            acc +
            value.reduce((acc, current) => {
              return acc + buildParamString(key, current);
            }, '')
          );
        }, '?')
        //NOTE: removes the trailing ampersand after chaining the parameters on string.
        .slice(0, -1)
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

  async getAllPlayers(args?: ParamObject): Promise<GetManyPayload<Player>> {
    this.params = this.checkArgs(args);
    try {
      const players: GetManyPayload<Player> = await this.fetchFromApi(
        'players',
      );
      return {
        data: players.data.map(this.serializePlayerRecord),
        meta: players.meta,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTeams(args?: ParamObject): Promise<GetManyPayload<Team>> {
    this.params = this.checkArgs(args);
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
      const player: Player = await this.fetchFromApi('players');
      return this.serializePlayerRecord(player);
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

  async findGames(args?: ParamObject): Promise<GetManyPayload<Game>> {
    this.params = this.checkArgs(args);
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

  async stats(args?: ParamObject): Promise<GetManyPayload<PlayerStats>> {
    this.params = this.checkArgs(args);
    try {
      const stats: GetManyPayload<PlayerStats> = await this.fetchFromApi(
        'stats',
      );

      const serializedPlayerInStats = stats.data.map((stat) => ({
        ...stat,
        game: {
          ...stat.game,
          home_team_id: teams[stat.game.home_team_id],
          visitor_team_id: teams[stat.game.visitor_team_id],
        },
        player: this.serializePlayerRecord(stat.player),
      }));
      return { data: serializedPlayerInStats, meta: stats.meta };
    } catch (error) {
      throw new Error(error);
    }
  }

  async seasonAverages(args?: ParamObject): Promise<SeasonAveragesPayload> {
    this.params = this.checkArgs(args);
    try {
      const seasons = await this.fetchFromApi('season_averages');
      return seasons;
    } catch (error) {
      throw new Error(error);
    }
  }
}

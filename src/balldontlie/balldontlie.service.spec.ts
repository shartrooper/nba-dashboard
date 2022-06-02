import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { BalldontlieService } from './balldontlie.service';

describe('BalldontlieService', () => {
  let service: BalldontlieService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BalldontlieService],
    }).compile();

    service = module.get<BalldontlieService>(BalldontlieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPlayers()', () => {
    it('should return a body with data', async () => {
      const allPlayers = await service.getAllPlayers();
      expect(allPlayers).toHaveProperty('data');
    });

    it('should return a single player when search with "lebron" keyword', async () => {
      const foundPlayer = await service.getAllPlayers({ search: 'lebron' });
      expect(foundPlayer.meta.total_count).toBe(1);
    });

    it('should return an empty data array if searching for an inexistent player', async () => {
      const result = await service.getAllPlayers({
        search: 'NonExistentNBAPlayer',
      });
      expect(result.data.length).toBe(0);
    });
  });

  describe('findPlayer()', () => {
    it('should return Lebron James (id=237)', async () => {
      const player = await service.findPlayer(237);
      const firstName = player.first_name;
      expect(firstName).toBe('LeBron');
    });

    it('should throw "Not Found" Error if provided an unknown id as param', async () => {
      try {
        const notfound = await service.findPlayer(999999);
        expect('This ought to never happen').toMatchObject(notfound);
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.message).toMatch(/404/);
      }
    });
  });

  describe('getAllTeams()', () => {
    it('should return a body with data', async () => {
      const teams = await service.getTeams();
      expect(teams).toHaveProperty('data');
    });

    it('should return only 5 records', async () => {
      const teams = await service.getTeams({ per_page: 5 });
      const perPage = teams.meta.per_page;
      expect(perPage).toBe(5);
    });
  });

  describe('findTeam()', () => {
    it('should return Lakers (id=14)', async () => {
      const team = await service.findTeam(14);
      const teamName = team.name;
      expect(teamName).toBe('Lakers');
    });

    it('should throw "Not Found" Error if provided an unknown id as param', async () => {
      try {
        const notfound = await service.findTeam(999999);
        expect('This ought to never happen').toMatchObject(notfound);
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.message).toMatch(/404/);
      }
    });
  });

  describe('findGames()', () => {
    it('should return games from season 2018-2019 for team Lakers', async () => {
      const games = await service.findGames({
        'seasons[]': 2018,
        'team_ids[]': 14,
        per_page: 10,
      });
      games.data.forEach((game) => {
        const { home_team, visitor_team } = game;
        expect(game.season).toBe(2018);
        expect(game.season).toBeLessThanOrEqual(2019);
        expect([home_team.name, visitor_team.name]).toContain('Lakers');
      });
    });
    it('should return games from season 2021-2022 for team Lakers and Atlanta Hawks', async () => {
      const games = await service.findGames({
        'seasons[]': [2021],
        'team_ids[]': [14, 1],
        per_page: 5,
      });
      games.data.forEach((game) => {
        const {
          home_team: { name: homeTeamName },
          visitor_team: { name: visitorTeamName },
        } = game;
        const matchingTeamName = [homeTeamName, visitorTeamName].find(
          (name) => name === 'Lakers' || name === 'Hawks',
        );
        expect(game.season).toBe(2021);
        expect(game.season).toBeLessThanOrEqual(2022);
        expect(matchingTeamName).toBeDefined();
      });
    });
  });

  describe('findGame()', () => {
    it('should return a Philadelphia 76ers vs ChicagoBulls season 2018 game', async () => {
      const game = await service.findGame(14);
      const {
        home_team: { name: homeTeamName },
        visitor_team: { name: visitorTeamName },
        season,
      } = game;
      expect(homeTeamName).toBe('76ers');
      expect(visitorTeamName).toBe('Bulls');
      expect(season).toBe(2018);
    });
    it('should throw "Not Found" Error if provided an unknown id as param', async () => {
      try {
        const notfound = await service.findGame(9999999);
        expect('This ought to never happen').toMatchObject(notfound);
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.message).toMatch(/404/);
      }
    });
  });

  describe('stats()', () => {
    it('should return stats for Lebron James and Dewayne Dedmon season 2020-2021 and 2021-2022, 23 pages in total', async () => {
      const stats = await service.stats({
        'seasons[]': [2020, 2021],
        'player_ids[]': [237, 120],
        per_page: 10,
      });
      expect(stats.meta.total_pages).toBe(23);
    });
    it('should return an empty body for nonexistent player ids', async () => {
      const stats = await service.stats({
        'seasons[]': [2020, 2021],
        'player_ids[]': 999999999,
        per_page: 3,
      });
      expect(stats.data.length).toBe(0);
    });
    it('should return an empty body for nonexistent season', async () => {
      const stats = await service.stats({
        'seasons[]': [9999],
        'player_ids[]': 237,
        per_page: 3,
      });
      expect(stats.data.length).toBe(0);
    });
  });

  describe('seasonAverages()', () => {
    it('should return records of 2021 season average for Lebron and Dewayne', async () => {
      const playerAvgs = await service.seasonAverages({
        'player_ids[]': [120, 237],
      });
      expect(playerAvgs.data.length).toBe(2);
    });
  });
});

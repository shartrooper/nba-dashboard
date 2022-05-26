import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
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

  describe('getAllTeams()', () => {
    it('should return a body with data', async () => {
      const teams = await service.getTeams();
      expect(teams).toHaveProperty('data');
    });
  });
});

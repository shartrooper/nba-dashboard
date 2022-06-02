import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { authSpecs, userSpecs } from './e2e';
import { playerSpecs } from './e2e/players.e2e';
import { teamsSpecs } from './e2e/teams.e2e';
import { nbaGameSpecs } from './e2e/games.e2e';
import { statSpecs } from './e2e/stats.e2e';

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  // teardown
  afterAll(() => app.close());
  // TESTING SPECS
  // For Authentication Module
  authSpecs();
  // For User Module
  userSpecs();
  // For Players Module
  playerSpecs();
  // For Teams Module
  teamsSpecs();
  // For Games Module
  nbaGameSpecs();
  // For SeasonAverages Module
  statSpecs();
});

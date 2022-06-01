import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { BalldontlieModule } from 'src/balldontlie/balldontlie.module';

@Module({
  imports: [BalldontlieModule],
  providers: [GamesResolver, GamesService],
})
export class GamesModule {}

import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { BalldontlieModule } from 'src/balldontlie/balldontlie.module';

@Module({
  imports: [BalldontlieModule],
  providers: [PlayersResolver, PlayersService],
})
export class PlayersModule {}

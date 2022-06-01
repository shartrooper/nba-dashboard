import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsResolver } from './stats.resolver';
import { BalldontlieModule } from 'src/balldontlie/balldontlie.module';

@Module({
  imports: [BalldontlieModule],
  providers: [StatsResolver, StatsService],
})
export class StatsModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BalldontlieService } from './balldontlie.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  providers: [BalldontlieService],
})
export class BalldontlieModule {}

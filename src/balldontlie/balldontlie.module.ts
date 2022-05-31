import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BalldontlieService } from './balldontlie.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 8000,
    }),
  ],
  providers: [BalldontlieService],
  exports: [BalldontlieService],
})
export class BalldontlieModule {}

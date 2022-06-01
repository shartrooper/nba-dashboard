import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
//Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { BalldontlieModule } from './balldontlie/balldontlie.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    BalldontlieModule,
    PlayersModule,
    TeamsModule,
    GamesModule,
  ],
  providers: [UserResolver],
})
export class AppModule {}

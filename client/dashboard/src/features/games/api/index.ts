import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getGames, polledGamesQueryBody, gamesQueryParams } from '../types';

const games = gqlQueryBuilder(getGames, polledGamesQueryBody, gamesQueryParams);

export const POLL_GAMES = gql`
	${queryArranger([games], gamesQueryParams)};
`
import { gqlQueryBuilderWithParsedArgs, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getGames, polledGamesQueryBody, gamesQueryParams } from '../types';

const games = gqlQueryBuilderWithParsedArgs(getGames, polledGamesQueryBody, gamesQueryParams);

export const POLL_GAMES = gql`
	${queryArranger([games], gamesQueryParams)}
`;
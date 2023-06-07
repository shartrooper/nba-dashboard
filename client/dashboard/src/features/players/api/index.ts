import { gqlQueryBuilderWithParsedArgs, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getPlayer, getPlayers, playerQueryId, playersQueryBody, queryFields , playersQueryParams } from '../types';

export const players = gqlQueryBuilderWithParsedArgs(getPlayers, playersQueryBody, playersQueryParams);
export const player = gqlQueryBuilderWithParsedArgs(getPlayer, queryFields, [playerQueryId]);

export const GET_PLAYERS = gql`
  ${queryArranger([players], playersQueryParams)}
`;

export const GET_PLAYER = gql`
  ${queryArranger([player], [playerQueryId])}
`;
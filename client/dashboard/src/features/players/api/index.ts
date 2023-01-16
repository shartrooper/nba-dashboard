import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getPlayer, getPlayers, playerQueryId, playersQueryBody, playersQueryParams } from '../types';

export const players = gqlQueryBuilder(getPlayers, playersQueryBody, playersQueryParams);
export const player = gqlQueryBuilder(getPlayer, playersQueryBody, [playerQueryId]);

export const GET_PLAYERS = gql`
  ${queryArranger([players], playersQueryParams)}
`;

export const GET_PLAYER = gql`
  ${queryArranger([player], [playerQueryId])}
`;
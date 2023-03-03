import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getPlayerStats, playerStatsQueryBody, playerStatsQueryParams } from '../types';

export const stats = gqlQueryBuilder(getPlayerStats, playerStatsQueryBody, playerStatsQueryParams);

export const GET_PLAYER_STATS = gql`
  ${queryArranger([stats], playerStatsQueryParams)}
`;
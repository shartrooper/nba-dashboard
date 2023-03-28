import { player } from '@/features/players/api';
import { playerQueryId } from '@/features/players/types';
import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getPlayerStats, playerStatsQueryBody, playerStatsQueryParams } from '../types';

export const stats = gqlQueryBuilder(getPlayerStats, playerStatsQueryBody, playerStatsQueryParams);

export const GET_PLAYER_PROFILE_STATS = gql`
 ${queryArranger([player, stats], [playerQueryId, ...playerStatsQueryParams])}
`
export const GET_PLAYER_STATS = gql`
  ${queryArranger([stats], playerStatsQueryParams)}
`;
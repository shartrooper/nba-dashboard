import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { getPlayers, playersQueryBody, playersQueryParams } from '../types';

export const players = gqlQueryBuilder(getPlayers, playersQueryBody, playersQueryParams);

export const GET_PLAYERS = gql`
  ${queryArranger([players], playersQueryParams)}
`;
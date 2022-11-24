import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';

const getUserQuery = gqlQueryBuilder('getMe', ['username']);

export const GET_USERNAME = gql`
  ${queryArranger([getUserQuery])}
`;

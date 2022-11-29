import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';

const getUserQuery = gqlQueryBuilder('getMe', ['username']);
const getIdQuery = gqlQueryBuilder('getMe', ['id']);
const getAll = gqlQueryBuilder('getMe', ['username', 'id']);


export const GET_ID = gql`
  ${queryArranger([getUserQuery])}
`;

export const GET_USERNAME = gql`
  ${queryArranger([getIdQuery])}
`;

export const GET_ALL = gql`
  ${queryArranger([getAll])}
`;
import { gqlQueryBuilderWithParsedArgs, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';

const getUserQuery = gqlQueryBuilderWithParsedArgs('getMe', ['username']);
const getIdQuery = gqlQueryBuilderWithParsedArgs('getMe', ['id']);
const getAll = gqlQueryBuilderWithParsedArgs('getMe', ['username', 'id']);


export const GET_ID = gql`
  ${queryArranger([getIdQuery])}
`;

export const GET_USERNAME = gql`
  ${queryArranger([getUserQuery])}
`;

export const GET_ALL = gql`
  ${queryArranger([getAll])}
`;
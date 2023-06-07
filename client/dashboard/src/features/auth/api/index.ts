import { gqlQueryBuilderWithParsedArgs, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { AuthMutations, AuthQueryFields, authBodyParams } from '../types';

const { SignIn, SignUp } = AuthMutations;
const { AccessToken } = AuthQueryFields;

const signInQuery = gqlQueryBuilderWithParsedArgs(SignIn, [AccessToken], authBodyParams[SignIn]);
const signUpQuery = gqlQueryBuilderWithParsedArgs(SignUp, [AccessToken], authBodyParams[SignUp]);

export const SIGN_IN = gql`
  ${queryArranger([signInQuery], authBodyParams[SignIn], 'mutation')}
`;
export const SIGN_UP = gql`
  ${queryArranger([signUpQuery], authBodyParams[SignUp], 'mutation')}
`;

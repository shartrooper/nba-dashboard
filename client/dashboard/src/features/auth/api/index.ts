import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { AuthMutations, AuthQueryFields, authBodyParams } from '../types'

const { SignIn } = AuthMutations;
const { AccessToken } = AuthQueryFields;

const signInQuery= gqlQueryBuilder(SignIn,[AccessToken],authBodyParams[SignIn]);

export const signInGQLQuery=  gql`${queryArranger([signInQuery],authBodyParams[SignIn],'mutation')}`; 
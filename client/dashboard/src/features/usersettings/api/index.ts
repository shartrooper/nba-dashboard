import { gqlQueryBuilder, queryArranger } from '@/utils';
import { gql } from '@apollo/client/core';
import { userSettingsBodyParams, SettingMutations } from '../types';

const { DeleteUser, ChangePassword } = SettingMutations;

const deleteUserQuery = gqlQueryBuilder(DeleteUser, ['id'], userSettingsBodyParams[DeleteUser]);
const changePasswordQuery = gqlQueryBuilder(ChangePassword, ['id'], userSettingsBodyParams[ChangePassword]);

export const DELETE_USER = gql`
  ${queryArranger([deleteUserQuery], userSettingsBodyParams[DeleteUser], 'mutation')}
`;
export const CHANGE_PASSWORD = gql`
  ${queryArranger([changePasswordQuery], userSettingsBodyParams[ChangePassword], 'mutation')}
`;

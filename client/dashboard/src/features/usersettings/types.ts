export enum SettingMutations {
  DeleteUser = 'deleteUser',
  ChangePassword = 'changePassword'
}

export const userSettingsBodyParams = {
  [SettingMutations.DeleteUser]: ['$deleteUserId: ID!'],
  [SettingMutations.ChangePassword]: ['$changePasswordId: ID!', '$password: String!', '$newPassword: String!']
}

export const hasIdPayload = (data: unknown): boolean => {
  if (typeof data !== 'object') {
    return false;
  }
  return true;
};
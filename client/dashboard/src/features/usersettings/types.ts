export enum SettingMutations {
  DeleteUser = 'deleteUser',
  ChangePassword = 'changePassword'
}

export const userSettingsBodyParams = {
  [SettingMutations.DeleteUser]: ['$id: ID!'],
  [SettingMutations.ChangePassword]: ['$id: ID!', '$password: String!', '$newPassword: String!']
}

export const hasIdPayload = (data: unknown, operation: SettingMutations): boolean => {
  if (typeof data !== 'object') {
    return false;
  }
  const parsedResponde = data as {
    [key: string]: { id?: string }
  }

  return !!parsedResponde[operation]?.id;
};
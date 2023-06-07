export enum SettingMutations {
  DeleteUser = 'deleteUser',
  ChangePassword = 'changePassword'
}

export const userSettingsBodyParams = {
  [SettingMutations.DeleteUser]: ['$id: ID!'],
  [SettingMutations.ChangePassword]: ['$id: ID!', '$password: String!', '$newPassword: String!']
}

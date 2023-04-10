import { NotificationMsg } from '@/components/Notifications';
import { useNotificationStore } from '@/store';
import { handleError } from '@/utils';
import { getSuccessMsg, getErrorMsg, useRedirectionToRoot } from '@/utils/helpers';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD, DELETE_USER } from '../api';
import { SettingMutations } from '../types'

const { DeleteUser, ChangePassword } = SettingMutations;

const operationQuery = {
  [DeleteUser]: DELETE_USER,
  [ChangePassword]: CHANGE_PASSWORD
}

type OperationQueryKeys = keyof typeof operationQuery;

const notificationMsg: { [Property in OperationQueryKeys]: NotificationMsg } = {
  [DeleteUser]: getSuccessMsg('Account removed', 'User account successfully deleted.'),
  [ChangePassword]: getSuccessMsg('Password Update complete', 'Succesfully changed password. Please login again.')
};

const useEditUser = (operation: OperationQueryKeys) => {
  const { addNotification } = useNotificationStore();
  const clearSession = useRedirectionToRoot();

  const [mutationFn, { loading }] = useMutation(operationQuery[operation], {
    onError: (error) => {
      const errorResponses = handleError(error);
      errorResponses.forEach((item) => addNotification(getErrorMsg(`Error status ${item.statusCode}`, item.message)));
    },
    onCompleted: () => {
      addNotification(notificationMsg[operation]);
      clearSession();
    },
  });

  return { mutationFn, loading };
}

export default useEditUser;
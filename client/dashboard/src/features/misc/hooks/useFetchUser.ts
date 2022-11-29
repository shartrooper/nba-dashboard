import { useNotificationStore, useSessionTokenStore } from '@/store';
import { handleError, NoOptionals } from '@/utils';
import { useQuery } from '@apollo/client';
import { GET_USERNAME, GET_ALL, GET_ID } from '../api';

type ResponseUserNamePayload = {
  getMe: {
    readonly username?: string;
    readonly id?: string;
  };
};

const operationQuery = {
  'username': GET_USERNAME,
  'id': GET_ID,
  'all': GET_ALL
}

type OperationQueryKeys = keyof typeof operationQuery;

type MappedUserInfo = NoOptionals<ResponseUserNamePayload['getMe']>


const getUserInfo = <R extends MappedUserInfo | string>(data: unknown, key: OperationQueryKeys): R | undefined => {
  const response = data as ResponseUserNamePayload;
  if (!response?.getMe) {
    return;
  }

  switch (key) {
    case 'all':
      return response.getMe as R;
    default:
      return response.getMe[key] as R;
  }

};

const useFetchUsername = <O extends OperationQueryKeys>(operation: O) => {
  const { addNotification } = useNotificationStore();
  const { removeToken } = useSessionTokenStore();
  const { data } = useQuery(operationQuery[operation], {
    onError: (error) => {
      removeToken();
      const errorResponses = handleError(error);
      if (errorResponses.length === 1 && errorResponses[0].statusCode === 401) {
        addNotification({
          type: 'info',
          title: 'Expired Token',
          message: 'Please login again.',
        });
      }
      errorResponses.forEach((item) => {
        addNotification({
          type: 'error',
          title: `Error status ${item.statusCode}`,
          message: item.message,
        });
      });
    },
  });

  type TypeUserInfo = O extends 'all' ? MappedUserInfo : string;

  return getUserInfo<TypeUserInfo>(data, operation);
};

export default useFetchUsername;

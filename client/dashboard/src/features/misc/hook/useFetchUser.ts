import { useNotificationStore } from '@/store';
import { NoOptionals, UserCredentialsPayload } from '@/utils';
import { handleErrorService, useRedirectionToRoot } from '@/utils/helpers';
import { useQuery } from '@apollo/client';
import { GET_USERNAME, GET_ALL, GET_ID } from '../api';

type ResponseUserNamePayload = {
  getMe: UserCredentialsPayload;
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

const useFetchUserInfo = <O extends OperationQueryKeys>(operation: O) => {
  const { addNotification } = useNotificationStore();
  const handleErrorResponse = handleErrorService(addNotification);
  const clearSession = useRedirectionToRoot();
  const { data } = useQuery(operationQuery[operation], {
    onError: (error) => {
      clearSession();
      handleErrorResponse(error);
    },
  });

  type TypeUserInfo = O extends 'all' ? MappedUserInfo : string;

  return getUserInfo<TypeUserInfo>(data, operation);
};

export default useFetchUserInfo;

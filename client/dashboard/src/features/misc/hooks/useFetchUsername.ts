import { useNotificationStore, useSessionTokenStore } from '@/store';
import { handleError } from '@/utils';
import { useQuery } from '@apollo/client';
import { GET_USERNAME } from '../api';

type ResponseUserNamePayload = {
  getMe: {
    username: string;
    id: string;
  };
};

const getUserInfo = (data: unknown): ResponseUserNamePayload['getMe'] => {
  const response = data as ResponseUserNamePayload;
  if (!response?.getMe) {
    return { username: '', id: '' }
  }
  const { username, id } = response.getMe;
  return { username, id };
};

const useFetchUsername = () => {
  const { addNotification } = useNotificationStore();
  const { removeToken } = useSessionTokenStore();
  const { data } = useQuery(GET_USERNAME, {
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
  return getUserInfo(data);
};

export default useFetchUsername;

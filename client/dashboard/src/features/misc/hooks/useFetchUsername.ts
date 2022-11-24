import { useNotificationStore, useSessionTokenStore } from '@/store';
import { handleError } from '@/utils';
import { useQuery } from '@apollo/client';
import { GET_USERNAME } from '../api'

const useFetchUsername = () => {
  const { addNotification } = useNotificationStore();
  const { removeToken } = useSessionTokenStore();
  return useQuery(GET_USERNAME, {
    onError: error => {
      removeToken();
      const errorResponses = handleError(error);
      errorResponses.forEach((item) => {
        addNotification({
          type: 'error',
          title: `Error status ${item.statusCode}`,
          message: item.message,
        });
      });
    }
  })
};

export default useFetchUsername;
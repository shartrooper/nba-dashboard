import { SIGN_IN, SIGN_UP } from '../api';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { AuthQueriesResponse, hasTokenPayload } from '../types';
import { useNotificationStore } from '@/store/notifications';
import { handleError } from '@/utils';
import { useSessionTokenStore } from '@/store';
import { NotificationMsg } from '@/components/Notifications';
import { getSuccessMsg, getErrorMsg } from '@/utils/helpers';

const query = { signIn: SIGN_IN, signUp: SIGN_UP };

const notificationMsg: { [Property in keyof typeof query]: NotificationMsg } = {
  signIn: getSuccessMsg('Logged In', 'Succesfully logged in!'),
  signUp: getSuccessMsg('Registration complete', 'Succesfully registered and logged in.')
};

const useAuth = (operation: 'signIn' | 'signUp') => {
  const { addNotification } = useNotificationStore();
  const { setToken } = useSessionTokenStore();

  const selectedQuery = query[operation];
  const [mutationFn, { data, loading }] = useMutation(selectedQuery, {
    onError: (error) => {
      const errorResponses = handleError(error);
      errorResponses.forEach((item) => {
        addNotification(getErrorMsg(`Error status ${item.statusCode}`, item.message));
      });
    },
    onCompleted: () => {
      addNotification(notificationMsg[operation]);
    },
  });
  const response = hasTokenPayload(data);
  const setAccessToken = (data: AuthQueriesResponse): void => {
    setToken(data[operation].access_token);
  };
  useEffect(() => {
    if (response) {
      setAccessToken(response);
    }
  });

  return { mutationFn, loading };
};

export default useAuth;

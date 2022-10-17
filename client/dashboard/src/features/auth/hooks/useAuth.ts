import { SIGN_IN, SIGN_UP } from '../api';
import { useMutation } from '@apollo/client'
import { useEffect } from 'react';
import { AuthQueriesResponse } from '../types';
import { useNotificationStore } from '@/store/notifications';
import { handleError } from '@/utils'
import { useSessionTokenStore } from '@/store';

const query = { signIn: SIGN_IN, signUp: SIGN_UP };

const useAuth = (operation: 'signIn' | 'signUp') => {
    const { addNotification } = useNotificationStore();
    const { setToken } = useSessionTokenStore();

    const selectedQuery = query[operation];
    const [mutationFn, { data, loading }] = useMutation(selectedQuery, {
        onError: error => {
            const errorResponses = handleError(error);
            errorResponses.forEach(item => {
                addNotification({ type: 'error', title: `Error status ${item.statusCode}`, message: item.message });
            });
        },
    });

    const setAccessToken = (data: AuthQueriesResponse): void => {
        setToken(data[operation].access_token);
    }

    useEffect(() => {
        if (data) {
            setAccessToken(data);
        }
    });

    return { mutationFn, loading }
}

export default useAuth;
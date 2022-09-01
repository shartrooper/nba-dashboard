import { SIGN_IN, SIGN_UP } from '../api';
import { useMutation } from '@apollo/client'
import { useEffect } from 'react';
import storage from '@/utils/storage';
import { AuthQueriesResponse } from '../types';

const query = { signIn: SIGN_IN, signUp: SIGN_UP };

const useAuth = (operation: 'signIn' | 'signUp') => {
    const selectedQuery = query[operation];
    const [mutationFn, { data, loading }] = useMutation(selectedQuery, {
        onError: error => console.log(error),
    });

    const setAccessToken = (data: AuthQueriesResponse): void => {
        storage.setToken(data[operation].access_token);
    }

    useEffect(() => {
        if (data) {
            setAccessToken(data);
        }
    });

    return { mutationFn, loading }
}

export default useAuth;
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken } from '@/lib/apollo';

type SessionTokenStore = {
  token: string | null;
  setToken: (access_token: string) => void;
  removeToken: () => void;
};

export const useSessionTokenStore = create<SessionTokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (access_token) => {
        setAuthToken(access_token);
        return set(() => ({ token: access_token }));
      },
      removeToken: () => {
        setAuthToken('');
        return set(() => ({ token: null }));
      },
    }),
    { name: 'usersession-key-storage' }
  )
);

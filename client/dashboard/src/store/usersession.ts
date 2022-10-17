import create from 'zustand';
import { persist } from 'zustand/middleware';

type SessionTokenStore = {
  token: string | null;
  setToken: (access_token: string) => void;
  removeToken: () => void;
};

export const useSessionTokenStore = create<SessionTokenStore>()(persist((set) => (
  {
    token: null,
    setToken: (access_token) => {
      return set(() => ({ token: access_token }))
    },
    removeToken: () => {
      return set(() => ({ token: null }))
    }
  }),
  { name: 'usersession-key-storage' }));
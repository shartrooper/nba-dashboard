import { ContentLayout } from '@/components/Layout';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from './protected';
import { publicRoutes } from './public';
import { Notifications } from '@/components/Notifications';
import { useSessionTokenStore } from '@/store';
import { setAuthToken } from '@/lib/apollo';

export const AppRoutes = () => {
  const { token } = useSessionTokenStore();
  const routes = token ? privateRoutes : publicRoutes;
  const elem = useRoutes([...routes]);

  if (token) setAuthToken(token);

  return (
    <>
      <ContentLayout>{elem}</ContentLayout>
      <Notifications />
    </>
  );
};

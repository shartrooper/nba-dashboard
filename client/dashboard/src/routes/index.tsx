import { ContentLayout } from '@/components/Layout';
import storage from '@/utils/storage';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from './protected';
import { publicRoutes } from './public';
import { Notifications } from '@/components/Notifications';

export const AppRoutes = () => {
  const routes = storage.getToken() ? privateRoutes : publicRoutes;

  const elem = useRoutes([...routes]);
  return (
    <>
      <ContentLayout>
        {elem}
      </ContentLayout>
      <Notifications />
    </>
  );
};

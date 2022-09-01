import { ContentLayout } from '@/components/Layout';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const routes = publicRoutes;

  const elem = useRoutes([...routes]);
  return <ContentLayout>{elem}</ContentLayout>;
};

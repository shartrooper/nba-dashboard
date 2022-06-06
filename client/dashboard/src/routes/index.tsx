import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const routes = publicRoutes;

  const elem = useRoutes([...routes]);
  return <>{elem}</>;
};

import { lazyImport } from '@/utils';

const { AuthRoutes } = lazyImport(() => import('@/features/auth/routes'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: '/*',
    element: <AuthRoutes />,
  },
];

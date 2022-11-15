import { lazyImport } from '@/utils';

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');

export const privateRoutes = [
  {
    path: '/*',
    element:  <Dashboard />,
  },
];
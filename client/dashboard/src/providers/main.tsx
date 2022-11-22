import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from '@/components/Elements/Spinner'
import { ContentLayout } from '@/components/Layout';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <ContentLayout>
          <Spinner size='lg' />
        </ContentLayout>
      }
    >
      <Router>{children}</Router>
    </Suspense>
  );
};

export default AppProvider;
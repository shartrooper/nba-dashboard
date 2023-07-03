import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from '@/components/Elements/Spinner';
import { ContentLayout } from '@/components/Layout';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <ContentLayout>
          <div className="h-screen grid place-items-center" >
            <Spinner size="lg" />
          </div>
        </ContentLayout>
      }
    >
      <Router>{children}</Router>
    </Suspense>
  );
};

export default AppProvider;

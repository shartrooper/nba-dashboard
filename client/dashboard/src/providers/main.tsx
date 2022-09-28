import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from '@/components/Elements/Spinner'

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={<Spinner size='lg' className="flex items-center justify-center w-screen h-screen" />}
    >
      <Router>{children}</Router>
    </Suspense>
  );
};

export default AppProvider;
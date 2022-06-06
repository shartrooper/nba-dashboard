import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">Loading...</div>
      }
    >
      <Router>{children}</Router>
    </Suspense>
  );
};

export default AppProvider;
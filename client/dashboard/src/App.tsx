import AppProvider from '@/providers/main';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;

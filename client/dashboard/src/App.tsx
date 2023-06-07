import AppProvider from '@/providers/main';
import { AppRoutes } from '@/routes';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;

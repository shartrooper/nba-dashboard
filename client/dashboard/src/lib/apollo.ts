import storage from '@/utils/storage';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'


const authLink = setContext((_, { headers }) => {
  const token = storage.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BASE_URL });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

let token = '';

export const setAuthToken= (newToken: string) => {
  token = newToken;
}


const authLink = setContext((_, { headers }) => {
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
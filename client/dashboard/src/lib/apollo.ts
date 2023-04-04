import { ResponsePayload } from '@/types';
import { KeyArgsFunction, KeySpecifier } from '@apollo/client/cache/inmemory/policies';
import { ApolloClient, FieldPolicy, HttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

let token = '';

export const setAuthToken = (newToken: string) => {
  token = newToken;
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BASE_URL });

function mergePagination(
  keyArgs: false | KeySpecifier | KeyArgsFunction | undefined = false,
): FieldPolicy<ResponsePayload<unknown, unknown> | undefined> {
  return {
    keyArgs: false,
    merge(existing, incoming) {
      if (incoming) {
        const merged = existing ? existing.records : [];
        const newRecords = incoming.records;
        return { ...incoming, records: [...merged, ...newRecords] }
      }
      return existing;
    },
  };
}

export const client = new ApolloClient({
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            players: mergePagination(["search"]),
            playersStats: mergePagination(["playerIds", "season", "start_date", "end_date"])
          }
        }
      }
    }
  ),
  link: authLink.concat(httpLink),
});

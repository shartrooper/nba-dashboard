import { spec } from 'pactum';

export const queryTemplate =
  (operation: 'mutation' | 'query') =>
  (name: string, opParams: string[] | string, operations: string[]) => {
    return `${operation} ${name} ${
      Array.isArray(opParams) ? `(${opParams.join(',')})` : ''
    }{
      ${operations.join(' ')}
    }`;
  };

export const graphqlReq = spec().post('/graphql');

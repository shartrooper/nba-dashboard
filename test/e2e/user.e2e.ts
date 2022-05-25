import { queryTemplate, graphqlReq } from '../utils';

export function userSpecs() {
  describe('User', () => {
    const userQueryTemplate = queryTemplate('query');

    describe('getUser', () => {
      const getMyUserQueryTemplate = userQueryTemplate('GetMe', '', [
        'getMe{ id username }',
      ]);

      it('should return status 200', () =>
        graphqlReq.withGraphQLQuery(getMyUserQueryTemplate).expectStatus(200));
    });
  });
}

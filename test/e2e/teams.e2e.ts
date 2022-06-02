import { queryTemplate, graphqlReq } from '../utils';

export function teamsSpecs() {
  describe('Team Module', () => {
    const teamQueryTemplate = queryTemplate('query');

    describe('Teams', () => {
      const getTeamTemplate = teamQueryTemplate(
        'Teams',
        ['$perPage: Int'],
        [
          'teams(per_page: $perPage){ records{ id full_name} meta{ per_page current_page} }',
        ],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getTeamTemplate)
          .withGraphQLVariables({ perPage: 10 })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has wrong type in arguments', () =>
        graphqlReq
          .withGraphQLQuery(getTeamTemplate)
          .withGraphQLVariables({ perPage: 'wrong' })
          .expectStatus(400));
    });

    describe('Team', () => {
      const getTeamTemplate = teamQueryTemplate(
        'Team',
        ['$teamId: Int!'],
        ['team(id: $teamId){ id full_name}'],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getTeamTemplate)
          .withGraphQLVariables({ teamId: 5 })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has not id parameter', () =>
        graphqlReq.withGraphQLQuery(getTeamTemplate).expectStatus(400));
    });
  });
}

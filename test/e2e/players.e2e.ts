import { queryTemplate, graphqlReq } from '../utils';

export function playerSpecs() {
  describe('Player Module', () => {
    const playerQueryTemplate = queryTemplate('query');

    describe('Player', () => {
      const getPlayerTemplate = playerQueryTemplate(
        'Player',
        ['$playerId: Int!'],
        ['player(id: $playerId){ id first_name last_name position}'],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getPlayerTemplate)
          .withGraphQLVariables({ playerId: 237 })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has empty id', () =>
        graphqlReq.withGraphQLQuery(getPlayerTemplate).expectStatus(400));
    });

    describe('Players', () => {
      const getPlayersTemplate = playerQueryTemplate(
        'Players',
        ['$search: String', '$perPage: Int'],
        [
          'players(search: $search, per_page: $perPage){ records {first_name last_name} meta { per_page}}',
        ],
      );
      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getPlayersTemplate)
          .withGraphQLVariables({ search: 'james', perPage: 5 })
          .expectStatus(200));
      it('should throw errorcode 400 if query operation has wrong type in arguments', () =>
        graphqlReq
          .withGraphQLQuery(getPlayersTemplate)
          .withGraphQLVariables({ search: 0, perPage: 'wrong type' })
          .expectStatus(400));
    });
  });
}

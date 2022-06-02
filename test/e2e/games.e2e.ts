import { queryTemplate, graphqlReq } from '../utils';

export function nbaGameSpecs() {
  describe('Games Module', () => {
    const gameQueryTemplate = queryTemplate('query');

    describe('Games', () => {
      const getGamesTemplate = gameQueryTemplate(
        'Games',
        ['$perPage: Int, $seasons: [Int!], $teamIds: [Int!]'],
        [
          'games(seasons: $seasons, team_ids: $teamIds, per_page: $perPage){ meta{ total_pages per_page total_count } records { id date season } }',
        ],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getGamesTemplate)
          .withGraphQLVariables({
            perPage: 5,
            seasons: [2021],
            teamIds: [1, 14],
          })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has wrong type in arguments', () =>
        graphqlReq
          .withGraphQLQuery(getGamesTemplate)
          .withGraphQLVariables({ perPage: 'wrong' })
          .expectStatus(400));
    });

    describe('Game', () => {
      const getGameTemplate = gameQueryTemplate(
        'Game',
        ['$gameId: Int!'],
        ['game(id: $gameId){ id home_team_score visitor_team_score}'],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getGameTemplate)
          .withGraphQLVariables({ gameId: 20 })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has not id parameter', () =>
        graphqlReq.withGraphQLQuery(getGameTemplate).expectStatus(400));
    });
  });
}

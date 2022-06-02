import { queryTemplate, graphqlReq } from '../utils';

export function statSpecs() {
  describe('Games Module', () => {
    const statQueryTemplate = queryTemplate('query');

    describe('Games', () => {
      const getStatsTemplate = statQueryTemplate(
        'PlayersStats',
        ['$perPage: Int, $seasons: [Int!], $playerIds: [Int!]'],
        [
          'playersStats(seasons: $seasons, player_ids: $playerIds, per_page: $perPage){ meta{ total_pages per_page total_count } records { id turnover min } }',
        ],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(getStatsTemplate)
          .withGraphQLVariables({
            perPage: 5,
            seasons: [2021],
            playerIds: [120, 237],
          })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has wrong type in arguments', () =>
        graphqlReq
          .withGraphQLQuery(getStatsTemplate)
          .withGraphQLVariables({ perPage: 5, playerIds: [NaN] })
          .expectStatus(400));
    });

    describe('Game', () => {
      const avgStatsTemplate = statQueryTemplate(
        'seasonAverages',
        ['$season: Int!, $playerIds: [Int!]'],
        [
          'seasonAverages(season: $season, player_ids: $playerIds){data { turnover games_played } }',
        ],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(avgStatsTemplate)
          .withGraphQLVariables({ season: 2018, playerIds: [237, 120] })
          .expectStatus(200));

      it('should throw errocode 400 if query operation has not id parameter', () =>
        graphqlReq
          .withGraphQLQuery(avgStatsTemplate)
          .withGraphQLVariables({ season: '2018', playerIds: [''] })
          .expectStatus(400));
    });
  });
}

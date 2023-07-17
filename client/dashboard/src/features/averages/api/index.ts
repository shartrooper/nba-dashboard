import { getPlayer, getPlayers, playersQueryParams } from "@/features/players/types";
import { arrayRange, gqlQueryBuilder, gqlQueryBuilderWithParsedArgs, queryArranger } from "@/utils";
import { averagesQueryFields, fragmentName, fullPlayersQueryBody, getAverages, playerQueryArgs, seasonAveragesParams, seasonAveragesQueryFields } from "../types";
import { gql } from "@apollo/client";
import { PLAYER_FRAGMENT } from "../types";

const playersWithAliases = (totalQueries: number) => {
	const aliasIndexes = arrayRange(1, totalQueries, 1);
	return aliasIndexes.map(aliasNumber => {
		return `player${aliasNumber}: ${gqlQueryBuilder(getPlayer, ['...' + fragmentName], `(${playerQueryArgs(aliasNumber)})`)}`
	})
};

const completeSeasonAverages = gqlQueryBuilderWithParsedArgs(getAverages, seasonAveragesQueryFields, seasonAveragesParams);

const seasonAverages = gqlQueryBuilderWithParsedArgs(getAverages, averagesQueryFields, seasonAveragesParams);

const fullPlayersData = gqlQueryBuilderWithParsedArgs(getPlayers, fullPlayersQueryBody, playersQueryParams);

const players = playersWithAliases(6);

export const idKeys = arrayRange(1, 6, 1).map(num => `id${num}`);

const playerParams = idKeys.map(identifier => `$${identifier}: Int!`);

export const playersAvgDocContent = `
	${queryArranger([...players, seasonAverages], [...playerParams, ...seasonAveragesParams])}
	${PLAYER_FRAGMENT}
`;

export const SEASON_AVERAGES = gql`
	${queryArranger([completeSeasonAverages], seasonAveragesParams)}
` 

export const GET_PLAYERS_FULL = gql`
  ${queryArranger([fullPlayersData], playersQueryParams)}
`;

export const GET_SIX_PLAYERS_AVERAGES = gql`${playersAvgDocContent}`;
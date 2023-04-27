import { getPlayer } from "@/features/players/types";
import { arrayRange, gqlQueryBuilder, gqlQueryBuilderWithParsedArgs, queryArranger } from "@/utils";
import { averagesQueryFields, fragmentName, getAverages, playerQueryArgs, seasonAveragesParams } from "../types";
import { gql } from "@apollo/client";
import { PLAYER_FRAGMENT } from "../types";

const playersWithAliases = (totalQueries: number) => {
	const aliasIndexes = arrayRange(1, totalQueries, 1);
	return aliasIndexes.map(aliasNumber => {
		return `player${aliasNumber}: ${gqlQueryBuilder(getPlayer, ['...' + fragmentName], `(${playerQueryArgs(aliasNumber)})`)}`
	})
};

const seasonAverages = gqlQueryBuilderWithParsedArgs(getAverages, averagesQueryFields, seasonAveragesParams);

const players = playersWithAliases(6);

const playerParams = arrayRange(1, 6, 1).map(identifier => `$id${identifier}: Int!`);

export const playersDocContent = `
	${queryArranger([...players, seasonAverages], [...playerParams, ...seasonAveragesParams])}
	${PLAYER_FRAGMENT}
`;

export const GET_SIX_PLAYERS_AVERAGES = gql`${playersDocContent}`;
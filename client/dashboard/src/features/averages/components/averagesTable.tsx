import { DropdownWrapper } from "@/components/Disclosure";
import { AveragesListBuild } from "./averagesListBuild";
import { ParsedFullPlayer } from "@/components/Datatable/columns";
import { ParsedFullPlayerRecord } from "@/features/playerstats/types";
import { useEffect, useRef, useState } from "react";
import useFullFetchPlayers from "../hook/useFullFetchPlayerst";
import { COMMON_NAMES, parseDate } from "@/utils";
import useLazyFetchSeasonAverages from "../hook/useLazyFetchSeasonAverages";

export const AveragesTableContainer = () => {
	const [searchterm, setSearchTerm] = useState<string>(COMMON_NAMES[Math.round(Math.random() * COMMON_NAMES.length)]);
	const [seasonYear, setSeasonYear] = useState<string>(parseDate.lastSeason.toString());
	const [playersList, setPlayersList] = useState<ParsedFullPlayer[]>([]);
	const [getAverages, loadingAvgs, averages] = useLazyFetchSeasonAverages();
	const isTableInitialized = useRef(false);
	const searchParams = { search: searchterm };
	const { players: suggestions, loading } = useFullFetchPlayers(searchParams);

	useEffect(() => {
		if (!isTableInitialized.current && suggestions) {
			const playersId = suggestions.map(player => player.id);
			getAverages({ variables: { player_ids: playersId, season: parseInt(seasonYear) } });
			isTableInitialized.current = true;
		}
	}, [getAverages, seasonYear, suggestions]);


	function updateSearchTerm(query: string) {
		setSearchTerm(query);
	}

	const handleSetSeasonYear = (season: string) => {
		setSeasonYear(season);
	}

	const addNewPlayer = (selectedPlayer: ParsedFullPlayerRecord) => {
		if (playersList.some(player => player.id === selectedPlayer.id)) {
			return;
		}
		const { firstName, lastName, team, ...rest } = selectedPlayer;
		const newPlayer: ParsedFullPlayer = {
			fullname: `${firstName} ${lastName}`,
			teamname: team.name,
			...rest
		}

		setPlayersList(prev => [...prev, newPlayer]);
	}

	const removePlayer = (id: number) => {
		setPlayersList(prev => [...prev.filter(player => player.id !== id)])
	}

	return <DropdownWrapper description="Build custom table data">
		<AveragesListBuild
			onUpdatePlayerSuggestions={updateSearchTerm}
			selectedPlayersList={playersList}
			suggestions={suggestions}
			onLoadSuggestions={loading}
			addPlayerToList={addNewPlayer}
			removePlayerFromList={removePlayer}
			handleSeasonSelection={handleSetSeasonYear}
		/>
	</DropdownWrapper>
}
import { DropdownWrapper } from "@/components/Disclosure";
import { AveragesListBuild } from "./averagesListBuild";
import { ParsedFullPlayer } from "@/components/Datatable/columns";
import { ParsedFullPlayerRecord } from "@/features/playerstats/types";
import { useState } from "react";
import useFullFetchPlayers from "../hook/useFullFetchPlayerst";

export const AveragesTableContainer = () => {
	const [searchterm, setSearchTerm] = useState<string>();
	const [seasonYear, setSeasonYear] = useState<string>();
	const [playersList, setPlayersList] = useState<ParsedFullPlayer[]>([]);
	const searchParams = { search: searchterm };
	const { players: suggestions, loading } = useFullFetchPlayers(searchParams);

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
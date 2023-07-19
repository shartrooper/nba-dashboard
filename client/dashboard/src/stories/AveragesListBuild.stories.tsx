import { ParsedFullPlayer } from "@/components/Datatable/columns";
import { DropdownWrapper } from "@/components/Disclosure";
import { AveragesListBuild } from "@/features/averages/components";
import { ParsedFullPlayerRecord } from "@/features/playerstats/types";
import { Meta, Story } from "@storybook/react";
import { useEffect, useState } from "react";

const meta: Meta = {
	title: 'Table data builder',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

const suggestions: ParsedFullPlayerRecord[] = [
	{
		"id": 505,
		"firstName": "Herb",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Mavericks"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 557,
		"firstName": "Buck",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Trail Blazers"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 732,
		"firstName": "Walt",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Kings"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 742,
		"firstName": "Corey",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Bulls"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 762,
		"firstName": "Lorenzo",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Hornets"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 855,
		"firstName": "Aaron",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Jazz"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 910,
		"firstName": "Monty",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Knicks"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 938,
		"firstName": "Eric",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Celtics"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 990,
		"firstName": "Corliss",
		"lastName": "Williamson",
		"position": "",
		"team": {
			"name": "Kings"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 1013,
		"firstName": "Jerome",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Pistons"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 1100,
		"firstName": "Alvin",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Trail Blazers"
		},
		"height": null,
		"weight": null
	},
	{
		"id": 1126,
		"firstName": "Travis",
		"lastName": "Williams",
		"position": "",
		"team": {
			"name": "Hornets"
		},
		"height": null,
		"weight": null
	},
];

const Template: Story = () => {
	const [searchterm, setSearchTerm] = useState<string>();
	const [seasonYear, setSeasonYear] = useState<string>();
	const [playersList, setPlayersList] = useState<ParsedFullPlayer[]>([]);
	function updateSearchTerm(query: string) {
		setSearchTerm(query);
	}

	const filteredSuggestions = (() => {
		if (!searchterm) return suggestions;

		return suggestions.filter(suggestion => `${suggestion.firstName} ${suggestion.lastName}`.match(searchterm))
	})()

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

	useEffect(() => {
		seasonYear && alert(`${seasonYear} season was selected`)
	}, [seasonYear]);

	return <DropdownWrapper description="Build custom table data">
		<AveragesListBuild
			onUpdatePlayerSuggestions={updateSearchTerm}
			selectedPlayersList={playersList}
			suggestions={filteredSuggestions}
			onLoadSuggestions={false}
			addPlayerToList={addNewPlayer}
			removePlayerFromList={removePlayer}
			handleSeasonSelection={handleSetSeasonYear}
		/>
	</DropdownWrapper>
}

export const Main = Template.bind({});
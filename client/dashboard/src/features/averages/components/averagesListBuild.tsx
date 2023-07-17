import { SeasonSelector } from "@/components/Input/seasonSelector"
import PlayerComboBox from "./playerBox"
import { ParsedFullPlayerRecord } from "@/features/playerstats/types"
import { ParsedFullPlayer } from "@/components/Datatable/columns";
import { useState } from "react";
import { teamsLogosImageRoutes } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/Elements/Button";

type Props = {
	suggestions?: ParsedFullPlayerRecord[];
	selectedPlayersList: ParsedFullPlayer[];
	onUpdatePlayerSuggestions: (query: string) => void;
	addPlayerToList: (selected: ParsedFullPlayerRecord) => void;
	removePlayerFromList: (id: number) => void;
	onLoadSuggestions: boolean;
	handleSeasonSelection: (season: string) => void;
	submit?: () => void;
}

export const AveragesListBuild: React.FC<Props> = ({
	suggestions,
	onUpdatePlayerSuggestions,
	addPlayerToList,
	removePlayerFromList,
	onLoadSuggestions,
	handleSeasonSelection,
	selectedPlayersList,
	submit
}) => {
	const [selectedPlayer, setSelectedPlayer] = useState<ParsedFullPlayerRecord>();

	const handlePlayerChange = (selected: ParsedFullPlayerRecord) => {
		setSelectedPlayer(selected);
		addPlayerToList(selected);
	}

	const centerItemStyle = "grid place-items-center"

	return <>
		<div className="flex gap-4 items-center">
			<div className="pt-[4.05rem] sm:pt-[2.8rem]">
				<PlayerComboBox
					player={selectedPlayer}
					suggestions={suggestions}
					onInputChange={onUpdatePlayerSuggestions}
					onSelectorChange={handlePlayerChange}
					loading={onLoadSuggestions}
				/>
			</div>
			<SeasonSelector registration={{ onChange: async ({ target }) => { handleSeasonSelection(target.value); } }} label="Season's year" />
		</div>
		<div className="bg-evening rounded p-2 flex flex-wrap gap-2 justify-center sm:max-h-screen overflow-auto text-chalkboard">
			{selectedPlayersList.map(player =>
				<div key={`player-${player.id}`} className="bg-basketball-dim grid grid-cols-3 my-2 px-6 rounded-sm sm:w-[250px]">
					<p className={centerItemStyle}>
						{player.fullname}
					</p>
					<div className={centerItemStyle}>
						<img alt={`${player.teamname} logo`} src={teamsLogosImageRoutes[player.teamname]} className="w-14 h-14" />
					</div>
					<div className="grid place-items-center justify-items-end">
						<XMarkIcon className="w-6 h-6 cursor-pointer" onClick={() => removePlayerFromList(player.id)} />
					</div>
				</div>
			)}
		</div>
		<div className={centerItemStyle}>
			<Button className="my-4" onClick={submit}>Submit </Button>
		</div>
	</>
}
import { DataTable, DataTableProps } from "@/components/Datatable";
import { PlayerAvgData, columns } from "@/components/Datatable/columns";
import { Meta, Story } from "@storybook/react";
import averagesSample from "@/assets/dump/averages-sample.json";
import playerDump from "@/assets/dump/sample1.json";
import playerDump2 from "@/assets/dump/sample2.json";
import playerDump3 from "@/assets/dump/sample3.json";
import playerDump4 from "@/assets/dump/sample4.json";
import playerDump5 from "@/assets/dump/sample5.json";
import { FullPlayerRecord } from "@/types";

const playersDataDump = [
	...playerDump.records,
	...playerDump2.records,
	...playerDump3.records,
	...playerDump4.records,
	...playerDump5.records
]

const meta: Meta = {
	title: 'Datatable',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

const data: PlayerAvgData[] = averagesSample.map((averageInfo) => {
	const player = playersDataDump.find(player => player.id === averageInfo.player_id) as FullPlayerRecord;
	const { first_name, last_name, team, ...restPlayerData } = player;
	const { player_id, ...rest } = averageInfo;
	const fullname = `${first_name} ${last_name}`;
	const teamname = team.name;

	return {
		fullname,
		teamname,
		...restPlayerData,
		...rest
	}
});

const Template: Story<DataTableProps<PlayerAvgData, typeof columns>> = (props) => <DataTable {...props} />

export const PlayersTable = Template.bind({});

PlayersTable.args = {
	data,
	columns
}
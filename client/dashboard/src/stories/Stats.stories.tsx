import { Meta, Story } from '@storybook/react';
import sample from '@/assets/stats-sample.json';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";

const meta: Meta = {
	title: 'Player Stat',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
const scheme = [
	'#293462',
	'#F24C4C',
	'#EC9B3B',
	'#F7D716',
	'#874356',
	'#C65D7B'
];

const dataKeys = {
	threePointsField: [
		"fg3_pct", //  three-point field goals percentage fg3
		"fg3a", // three-point field goals attempted	fg3
		"fg3m", // three-point field goals percentage fg3
	],
	fieldGoal: [
		"fg_pct", // field goals percentage  fg
		"fga", // Percent of Team's Field Goals Attempted fg
		"fgm", //Percent of Team's Field Goals Made fg
	],
	freeThrows: [
		"ft_pct", // free throws percentage ft
		"fta", // free throws attempted ft
		"ftm", //Percent of Team's Free Throws Made ft
	],
	rebounds: [
		"oreb", // offensive rebounds
		"reb", // rebounds
		"dreb" // defensive rebounds
	],
	perfomance: [
		"ast", // Percent of Team's Assists perfomance
		"blk", // Percent of Team's Blocks perfomance
		"pf", // personal fouls perfomance
		"pts", // points perfomance
		"stl", // steals perfomance
		"turnover" // turnover perfomance
	]
}

const SampleTeamPlayerName = "Cavaliers";

type PlayerStatsProps = {
	len?: number
}

const PlayerAreaChart = ({ valueKey, dataset }: { valueKey: keyof typeof dataKeys, dataset: { [key: string]: string | number }[] }) => {
	const graphWidth = dataset.length * 82;
	return <div className='bg-zinc-50 overflow-auto'>
		<AreaChart width={graphWidth} height={320} data={dataset}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
			<CartesianGrid strokeDasharray="4 3" />
			<XAxis dataKey="label" />
			<YAxis />
			<Tooltip labelClassName='text-midnight' />
			<Legend align='left' />
			{dataKeys[valueKey].map((dataKey, index) => {
				return <Area key={`line-${index}`} stackId="1" type="monotone" dataKey={dataKey} stroke={scheme[index]} fill={scheme[index]} />
			})}
		</AreaChart>
	</div>
}

const Template: Story<PlayerStatsProps> = ({ len = 0 }) => {
	const sizedSample = sample.slice(0, len);
	const selectedSample = sizedSample.map(stat => {
		const opponent = stat['game.home_team_id'] === SampleTeamPlayerName ? stat['game.visitor_team_id'] : stat['game.home_team_id'];
		const date = new Date(stat["game.date"]).toISOString().split('T')[0];
		return {
			...stat,
			label: `vs.${opponent}(${date})`
		}
	});

	return (
		<div className='m-4 flex flex-col'>
			{Object.keys(dataKeys).map((value: string, index) =>
				<>
					<p>{value.charAt(0).toLocaleUpperCase() + value.slice(1)}</p>
					<PlayerAreaChart key={index} dataset={selectedSample} valueKey={value as keyof typeof dataKeys} />
				</>
			)}
		</div>
	)
};

export const Main = Template.bind({});

Main.args = ({
	len: 2
});
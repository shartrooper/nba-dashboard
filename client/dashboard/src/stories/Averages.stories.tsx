import { Meta, Story } from '@storybook/react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import playersAverageData from '@/assets/players-averages.json';

const meta: Meta = {
	title: 'Season Averages',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

type SamplePlayer = {
	id: number,
	first_name: string,
	last_name: string,
	team: {
		full_name: string
	}
}

type SeasonAverages = {
	data: {
		pts: number,
		turnover: number, player_id: number
	}[]
}

type Sample = Record<string, SamplePlayer | SeasonAverages>

const sample = playersAverageData as Sample;

const chartData: { name: string, pts: number, turnover: number }[] = Object.keys(playersAverageData).slice(0, -1).map(key => {
	const { first_name, last_name, id } = sample[key] as SamplePlayer;
	const name = `${first_name} ${last_name}`;
	const playerAverages = sample['seasonAverages'] as SeasonAverages;

	const playerStats = playerAverages.data.find(stat => stat.player_id === id);

	if (!playerStats) return { name, pts: 0, turnover: 0 }

	const {pts, turnover} = playerStats;
	return {
		name,
		pts,
		turnover
	}
});


const PlayersAveragesBarChar = () =>
	<ResponsiveContainer height={250} width={'100%'}>
		<BarChart margin={{ left: -35 }} data={chartData}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="pts" fill="#fb923c" />
			<Bar dataKey="turnover" fill="#82ca9d" />
		</BarChart>
	</ResponsiveContainer>

const Template: Story = () => <PlayersAveragesBarChar />

export const Main = Template.bind({});
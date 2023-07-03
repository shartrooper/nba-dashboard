import { Meta, Story } from '@storybook/react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import playersAverageData from '@/assets/players-averages.json';
import { useState } from 'react';

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

const chartData: { name: string, pts: number, turnover: number }[] = Object.keys(playersAverageData).slice(0, -1).map((key, index) => {
	const { first_name, last_name, id } = sample[key] as SamplePlayer;
	const name = `${index}:${first_name} ${last_name}`;
	const playerAverages = sample['seasonAverages'] as SeasonAverages;

	const playerStats = playerAverages.data.find(stat => stat.player_id === id);

	if (!playerStats) return { name, pts: 0, turnover: 0 }

	const { pts, turnover } = playerStats;
	return {
		id,
		name,
		pts,
		turnover
	}
});


const PlayersAveragesBarChar = () => {
	const [activeIndex, setActiveIndex] = useState<number>();

	const mapBarCells = (activeColor: (idx: number) => string, keyword: string) => chartData.map((entry, index) => {
		return <Cell key={`${keyword}-${index}`} fill={activeColor(index)} />
	})

	const activeColor = (color1: string, color2: string) => (index: number) => `${activeIndex === index ? color1 : color2}`;

	return <ResponsiveContainer height={250} width={'100%'}>
		<BarChart onClick={(nextState) => {
			setActiveIndex(nextState.activeTooltipIndex)
		}} margin={{ left: -35 }} data={chartData}>
			<CartesianGrid cursor="pointer" strokeDasharray="3 3" />
			<XAxis dataKey="name" stroke="#b8b8b8" />
			<YAxis stroke="#b8b8b8" />
			<Tooltip wrapperClassName='text-basketball' cursor={{ fill: "#2f405d", opacity: "80%" }} />
			<Bar dataKey="pts">
				{mapBarCells(activeColor("#36c7fc", "#038bbb"), "pts")}
			</Bar>
			<Bar dataKey="turnover">
				{mapBarCells(activeColor("#eec791", "#e19f41"), "turnover")}
			</Bar>
		</BarChart>
	</ResponsiveContainer>
}

const Template: Story = () => <PlayersAveragesBarChar />

export const Main = Template.bind({});
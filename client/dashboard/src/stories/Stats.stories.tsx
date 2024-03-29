import { Meta, Story } from '@storybook/react';
import sample from '@/assets/stats-sample.json';
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Label
} from "recharts";
import { useMemo, useState } from 'react';
import { useWindowSize } from '@/utils';

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

const CursorNav = ({ arrow, nextIndex, handleClick }: { arrow: 'left' | 'right', nextIndex: Boolean, handleClick: (n: number) => void }) => {
	const navButtonClassName = "w-6 h-6 cursor-pointer";
	enum Arrow {
		left = 'left',
		right = 'right'
	}

	const step = {
		[Arrow.left]: -1,
		[Arrow.right]: 1
	}

	const icon = {
		[Arrow.left]: <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={navButtonClassName}>
			<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>,
		[Arrow.right]: <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={navButtonClassName}>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	}

	return <div className={`${!nextIndex && "invisible"}`} onClick={() => handleClick(step[arrow])}>{icon[arrow]}</div>
}

const PlayerAreaChart = ({ valueKey, dataset, graphWidth }: { valueKey: keyof typeof dataKeys, dataset: { [key: string]: string | number }[], graphWidth: number }) => {
	return <div className='bg-zinc-50 overflow-auto'>
		<ResponsiveContainer height={300} width={graphWidth}>
			<LineChart data={dataset}
				margin={{ top: 5, right: 30, bottom: 30 }}>
				<CartesianGrid strokeDasharray="4 3" />
				<XAxis dataKey="label"  angle={30}/>
				<YAxis />
				<Tooltip labelClassName='text-midnight' />
				<Legend align='left' />
				{dataKeys[valueKey].map((dataKey, index) => {
					return <Line key={`line-${index}`} type="monotone" dataKey={dataKey} stroke={scheme[index]} />
				})}
			</LineChart>
		</ResponsiveContainer>
	</div>
}

const Template: Story = () => {
	const { width } = useWindowSize();
	const maxItems = 10;
	const [navigateChart, setNavigateChart] = useState({ prev: 0, section: 0, next: maxItems });
	const sizedSample = sample.slice(navigateChart.prev, navigateChart.next);
	const selectedSample = useMemo(() => sizedSample.map(stat => {
		const opponent = stat['game.home_team_id'] === SampleTeamPlayerName ? stat['game.visitor_team_id'] : stat['game.home_team_id'];
		const date = new Date(stat["game.date"]).toISOString().split('T')[0];
		return {
			...stat,
			label: `vs.${opponent}(${date}) ${stat.min}`
		}
	}), [sizedSample]);
	const updateChart = (n: number) => {
		const i = n + navigateChart.section;
		setNavigateChart({
			prev: i * maxItems,
			section: i,
			next: (i + 1) * maxItems
		});
	}

	if (!width) {
		return <></>;
	}
	return (
		<div className='m-4 flex flex-col'>
			<div className='flex justify-between'>
				<CursorNav arrow='left' nextIndex={!!navigateChart.prev} handleClick={updateChart} />
				<CursorNav arrow='right' nextIndex={!!sample[navigateChart.next]} handleClick={updateChart} />
			</div>
			{Object.keys(dataKeys).map((value: string, index) =>
				<div key={index} >
					<p>{value.charAt(0).toLocaleUpperCase() + value.slice(1)}</p>
					<PlayerAreaChart dataset={selectedSample} graphWidth={width} valueKey={value as keyof typeof dataKeys} />
				</div>
			)}
		</div>
	)
};

export const Main = Template.bind({});
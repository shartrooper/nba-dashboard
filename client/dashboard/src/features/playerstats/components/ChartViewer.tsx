import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";
import { useState } from 'react';
import { useWindowSize } from '@/utils';
import { ChartData, useChartDataStore } from "@/store";

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

const CursorNav = ({ arrow, nextIndex, handleClick }: { arrow: 'left' | 'right', nextIndex: Boolean, handleClick: (n: number) => void }) => {
	enum Arrow {
		left = 'left',
		right = 'right'
	}

	const step = {
		[Arrow.left]: -1,
		[Arrow.right]: 1
	}

	const icon = {
		[Arrow.left]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>,
		[Arrow.right]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	}

	return <div className={`${!nextIndex && "invisible"}`} onClick={() => handleClick(step[arrow])}>{icon[arrow]}</div>
}

const PlayerAreaChart = ({ valueKey, dataset, graphWidth }: { valueKey: keyof typeof dataKeys, dataset: ChartData[], graphWidth: number }) => {
	return <div className='bg-zinc-50 overflow-auto'>
		<AreaChart width={graphWidth} height={320} data={dataset}
			margin={{ top: 5, right: 30, bottom: 5 }}>
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

const ChartViewer = () => {
	const { dataset } = useChartDataStore();
	const { stats } = dataset;
	const { width } = useWindowSize();
	const maxItems = 10;
	const [navigateChart, setNavigateChart] = useState({ prev: 0, section: 0, next: maxItems });
	const sizedSample = stats.slice(navigateChart.prev, navigateChart.next);
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
				<CursorNav arrow='right' nextIndex={!!stats[navigateChart.next]} handleClick={updateChart} />
			</div>
			{Object.keys(dataKeys).map((value: string, index) =>
				<div key={index} >
					<p>{value.charAt(0).toLocaleUpperCase() + value.slice(1)}</p>
					<PlayerAreaChart dataset={sizedSample} graphWidth={(width * (0.7 + width / 10000))} valueKey={value as keyof typeof dataKeys} />
				</div>
			)}
		</div>
	)
};

export default ChartViewer;
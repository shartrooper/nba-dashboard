import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import { ChartData, useChartDataStore } from "@/store";
import { Spinner } from "@/components/Elements/Spinner";
import { objectKeys } from "@/utils";
import { useNavigatorStore } from "@/store/navigator";

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

const PlayerLineChart = ({ valueKey, dataset, graphWidth }: { valueKey: keyof typeof dataKeys, dataset: ChartData[], graphWidth: number }) => {
	return <ResponsiveContainer
		height={400}
		width={`${graphWidth}%`} >
		<LineChart data={dataset}
			margin={{ top: 5, right: 10, bottom: 50, left: 5 }}>
			<CartesianGrid strokeDasharray="4 3" />
			<XAxis dataKey="label" stroke="#b8b8b8" angle={30}/>
			<YAxis stroke="#b8b8b8" />
			<Tooltip labelClassName='text-midnight' />
			<Legend  verticalAlign="top" align='center' />
			{dataKeys[valueKey].map((key, index) => {
				return <Line key={`line-${index}`} type="monotone" dataKey={key} stroke={scheme[index]} />
			})}
		</LineChart>
	</ResponsiveContainer>
}

const ChartViewer = ({ loadMoreCallback, isLoading }: { isLoading: boolean, loadMoreCallback?: () => void }) => {
	const { dataset } = useChartDataStore();
	const { stats } = dataset;

	const { navigate: navigateChart, update } = useNavigatorStore(state => state);
	const sizedSample = stats.slice(navigateChart.prev, navigateChart.next);

	return (
		<div className='m-4 flex flex-col'>
			{isLoading ?
				<div className="flex justify-center" >
					<Spinner />
				</div>
				:
				<div className='flex justify-between'>
					<CursorNav arrow='left' nextIndex={!!navigateChart.prev} handleClick={update} />
					<CursorNav arrow='right' nextIndex={!!stats[navigateChart.next]} handleClick={update} />
					{!stats[navigateChart.next] && !isLoading && <button onClick={loadMoreCallback}>More...</button>}
				</div>
			}
			{objectKeys(dataKeys).map((value, index) =>
				<div key={index}>
					<p>{value.charAt(0).toLocaleUpperCase() + value.slice(1)}</p>
					<PlayerLineChart dataset={sizedSample} graphWidth={95} valueKey={value as keyof typeof dataKeys} />
				</div>
			)}
		</div>
	)
};

export default ChartViewer;
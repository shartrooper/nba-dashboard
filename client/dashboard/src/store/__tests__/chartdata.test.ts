import { StatsRecord } from '@/features/playerstats/types';
import { ParsedMetaData } from '@/types';
import { renderHook, act } from '@testing-library/react-hooks';

import { useChartDataStore } from '../chartdata';


test('should add a dataset chunk', () => {
	const { result } = renderHook(() => useChartDataStore());

	expect(result.current.dataset.stats.length).toBe(0);

	const playerData: StatsRecord = {
		ast: 8,
		blk: 0,
		dreb: 10,
		fg3_pct: 0.2,
		fg3a: 5,
		fg3m: 1,
		fg_pct: 0.471,
		fga: 17,
		fgm: 8,
		ft_pct: 0.571,
		fta: 7,
		ftm: 4,
		min: "40:21",
		oreb: 2,
		pf: 1,
		pts: 21,
		reb: 12,
		stl: 1,
		turnover: 7,
		game: {
			id: 2,
			season: 2003,
			date: "2003-10-30T00:00:00.000Z",
			home_team_id: "Suns",
			home_team_score: 95,
			visitor_team_score: 86,
			visitor_team_id: "Cavaliers"
		}
	};

	const meta: ParsedMetaData = {
		nextPage: 2,
		currentPage: 1,
		perPage: 1
	}

	act(() => result.current.addChunk({ stats: [playerData], meta }, "Suns"));

	expect(result.current.dataset.stats).toBeTruthy();

	expect(result.current.dataset.meta).toBeTruthy();

})
import { ParsedPlayerStatsResponse, StatsRecord } from '@/features/playerstats/types';
import create from 'zustand';

export type ChartData = StatsRecord & { label: string }

type ChartDataStore = {
	dataset: { stats: ChartData[] } & Partial<Pick<ParsedPlayerStatsResponse, 'meta'>>;
	addChunk: (chunk: Omit<ParsedPlayerStatsResponse, 'player'>, teamPlayerName: string) => void;
};

export const useChartDataStore = create<ChartDataStore>((set) => ({
	dataset: { stats: [] },
	addChunk: (chunk, teamPlayerName) => {
		const { meta } = chunk;
		const parsedChunk: ChartData[] = chunk.stats.map(stat => {
			const { home_team_id, visitor_team_id, date } = stat.game;
			const opponent = home_team_id === teamPlayerName ? visitor_team_id : home_team_id;
			const parsedDate = new Date(date).toISOString().split('T')[0];
			return {
				...stat,
				label: `vs.${opponent}(${parsedDate})`
			}
		});
		set(() => ({
			dataset: { stats: parsedChunk, meta }
		}))
	}
}));
import create from 'zustand';

export const loaders = ['main', 'chart'] as const;

export type LoadersUnion = typeof loaders[number];

type Loaders = {
	[key in LoadersUnion]: boolean;
}

interface ScreenLoaderStore extends Loaders {
	toggle: (show: boolean) => void;
}

export const screenLoaderSlice = create<Omit<ScreenLoaderStore, 'chart'>>(set => ({
	[loaders[0]]: false,
	toggle: (show: boolean) => set(() => {
		return {
			main: show
		}
	})
}));

export const chartLoaderSlice = create<Omit<ScreenLoaderStore, 'main'>>(set => ({
	[loaders[1]]: false,
	toggle: (show: boolean) => set(() => {
		return {
			chart: show
		}
	})
}));
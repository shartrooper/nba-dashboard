import create from 'zustand';

export const loaders = ['main', 'chart'] as const;

type LoadersUnion = typeof loaders[number];

type IsShowing = { [key in LoadersUnion]: boolean };

const initializeLoaders = loaders.reduce((acc, key) => ({ ...acc, [key]: false }), {} as IsShowing);

export const useScreenLoaderStore = create<{ isShowing: IsShowing, toggle: (show: boolean, loaderKey: LoadersUnion) => void }>(set => ({
	isShowing: initializeLoaders,
	toggle: (show: boolean, loaderKey: LoadersUnion) => set(state => {
		return {
			isShowing: {
				...state.isShowing, [loaderKey]: show
			}
		}
	})
}));
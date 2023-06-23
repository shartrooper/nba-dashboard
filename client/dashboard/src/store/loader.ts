import create from 'zustand';

export const useScreenLoaderStore = create<{ isShowing: boolean, toggle: (show: boolean) => void }>(set => ({
	isShowing: false,
	toggle: (show: boolean) => set(() => ({ isShowing: show }))
}));
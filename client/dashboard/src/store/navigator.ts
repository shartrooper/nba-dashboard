import create from 'zustand';

type Navigator = {
	prev: number,
	section: number,
	next: number
}

type NavigatorStore = {
	navigate: Navigator,
	maxItems: number,
	update: (n: number) => void
	reset: () => void
}

const DEFAULT_MAX_ITEMS = 10;

const INIT_NAVIGATOR = { prev: 0, section: 0, next: DEFAULT_MAX_ITEMS }

export const useNavigatorStore = create<NavigatorStore>(set => ({
	navigate: INIT_NAVIGATOR,
	maxItems: DEFAULT_MAX_ITEMS,
	update: (n: number) => set(state => {
		const i = n + state.navigate.section;
		return {
			navigate: {
				prev: i * state.maxItems,
				section: i,
				next: (i + 1) * state.maxItems
			}
		}
	}),
	reset: () => set(state => ({ navigate: { ...INIT_NAVIGATOR, next: state.maxItems } }))
}));
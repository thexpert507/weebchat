import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(false);

export const floatingMenu = {
	subscribe,
	open: (): void => set(true),
	close: (): void => set(false),
	toogle: (): void => update((value) => !value)
};

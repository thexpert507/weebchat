import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const getUser = () => {
	const localname = browser ? localStorage.getItem('username') : null;
	const { subscribe, update, set } = writable(localname);
	return {
		subscribe,
		setUsername: (name: string) => {
			if (name === localname) return;
			if (browser) localStorage.setItem('username', name);
			set(name);
		}
	};
};

import { browser } from '$app/env';
import { idb } from '$lib/indexedDb';
import { v4 } from '@lukeed/uuid';
import type { User } from 'src/interfaces/user';
import { writable } from 'svelte/store';

const { subscribe, set, update } = writable({
	isAvailable: false,
	user: {} as User,
	err: 'EMPTY',
	isAuth: false
});
let database: IDBDatabase;
function transaction(): IDBObjectStore {
	return database.transaction('profile', 'readwrite').objectStore('profile');
}

if (browser) {
	idb.subscribe(({ isAvailable, db }) => {
		if (!isAvailable) return;
		database = db;
		const profile = db.transaction('profile', 'readonly').objectStore('profile');
		profile.getAll().onsuccess = (ev: Event) => {
			const data: User[] = (ev.target as IDBRequest).result;
			if (!data[0]) {
				set({ isAvailable: true, user: {} as User, err: 'EMPTY', isAuth: false });
				return;
			}
			set({ isAvailable: true, user: data[0], err: null, isAuth: false });
		};
	});
}

export const profile = {
	subscribe,
	setProfile: (name: string): void => {
		const user = { id: v4(), nickname: name };
		transaction().add(user);
		set({ isAvailable: true, user, err: null, isAuth: false });
	},
	login: (): void => update((prof) => ({ ...prof, isAuth: true }))
};

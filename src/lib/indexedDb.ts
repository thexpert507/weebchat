import { browser } from '$app/env';
import { writable } from 'svelte/store';

const { set, subscribe } = writable({ isAvailable: false, db: null as IDBDatabase });

if (browser) {
	const indexedDB = window.indexedDB.open('weebchat', 3.0);
	indexedDB.onsuccess = (ev: Event) => {
		console.log('Open success idb');
		set({ isAvailable: true, db: (ev.target as IDBOpenDBRequest).result });
	};
	indexedDB.onerror = (ev: Event) => {
		console.log('Error idb');
		set({ isAvailable: false, db: null });
	};
	indexedDB.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
		const idb = (ev.target as IDBOpenDBRequest).result;
		// Chats
		const chats = idb.createObjectStore('chats', { keyPath: 'id' });
		chats.createIndex('from', 'from', { unique: false });
		chats.createIndex('to', 'to', { unique: false });
		chats.createIndex('message', 'message', { unique: false });
		chats.createIndex('sendedAt', 'sendedAt', { unique: false });
		// Users
		const users = idb.createObjectStore('users', { keyPath: 'id' });
		users.createIndex('nickName', 'nickName', { unique: true });
		users.createIndex('image', 'image', { unique: false });

		// Profile
		const profile = idb.createObjectStore('profile', { keyPath: 'id' });
		profile.createIndex('nickName', 'nickName', { unique: true });
		profile.createIndex('image', 'image', { unique: false });
	};
}

export const idb = { subscribe };

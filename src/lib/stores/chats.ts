import { browser } from '$app/env';
import { fireapp } from '$lib/firebase';
import { idb } from '$lib/indexedDb';
import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	onSnapshot,
	Timestamp
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type { Chat } from 'src/interfaces/chat';
import { writable } from 'svelte/store';
import { profile } from './profile';

const { subscribe, set, update } = writable([] as Chat[]);

let db: IDBDatabase;
let userNickname: string;
let chatsReference: CollectionReference<DocumentData>;
const transaction = () => db.transaction('chats', 'readwrite').objectStore('chats');

if (browser) {
	idb.subscribe((idb) => (db = idb.db));
	profile.subscribe(({ user }) => {
		chatsReference = collection(fireapp, 'chats');
		onSnapshot(chatsReference, (data) => {
			const chatsOnServer = data.docs.filter((c) => {
				const chat = c.data() as Chat;
				return chat.status === 'on_quew' && chat.to === user.nickname;
			});
			const mychats = chatsOnServer.map((c) => {
				const data = c.data();
				const time = data.sendedAt as Timestamp;
				const transformed = {
					...data,
					sendedAt: new Timestamp(time.seconds, time.nanoseconds).toDate()
				};
				return transformed;
			}) as Chat[];
			mychats.map((c) => transaction().add(c));
			userNickname &&
				update((data) => {
					const chatsToThisUser = mychats.filter((c) => c.from === userNickname);
					return [...chatsToThisUser, ...data];
				});
			chatsOnServer.map((c) => deleteDoc(c.ref));
		});
	});
}

export const chats = {
	subscribe,
	get: (nickname: string): void => {
		userNickname = nickname;
		transaction().getAll().onsuccess = (ev: Event) => {
			const data = (ev.target as IDBRequest).result as Chat[];
			const chats = data.filter((c) => c.from === nickname || c.to === nickname);
			set(chats);
		};
	},
	add: (chat: Chat): void => {
		transaction().add(chat);
		if (browser) addDoc(chatsReference, chat);
		update((data) => [...data, chat]);
	}
};

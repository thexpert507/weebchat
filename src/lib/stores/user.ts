import { fireapp } from '$lib/firebase';
import {
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	CollectionReference,
	getDocs
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type { User } from 'src/interfaces/user';
import { writable } from 'svelte/store';
import { profile } from './profile';
import { browser } from '$app/env';

const { subscribe, set } = writable([] as User[]);
let closeProfile;
let profileConnected: User;
let connectionsReference: CollectionReference<DocumentData>;
if (browser) {
	connectionsReference = collection(fireapp, 'connections');
	onSnapshot(connectionsReference, (data) => {
		const users = data.docs.map((v) => v.data()) as User[];
		set(users);
	});
}

export const users = {
	subscribe,
	registerConnection: (): void => {
		closeProfile =
			browser &&
			profile.subscribe(async ({ user }) => {
				profileConnected = user;
				await addDoc(connectionsReference, user);
			});
	},
	deleteConnection: async (): Promise<void> => {
		closeProfile && closeProfile();
		const connections = await getDocs(connectionsReference);
		browser &&
			connections.docs
				.filter((c) => c.data().id === profileConnected.id)
				.map((c) => deleteDoc(c.ref));
	}
};

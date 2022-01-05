import { fireapp } from '$lib/firebase';
import {
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	CollectionReference,
	getDocs,
	updateDoc
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
		profile.subscribe(({ user }) => set(users.filter((u) => u.id !== user.id)));
	});
}

export const users = {
	subscribe,
	registerConnection: async (): Promise<void> => {
		const connections = await getDocs(connectionsReference);
		closeProfile =
			browser &&
			profile.subscribe(async ({ user }) => {
				profileConnected = user;
				const connection = connections.docs.filter((c) => c.data().nickname === user.nickname);
				connection &&
					connection.map((conn, index) => {
						if (index === 0) {
							updateDoc(conn.ref, { ...conn.data(), lastConnection: new Date() });
							return;
						}
						deleteDoc(conn.ref);
					});
				if (connection.length === 0)
					await addDoc(connectionsReference, { ...user, lastConnection: new Date() });
			});
	},
	deleteConnection: async (): Promise<void> => {
		closeProfile && closeProfile();
		const connections = await getDocs(connectionsReference);
		browser &&
			connections.docs
				.filter((c) => c.data().id === profileConnected.id)
				.map((c) => updateDoc(c.ref, { ...c.data(), lastConnection: new Date() }));
	}
};

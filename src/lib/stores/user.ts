import { browser } from '$app/env';
import { supabase } from '$lib/supabase';
import type { User } from 'src/interfaces/user';
import { writable } from 'svelte/store';
import { profile } from './profile';

const { subscribe, set } = writable([] as User[]);
let closeProfile;
let profileConnected: User;

function getConnections() {
	supabase
		.from('connections')
		.select('*')
		.then(({ data }) => set(data));
}

if (browser) {
	getConnections();
	supabase
		.from('connections')
		.on('*', (payload) => {
			getConnections();
		})
		.subscribe();
}
export const users = {
	subscribe,
	registerConnection: () => {
		closeProfile = profile.subscribe(async ({ user }) => {
			profileConnected = user;
			await supabase.from('connections').insert(user);
			console.log('Register new connection');
		});
	},
	deleteConnection: async () => {
		closeProfile();
		await supabase.from('connections').delete().eq('id', profileConnected.id);
		console.log('Deleted connection');
	}
};

<script context="module" lang="ts">
	import { profile } from '$lib/stores/profile';
	import type { Load, LoadInput } from '@sveltejs/kit';
	import type { Profile } from 'src/interfaces/profile';

	function getProfile(): Promise<Profile> {
		return new Promise((resolve, reject) => {
			profile.subscribe((prof) => resolve(prof));
		});
	}

	export const load: Load = async ({}: LoadInput) => {
		const prof = await getProfile();
		if (!prof.isAuth) {
			return { redirect: '/', status: 302 };
		}
		return { props: {} };
	};
</script>

<script lang="ts">
	import { users } from '$lib/stores/user';

	import { onDestroy, onMount } from 'svelte';

	import Aside from './_components/aside.svelte';
	import Nav from './_components/nav.svelte';
	import { fade } from 'svelte/transition';

	onMount(users.registerConnection);
	onDestroy(users.deleteConnection);
</script>

<section class="grid grid-cols-12 auto-rows-fr h-full lg:rounded-md overflow-hidden " in:fade>
	<Aside />
	<div
		class="ml-[4rem] lg:ml-0 col-span-12 lg:col-span-8 h-full border-l border-gray-300 bg-chat relative"
	>
		<div class="absolute top-0 w-full">
			<Nav>
				<div class=" px-2 flex items-center h-full">
					<h1 class="font-semibold text-2xl tracking-wider text-weegreen-dark">Weebchat</h1>
				</div>
			</Nav>
		</div>
		<slot />
	</div>
</section>

<style lang="postcss">
	.bg-chat::before {
		content: '';
		@apply opacity-40 w-full h-full absolute top-0 bg-contain bg-[#dddbd1];
		background-image: url('./background.png');
	}
</style>

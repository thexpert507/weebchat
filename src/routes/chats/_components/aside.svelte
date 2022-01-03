<script lang="ts">
	import Nav from './nav.svelte';
	import Icon from '@iconify/svelte';
	import User from './user.svelte';
	import { users } from '$lib/stores/user';
</script>

<aside class="col-span-4">
	<Nav>
		<div class="flex items-center justify-between h-full w-full">
			<div
				class="text-3xl flex items-center justify-center w-10 h-10 rounded-full shadow bg-white mx-2"
			>
				<Icon icon="mdi:account" />
			</div>
			<div class="text-3xl flex items-center justify-center w-10 h-10">
				<Icon icon="carbon:overflow-menu-vertical" />
			</div>
		</div>
	</Nav>
	{#each $users as user (user.id)}
		<User {user} />
	{/each}
</aside>

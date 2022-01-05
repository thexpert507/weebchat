<script lang="ts">
	import type { User } from 'src/interfaces/user';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let user: User;
	export let cube = false;
</script>

<div
	class:flex-col={cube}
	class:w-16={cube}
	class="shrink-0 w-full flex items-center px-1 py-2 cursor-pointer hover:bg-gray-300 relative overflow-hidden"
	on:click={() => goto(`/chats/${user.nickname}`)}
>
	{#if !user.image}
		<div
			class="shrink-0 text-3xl flex items-center justify-center w-10 h-10 rounded-full shadow bg-white mx-2"
		>
			<Icon icon="mdi:account" />
		</div>
	{/if}
	{#if !cube}
		<div class=" ml-2 text-lg font-light tracking-wider text-gray-900">{user.nickname}</div>
	{/if}
</div>

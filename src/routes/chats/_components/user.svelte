<script lang="ts">
	import type { User } from 'src/interfaces/user';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let user: User;
</script>

<div
	class="shrink-0 w-full flex items-center px-1 py-2 cursor-pointer hover:bg-gray-300"
	on:click={() => goto(`/chats/${user.nickname}`)}
>
	{#if !user.image}
		<div
			class="shrink-0 text-3xl flex items-center justify-center w-10 h-10 rounded-full shadow bg-white mx-2"
		>
			<Icon icon="mdi:account" />
		</div>
	{/if}
	<div class="font-light ml-2">{user.nickname}</div>
</div>

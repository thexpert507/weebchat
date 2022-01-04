<script lang="ts">
	import { profile } from '$lib/stores/profile';
	import { format } from 'date-fns';
	import type { Chat } from 'src/interfaces/chat';
	import { fly } from 'svelte/transition';

	export let chat: Chat;

	$: right = chat.from === $profile.user.nickname;
</script>

{#if right}
	<div class="w-full py-2 flex items-center justify-end" in:fly={{ x: 20 }}>
		<div class="px-2 py-1 bg-weegreen-dark font-bold text-white rounded-3xl shadow">
			{chat.message}
			<span class="text-[.70rem] font-light tracking-wider mx-2"
				>{format(chat.sendedAt, 'h:mm aa')}</span
			>
		</div>
	</div>
{:else}
	<div class="w-full py-2 flex items-center justify-start" in:fly={{ x: -20 }}>
		<div class="px-2 py-1 bg-white font-bold text-gray-900 rounded-3xl shadow">
			{chat.message}
			<span class="text-[.70rem] font-light tracking-wider mx-2"
				>{format(chat.sendedAt, 'h:mm aa')}</span
			>
		</div>
	</div>
{/if}

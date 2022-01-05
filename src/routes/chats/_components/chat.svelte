<script lang="ts">
	import { profile } from '$lib/stores/profile';
	import { format } from 'date-fns';
	import type { Chat } from 'src/interfaces/chat';
	import { fly } from 'svelte/transition';

	export let chat: Chat;

	$: right = chat.from === $profile.user.nickname;
</script>

{#if right}
	<div class="w-full py-1 flex items-center justify-end" in:fly={{ x: 20 }}>
		<div
			class="max-w-[90%] flex items-center px-2 py-1 bg-weegreen-dark font-semibold text-white rounded-3xl shadow"
		>
			<div class="flex-1">{chat.message}</div>
			<div class="self-end h-full text-[.70rem] font-light tracking-wider mx-2">
				{format(chat.sendedAt, 'h:mm aa')}
			</div>
		</div>
	</div>
{:else}
	<div class="w-full py-1 flex items-center justify-start" in:fly={{ x: -20 }}>
		<div
			class="max-w-[90%] flex items-center flex-wrap px-2 py-1 bg-white font-semibold text-gray-900 rounded-3xl shadow"
		>
			<div class="flex-1">{chat.message}</div>
			<div class="self-end  h-full text-[.70rem] font-light tracking-wider mx-2">
				{format(chat.sendedAt, 'h:mm aa')}
			</div>
		</div>
	</div>
{/if}

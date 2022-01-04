<script lang="ts">
	import { page } from '$app/stores';
	import { chats } from '$lib/stores/chats';
	import { profile } from '$lib/stores/profile';
	import Icon from '@iconify/svelte';
	import { v4 } from '@lukeed/uuid';
	import Chat from './_components/chat.svelte';
	import Nav from './_components/nav.svelte';
	import { flip } from 'svelte/animate';
	import { floatingMenu } from '$lib/stores/floatingMenu';

	let message: string;
	$: nickname = $page.params?.nickname;
	$: chats.get($page.params?.nickname);
	$: ordered = $chats.sort((a, b) => {
		const dateA = new Date(a.sendedAt).getTime();
		const dateB = new Date(b.sendedAt).getTime();
		return dateB - dateA;
	});
	const send = () => {
		chats.add({
			id: v4(),
			from: $profile.user.nickname,
			to: nickname,
			message,
			sendedAt: new Date(),
			status: 'on_quew'
		});
		message = '';
	};

	const enter = (ev: KeyboardEvent) => {
		if (ev.code === 'Enter') send();
	};
</script>

<div class="absolute top-0 w-full flex flex-col-reverse h-[calc(100%_-_4rem)] px-2 md:px-10">
	{#each ordered as chat, index (chat.id)}
		<div animate:flip={{ duration: 300 }}>
			<Chat {chat} />
		</div>
	{/each}
</div>
<div class="w-full absolute bottom-0">
	<Nav>
		<div class="flex items-center justify-around h-full">
			<div
				on:click={() => floatingMenu.toogle()}
				class="sm:hidden text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer"
			>
				<Icon icon="ph:chats-bold" />
			</div>
			<div class="text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer">
				<Icon icon="carbon:face-activated" />
			</div>
			<div class="w-full px-2 py-1 bg-white rounded-3xl border border-gray-200">
				<input type="text" class="outline-none w-full" bind:value={message} on:keyup={enter} />
			</div>
			<div
				on:click={send}
				class="text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer hover:scale-110 transition-all duration-300"
			>
				<Icon icon="fluent:send-20-filled" />
			</div>
		</div>
	</Nav>
</div>

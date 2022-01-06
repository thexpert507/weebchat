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
	import { fly } from 'svelte/transition';
	import { emojis } from '$lib/emojis';
	import Emoji from './_components/emoji.svelte';

	let message: string = '';
	let margin = '4rem';
	$: openEmojis = false;
	$: nickname = $page.params?.nickname;
	$: chats.get($page.params?.nickname);
	$: ordered = $chats.sort((a, b) => {
		const dateA = new Date(a.sendedAt).getTime();
		const dateB = new Date(b.sendedAt).getTime();
		return dateB - dateA;
	});
	const send = () => {
		if (!message) return;
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

	const openTabEmojis = () => {
		if ($floatingMenu) floatingMenu.close();
		margin = margin === '11rem' ? '4rem' : '11rem';
		openEmojis = !openEmojis;
	};
	const openFloatingMenu = () => {
		if (openEmojis) margin = margin === '11rem' ? '4rem' : '11rem';
		if (openEmojis) openEmojis = false;
		floatingMenu.toogle();
	};

	const handleClickEmoji = (emoji: string) => () => (message += emoji);
</script>

<div
	style="--margin: {margin}"
	class="absolute transition-all duration-300 overflow-y-scroll top-0 w-full flex flex-col-reverse h-[calc(100%_-_var(--margin))] px-2 pt-16 pb-5 md:px-10"
>
	{#each ordered as chat (chat.id)}
		<div animate:flip={{ duration: 300 }}>
			<Chat {chat} />
		</div>
	{/each}
</div>
{#if openEmojis}
	<div
		transition:fly={{ y: 20 }}
		class="absolute bottom-0 mb-16 z-10 w-full h-28 bg-[#ededed] border-b border-gray-200 overflow-y-scroll grid grid-cols-10 md:grid-cols-12 place-content-evenly"
	>
		{#each emojis as emoji, i (i)}
			<Emoji {emoji} on:click={handleClickEmoji(emoji.code)} />
		{/each}
	</div>
{/if}
<div class="w-full absolute bottom-0">
	<Nav>
		<div class="flex items-center justify-around h-full">
			<div
				on:click={openFloatingMenu}
				class="sm:hidden text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer"
			>
				<Icon icon="ph:chats-bold" />
			</div>
			<div on:click={openTabEmojis} class="text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer">
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

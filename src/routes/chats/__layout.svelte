<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { users } from '$lib/stores/user';
	import { env } from '$lib/env';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import Nav from './_components/nav.svelte';
	import Aside from './_components/aside.svelte';
	import ScrollerUsers from './_components/scrollerUsers.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	$: nickname = $page.params.nickname;

	onMount(users.registerConnection);
	onDestroy(users.deleteConnection);

	$: isHome = !$page.url.pathname.includes('config');
</script>

<section class="grid grid-cols-12 auto-rows-fr h-full lg:rounded-md overflow-hidden " in:fade>
	<ScrollerUsers />
	<Aside />
	<div
		class="ml-0 sm:ml-16 lg:ml-0 col-span-12 lg:col-span-8 h-full border-l border-gray-300 bg-chat relative before:content-[''] before:opacity-40 before:w-full before:h-full before:absolute before:top-0 before:bg-contain before:bg-[#dddbd1]"
	>
		<div class="absolute top-0 w-full">
			<Nav>
				<div class="px-2 flex items-center h-full w-full">
					{#if !nickname}
						<h1 in:fade class=" w-full font-semibold text-2xl tracking-wider text-weegreen-dark">
							Weebchat
						</h1>
					{:else}
						<h1 in:fade class=" w-full font-semibold text-2xl tracking-wider text-weegreen-dark">
							{nickname}
						</h1>
					{/if}
					{#if isHome}
						<div
							transition:fly={{ x: -10 }}
							on:click={() => goto('/chats/config')}
							class="text-2xl mx-2 hover:scale-110"
						>
							<Icon icon="vscode-icons:file-type-light-config" />
						</div>
					{:else}
						<div
							transition:fly={{ x: -10 }}
							on:click={() => goto('/chats')}
							class="text-gray-800 text-2xl mx-2 hover:scale-110"
						>
							<Icon icon="bx:bxs-home" />
						</div>
					{/if}
				</div>
			</Nav>
		</div>
		<slot />
	</div>
</section>

{#if env.production}
	<style lang="postcss">
		.bg-chat::before {
			background-image: url('https://weebchat.vercel.app/background.png');
		}
	</style>
{:else}
	<style lang="postcss">
		.bg-chat::before {
			background-image: url(background.png);
		}
	</style>
{/if}

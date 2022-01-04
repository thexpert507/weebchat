<script lang="ts">
	import Nav from './nav.svelte';
	import Icon from '@iconify/svelte';
	import User from './user.svelte';
	import { users } from '$lib/stores/user';
	import { profile } from '$lib/stores/profile';

	let width = 0;
	let closed = false;

	$: usersCon = $users.filter((u) => u.id !== $profile.user.id);
	$: usersDup = [...new Set(usersCon)];
	$: classOpen = closed && width <= 1024;
</script>

<svelte:window bind:innerWidth={width} />
<aside
	class:closed={classOpen}
	class="navMobile hidden absolute w-full sm:w-1/2 md:w-1/3 lg:w-full lg:col-span-4 sm:block lg:relative"
>
	<Nav>
		<div class="flex items-center justify-between h-full w-full">
			<div class="px-1 flex items-center h-full shrink-0">
				<div
					on:click={() => (closed = !closed)}
					class="text-3xl flex items-center justify-center w-10 h-10 rounded-full shadow bg-white mx-2"
				>
					<Icon icon="mdi:account" />
				</div>
				<span class="ml-2 font-light text-2xl">{$profile.user.nickname}</span>
			</div>
			<div class="hidden text-3xl lg:flex items-center justify-center w-10 h-10">
				<Icon icon="carbon:overflow-menu-vertical" />
			</div>
			<div
				on:click={() => (closed = !closed)}
				class="text-3xl flex lg:hidden items-center justify-center w-10 h-10"
			>
				<Icon icon="codicon:chrome-close" />
			</div>
		</div>
	</Nav>
	{#each usersDup as user, i (user.id + i)}
		<User {user} />
	{/each}
</aside>

<style lang="postcss">
	.navMobile {
		@apply bg-[#f8f9fa] h-screen z-20 overflow-hidden transition-all duration-300;
	}
	.closed {
		@apply w-16;
	}
</style>

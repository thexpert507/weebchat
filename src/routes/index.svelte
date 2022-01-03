<script lang="ts">
	import { goto } from '$app/navigation';

	import { idb } from '$lib/indexedDb';
	import { profile } from '$lib/stores/profile';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	const loading = tweened(0);
	let nickname = '';

	$: $idb.isAvailable ? loading.set(100) : '';
	$: register = $profile.isAvailable && $profile.err === 'EMPTY' && $loading === 100;

	const handleSubmit = () => profile.setProfile(nickname);
</script>

<header class="w-full h-28 flex items-center justify-center">
	<h1 class="text-3xl text-center my-10 font-semibold uppercase tracking-wider text-weegreen-dark">
		weebchat
	</h1>
</header>

{#if register}
	<div class="flex items-center justify-center my-5" transition:fade>
		<form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center justify-center">
			<h2 class="text-xl text-center font-light">Identifcate en el chat</h2>
			<label class="mt-5 mb-2 font-semibold text-gray-800 text-center" for="username"
				>Nickname</label
			>
			<input
				type="text"
				name="username"
				class="w-full border px-2 p-1 rounded-3xl outline-none text-center"
				placeholder="ej: squill404"
				bind:value={nickname}
			/>
			<button
				class="my-5 transition-all duration-300 rounded hover:shadow-md hover:shadow-weegreen/30 border border-weegreen text-weegreen px-4 py-2 font-light uppercase"
				>Crear</button
			>
		</form>
	</div>
{:else}
	<div class="w-full flex items-center justify-center" transition:fade>
		<div class="w-1/6 h-5 rounded-3xl bg-slate-300 flex items-center justify-start">
			<div class="rounded-3xl bg-[#1c8b82] h-4 mx-0.5" style="width: {$loading}%;" />
		</div>
	</div>
{/if}
{#if !register && $loading === 100}
	<div class="my-10 w-full flex items-center justify-center" transition:fade>
		<div
			on:click={() => goto('/chats')}
			class="my-5 cursor-pointer transition-all duration-300 rounded hover:shadow-md hover:shadow-weegreen/30 border border-weegreen text-weegreen px-4 py-2 font-light"
		>
			{$profile.user.nickname}
		</div>
	</div>
{/if}

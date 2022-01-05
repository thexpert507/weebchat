<script lang="ts">
	import { floatingMenu } from '$lib/stores/floatingMenu';

	import { users } from '$lib/stores/user';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import User from './user.svelte';
</script>

{#if $floatingMenu}
	<div
		transition:fly={{ y: 25 }}
		class="sm:hidden absolute z-40 bottom-16 w-16 mx-2 my-2 backdrop-blur-sm rounded-3xl shadow-lg bg-white/30 overflow-hidden"
	>
		<div class="flex flex-col h-80 overflow-y-scroll overflow-x-visible">
			{#each $users as user, i (user.id + i)}
				<div class="relative" animate:flip>
					<User {user} cube={true} />
				</div>
			{/each}
		</div>
	</div>
{/if}

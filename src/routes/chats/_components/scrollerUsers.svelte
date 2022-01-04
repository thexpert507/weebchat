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
		class="sm:hidden absolute z-50 bottom-16 w-16 mx-2 my-2 backdrop-blur-sm rounded-3xl shadow-lg bg-white/30 overflow-hidden"
	>
		<div class="flex flex-col h-80 overflow-y-auto overflow-x-hidden ">
			{#each $users as user, i (user.id + i)}
				<div animate:flip>
					<User {user} />
				</div>
			{/each}
		</div>
	</div>
{/if}

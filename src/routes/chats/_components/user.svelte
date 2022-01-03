<script lang="ts">
	import type { User } from 'src/interfaces/user';
	import Icon from '@iconify/svelte';

	export let user: User;
</script>

<div class="flex items-center px-1 py-2">
	{#if !user.image}
		<div
			class="text-3xl flex items-center justify-center w-10 h-10 rounded-full shadow bg-white mx-2"
		>
			<Icon icon="mdi:account" />
		</div>
	{/if}
	<div class="font-light">{user.nickname}</div>
</div>

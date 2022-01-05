<script lang="ts">
	import type { Emoji } from '$lib/emojis';

	import { fly } from 'svelte/transition';

	export let emoji: Emoji;
</script>

<div on:click transition:fly={{ x: 5 }} class="shrink-0 w-10 h-10 text-2xl p-1">
	{@html emoji.code}
</div>

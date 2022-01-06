<script lang="ts">
	import type { Emoji } from '$lib/emojis';
	export let emoji: Emoji;
</script>

<div on:click class="shrink-0 cursor-pointer w-10 h-10 text-2xl text-center p-1">
	{@html emoji.code}
</div>

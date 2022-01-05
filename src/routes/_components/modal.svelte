<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let show: Writable<boolean>;

	let component: HTMLElement;
	const body = document.getElementById('svelte') as HTMLDivElement;

	$: console.log($show);

	if ($show) {
		console.log($show, component, body);
		component && body.appendChild(component);
	} else if (!$show) {
		console.log($show, component, body);
		component && body.removeChild(component);
	}
</script>

<div
	class="absolute flex items-center justify-center top-0 left-0 w-full h-full z-[60]"
	bind:this={component}
>
	<slot />
</div>

<script lang="ts">
	import { idb } from '$lib/indexedDb';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	const deleteDB = async () => {
		await idb.deleteDB();
		window.location.reload();
	};
</script>

<div class="absolute w-full h-full mt-16 p-5">
	<div transition:fly={{ y: 20 }} class="bg-white rounded w-full shadow-xl">
		<div class="flex items-center w-full">
			<h2 class="w-full my-2 px-2 text-xl text-gray-900 font-semibold">Configuracion</h2>
		</div>
		<div class="py-5 px-2 flex flex-col items-center justify-center">
			<button
				on:click={deleteDB}
				class="transition-all duration-300 rounded hover:shadow-md hover:shadow-weegreen/30 border border-weegreen text-weegreen px-4 py-2 font-light uppercase flex items-center"
				>Eliminar mensages
				{#if $idb.isDeleting}
					<div class="animate-spin w-5 h-5 flex items-center justify-center mx-2">
						<Icon icon="gg:spinner-two" />
					</div>
				{/if}
			</button>
		</div>
	</div>
</div>

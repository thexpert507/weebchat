<script lang="ts">
	import { floatingMenu } from '$lib/stores/floatingMenu';

	import Icon from '@iconify/svelte';
	import Nav from './_components/nav.svelte';

	const handleMenu = () => floatingMenu.toogle();
</script>

<div class="w-full absolute bottom-0 sm:hidden">
	<Nav>
		<div class="flex items-center justify-around h-full">
			<div on:click={handleMenu} class="text-3xl mx-3 text-gray-800 shrink-0 cursor-pointer">
				<Icon icon="ph:chats-bold" />
			</div>
		</div>
	</Nav>
</div>

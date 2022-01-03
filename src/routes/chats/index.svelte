<script lang="ts">
	import { users } from '$lib/stores/user';

	import { onDestroy, onMount } from 'svelte';

	import Aside from './_components/aside.svelte';

	onMount(users.registerConnection);
	onDestroy(users.deleteConnection);
</script>

<section class="grid grid-cols-12">
	<Aside />
</section>

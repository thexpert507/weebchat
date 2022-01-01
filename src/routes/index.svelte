<script context="module">
	// export const load = async () => {
	// 	const { data } = await supabase.from('chats').select();
	// 	return { props: { data } };
	// };
</script>

<script lang="ts">
	import { getUser } from '$lib/stores/user';

	const user = getUser();
</script>

<h1 class="text-3xl text-center my-10 font-semibold uppercase tracking-wider text-blue-800">
	weebchat
</h1>
{#if !$user}
	<div class="flex items-center justify-center my-5">
		<form class="flex flex-col items-center justify-center">
			<h2 class="text-xl text-center">Identifcate en el chat</h2>
			<label class="mt-5 font-semibold text-gray-800 text-center" for="username">Nickname</label>
			<input type="text" name="username" class="w-full border p-2 rounded-md" />
		</form>
	</div>
{:else}
	{$user}
{/if}

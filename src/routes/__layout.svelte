<script lang="ts" context="module">
	import { profile } from '$lib/stores/profile';

	import type { Load, LoadInput } from '@sveltejs/kit';
	import type { Profile } from 'src/interfaces/profile';

	function getProfile(): Promise<Profile> {
		return new Promise((resolve, reject) => {
			profile.subscribe((prof) => resolve(prof));
		});
	}

	export const load: Load = async ({ url }: LoadInput) => {
		const prof = await getProfile();
		if (!prof.isAuth && url.pathname.includes('chats')) {
			return { redirect: '/', status: 302 };
		}
		return { props: {} };
	};
</script>

<script lang="ts">
	import '../app.css';
</script>

<main class="bg-[#f8f9fa] h-screen">
	<header class="h-32 w-full bg-[#1c8b82]" />
	<div class="fixed w-full h-full top-0 flex items-center justify-center">
		<section
			class="w-[1280px] h-full lg:h-[calc(100vh_-_6rem)] bg-[#f8f9fa] shadow-lg lg:rounded-md overflow-hidden"
		>
			<slot />
		</section>
	</div>
</main>

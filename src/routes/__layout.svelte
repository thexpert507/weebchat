<script lang="ts">
	import '../app.css';
</script>

<main class="bg-[#f8f9fa] h-screen">
	<header class="h-32 w-full bg-[#1c8b82]" />
	<div class="absolute w-full h-full top-0 flex items-center justify-center">
		<section
			class="w-[1280px] h-full lg:h-[calc(100vh_-_6rem)] bg-[#f8f9fa] shadow-md lg:rounded-md overflow-hidden"
		>
			<slot />
		</section>
	</div>
</main>

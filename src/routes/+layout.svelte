<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SkipNav from '$lib/components/SkipNav.svelte';
	import { theme } from '$lib/stores/theme.svelte';

	let { children } = $props();

	// Re-sync the in-memory theme with whatever the FOUC-prevention script chose
	// in app.html (which runs before Svelte hydrates).
	$effect(() => {
		theme.sync();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SkipNav />
<Header />

<main id="main" tabindex="-1" class="focus:outline-none">
	{@render children()}
</main>

<Footer />

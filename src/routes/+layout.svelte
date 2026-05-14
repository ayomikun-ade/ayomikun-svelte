<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SkipNav from '$lib/components/SkipNav.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { reducedMotion } from '$lib/stores/motion.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// Re-sync the in-memory stores with whatever the FOUC-prevention script wrote
	// to the DOM in app.html (which runs before Svelte hydrates).
	$effect(() => {
		theme.sync();
		reducedMotion.sync();
	});

	// Cinematic page transitions via the View Transitions API.
	// Browsers without support skip silently; named elements (e.g. project covers)
	// crossfade/morph between routes for the grid → detail effect.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- favicon is set in app.html → /favicon.svg (static asset, stable URL) -->

<SkipNav />
<Header />

<main id="main" tabindex="-1" class="focus:outline-none">
	{@render children()}
</main>

<Footer />

<CommandPalette />

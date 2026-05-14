<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	class="group relative inline-flex size-9 items-center justify-center border-2 border-border bg-surface transition-colors duration-200 hover:border-accent focus-visible:border-accent"
	aria-label="Toggle theme (current: {theme.current})"
	aria-pressed={theme.current === 'light'}
	title="Toggle theme"
>
	<!-- Sun (visible in dark mode = means "switch to light") -->
	<svg
		class="absolute size-4 text-ink transition-all duration-300 {theme.current === 'dark'
			? 'scale-100 rotate-0 opacity-100'
			: 'scale-50 -rotate-90 opacity-0'}"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="square"
		stroke-linejoin="miter"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="4" />
		<path
			d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
		/>
	</svg>

	<!-- Moon (visible in light mode = means "switch to dark") -->
	<svg
		class="absolute size-4 text-ink transition-all duration-300 {theme.current === 'light'
			? 'scale-100 rotate-0 opacity-100'
			: 'scale-50 rotate-90 opacity-0'}"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
</button>

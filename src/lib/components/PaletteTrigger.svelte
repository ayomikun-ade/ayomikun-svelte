<script lang="ts">
	import { palette } from '$lib/stores/palette.svelte';
</script>

<!-- Visual trigger for the command palette. The Cmd-K hotkey works regardless;
     this gives mouse/touch users an obvious entry point. -->
<button
	type="button"
	onclick={() => palette.openWithQuery()}
	class="trigger border-border bg-surface hover:border-accent focus-visible:border-accent text-ink-muted font-mono inline-flex items-center gap-2 border-2 py-1.5 text-[11px] tracking-wider uppercase transition-colors duration-200"
	aria-label="Open command palette"
>
	<svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
		<circle cx="11" cy="11" r="7" />
		<path d="M21 21l-4.35-4.35" />
	</svg>
	<span class="hidden sm:inline">Search</span>
	<kbd class="border-border bg-bg text-ink-dim ml-1 hidden border px-1 py-0.5 text-[9px] tracking-wider uppercase sm:inline-block">
		⌘K
	</kbd>
</button>

<style>
	.trigger {
		padding-left: 0.65rem;
		padding-right: 0.65rem;
	}
</style>

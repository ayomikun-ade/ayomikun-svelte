<script lang="ts">
	import SocialLinks from './SocialLinks.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="mt-32 border-t border-border">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 font-mono text-xs tracking-widest text-ink-muted uppercase sm:flex-row sm:items-center sm:justify-between sm:px-10"
	>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
			<span class="text-ink-dim">© {year}</span>
			<span>Ayomikun</span>
		</div>

		<SocialLinks variant="label" />
	</div>
</footer>

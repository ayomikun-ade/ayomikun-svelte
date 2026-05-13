<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { categories, projects, type FilterValue } from '$lib/data/projects';
	import { reducedMotion } from '$lib/stores/motion.svelte';
	import ProjectCard from './ProjectCard.svelte';

	let active = $state<FilterValue>('all');

	const filtered = $derived(
		active === 'all' ? projects : projects.filter((p) => p.category === active)
	);

	// Categories the user wouldn't ever match get visually dimmed but stay focusable.
	function countFor(value: FilterValue): number {
		return value === 'all' ? projects.length : projects.filter((p) => p.category === value).length;
	}

	const flipDuration = $derived(reducedMotion.current ? 0 : 380);
	const fadeDuration = $derived(reducedMotion.current ? 0 : 200);
</script>

<!-- Filter tabs: a button group with aria-pressed since they filter content
     (rather than swap visible panels). -->
<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
	{#each categories as cat (cat.value)}
		{@const isActive = active === cat.value}
		{@const count = countFor(cat.value)}
		<button
			type="button"
			onclick={() => (active = cat.value)}
			aria-pressed={isActive}
			disabled={count === 0}
			class="border-border font-mono group inline-flex items-center gap-2 border-2 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
			class:active-tab={isActive}
			class:inactive-tab={!isActive}
		>
			<span>{cat.label}</span>
			<span class="text-ink-dim group-aria-pressed:text-accent-ink/70 font-normal tabular-nums">
				{count}
			</span>
		</button>
	{/each}
</div>

<div
	class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
	aria-live="polite"
	aria-atomic="false"
>
	{#each filtered as project, i (project.slug)}
		<div
			class="group"
			class:lg:col-span-2={project.featured}
			animate:flip={{ duration: flipDuration }}
			in:fade={{ duration: fadeDuration, delay: i * 30 }}
			out:fade={{ duration: fadeDuration }}
		>
			<ProjectCard {project} index={i} />
		</div>
	{/each}
</div>

{#if filtered.length === 0}
	<p class="text-ink-muted font-mono mt-10 text-sm tracking-wider uppercase">
		No projects in this category yet.
	</p>
{/if}

<style>
	.active-tab {
		background: var(--color-accent);
		color: var(--color-accent-ink);
		border-color: var(--color-ink);
	}
	.inactive-tab {
		color: var(--color-ink-muted);
	}
	.inactive-tab:hover:not(:disabled) {
		color: var(--color-ink);
		border-color: var(--color-ink);
	}
</style>

<script lang="ts">
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import { projects } from '$lib/data/projects';

	const total = projects.length;
</script>

<svelte:head>
	<title>Work · Ayomikun</title>
	<meta
		name="description"
		content="Selected projects by Ayomikun — web apps, tools, experiments, and open-source work."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<header class="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="text-ink-muted font-mono text-xs tracking-[0.3em] uppercase">/ work</p>
			<h1 class="font-display mt-4 text-5xl leading-[1] font-extrabold tracking-tight sm:text-7xl">
				Selected<br /><span class="text-accent">projects.</span>
			</h1>
		</div>
		<p class="text-ink-dim font-mono text-xs tracking-[0.2em] uppercase">
			{total} pieces · 2023 – 2025
		</p>
	</header>

	<ProjectsGrid />
</section>

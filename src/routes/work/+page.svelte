<script lang="ts">
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import { projects, projectYearRange } from '$lib/data/projects';

	const total = projects.length;
	const yearRange = projectYearRange();
</script>

<svelte:head>
	<title>Work · Ayomikun</title>
	<meta
		name="description"
		content="Selected projects by Ayomikun — web apps, tools, and experiments."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<header class="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="font-mono text-xs tracking-[0.3em] text-ink-muted uppercase">/ work</p>
			<h1 class="mt-4 font-display text-5xl leading-[1] font-extrabold tracking-tight sm:text-7xl">
				Selected<br /><span class="text-accent">projects.</span>
			</h1>
		</div>
		<p class="font-mono text-xs tracking-[0.2em] text-ink-dim uppercase">
			{total} pieces · {yearRange}
		</p>
	</header>

	<ProjectsGrid />
</section>

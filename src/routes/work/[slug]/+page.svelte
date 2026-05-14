<script lang="ts">
	import { categoryLabel } from '$lib/data/projects';
	import { getCover } from '$lib/data/covers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { project, prev, next } = $derived(data);

	// Stable hue per project — matches the card placeholder so the View Transition
	// crossfade lands on the same colour.
	const hue = $derived((project.slug.charCodeAt(0) * 17) % 360);
	// Resolved enhanced-img picture, or undefined → placeholder renders.
	const cover = $derived(getCover(project.cover));
</script>

<svelte:head>
	<title>{project.title} · Ayomikun</title>
	<meta name="description" content={project.tagline} />
	<meta property="og:title" content="{project.title} · Ayomikun" />
	<meta property="og:description" content={project.tagline} />
</svelte:head>

<article class="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20">
	<!-- Back link -->
	<a
		href="/work"
		class="reveal mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-ink-muted uppercase transition-colors hover:text-accent"
		style="--d: 0ms"
	>
		<span aria-hidden="true">←</span> All work
	</a>

	<!-- Breadcrumb-ish path -->
	<p class="reveal font-mono text-xs tracking-[0.25em] text-ink-dim uppercase" style="--d: 60ms">
		/ work / {project.slug}
	</p>

	<!-- Title -->
	<h1
		class="reveal mt-4 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl"
		style="--d: 140ms"
	>
		{project.title}
	</h1>

	<!-- Tagline -->
	<p
		class="reveal mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted sm:text-2xl"
		style="--d: 240ms"
	>
		{project.tagline}
	</p>

	<!-- Meta row -->
	<div
		class="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] tracking-[0.25em] uppercase"
		style="--d: 340ms"
	>
		<span class="text-ink-dim">{project.year}</span>
		<span class="h-3 w-px bg-border" aria-hidden="true"></span>
		<span class="text-ink-muted">{categoryLabel[project.category]}</span>
	</div>

	<!-- Action links -->
	{#if project.links.live || project.links.github}
		<div
			class="reveal mt-8 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
			style="--d: 440ms"
		>
			{#if project.links.live}
				<a
					href={project.links.live}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-2 border-ink bg-accent px-4 py-2.5 text-accent-ink transition-[box-shadow,transform] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-hard-sm)]"
				>
					<span>View live</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
			{#if project.links.github}
				<a
					href={project.links.github}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-2 border-border px-4 py-2.5 text-ink transition-colors hover:border-ink"
				>
					<span>Source</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	{/if}

	<!-- Cover — paired with the card cover via view-transition-name -->
	<div
		class="cover reveal relative mt-14 aspect-[16/9] overflow-hidden border-2 border-border bg-surface"
		style="--d: 560ms; --h: {hue}; view-transition-name: project-cover-{project.slug};"
	>
		{#if cover}
			<enhanced:img
				src={cover}
				alt={project.coverAlt ?? project.title}
				class="size-full object-cover"
				fetchpriority="high"
			/>
		{:else}
			<div class="placeholder absolute inset-0">
				<span
					class="absolute right-6 bottom-2 font-display text-[18rem] leading-none font-black tracking-tighter opacity-[0.08] sm:text-[24rem]"
				>
					{project.title.charAt(0)}
				</span>
				<span
					class="absolute top-4 left-4 font-mono text-[11px] tracking-[0.25em] uppercase opacity-60"
				>
					{categoryLabel[project.category]} · {project.year}
				</span>
			</div>
		{/if}
	</div>

	<!-- Description -->
	<div class="reveal mt-14 max-w-2xl" style="--d: 700ms">
		<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">About</h2>
		<p class="mt-4 text-lg leading-relaxed text-ink">{project.description}</p>
	</div>

	<!-- Tech stack -->
	<div class="reveal mt-12 max-w-2xl" style="--d: 820ms">
		<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Tech</h2>
		<ul class="mt-4 flex flex-wrap gap-2">
			{#each project.tech as t (t)}
				<li
					class="inline-flex border border-border px-2.5 py-1 font-mono text-[11px] tracking-wider text-ink-muted uppercase"
				>
					{t}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Prev / Next nav -->
	<nav
		class="reveal mt-24 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2"
		style="--d: 940ms"
		aria-label="Project pagination"
	>
		<a
			href="/work/{prev.slug}"
			class="group flex flex-col gap-1 border-2 border-border p-5 transition-colors hover:border-accent"
		>
			<span class="font-mono text-[10px] tracking-[0.25em] text-ink-dim uppercase">
				← Previous
			</span>
			<span
				class="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-accent"
			>
				{prev.title}
			</span>
		</a>
		<a
			href="/work/{next.slug}"
			class="group flex flex-col gap-1 border-2 border-border p-5 text-right transition-colors hover:border-accent"
		>
			<span class="font-mono text-[10px] tracking-[0.25em] text-ink-dim uppercase"> Next → </span>
			<span
				class="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-accent"
			>
				{next.title}
			</span>
		</a>
	</nav>
</article>

<style>
	/* `.reveal` is now defined globally in app.css — shared across pages. */

	.placeholder {
		background:
			repeating-linear-gradient(135deg, transparent 0 22px, oklch(0.5 0.15 var(--h)) 22px 23px),
			linear-gradient(135deg, var(--color-surface-raised), var(--color-surface));
	}
</style>

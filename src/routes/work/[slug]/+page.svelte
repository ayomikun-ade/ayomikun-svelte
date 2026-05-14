<script lang="ts">
	import { categoryLabel } from '$lib/data/projects';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { project, prev, next } = $derived(data);

	// Stable hue per project — matches the card placeholder so the View Transition
	// crossfade lands on the same colour.
	const hue = $derived((project.slug.charCodeAt(0) * 17) % 360);
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
		class="font-mono text-ink-muted hover:text-accent reveal mb-12 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
		style="--d: 0ms"
	>
		<span aria-hidden="true">←</span> All work
	</a>

	<!-- Breadcrumb-ish path -->
	<p
		class="font-mono text-ink-dim reveal text-xs tracking-[0.25em] uppercase"
		style="--d: 60ms"
	>
		/ work / {project.slug}
	</p>

	<!-- Title -->
	<h1
		class="font-display reveal mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl"
		style="--d: 140ms"
	>
		{project.title}
	</h1>

	<!-- Tagline -->
	<p
		class="text-ink-muted reveal mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl"
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
		<span class="bg-border h-3 w-px" aria-hidden="true"></span>
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
					class="border-ink bg-accent text-accent-ink inline-flex items-center gap-2 border-2 px-4 py-2.5 transition-[box-shadow,transform] duration-200 hover:[box-shadow:var(--shadow-hard-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5"
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
					class="border-border text-ink hover:border-ink inline-flex items-center gap-2 border-2 px-4 py-2.5 transition-colors"
				>
					<span>Source</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	{/if}

	<!-- Cover — paired with the card cover via view-transition-name -->
	<div
		class="cover reveal border-border bg-surface relative mt-14 aspect-[16/9] overflow-hidden border-2"
		style="--d: 560ms; --h: {hue}; view-transition-name: project-cover-{project.slug};"
	>
		{#if project.cover}
			<img
				src={project.cover}
				alt={project.coverAlt ?? project.title}
				class="size-full object-cover"
			/>
		{:else}
			<div class="placeholder absolute inset-0">
				<span class="font-display absolute right-6 bottom-2 text-[18rem] leading-none font-black tracking-tighter opacity-[0.08] sm:text-[24rem]">
					{project.title.charAt(0)}
				</span>
				<span class="font-mono absolute top-4 left-4 text-[11px] tracking-[0.25em] uppercase opacity-60">
					{categoryLabel[project.category]} · {project.year}
				</span>
			</div>
		{/if}
	</div>

	<!-- Description -->
	<div class="reveal mt-14 max-w-2xl" style="--d: 700ms">
		<h2 class="font-mono text-ink-dim text-xs tracking-[0.3em] uppercase">About</h2>
		<p class="text-ink mt-4 text-lg leading-relaxed">{project.description}</p>
	</div>

	<!-- Tech stack -->
	<div class="reveal mt-12 max-w-2xl" style="--d: 820ms">
		<h2 class="font-mono text-ink-dim text-xs tracking-[0.3em] uppercase">Tech</h2>
		<ul class="mt-4 flex flex-wrap gap-2">
			{#each project.tech as t (t)}
				<li class="border-border text-ink-muted font-mono inline-flex border px-2.5 py-1 text-[11px] tracking-wider uppercase">
					{t}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Prev / Next nav -->
	<nav
		class="border-border reveal mt-24 grid grid-cols-1 gap-4 border-t pt-10 sm:grid-cols-2"
		style="--d: 940ms"
		aria-label="Project pagination"
	>
		<a
			href="/work/{prev.slug}"
			class="border-border hover:border-accent group flex flex-col gap-1 border-2 p-5 transition-colors"
		>
			<span class="font-mono text-ink-dim text-[10px] tracking-[0.25em] uppercase">
				← Previous
			</span>
			<span class="font-display group-hover:text-accent text-xl font-bold tracking-tight transition-colors">
				{prev.title}
			</span>
		</a>
		<a
			href="/work/{next.slug}"
			class="border-border hover:border-accent group flex flex-col gap-1 border-2 p-5 text-right transition-colors"
		>
			<span class="font-mono text-ink-dim text-[10px] tracking-[0.25em] uppercase">
				Next →
			</span>
			<span class="font-display group-hover:text-accent text-xl font-bold tracking-tight transition-colors">
				{next.title}
			</span>
		</a>
	</nav>
</article>

<style>
	.reveal {
		animation: reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
		animation-delay: var(--d, 0ms);
	}
	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.placeholder {
		background:
			repeating-linear-gradient(
				135deg,
				transparent 0 22px,
				oklch(0.5 0.15 var(--h)) 22px 23px
			),
			linear-gradient(135deg, var(--color-surface-raised), var(--color-surface));
	}
</style>

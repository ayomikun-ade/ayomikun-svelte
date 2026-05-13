<script lang="ts">
	import { categoryLabel, type Project } from '$lib/data/projects';

	type Props = { project: Project; index: number };
	let { project, index }: Props = $props();

	// Stable hue per project — used to tint the placeholder cover so each one is distinct.
	const hue = $derived((project.slug.charCodeAt(0) * 17) % 360);
</script>

<article
	class="card border-border bg-surface relative isolate flex h-full flex-col border-2 transition-[transform,box-shadow] duration-200 ease-[var(--ease-snap)]"
>
	<!-- Cover (placeholder until real images land in /static) -->
	<div
		class="cover relative aspect-[16/10] overflow-hidden border-b-2 border-inherit"
		style="--h: {hue}"
		aria-hidden={project.cover ? undefined : 'true'}
	>
		{#if project.cover}
			<img
				src={project.cover}
				alt={project.coverAlt ?? project.title}
				class="size-full object-cover transition-transform duration-700 ease-[var(--ease-drift)] group-hover:scale-105"
				loading="lazy"
			/>
		{:else}
			<!-- Type-driven placeholder: chunky index number + diagonal stripes -->
			<div class="placeholder absolute inset-0">
				<span class="font-display absolute right-4 bottom-2 text-[7rem] leading-none font-black tracking-tighter opacity-15 sm:text-[9rem]">
					{String(index + 1).padStart(2, '0')}
				</span>
				<span class="font-mono absolute top-3 left-3 text-[10px] tracking-[0.25em] opacity-60 uppercase">
					{categoryLabel[project.category]}
				</span>
			</div>
		{/if}
	</div>

	<!-- Body -->
	<div class="flex flex-1 flex-col gap-3 p-5">
		<div class="flex items-center justify-between gap-3">
			<span class="font-mono text-ink-dim text-[10px] tracking-[0.25em] uppercase">
				{categoryLabel[project.category]}
			</span>
			<span class="font-mono text-ink-dim text-[10px] tracking-[0.2em]">
				{project.year}
			</span>
		</div>

		<h3 class="font-display text-2xl font-bold tracking-tight">
			<!-- The card-wide hit area: pseudo-element extends the link over the whole article. -->
			<a
				href="/work/{project.slug}"
				class="title-link before:absolute before:inset-0 before:z-10"
			>
				{project.title}
			</a>
		</h3>

		<p class="text-ink-muted text-sm leading-relaxed">{project.tagline}</p>

		<ul class="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label="Tech stack">
			{#each project.tech.slice(0, 5) as t (t)}
				<li class="border-border text-ink-muted font-mono inline-flex border px-2 py-0.5 text-[10px] tracking-wider uppercase">
					{t}
				</li>
			{/each}
		</ul>

		<!-- External links sit above the cover pseudo-link (z-20). -->
		{#if project.links.live || project.links.github}
			<div class="relative z-20 flex items-center gap-3 pt-2 font-mono text-[10px] tracking-[0.25em] uppercase">
				{#if project.links.live}
					<a
						href={project.links.live}
						target="_blank"
						rel="noopener noreferrer"
						class="text-ink-muted hover:text-accent inline-flex items-center gap-1 transition-colors"
						aria-label="{project.title} live demo"
					>
						<span aria-hidden="true">↗</span> Live
					</a>
				{/if}
				{#if project.links.github}
					<a
						href={project.links.github}
						target="_blank"
						rel="noopener noreferrer"
						class="text-ink-muted hover:text-accent inline-flex items-center gap-1 transition-colors"
						aria-label="{project.title} source on GitHub"
					>
						<span aria-hidden="true">↗</span> Code
					</a>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	/* Hover lift + hard offset shadow — neo-editorial signature interaction. */
	.card:hover,
	.card:focus-within {
		transform: translate(-3px, -3px);
		box-shadow: 6px 6px 0 0 var(--color-accent);
	}

	/* Title shifts to accent only when its own link is keyboard-focused or the card is hovered.
	   Using :has() keeps the JS-free model. */
	.card:hover .title-link,
	.card:has(.title-link:focus-visible) .title-link {
		color: var(--color-accent);
	}
	.title-link {
		color: var(--color-ink);
		transition: color 0.2s var(--ease-drift);
		text-decoration: none;
	}
	.title-link:focus-visible {
		outline: none; /* card-level :has() handles the visible state */
	}

	/* Placeholder cover — diagonal stripes tinted by a per-project hue. */
	.placeholder {
		background:
			repeating-linear-gradient(
				135deg,
				transparent 0 14px,
				oklch(0.5 0.15 var(--h)) 14px 15px
			),
			linear-gradient(135deg, var(--color-surface-raised), var(--color-surface));
		opacity: 0.9;
	}
</style>

<script lang="ts">
	import { timeline } from '$lib/data/timeline';
	import { reveal } from '$lib/actions/reveal';
</script>

<ol class="timeline relative">
	{#each timeline as entry, i (entry.year + entry.title)}
		<li
			class="to-reveal entry relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 pb-12 pl-10 sm:gap-x-10 sm:pl-14"
			class:last={i === timeline.length - 1}
			use:reveal={{ delay: Math.min(i * 60, 300) }}
		>
			<!-- Year marker -->
			<div
				class="relative col-start-1 row-span-3 font-display text-2xl font-black text-ink tabular-nums sm:text-3xl"
			>
				{entry.year}
			</div>

			<!-- Title row -->
			<div class="col-start-2 flex flex-col gap-1">
				<h3 class="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
					{entry.title}
				</h3>
				{#if entry.subtitle}
					<p class="font-mono text-[10px] tracking-[0.25em] text-ink-dim uppercase">
						{entry.subtitle}
					</p>
				{/if}
				<p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
					{entry.body}
				</p>
			</div>
		</li>
	{/each}
</ol>

<style>
	/* Continuous vertical rail behind the year markers. */
	.timeline::before {
		content: '';
		position: absolute;
		top: 0.4em;
		bottom: 1em;
		left: 0.4em;
		width: 2px;
		background: var(--color-border);
		z-index: 0;
	}

	/* Notch on each row aligned with the year text. */
	.entry::before {
		content: '';
		position: absolute;
		left: -0.1em;
		top: 0.7em;
		width: 1em;
		height: 2px;
		background: var(--color-border);
	}

	.entry > .font-display {
		background: var(--color-bg);
		padding-right: 0.5em;
		z-index: 1;
	}
</style>

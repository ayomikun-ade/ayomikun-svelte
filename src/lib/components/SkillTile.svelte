<script lang="ts">
	import { yearsSince, type Skill } from '$lib/data/skills';

	type Props = { skill: Skill; categoryLabel: string };
	let { skill, categoryLabel }: Props = $props();

	const years = $derived(skill.since ? yearsSince(skill.since) : null);
</script>

<div
	class="tile border-border bg-surface hover:border-ink relative flex h-full flex-col justify-between gap-3 border-2 p-4 transition-colors duration-200"
>
	<span class="font-mono text-ink-dim text-[9px] tracking-[0.3em] uppercase">
		{categoryLabel}
	</span>

	<span class="font-display text-xl leading-tight font-bold tracking-tight">
		{skill.name}
	</span>

	{#if years !== null}
		<span class="font-mono text-ink-muted self-end text-[10px] tracking-wider tabular-nums">
			{years}y
		</span>
	{/if}
</div>

<style>
	.tile {
		transition: border-color 0.2s var(--ease-drift), transform 0.2s var(--ease-snap);
	}
	.tile:hover {
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 0 var(--color-accent);
	}
</style>

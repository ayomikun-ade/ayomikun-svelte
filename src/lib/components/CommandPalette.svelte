<script lang="ts">
	import { tick } from 'svelte';
	import { palette } from '$lib/stores/palette.svelte';
	import { fuzzyMatch, splitByRanges } from '$lib/utils/fuzzy';
	import {
		paletteItems,
		runItem,
		kindLabel,
		kindOrder,
		type PaletteItem,
		type PaletteKind
	} from '$lib/commands/registry';

	type ScoredItem = PaletteItem & { score: number; ranges: [number, number][] };

	let input = $state<HTMLInputElement | null>(null);
	let listEl = $state<HTMLElement | null>(null);
	let returnFocus: HTMLElement | null = null;
	let activeIdx = $state(0);

	const query = $derived(palette.query.trim());

	// Score every item against the query. Empty query → keep registry order;
	// otherwise sort by descending score.
	const scored = $derived.by<ScoredItem[]>(() => {
		if (!query) {
			return paletteItems.map((item) => ({ ...item, score: 0, ranges: [] }));
		}
		const hits: ScoredItem[] = [];
		for (const item of paletteItems) {
			const labelHit = fuzzyMatch(query, item.label);
			if (labelHit) {
				hits.push({ ...item, score: labelHit.score, ranges: labelHit.ranges });
				continue;
			}
			// Fallback search across hint + keywords; matches there don't get highlights
			// but the item still surfaces.
			const fallbackTarget = [item.hint ?? '', ...(item.keywords ?? [])].join(' ');
			if (!fallbackTarget) continue;
			const fbHit = fuzzyMatch(query, fallbackTarget);
			if (fbHit) hits.push({ ...item, score: fbHit.score * 0.4, ranges: [] });
		}
		hits.sort((a, b) => b.score - a.score);
		return hits;
	});

	// When grouping (empty query), produce [{kind, items}] in fixed order.
	const grouped = $derived.by(() => {
		const map = new Map<PaletteKind, ScoredItem[]>();
		for (const item of scored) {
			const arr = map.get(item.kind) ?? [];
			arr.push(item);
			map.set(item.kind, arr);
		}
		return kindOrder
			.filter((k) => map.has(k))
			.map((k) => ({ kind: k, items: map.get(k)! }));
	});

	// Flat list (sorted) drives keyboard navigation regardless of grouping.
	const flat = $derived(scored);

	// Clamp active index when results change.
	$effect(() => {
		const len = flat.length;
		if (activeIdx >= len) activeIdx = Math.max(0, len - 1);
		if (activeIdx < 0) activeIdx = 0;
	});

	// Open/close lifecycle: focus management + scroll lock + return focus.
	$effect(() => {
		if (palette.open) {
			returnFocus = (document.activeElement as HTMLElement | null) ?? null;
			document.documentElement.style.overflow = 'hidden';
			activeIdx = 0;
			tick().then(() => input?.focus());
		} else {
			document.documentElement.style.overflow = '';
			returnFocus?.focus();
			returnFocus = null;
		}
	});

	// Global hotkey — Cmd/Ctrl+K to toggle. Skip inside text inputs unless the
	// modifier is held (so the user's own typing isn't hijacked).
	function onGlobalKey(e: KeyboardEvent) {
		if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			palette.toggle();
		}
	}

	function onPaletteKey(e: KeyboardEvent) {
		if (!palette.open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			palette.close();
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (flat.length) activeIdx = (activeIdx + 1) % flat.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (flat.length) activeIdx = (activeIdx - 1 + flat.length) % flat.length;
		} else if (e.key === 'Home') {
			e.preventDefault();
			activeIdx = 0;
		} else if (e.key === 'End') {
			e.preventDefault();
			activeIdx = Math.max(0, flat.length - 1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const item = flat[activeIdx];
			if (item) activate(item);
		} else if (e.key === 'Tab') {
			// Keep focus on the input (modern combobox pattern uses virtual focus).
			e.preventDefault();
		}
	}

	async function activate(item: PaletteItem) {
		const shouldClose = await runItem(item);
		if (shouldClose) palette.close();
	}

	// Auto-scroll the active option into view as keyboard navigation walks the list.
	$effect(() => {
		if (!palette.open) return;
		const id = flat[activeIdx]?.id;
		if (!id || !listEl) return;
		const el = listEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
		el?.scrollIntoView({ block: 'nearest' });
	});

	const optionId = (id: string) => `palette-opt-${id}`;
	const activeId = $derived(flat[activeIdx]?.id);
</script>

<svelte:window onkeydown={onGlobalKey} />

{#if palette.open}
	<!-- Backdrop: closes on click, ignores clicks bubbling from the panel itself. -->
	<div
		class="backdrop fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[14vh]"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) palette.close();
		}}
		onkeydown={onPaletteKey}
	>
		<div
			class="panel border-ink bg-bg/95 relative w-full max-w-xl border-2 shadow-[8px_8px_0_0_var(--color-accent)] backdrop-blur-md"
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
		>
			<!-- Combobox input -->
			<div class="border-border flex items-center gap-3 border-b-2 px-4 py-3">
				<svg
					class="text-ink-muted size-4 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="square"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="M21 21l-4.35-4.35" />
				</svg>
				<input
					bind:this={input}
					bind:value={palette.query}
					type="text"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					placeholder="Search pages, projects, or run a command…"
					class="font-mono placeholder:text-ink-dim flex-1 bg-transparent text-sm tracking-wider focus:outline-none"
					role="combobox"
					aria-expanded="true"
					aria-controls="palette-list"
					aria-activedescendant={activeId ? optionId(activeId) : undefined}
					aria-autocomplete="list"
				/>
				<kbd class="border-border text-ink-dim font-mono inline-flex items-center gap-0.5 border px-1.5 py-0.5 text-[10px] tracking-wider uppercase">
					Esc
				</kbd>
			</div>

			<!-- Result count for screen readers -->
			<p class="sr-only" aria-live="polite" aria-atomic="true">
				{flat.length} {flat.length === 1 ? 'result' : 'results'}
			</p>

			<!-- Results -->
			<div
				bind:this={listEl}
				id="palette-list"
				role="listbox"
				class="max-h-[60vh] overflow-y-auto py-1"
			>
				{#if flat.length === 0}
					<p class="text-ink-muted font-mono px-4 py-8 text-center text-xs tracking-widest uppercase">
						No results
					</p>
				{:else if !query}
					<!-- Grouped, empty-query mode -->
					{#each grouped as group (group.kind)}
						<div role="group" aria-label={kindLabel[group.kind]}>
							<div class="text-ink-dim font-mono px-4 pt-3 pb-1 text-[10px] tracking-[0.3em] uppercase">
								{kindLabel[group.kind]}
							</div>
							{#each group.items as item (item.id)}
								{@const idx = flat.indexOf(item)}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- Combobox virtual-focus pattern: options are not directly
								     keyboard-interactive; arrow keys on the input move
								     aria-activedescendant, Enter activates. Mouse click is the
								     pointer-only path. -->
								<div
									role="option"
									id={optionId(item.id)}
									data-id={item.id}
									aria-selected={idx === activeIdx}
									tabindex="-1"
									class="row group/row"
									class:is-active={idx === activeIdx}
									onmousemove={() => (activeIdx = idx)}
									onclick={() => activate(item)}
								>
									<span class="font-display text-ink truncate text-[15px] font-semibold tracking-tight">
										{item.label}
									</span>
									{#if item.hint}
										<span class="text-ink-muted truncate text-xs">{item.hint}</span>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				{:else}
					<!-- Flat scored mode -->
					{#each flat as item, idx (item.id)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							role="option"
							id={optionId(item.id)}
							data-id={item.id}
							aria-selected={idx === activeIdx}
							tabindex="-1"
							class="row"
							class:is-active={idx === activeIdx}
							onmousemove={() => (activeIdx = idx)}
							onclick={() => activate(item)}
						>
							<span class="font-display text-ink truncate text-[15px] font-semibold tracking-tight">
								{#each splitByRanges(item.label, item.ranges) as seg (seg.text + seg.hit)}
									{#if seg.hit}
										<mark class="bg-transparent text-accent">{seg.text}</mark>
									{:else}
										{seg.text}
									{/if}
								{/each}
							</span>
							<span class="font-mono text-ink-dim shrink-0 text-[10px] tracking-[0.25em] uppercase">
								{kindLabel[item.kind]}
							</span>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Footer hints -->
			<div class="border-border text-ink-dim font-mono flex items-center justify-between gap-4 border-t px-4 py-2 text-[10px] tracking-widest uppercase">
				<span class="flex items-center gap-3">
					<span>↑↓ navigate</span>
					<span>↵ select</span>
				</span>
				<span>esc close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		background: oklch(0.05 0.01 270 / 0.55);
		backdrop-filter: blur(6px);
		animation: fade-in 0.18s var(--ease-drift) backwards;
	}
	.panel {
		animation: drop-in 0.22s var(--ease-snap) backwards;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes drop-in {
		from {
			opacity: 0;
			transform: translateY(-12px) scale(0.985);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.55rem 1rem;
		cursor: pointer;
		user-select: none;
	}
	.row.is-active {
		background: var(--color-surface-raised);
		box-shadow: inset 3px 0 0 0 var(--color-accent);
	}
</style>

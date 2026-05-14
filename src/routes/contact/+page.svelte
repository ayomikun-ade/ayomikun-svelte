<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { magnetic } from '$lib/actions/magnetic';
	import { socials } from '$lib/data/socials';

	// Single source of truth for the displayed email — same value lives in
	// $lib/data/socials.ts for the footer + command palette.
	const emailAddress = 'ellumainc@gmail.com';
	const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent('Hi from your portfolio')}`;

	// Non-email channels for the secondary row.
	const channels = socials.filter((s) => s.key !== 'email');

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	let copyError = $state<string | null>(null);

	async function copyEmail() {
		copyError = null;
		try {
			await navigator.clipboard.writeText(emailAddress);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 2200);
		} catch {
			// Clipboard API blocked (older browser / insecure context).
			// Fallback: select the displayed email so the user can hit Ctrl/⌘+C.
			const node = document.getElementById('email-display');
			if (!node) return;
			const range = document.createRange();
			range.selectNodeContents(node);
			const sel = window.getSelection();
			sel?.removeAllRanges();
			sel?.addRange(range);
			copyError = 'Copy blocked by browser — selected for you.';
		}
	}
</script>

<svelte:head>
	<title>Contact · Ayomikun</title>
	<meta
		name="description"
		content="Get in touch with Ayomikun — direct email, scheduling, social channels."
	/>
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-24">
	<header class="mb-12">
		<p
			class="text-ink-muted font-mono to-reveal text-xs tracking-[0.3em] uppercase"
			use:reveal
		>
			/ contact
		</p>
		<h1
			class="font-display to-reveal mt-4 text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl"
			use:reveal={{ delay: 80 }}
		>
			Let's<br /><span class="text-accent">talk.</span>
		</h1>
		<p
			class="text-ink-muted to-reveal mt-8 max-w-xl text-lg leading-relaxed"
			use:reveal={{ delay: 160 }}
		>
			The fastest way to reach me is email. Drop a note about a project, a question, or just
			to say hi — I read everything, even if it takes a day or two to reply.
		</p>
	</header>

	<!-- Email card -->
	<div
		class="to-reveal border-border bg-surface relative border-2 p-6 sm:p-7"
		use:reveal={{ delay: 240 }}
	>
		<p class="font-mono text-ink-dim text-[10px] tracking-[0.3em] uppercase">
			Email — fastest path
		</p>
		<div class="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<span
				id="email-display"
				class="font-display text-ink text-xl font-bold tracking-tight break-all sm:text-2xl"
			>
				{emailAddress}
			</span>
			<button
				type="button"
				onclick={copyEmail}
				class="border-border bg-bg hover:border-ink focus-visible:border-ink relative inline-flex shrink-0 items-center gap-2 border-2 px-3 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
				aria-label="Copy email address"
			>
				{#if copied}
					<svg
						class="text-accent size-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="square"
						aria-hidden="true"
					>
						<path d="M4 12l5 5L20 6" />
					</svg>
					<span class="text-accent">Copied</span>
				{:else}
					<svg
						class="size-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="square"
						aria-hidden="true"
					>
						<rect x="8" y="8" width="12" height="12" />
						<path d="M16 8V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3" />
					</svg>
					<span>Copy</span>
				{/if}
			</button>
		</div>
		<!-- Screen-reader announcements + fallback error -->
		<p class="sr-only" aria-live="polite" role="status">
			{#if copied}Email copied to clipboard.{/if}
		</p>
		{#if copyError}
			<p class="text-ink-muted mt-3 font-mono text-[10px] tracking-widest uppercase">
				{copyError}
			</p>
		{/if}
	</div>

	<!-- Primary CTAs -->
	<div
		class="to-reveal mt-8 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
		use:reveal={{ delay: 320 }}
	>
		<a
			href={mailtoUrl}
			use:magnetic={{ strength: 0.18, range: 130 }}
			class="border-ink bg-accent text-accent-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-[box-shadow,transform] duration-200 hover:[box-shadow:var(--shadow-hard-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5"
		>
			<span aria-hidden="true">→</span>
			<span>Email me</span>
		</a>
	</div>

	<!-- Channels -->
	<div class="to-reveal mt-16" use:reveal={{ delay: 400 }}>
		<p class="font-mono text-ink-dim mb-4 text-[10px] tracking-[0.3em] uppercase">
			Or reach me on
		</p>
		<ul class="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider uppercase">
			{#each channels as link (link.key)}
				<li>
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-ink hover:text-accent inline-flex items-center gap-1.5 transition-colors"
					>
						{link.label}
						<span aria-hidden="true" class="text-ink-dim">↗</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Response / availability note -->
	<p
		class="text-ink-dim to-reveal mt-16 font-mono text-[10px] tracking-[0.25em] uppercase"
		use:reveal={{ delay: 480 }}
	>
		Usually replies in 1–2 days · Lagos · UTC+1 · Open to work
	</p>
</section>

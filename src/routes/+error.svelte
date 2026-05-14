<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Ayomikun</title>
</svelte:head>

<section class="mx-auto flex min-h-[calc(100dvh-12rem)] max-w-3xl flex-col justify-center px-6 py-20 sm:px-10">
	<p class="text-ink-muted font-mono text-xs tracking-[0.3em] uppercase">
		Error · {page.status}
	</p>
	<h1 class="font-display mt-4 text-7xl leading-[0.95] font-extrabold tracking-tight sm:text-9xl">
		{#if page.status === 404}
			<span>Lost in</span><br /><span class="text-accent">the grid.</span>
		{:else}
			<span>Something</span><br /><span class="text-accent">broke.</span>
		{/if}
	</h1>
	<p class="text-ink-muted mt-8 max-w-xl text-lg leading-relaxed">
		{page.error?.message ?? 'The page you tried to reach is not here.'}
	</p>

	<div class="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
		<a
			href="/"
			class="border-ink bg-accent text-accent-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-[box-shadow,transform] duration-200 hover:[box-shadow:var(--shadow-hard-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5"
		>
			<span aria-hidden="true">←</span> Home
		</a>
		<a
			href="/work"
			class="border-border text-ink hover:border-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-colors"
		>
			Browse work
		</a>
	</div>
</section>

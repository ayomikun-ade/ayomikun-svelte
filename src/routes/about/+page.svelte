<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skillCategories } from '$lib/data/skills';
	import SkillTile from '$lib/components/SkillTile.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	const facts = [
		{ label: 'Based', value: 'Lagos · UTC+1' },
		{ label: 'Stack', value: 'Svelte · TypeScript · Tailwind' },
		{ label: 'Focus', value: 'Interaction · motion · perf' },
		{ label: 'Status', value: 'Open to work' }
	];

	const currently = [
		{ label: 'Building', value: 'this portfolio · Stagecraft v2' },
		{ label: 'Reading', value: 'science fiction, mostly' },
		{ label: 'Listening', value: 'ambient electronic loops' },
		{ label: 'Learning', value: 'GLSL, slowly and badly' }
	];
</script>

<svelte:head>
	<title>About · Ayomikun</title>
	<meta
		name="description"
		content="About Ayomikun — frontend engineer based in Lagos, building interactive web experiences with Svelte."
	/>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-24">
	<!-- Page header -->
	<header class="mb-16">
		<p
			class="text-ink-muted to-reveal font-mono text-xs tracking-[0.3em] uppercase"
			use:reveal
		>
			/ about
		</p>
		<h1
			class="font-display to-reveal mt-4 text-5xl leading-[1] font-extrabold tracking-tight sm:text-7xl"
			use:reveal={{ delay: 80 }}
		>
			Hi — I'm<br /><span class="text-accent">Ayomikun.</span>
		</h1>
	</header>

	<!-- Bio + facts -->
	<div class="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_auto] sm:gap-16">
		<div class="space-y-6 text-lg leading-relaxed">
			<p class="text-ink to-reveal" use:reveal={{ delay: 160 }}>
				Frontend engineer based in Lagos. I build interactive web experiences with a
				particular obsession for animation feel, perceived performance, and the small
				interactions that make a UI feel <span class="text-accent">intentional</span>
				rather than just functional.
			</p>
			<p class="text-ink-muted to-reveal" use:reveal={{ delay: 220 }}>
				Most of my recent work is in Svelte and SvelteKit — building tools that feel like
				they care about the person using them. Before that, four years across React and
				Vue, plus a slow simmer of Go on the backend.
			</p>
			<p class="text-ink-muted to-reveal" use:reveal={{ delay: 280 }}>
				When I'm not at a keyboard, I'm probably reading sci-fi, listening to ambient
				electronic, or convincing myself that the next thing I build will be
				<em>simpler this time</em>.
			</p>
		</div>

		<aside
			class="to-reveal border-border h-fit border-2 p-6 sm:min-w-[16rem]"
			use:reveal={{ delay: 340 }}
		>
			<ul class="space-y-3 font-mono text-xs uppercase">
				{#each facts as f (f.label)}
					<li class="flex flex-col gap-0.5">
						<span class="text-ink-dim tracking-[0.25em]">{f.label}</span>
						<span class="text-ink tracking-wider">{f.value}</span>
					</li>
				{/each}
			</ul>
		</aside>
	</div>

	<!-- Skills -->
	<section class="mt-32">
		<header class="mb-10 flex items-baseline justify-between gap-6">
			<h2
				class="font-display to-reveal text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				What I <span class="text-accent">use.</span>
			</h2>
			<span
				class="font-mono text-ink-dim to-reveal text-[10px] tracking-[0.25em] uppercase"
				use:reveal={{ delay: 60 }}
			>
				5 categories
			</span>
		</header>

		<div class="space-y-12">
			{#each skillCategories as cat, ci (cat.key)}
				<div class="to-reveal" use:reveal={{ delay: Math.min(ci * 80, 240) }}>
					<h3 class="font-mono text-ink-muted mb-4 text-[10px] tracking-[0.3em] uppercase">
						{cat.label}
					</h3>
					<ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
						{#each cat.items as item (item.name)}
							<li>
								<SkillTile skill={item} categoryLabel={cat.label} />
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Timeline -->
	<section class="mt-32">
		<header class="mb-12">
			<h2
				class="font-display to-reveal text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				The <span class="text-accent">path</span> here.
			</h2>
			<p
				class="text-ink-muted to-reveal mt-4 max-w-xl"
				use:reveal={{ delay: 60 }}
			>
				Working backwards from today.
			</p>
		</header>

		<Timeline />
	</section>

	<!-- Currently -->
	<section class="mt-24">
		<header class="mb-8">
			<h2
				class="font-display to-reveal text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				<span class="text-accent">Currently</span> —
			</h2>
		</header>

		<dl class="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
			{#each currently as item, i (item.label)}
				<div class="to-reveal flex flex-col gap-1" use:reveal={{ delay: Math.min(i * 60, 200) }}>
					<dt class="font-mono text-ink-dim text-[10px] tracking-[0.3em] uppercase">
						{item.label}
					</dt>
					<dd class="text-ink text-base">{item.value}</dd>
				</div>
			{/each}
		</dl>
	</section>
</section>

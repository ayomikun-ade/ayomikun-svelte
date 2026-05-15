<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skillCategories } from '$lib/data/skills';
	import SkillTile from '$lib/components/SkillTile.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	const facts = [
		{ label: 'Based', value: 'Earth · UTC+1' },
		{ label: 'Stack', value: 'Nextjs · TypeScript · Tailwind' },
		{ label: 'Focus', value: 'Interaction · motion · user-friendly' },
		{ label: 'Status', value: 'Open to work' }
	];

	const currently = [
		{ label: 'Building', value: 'myself · ayomikun v2' },
		{ label: 'Reading', value: 'fantasy, mostly' },
		{ label: 'Listening', value: 'Adele, Raye and Olivia Dean' },
		{ label: 'Learning', value: 'animation, slowly and badly' }
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
		<p class="to-reveal font-mono text-xs tracking-[0.3em] text-ink-muted uppercase" use:reveal>
			/ about
		</p>
		<h1
			class="to-reveal mt-4 font-display text-5xl leading-[1] font-extrabold tracking-tight sm:text-7xl"
			use:reveal={{ delay: 80 }}
		>
			Hi — I'm<br /><span class="text-accent">Ayomikun.</span>
		</h1>
	</header>

	<!-- Bio + facts -->
	<div class="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_auto] sm:gap-16">
		<div class="space-y-6 text-lg leading-relaxed">
			<p class="to-reveal text-ink" use:reveal={{ delay: 160 }}>
				Frontend engineer based in Space. I build interactive web experiences with a particular
				obsession for animation feel, perceived performance, and the small interactions that make a
				UI feel <span class="text-accent">intentional</span>
				rather than just functional.
			</p>
			<p class="to-reveal text-ink-muted" use:reveal={{ delay: 220 }}>
				Most of my recent work is in Nextjs and TypeScript — building tools that feel like they care
				about the person using them. Before that, four years across React, plus a slow
				simmer of Python and Express on the backend.
			</p>
			<p class="to-reveal text-ink-muted" use:reveal={{ delay: 280 }}>
				When I'm not at a keyboard, I'm probably reading fantasy, listening to music, or
				convincing myself that the next thing I build will be
				<em>simpler this time</em>.
			</p>
		</div>

		<aside
			class="to-reveal h-fit border-2 border-border p-6 sm:min-w-[16rem]"
			use:reveal={{ delay: 340 }}
		>
			<ul class="space-y-3 font-mono text-xs uppercase">
				{#each facts as f (f.label)}
					<li class="flex flex-col gap-0.5">
						<span class="tracking-[0.25em] text-ink-dim">{f.label}</span>
						<span class="tracking-wider text-ink">{f.value}</span>
					</li>
				{/each}
			</ul>
		</aside>
	</div>

	<!-- Skills -->
	<section class="mt-32">
		<header class="mb-10 flex items-baseline justify-between gap-6">
			<h2
				class="to-reveal font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				What I <span class="text-accent">use.</span>
			</h2>
			<span
				class="to-reveal font-mono text-[10px] tracking-[0.25em] text-ink-dim uppercase"
				use:reveal={{ delay: 60 }}
			>
				5 categories
			</span>
		</header>

		<div class="space-y-12">
			{#each skillCategories as cat, ci (cat.key)}
				<div class="to-reveal" use:reveal={{ delay: Math.min(ci * 80, 240) }}>
					<h3 class="mb-4 font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase">
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
				class="to-reveal font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				The <span class="text-accent">path</span> here.
			</h2>
			<p class="to-reveal mt-4 max-w-xl text-ink-muted" use:reveal={{ delay: 60 }}>
				Working backwards from today.
			</p>
		</header>

		<Timeline />
	</section>

	<!-- Currently -->
	<section class="mt-24">
		<header class="mb-8">
			<h2
				class="to-reveal font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl"
				use:reveal
			>
				<span class="text-accent">Currently</span> —
			</h2>
		</header>

		<dl class="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
			{#each currently as item, i (item.label)}
				<div class="to-reveal flex flex-col gap-1" use:reveal={{ delay: Math.min(i * 60, 200) }}>
					<dt class="font-mono text-[10px] tracking-[0.3em] text-ink-dim uppercase">
						{item.label}
					</dt>
					<dd class="text-base text-ink">{item.value}</dd>
				</div>
			{/each}
		</dl>
	</section>
</section>

<script lang="ts">
	import { magnetic } from '$lib/actions/magnetic';
	import { resumeUrl } from '$lib/data/socials';
	import HeroBackground from './HeroBackground.svelte';
	import SocialLinks from './SocialLinks.svelte';
</script>

<section
	class="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden"
>
	<HeroBackground />

	<div class="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
		<!-- Status / tagline -->
		<p class="reveal text-ink-muted font-mono text-xs tracking-[0.3em] uppercase" style="--d: 0ms">
			<span class="bg-accent mr-2 inline-block size-1.5 align-middle"></span>
			Available for work · Lagos · 2026
		</p>

		<!-- Headline -->
		<h1
			class="font-display mt-6 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl md:text-8xl"
		>
			<span class="reveal block" style="--d: 100ms">
				I'm <span class="text-accent">Ayomikun</span>.
			</span>
			<span class="reveal text-ink-muted mt-3 block text-3xl font-medium sm:text-5xl md:text-6xl" style="--d: 220ms">
				I build interfaces
			</span>
			<span class="reveal block" style="--d: 340ms">
				that feel <span class="alive">alive</span>.
			</span>
		</h1>

		<!-- Intro -->
		<p class="reveal text-ink-muted mt-10 max-w-xl text-lg leading-relaxed" style="--d: 480ms">
			Frontend engineer working at the intersection of interaction design, animation, and
			performance. Currently shipping with SvelteKit, obsessing over the milliseconds between
			intent and feedback.
		</p>

		<!-- CTAs -->
		<div
			class="reveal mt-10 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
			style="--d: 600ms"
		>
			<a
				href="/work"
				use:magnetic={{ strength: 0.22, range: 140 }}
				class="border-ink bg-accent text-accent-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-[box-shadow,transform] duration-200 hover:[box-shadow:var(--shadow-hard-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none"
			>
				<span>See work</span>
				<span aria-hidden="true">→</span>
			</a>
			<a
				href={resumeUrl}
				download
				use:magnetic={{ strength: 0.18, range: 120 }}
				class="border-border text-ink hover:border-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-colors"
			>
				<span aria-hidden="true">↓</span>
				<span>Resume</span>
			</a>
		</div>

		<!-- Socials -->
		<div class="reveal mt-12" style="--d: 720ms">
			<SocialLinks variant="icon" />
		</div>

		<!-- Scroll hint -->
		<div
			class="reveal text-ink-dim font-mono mt-16 flex items-center gap-3 text-xs tracking-[0.25em] uppercase"
			style="--d: 880ms"
		>
			<span class="scroll-bar"></span>
			scroll
		</div>
	</div>
</section>

<style>
	/* Staggered entrance — each `.reveal` reads its own --d delay inline. */
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

	/* Highlight word: hand-drawn-ish underbar that pulses subtly */
	.alive {
		position: relative;
		color: var(--color-accent);
		display: inline-block;
	}
	.alive::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.06em;
		height: 0.18em;
		background: var(--color-accent);
		opacity: 0.25;
		transform-origin: left;
		animation: alive-bar 1.2s 1s cubic-bezier(0.65, 0, 0.35, 1) backwards;
	}
	@keyframes alive-bar {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	/* Scroll hint vertical bar — slow downward sweep */
	.scroll-bar {
		display: inline-block;
		width: 1px;
		height: 28px;
		background: linear-gradient(to bottom, transparent, var(--color-ink-muted), transparent);
		animation: scroll-bar 2s ease-in-out infinite;
	}
	@keyframes scroll-bar {
		0%,
		100% {
			transform: translateY(-8px);
			opacity: 0.4;
		}
		50% {
			transform: translateY(8px);
			opacity: 1;
		}
	}
</style>

<script lang="ts">
	import { resumeUrl } from '$lib/data/socials';
	import { reducedMotion } from '$lib/stores/motion.svelte';
	import HeroBackground from './HeroBackground.svelte';
	import SocialLinks from './SocialLinks.svelte';

	// Cursor parallax for the hero glow. Normalised to roughly −0.5..0.5; the
	// background component translates by ~40px per unit. Skipped under reduced
	// motion and for non-mouse pointers.
	let mx = $state(0);
	let my = $state(0);

	$effect(() => {
		if (reducedMotion.current) return;
		let raf = 0;
		function handle(e: PointerEvent) {
			if (e.pointerType !== 'mouse') return;
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				mx = e.clientX / window.innerWidth - 0.5;
				my = e.clientY / window.innerHeight - 0.5;
			});
		}
		window.addEventListener('pointermove', handle, { passive: true });
		return () => {
			window.removeEventListener('pointermove', handle);
			cancelAnimationFrame(raf);
		};
	});
</script>

<section
	class="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden"
>
	<HeroBackground {mx} {my} />

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
				class="border-ink bg-accent text-accent-ink inline-flex items-center gap-2 border-2 px-5 py-3 transition-[box-shadow,transform] duration-200 hover:[box-shadow:var(--shadow-hard-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none"
			>
				<span>See work</span>
				<span aria-hidden="true">→</span>
			</a>
			<a
				href={resumeUrl}
				download
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
	</div>
</section>

<style>
	/* `.reveal` (staggered mount-time entrance via inline --d) is defined globally
	   in app.css so other pages can share it. */

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

</style>

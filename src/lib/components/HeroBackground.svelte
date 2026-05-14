<!--
  Hero background: layered CSS-only motion.
  - Faint vertical grid lines (static, set the editorial rail rhythm)
  - A single horizontal scanline that drifts down on loop
  - An off-center accent glow for depth
  - Optional cursor parallax: parent passes normalised mx/my (range ~−0.5..0.5),
    rendered via the modern `translate` property so it composes with the
    `drift` keyframe (which animates `transform`) without fighting it.
  All purely decorative — aria-hidden, respects reduced-motion globally.
-->
<script lang="ts">
	type Props = { mx?: number; my?: number };
	let { mx = 0, my = 0 }: Props = $props();
</script>

<div class="bg-stack" aria-hidden="true">
	<div class="grid-lines"></div>
	<div class="scanline"></div>
	<div class="glow" style="--gx: {mx * 40}px; --gy: {my * 40}px;"></div>
</div>

<style>
	.bg-stack {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, var(--color-border) 1px, transparent 1px),
			linear-gradient(to bottom, var(--color-border) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), transparent 75%);
		-webkit-mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), transparent 75%);
		opacity: 0.5;
	}

	.scanline {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--color-accent) 30%,
			var(--color-accent) 70%,
			transparent
		);
		opacity: 0.4;
		animation: scan 14s linear infinite;
	}

	.glow {
		position: absolute;
		top: 30%;
		right: -10%;
		width: 60vw;
		height: 60vw;
		max-width: 700px;
		max-height: 700px;
		background: radial-gradient(circle, var(--color-accent) 0%, transparent 60%);
		opacity: 0.06;
		filter: blur(40px);
		animation: drift 18s ease-in-out infinite alternate;
		/* Parallax offset is its own property — composes with the `transform`-based
		   drift animation without overriding it. Smoothed for damped following. */
		translate: var(--gx, 0) var(--gy, 0);
		transition: translate 0.6s var(--ease-drift);
	}

	@keyframes scan {
		from {
			top: -2%;
		}
		to {
			top: 102%;
		}
	}

	@keyframes drift {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(-8%, 6%) scale(1.1);
		}
	}
</style>

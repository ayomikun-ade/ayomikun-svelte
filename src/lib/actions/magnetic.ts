import { reducedMotion } from '$lib/stores/motion.svelte';

type MagneticOptions = {
	/** How strongly the element follows the cursor (0..1). */
	strength?: number;
	/** Radius around the element center where the pull activates (px). */
	range?: number;
};

/**
 * `use:magnetic` — pulls an element subtly toward the cursor when nearby.
 * Bails out under `prefers-reduced-motion` and on touch-only devices.
 *
 * Usage: <a href="/work" use:magnetic={{ strength: 0.25 }}>See work</a>
 */
export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	const strength = options.strength ?? 0.2;
	const range = options.range ?? 120;
	let raf = 0;

	function move(e: PointerEvent) {
		if (e.pointerType !== 'mouse') return;
		if (reducedMotion.current) return;

		const rect = node.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const inRange = Math.hypot(dx, dy) < range;

		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			node.style.transform = inRange
				? `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
				: '';
		});
	}

	function reset() {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			node.style.transform = '';
		});
	}

	window.addEventListener('pointermove', move, { passive: true });
	node.addEventListener('pointerleave', reset);

	return {
		destroy() {
			window.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', reset);
			cancelAnimationFrame(raf);
		}
	};
}

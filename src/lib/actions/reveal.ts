import { reducedMotion } from '$lib/stores/motion.svelte';

type RevealOptions = {
	/** Delay before the reveal kicks in (ms). Useful for staggered groups. */
	delay?: number;
	/** Fraction of the element that must be visible before reveal. */
	threshold?: number;
	/** IntersectionObserver root margin — negative values delay reveal until further in. */
	rootMargin?: string;
};

/**
 * `use:reveal` — animates an element in as it scrolls into view.
 *
 * The CSS (`.to-reveal` / `.is-revealed` in app.css) does the actual animation;
 * this action just adds `.is-revealed` once IntersectionObserver fires. The
 * `.js` class on <html> (set by the inline script in app.html) gates the
 * initial-hidden state so users without JS still see fully-rendered content.
 *
 * Usage: <div class="to-reveal" use:reveal={{ delay: 120 }}>…</div>
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options;

	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	if (reducedMotion.current) {
		node.classList.add('is-revealed');
		return { destroy() {} };
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-revealed');
					observer.disconnect();
					break;
				}
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

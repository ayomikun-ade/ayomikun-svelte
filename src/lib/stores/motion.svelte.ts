import { MediaQuery } from 'svelte/reactivity';

/**
 * `prefers-reduced-motion` — reactive media query.
 * Use `reducedMotion.current` in components to gate animations.
 */
export const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');

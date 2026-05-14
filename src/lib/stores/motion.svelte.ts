import { MediaQuery } from 'svelte/reactivity';

/**
 * Motion preference — combines OS `prefers-reduced-motion` with an in-app
 * tri-state override (`auto` / `reduce` / `allow`).
 *
 * Why a user override on top of the OS setting:
 * - Some users want motion off only on this site (privacy mode, low-power);
 * - Some users have OS reduced-motion on but want motion *here* for the demo.
 *
 * Truth ordering (reading `.current`):
 *   `reduce`  → always true (motion off, regardless of OS)
 *   `allow`   → always false (motion on, regardless of OS)
 *   `auto`    → fall back to the OS media query
 *
 * Truth ordering (CSS gate, see app.css):
 *   html[data-motion="reduce"]  → motion off
 *   html[data-motion="allow"]   → motion on (system pref ignored)
 *   (no attribute)              → @media query decides
 *
 * The FOUC-prevention script in app.html mirrors localStorage → data-motion
 * before paint, so the first frame already honors the override.
 */

export type MotionPref = 'auto' | 'reduce' | 'allow';

const STORAGE_KEY = 'motion-pref';

const systemReduced = new MediaQuery('prefers-reduced-motion: reduce');

function readInitial(): MotionPref {
	if (typeof document === 'undefined') return 'auto';
	const v = document.documentElement.dataset.motion;
	return v === 'reduce' || v === 'allow' ? v : 'auto';
}

let pref = $state<MotionPref>(readInitial());

function apply(value: MotionPref) {
	if (typeof document === 'undefined') return;
	if (value === 'auto') delete document.documentElement.dataset.motion;
	else document.documentElement.dataset.motion = value;
	try {
		if (value === 'auto') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, value);
	} catch {
		/* storage blocked — keep in-memory state */
	}
}

export const reducedMotion = {
	/** True if motion should be off right now. Most callers use this. */
	get current(): boolean {
		if (pref === 'reduce') return true;
		if (pref === 'allow') return false;
		return systemReduced.current;
	},
	get pref(): MotionPref {
		return pref;
	},
	set(value: MotionPref) {
		pref = value;
		apply(value);
	},
	/** Resync from the DOM after hydration in case the inline script set a value. */
	sync() {
		pref = readInitial();
	}
};

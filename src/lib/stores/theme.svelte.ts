/**
 * Theme store — reads/writes `<html data-theme>`, persists to localStorage.
 * The FOUC-prevention script in app.html sets the initial attribute before
 * Svelte hydrates; this store just syncs its $state with that DOM truth.
 */

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

function readInitial(): Theme {
	if (typeof document === 'undefined') return 'dark';
	const attr = document.documentElement.getAttribute('data-theme');
	return attr === 'light' ? 'light' : 'dark';
}

let current = $state<Theme>(readInitial());

function apply(value: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.setAttribute('data-theme', value);
	try {
		localStorage.setItem(STORAGE_KEY, value);
	} catch {
		/* storage blocked — silently keep in-memory state */
	}
}

export const theme = {
	get current(): Theme {
		return current;
	},
	set(value: Theme) {
		current = value;
		apply(value);
	},
	toggle() {
		this.set(current === 'dark' ? 'light' : 'dark');
	},
	/** Re-read DOM after hydration in case the inline script chose a different value. */
	sync() {
		current = readInitial();
	}
};

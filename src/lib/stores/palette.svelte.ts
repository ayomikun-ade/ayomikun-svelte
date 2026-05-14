/**
 * Command palette open/closed + query state.
 * Global because Cmd-K can be triggered from anywhere — the actual handler
 * lives on the keydown listener attached inside CommandPalette.svelte.
 */

let open = $state(false);
let query = $state('');

export const palette = {
	get open(): boolean {
		return open;
	},
	get query(): string {
		return query;
	},
	set query(v: string) {
		query = v;
	},
	openWithQuery(initial = '') {
		query = initial;
		open = true;
	},
	close() {
		open = false;
		query = '';
	},
	toggle() {
		if (open) this.close();
		else this.openWithQuery();
	}
};

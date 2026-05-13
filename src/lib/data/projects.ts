/**
 * Projects data layer.
 *
 * ⚠️ Placeholder entries below — same shape as the real data, just stand-in
 * titles/copy. Swap titles, taglines, descriptions, tech, and `links` with
 * real values; the rest (filtering, routing, command palette) needs no change.
 *
 * Consumed by:
 *   - /work index (ProjectsGrid + ProjectCard)
 *   - /work/[slug] detail page (Stage 5)
 *   - command palette `projects` / `open <slug>` commands (Stage 8)
 */

export type ProjectCategoryValue = 'web-app' | 'tool' | 'experiment' | 'open-source';
export type FilterValue = 'all' | ProjectCategoryValue;

export type Project = {
	slug: string;
	title: string;
	/** One-line description shown on cards. */
	tagline: string;
	/** Longer paragraph(s) shown on the detail page. */
	description: string;
	year: number;
	category: ProjectCategoryValue;
	tech: string[];
	/** Optional image URL (under /static). Falls back to a styled placeholder. */
	cover?: string;
	coverAlt?: string;
	links: {
		live?: string;
		github?: string;
	};
	/** Featured cards span 2 columns on `lg` and up. */
	featured?: boolean;
};

export const categories: { value: FilterValue; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'web-app', label: 'Web apps' },
	{ value: 'tool', label: 'Tools' },
	{ value: 'experiment', label: 'Experiments' },
	{ value: 'open-source', label: 'Open source' }
];

export const categoryLabel: Record<ProjectCategoryValue, string> = {
	'web-app': 'Web app',
	tool: 'Tool',
	experiment: 'Experiment',
	'open-source': 'Open source'
};

export const projects: Project[] = [
	{
		slug: 'stagecraft',
		title: 'Stagecraft',
		tagline: 'A presentation tool that animates like a film, edits like a doc.',
		description:
			'A keyboard-first presentation editor with scene transitions, magnetic alignment guides, and offline-first sync. Built around a custom timeline engine that compiles slides to a single declarative track.',
		year: 2025,
		category: 'web-app',
		tech: ['SvelteKit', 'TypeScript', 'WebGL', 'IndexedDB', 'Tailwind'],
		links: { live: 'https://example.com/stagecraft', github: 'https://github.com/' },
		featured: true
	},
	{
		slug: 'lacuna-ui',
		title: 'Lacuna UI',
		tagline: 'Headless Svelte primitives with a neobrutalist preset.',
		description:
			'A11y-first headless components (combobox, dialog, menu, listbox) for Svelte 5 runes, shipped with an optional neobrutalist theme. Tree-shakable, zero-runtime CSS, full keyboard semantics tested under NVDA and VoiceOver.',
		year: 2025,
		category: 'open-source',
		tech: ['Svelte 5', 'TypeScript', 'CSS', 'a11y'],
		links: { github: 'https://github.com/' }
	},
	{
		slug: 'polyrhythm',
		title: 'Polyrhythm',
		tagline: 'A generative step sequencer that argues with itself.',
		description:
			'A browser-based polyrhythmic sequencer that uses Markov chains to mutate patterns in real time. Audio runs in an AudioWorklet for sample-accurate timing; the UI runs on Svelte transitions for a fluid loop view.',
		year: 2024,
		category: 'experiment',
		tech: ['Svelte', 'Web Audio', 'AudioWorklet', 'Canvas'],
		links: { live: 'https://example.com/polyrhythm', github: 'https://github.com/' }
	},
	{
		slug: 'bytelift',
		title: 'Bytelift',
		tagline: 'A bundle inspector that points at the file you should delete.',
		description:
			'A browser extension and CLI that audits production JS bundles, attributes weight to source modules via sourcemaps, and emits a prioritised hit list. Used in CI to fail PRs that exceed budget per route.',
		year: 2024,
		category: 'tool',
		tech: ['TypeScript', 'Rollup', 'WebExtension API', 'Vite'],
		links: { github: 'https://github.com/' },
		featured: true
	},
	{
		slug: 'driftport',
		title: 'Driftport',
		tagline: 'Local-tunnel port forwarding over WebSocket, no auth juggling.',
		description:
			'A self-hostable alternative to ngrok built on raw WebSocket frames. Single-binary server, single-flag client, mTLS for trusted devices, opt-in HTTP request inspection.',
		year: 2024,
		category: 'tool',
		tech: ['Go', 'TypeScript', 'WebSocket', 'CLI'],
		links: { github: 'https://github.com/' }
	},
	{
		slug: 'glimmer',
		title: 'Glimmer',
		tagline: 'A CSS gradient playground that exports the actual shaders.',
		description:
			'A live editor for CSS gradients and WebGL fragment shaders, side-by-side. Outputs copy-ready CSS, Tailwind utilities, or a GLSL shader for use in Three.js / R3F scenes.',
		year: 2023,
		category: 'experiment',
		tech: ['Svelte', 'WebGL', 'GLSL', 'Vite'],
		links: { live: 'https://example.com/glimmer' }
	}
];

export function projectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

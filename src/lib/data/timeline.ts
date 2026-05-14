/**
 * Career timeline — reverse-chronological. Placeholder entries; replace with
 * real milestones. Shape is stable; the About page renders whatever's here.
 */

export type TimelineEntry = {
	year: number;
	title: string;
	subtitle?: string;
	body: string;
};

export const timeline: TimelineEntry[] = [
	{
		year: 2026,
		title: 'HNG Frontend Wizards',
		subtitle: 'Stage 5b — this portfolio',
		body: 'Interactive developer portfolio built with SvelteKit, focused on motion feel, performance, and a command-driven UI.'
	},
	{
		year: 2025,
		title: 'Shipping with Svelte 5',
		subtitle: 'Runes mode, in production',
		body: 'Moved primary stack to Svelte 5 + SvelteKit. Built tooling around runed stores, view transitions, and IntersectionObserver-driven motion.'
	},
	{
		year: 2024,
		title: 'WebGL & shader experiments',
		subtitle: 'Side track',
		body: 'Picked up GLSL, Three.js, and the Web Audio API to push beyond DOM-bound interaction. Output: a handful of small generative experiments.'
	},
	{
		year: 2023,
		title: 'Frontend engineer',
		subtitle: 'First role focused on interaction',
		body: 'Joined a small team building a product-grade web app. Owned the design-system and motion-engineering side of the codebase.'
	},
	{
		year: 2021,
		title: 'Pivoted into frontend',
		subtitle: 'Out of generalist work',
		body: 'Spent a year going deep on TypeScript, React patterns, accessibility, and the craft of UI animation. Decided the front of the stack was home.'
	},
	{
		year: 2018,
		title: 'First line of code',
		subtitle: 'School curiosity',
		body: 'Started with HTML, CSS, then JavaScript. Built a music player that probably leaked memory. Worth it.'
	}
];

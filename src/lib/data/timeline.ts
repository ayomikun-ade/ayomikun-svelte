/**
 * Career timeline — reverse-chronological.
 *
 * Entries are inferred from the `since` years in skills.ts — they track the
 * learning progression, not employment history. Adjust titles, subtitles, and
 * copy to match your actual story (and add real roles where they belong).
 * Shape is stable; the About page renders whatever's here.
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
		title: 'Facing the real world',
		subtitle: 'Looking beyond personal projects',
		body: 'Planning to step into the professional world, applying skills to real-world projects, collaborating with teams, and continuing to learn and grow as a frontend engineer.'
	},
	{
		year: 2025,
		title: 'Going deep on motion',
		subtitle: 'GSAP, scroll-driven animation',
		body: 'Started treating animation as craft rather than decoration — GSAP, scroll-driven sequences, and the feel of transitions between states.'
	},
	{
		year: 2024,
		title: 'Modern production stack',
		subtitle: 'TypeScript, Next.js, the toolchain',
		body: 'Adopted TypeScript and Next.js as the daily stack, alongside Framer Motion, Vitest, ESLint, pnpm, and shadcn. Frontend work got type-safe and properly tooled.'
	},
	{
		year: 2023,
		title: 'Building real applications',
		subtitle: 'Beyond static pages',
		body: 'Moved past static sites into stateful apps — client-side persistence with IndexedDB and more deliberate app architecture.'
	},
	{
		year: 2022,
		title: 'Got serious about frontend',
		subtitle: 'React, tooling, testing, a11y',
		body: 'The pivot year: React and Tailwind for building, Vite and a proper Git workflow for shipping, Playwright for testing, and accessibility as a default rather than an afterthought.'
	},
	{
		year: 2020,
		title: 'Started caring about design',
		subtitle: 'Figma',
		body: 'Picked up Figma and began thinking about interface design — not just implementing screens, but shaping how they should look and feel.'
	},
	{
		year: 2017,
		title: 'First line of code',
		subtitle: 'HTML, CSS, Python',
		body: 'Started with HTML and CSS, then Python. The web is what stuck — and JavaScript followed soon after.'
	}
];

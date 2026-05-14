/**
 * Skills data — categorized for the About page.
 *
 * ⚠️ Placeholder set tuned for a frontend engineer; edit freely. Categories are
 * stable (consumed by Stage 8's command palette `skills` command), but item
 * lists and `since` values are content the user owns.
 */

export type SkillCategory = {
	key: string;
	label: string;
	items: Skill[];
};

export type Skill = {
	name: string;
	/** First year you started using it — drives the "Xy" badge on tiles. */
	since?: number;
};

export const skillCategories: SkillCategory[] = [
	{
		key: 'languages',
		label: 'Languages',
		items: [
			{ name: 'TypeScript', since: 2020 },
			{ name: 'JavaScript', since: 2018 },
			{ name: 'HTML', since: 2018 },
			{ name: 'CSS', since: 2018 },
			{ name: 'Go', since: 2023 },
			{ name: 'Python', since: 2019 },
			{ name: 'GLSL', since: 2024 }
		]
	},
	{
		key: 'frameworks',
		label: 'Frameworks',
		items: [
			{ name: 'SvelteKit', since: 2024 },
			{ name: 'Svelte 5', since: 2024 },
			{ name: 'React', since: 2020 },
			{ name: 'Vue', since: 2021 },
			{ name: 'Next.js', since: 2021 },
			{ name: 'Astro', since: 2023 }
		]
	},
	{
		key: 'styling',
		label: 'Styling & motion',
		items: [
			{ name: 'Tailwind', since: 2022 },
			{ name: 'SCSS', since: 2019 },
			{ name: 'CSS Modules', since: 2020 },
			{ name: 'GSAP', since: 2022 },
			{ name: 'Motion One', since: 2023 },
			{ name: 'View Transitions', since: 2024 }
		]
	},
	{
		key: 'tooling',
		label: 'Tooling',
		items: [
			{ name: 'Vite', since: 2021 },
			{ name: 'Vitest', since: 2022 },
			{ name: 'Playwright', since: 2022 },
			{ name: 'ESLint', since: 2019 },
			{ name: 'Prettier', since: 2019 },
			{ name: 'pnpm', since: 2022 }
		]
	},
	{
		key: 'beyond',
		label: 'Beyond the basics',
		items: [
			{ name: 'WebGL', since: 2024 },
			{ name: 'Three.js', since: 2024 },
			{ name: 'Web Audio', since: 2024 },
			{ name: 'IndexedDB', since: 2023 },
			{ name: 'A11y testing', since: 2022 },
			{ name: 'Figma', since: 2020 }
		]
	}
];

const currentYear = new Date().getFullYear();
export function yearsSince(start: number): number {
	return Math.max(0, currentYear - start);
}

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
			{ name: 'TypeScript', since: 2024 },
			{ name: 'JavaScript', since: 2018 },
			{ name: 'HTML', since: 2017 },
			{ name: 'CSS', since: 2017 },
			{ name: 'Python', since: 2017 }
		]
	},
	{
		key: 'frameworks',
		label: 'Frameworks',
		items: [
			{ name: 'React', since: 2022 },
			{ name: 'Next.js', since: 2024 }
		]
	},
	{
		key: 'styling',
		label: 'Styling & motion',
		items: [
			{ name: 'Tailwind', since: 2022 },
			{ name: 'GSAP', since: 2025 },
			{ name: 'Framer Motion', since: 2024 }
		]
	},
	{
		key: 'tooling',
		label: 'Tooling',
		items: [
			{ name: 'Vite', since: 2022 },
			{ name: 'Vitest', since: 2024 },
			{ name: 'Playwright', since: 2022 },
			{ name: 'ESLint', since: 2024 },
			{ name: 'Prettier', since: 2022 },
			{ name: 'pnpm', since: 2024 },
			{ name: 'Git', since: 2022 },
			{ name: 'GitHub', since: 2022 },
			{ name: 'Shadcn', since: 2024 }
		]
	},
	{
		key: 'beyond',
		label: 'Beyond the basics',
		items: [
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

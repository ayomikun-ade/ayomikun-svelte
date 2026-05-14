/**
 * Projects data layer.
 *
 * Cover images: `cover` is the bare filename (no extension) of an image in
 * src/lib/assets/portfolio/ — resolved through enhanced-img by covers.ts.
 * Missing file → styled placeholder renders instead.
 *
 * Consumed by:
 *   - /work index (ProjectsGrid + ProjectCard)
 *   - /work/[slug] detail page
 *   - command palette `projects` / `open <slug>` commands
 */

export type ProjectCategoryValue = 'web-app' | 'tool' | 'experiment';
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
	/** Bare filename (no extension) of an image in src/lib/assets/portfolio/.
	 *  Resolved via covers.ts → enhanced-img. Falls back to a styled placeholder. */
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
	{ value: 'experiment', label: 'Experiments' }
];

export const categoryLabel: Record<ProjectCategoryValue, string> = {
	'web-app': 'Web app',
	tool: 'Tool',
	experiment: 'Experiment'
};

export const projects: Project[] = [
	{
		slug: 'nerdwork',
		title: 'Nerdwork',
		tagline: 'A creative entertainment studio and fan community — home of the annual Comic-Con.',
		description:
			'Nerdwork is the home for fans: a creative entertainment studio & thriving community best known for its annual Comic-Con. They are the intersection of storytelling, tech, culture, and fandom.',
		year: 2025,
		category: 'web-app',
		tech: ['Next.js', 'TypeScript', 'TanStack Query'],
		cover: 'nerdwork-port',
		coverAlt: 'Screenshot of the Nerdwork website',
		links: { live: 'https://www.nerdworkng.com/' },
		featured: true
	},
	{
		slug: 'resolve-vote',
		title: 'Resolve.vote',
		tagline: 'Transparent voting for community governance and decision resolution.',
		description:
			'A transparent voting system designed for community governance and decision resolution.',
		year: 2025,
		category: 'web-app',
		tech: ['Next.js', 'TypeScript', 'TanStack Query'],
		cover: 'resolve-port',
		coverAlt: 'Screenshot of the Resolve.vote app',
		links: { live: 'https://resolve.vote/' }
	},
	{
		slug: 'audiophile',
		title: 'Audiophile',
		tagline: 'A premium e-commerce experience for high-fidelity audio gear.',
		description:
			'A premium e-commerce experience for high-fidelity audio equipment, featuring a seamless cart system.',
		year: 2024,
		category: 'web-app',
		tech: ['Next.js', 'Convex', 'TypeScript', 'Framer Motion'],
		cover: 'audiophile-port',
		coverAlt: 'Screenshot of the Audiophile e-commerce site',
		links: {
			live: 'https://audiophile-five-hazel.vercel.app/',
			github: 'https://github.com/ayomikun-ade/audiophile'
		}
	},
	{
		slug: 'cds-ams',
		title: 'CDS Attendance Management System',
		tagline: 'Geofenced NYSC CDS attendance with real-time location verification.',
		description:
			'A secure, geofenced web app that automates NYSC CDS attendance with real-time location verification and automated eligibility reporting.',
		year: 2025,
		category: 'tool',
		tech: ['Next.js', 'Convex', 'Clerk', 'Geofencing', 'shadcn/ui', 'TypeScript'],
		cover: 'cds-port',
		coverAlt: 'Screenshot of the CDS Attendance Management System',
		links: {
			live: 'https://edb-ams.vercel.app/',
			github: 'https://github.com/ayomikun-ade/cds-ams'
		},
		featured: true
	},
	{
		slug: 'murmer',
		title: 'Murmer',
		tagline: 'An invite-based anonymous confession board with real-time updates.',
		description:
			'An invite-based anonymous confession board featuring real-time updates, anonymous posting and reaction support.',
		year: 2024,
		category: 'web-app',
		tech: ['Next.js', 'Convex', 'TypeScript', 'Tailwind'],
		cover: 'murmer-port',
		coverAlt: 'Screenshot of the Murmer confession board',
		links: {
			live: 'https://murmer.ayomikun.me/',
			github: 'https://github.com/ayomikun-ade/secret-ink'
		}
	},
	{
		slug: 'valentine-verses',
		title: 'Valentine Verses',
		tagline: 'An AI poetry generator for instant, personalized romantic verses.',
		description:
			'An AI-powered poetry generator leveraging Groq Cloud for instant, personalized romantic verses.',
		year: 2025,
		category: 'experiment',
		tech: ['React', 'Framer Motion', 'Groq Cloud', 'FastAPI'],
		cover: 'valentine-port',
		coverAlt: 'Screenshot of the Valentine Verses generator',
		links: {
			live: 'https://valentine-verses.vercel.app/',
			github: 'https://github.com/ayomikun-ade/valentineverses.ui'
		}
	},
	{
		slug: 'aurela',
		title: 'Aurela',
		tagline: 'A visually immersive landing page for a skincare agency.',
		description:
			'A visually immersive landing page for a skin care agency, utilizing advanced motion primitives.',
		year: 2024,
		category: 'experiment',
		tech: ['Next.js', 'Framer Motion'],
		cover: 'aurela-port',
		coverAlt: 'Screenshot of the Aurela landing page',
		links: {
			live: 'https://aurela.pxxl.click/',
			github: 'https://github.com/ayomikun-ade/aurela'
		}
	},
	{
		slug: 'fixflow',
		title: 'FixFlow',
		tagline: 'Streamlined issue tracking for property management.',
		description:
			'A streamlined issue tracking application for property management with real-time status updates.',
		year: 2024,
		category: 'tool',
		tech: ['Next.js', 'TypeScript'],
		cover: 'fixflow-port',
		coverAlt: 'Screenshot of the FixFlow issue tracker',
		links: {
			live: 'https://fix-flow-react.vercel.app/',
			github: 'https://github.com/ayomikun-ade/fix-flow-react'
		}
	}
];

export function projectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

/** Year span across all projects — drives the /work page subheading. */
export function projectYearRange(): string {
	const years = projects.map((p) => p.year);
	const min = Math.min(...years);
	const max = Math.max(...years);
	return min === max ? `${min}` : `${min} – ${max}`;
}

import { error } from '@sveltejs/kit';
import { projects, projectBySlug } from '$lib/data/projects';
import type { PageLoad, EntryGenerator } from './$types';

// Prerender at build time — every project page is statically known.
export const prerender = true;

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = projectBySlug(params.slug);
	if (!project) error(404, 'Project not found');

	const index = projects.findIndex((p) => p.slug === project.slug);
	// Wrap around at the ends so prev/next is always defined.
	const prev = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return { project, prev, next };
};

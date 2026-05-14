import { goto } from '$app/navigation';
import { projects } from '$lib/data/projects';
import { socials, resumeUrl } from '$lib/data/socials';
import { theme } from '$lib/stores/theme.svelte';
import { reducedMotion } from '$lib/stores/motion.svelte';

export type PaletteKind = 'page' | 'project' | 'action';

export type PaletteItem = {
	id: string;
	label: string;
	hint?: string;
	keywords?: string[];
	kind: PaletteKind;
	/** Shortcut hint shown on the right (purely decorative). */
	shortcut?: string;
	/** Either navigate via href OR run a side-effect. Exactly one. */
	href?: string;
	run?: () => void | Promise<void>;
};

const pages: PaletteItem[] = [
	{
		id: 'page-home',
		label: 'Home',
		hint: 'The hero',
		kind: 'page',
		href: '/',
		keywords: ['landing', 'index']
	},
	{
		id: 'page-work',
		label: 'Work',
		hint: 'Selected projects',
		kind: 'page',
		href: '/work',
		keywords: ['portfolio', 'projects']
	},
	{
		id: 'page-about',
		label: 'About',
		hint: 'Bio, skills, timeline',
		kind: 'page',
		href: '/about',
		keywords: ['skills', 'bio', 'timeline', 'whoami']
	},
	{
		id: 'page-contact',
		label: 'Contact',
		hint: 'Email + channels',
		kind: 'page',
		href: '/contact',
		keywords: ['email', 'reach', 'hello', 'hire']
	}
];

const projectItems: PaletteItem[] = projects.map((p) => ({
	id: `proj-${p.slug}`,
	label: p.title,
	hint: p.tagline,
	kind: 'project',
	href: `/work/${p.slug}`,
	keywords: [p.category, p.slug, ...p.tech]
}));

const emailHref = socials.find((s) => s.key === 'email')?.href ?? 'mailto:';

async function copyEmail() {
	const email = emailHref.replace(/^mailto:/, '').split('?')[0];
	try {
		await navigator.clipboard.writeText(email);
	} catch {
		/* Clipboard blocked — silently degrade; the /contact page has a fallback. */
	}
}

const actions: PaletteItem[] = [
	{
		id: 'action-theme-toggle',
		label: 'Theme — toggle',
		hint: 'Flip between light and dark',
		kind: 'action',
		keywords: ['mode', 'appearance', 'switch'],
		run: () => theme.toggle()
	},
	{
		id: 'action-theme-dark',
		label: 'Theme — switch to dark',
		kind: 'action',
		keywords: ['mode', 'night'],
		run: () => theme.set('dark')
	},
	{
		id: 'action-theme-light',
		label: 'Theme — switch to light',
		kind: 'action',
		keywords: ['mode', 'day'],
		run: () => theme.set('light')
	},
	{
		id: 'action-copy-email',
		label: 'Copy email address',
		hint: emailHref.replace(/^mailto:/, '').split('?')[0],
		kind: 'action',
		keywords: ['clipboard', 'mail', 'contact'],
		run: copyEmail
	},
	{
		id: 'action-cv',
		label: 'Download résumé / CV',
		kind: 'action',
		keywords: ['resume', 'pdf', 'download'],
		href: resumeUrl
	},
	{
		id: 'action-whoami',
		label: 'whoami',
		hint: 'About me — bio & skills',
		kind: 'action',
		keywords: ['who', 'identity', 'about'],
		run: () => goto('/about')
	},
	{
		id: 'action-motion-reduce',
		label: 'Motion — reduce (turn off animations)',
		kind: 'action',
		keywords: ['accessibility', 'a11y', 'animation', 'off'],
		run: () => reducedMotion.set('reduce')
	},
	{
		id: 'action-motion-allow',
		label: 'Motion — allow (override system preference)',
		kind: 'action',
		keywords: ['accessibility', 'a11y', 'animation', 'on'],
		run: () => reducedMotion.set('allow')
	},
	{
		id: 'action-motion-auto',
		label: 'Motion — auto (follow system preference)',
		kind: 'action',
		keywords: ['accessibility', 'a11y', 'animation', 'default'],
		run: () => reducedMotion.set('auto')
	},
	...socials
		.filter((s) => s.key !== 'email')
		.map<PaletteItem>((s) => ({
			id: `action-open-${s.key}`,
			label: `Open ${s.label}`,
			hint: s.href.replace(/^https?:\/\//, ''),
			kind: 'action',
			keywords: ['social', 'profile', s.key],
			href: s.href
		}))
];

export const paletteItems: PaletteItem[] = [...pages, ...projectItems, ...actions];

/** Runs an item, returning whether the palette should close after. */
export async function runItem(item: PaletteItem): Promise<boolean> {
	if (item.run) {
		await item.run();
		return true;
	}
	if (item.href) {
		if (
			item.href.startsWith('http') ||
			item.href.startsWith('mailto:') ||
			item.href.endsWith('.pdf')
		) {
			window.open(
				item.href,
				item.href.startsWith('mailto:') ? '_self' : '_blank',
				'noopener,noreferrer'
			);
		} else {
			await goto(item.href);
		}
		return true;
	}
	return false;
}

export const kindLabel: Record<PaletteKind, string> = {
	page: 'Page',
	project: 'Work',
	action: 'Action'
};

export const kindOrder: PaletteKind[] = ['page', 'project', 'action'];

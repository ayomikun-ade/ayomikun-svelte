/**
 * Single source of truth for external links — consumed by Hero, Footer,
 * and (Stage 8) the command palette's `cv` / `contact` commands.
 * Edit URLs here when real handles are confirmed.
 */

export type Social = {
	key: 'github' | 'twitter' | 'linkedin' | 'email';
	label: string;
	href: string;
};

export const socials: Social[] = [
	{ key: 'github', label: 'GitHub', href: 'https://github.com/' },
	{ key: 'twitter', label: 'Twitter', href: 'https://x.com/' },
	{ key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
	{ key: 'email', label: 'Email', href: 'mailto:ellumainc@gmail.com' }
];

export const resumeUrl = '/resume.pdf';

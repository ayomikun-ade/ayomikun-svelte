/**
 * Resolves project cover images through @sveltejs/enhanced-img.
 *
 * Images MUST live in src/lib/assets/portfolio/ (NOT static/) so Vite can
 * process them — enhanced-img generates AVIF/WebP + responsive sizes at build
 * time and emits a <picture> element.
 *
 * In projects.ts, each project's `cover` is the bare filename without
 * extension. Example:
 *   cover: 'nerdwork-port'  →  src/lib/assets/portfolio/nerdwork-port.png
 *
 * If the file doesn't exist yet, getCover() returns undefined and the
 * component falls back to its styled placeholder — so the app builds fine
 * with an empty portfolio/ directory.
 */

// Eagerly import every portfolio image, transformed by enhanced-img.
const modules = import.meta.glob('../assets/portfolio/*.{png,jpg,jpeg,webp,avif}', {
	eager: true,
	query: { enhanced: true }
});

// enhanced-img's default export is a `Picture` object accepted by <enhanced:img src>.
type EnhancedImage = import('@sveltejs/enhanced-img').Picture;

const byName = new Map<string, EnhancedImage>();
for (const [path, mod] of Object.entries(modules)) {
	const name = path
		.split('/')
		.pop()
		?.replace(/\.[^.]+$/, '');
	if (name) byName.set(name, (mod as { default: EnhancedImage }).default);
}

export function getCover(key: string | undefined): EnhancedImage | undefined {
	return key ? byName.get(key) : undefined;
}

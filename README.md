# Ayomikun — Portfolio

Interactive developer portfolio built with **SvelteKit 2 + Svelte 5 (runes)**, **Tailwind v4**, deployed on **Vercel**.

Stage 5b submission for the HNG Frontend Wizards track. Build spec: [`docs/PRODUCT.md`](docs/PRODUCT.md).

## Stack

- SvelteKit 2 · Svelte 5 (runes mode forced project-wide)
- TailwindCSS v4 (CSS-first `@theme`) + `@tailwindcss/forms` + `@tailwindcss/typography`
- Self-hosted variable fonts: Space Grotesk · JetBrains Mono (via `@fontsource-variable`)
- TypeScript · ESLint · Prettier · Vitest
- Deploys to Vercel via `@sveltejs/adapter-vercel`

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm check        # svelte-check (types + a11y)
pnpm lint         # prettier + eslint
pnpm test         # vitest unit tests
pnpm build        # production build
pnpm preview      # preview production build
```

## Roadmap

This repo is being built in 12 commitable stages. See [`docs/PRODUCT.md`](docs/PRODUCT.md) for the full spec.

- [x] **Stage 1** — Foundation & tooling
- [ ] **Stage 2** — App shell, routing, theme system
- [ ] **Stage 3** — Hero section
- [ ] **Stage 4** — Projects data layer + showcase grid
- [ ] **Stage 5** — Project detail pages
- [ ] **Stage 6** — About + Skills
- [ ] **Stage 7** — Contact
- [ ] **Stage 8** — Command palette + terminal (creative feature)
- [ ] **Stage 9** — Animation system polish
- [ ] **Stage 10** — Performance pass
- [ ] **Stage 11** — Accessibility pass
- [ ] **Stage 12** — README + Vercel deploy

A full README (architecture, animation decisions, performance techniques, accessibility considerations, trade-offs) is written in Stage 12.

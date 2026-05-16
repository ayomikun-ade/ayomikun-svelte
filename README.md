# Ayomikun — Portfolio

Interactive developer portfolio built with **SvelteKit 2 + Svelte 5 (runes)** and **Tailwind v4**, deployed on **Vercel**.

Submission for HNG Frontend Wizards Stage 5b.

> **Live URL:** [Portfolio Link](https://ayomikun-svelte.vercel.app/)

---

## Stack

- **SvelteKit 2** · **Svelte 5** (runes mode forced project-wide)
- **TailwindCSS v4** (CSS-first `@theme` directive) + `@tailwindcss/forms` + `@tailwindcss/typography`
- **TypeScript** · **ESLint** · **Prettier** · **Vitest**
- **`@sveltejs/adapter-vercel`** for deploy
- **`@sveltejs/enhanced-img`** wired for future responsive images
- Self-hosted variable fonts via **`@fontsource-variable`** (Space Grotesk · JetBrains Mono)

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm check        # svelte-check (types + a11y warnings)
pnpm lint         # prettier --check + eslint
pnpm format       # prettier --write
pnpm test         # vitest unit tests
pnpm build        # production build
pnpm preview      # preview production build
```

**Windows note:** `pnpm build` may fail at the `adapter-vercel` step with an `EPERM` symlink error. Enable Windows Developer Mode (Settings → Privacy & security → For developers → _Developer Mode_) to allow non-admin symlinks. This only affects local production builds — Vercel itself builds on Linux and is unaffected.

## Architecture

### Layout

```
src/
├── routes/
│   ├── +layout.svelte           # app shell: SkipNav, Header, <main>, Footer, CommandPalette
│   ├── +page.svelte             # home
│   ├── +error.svelte            # themed 404 / 500
│   ├── work/
│   │   ├── +page.svelte         # filterable project grid
│   │   └── [slug]/
│   │       ├── +page.ts         # load + prerender entries, throws 404 on miss
│   │       └── +page.svelte     # detail page with view-transition cover
│   ├── about/+page.svelte       # bio, skills, timeline, currently
│   └── contact/+page.svelte     # direct mail CTA + channels
├── lib/
│   ├── components/              # UI building blocks
│   ├── data/                    # typed content (projects, skills, timeline, socials)
│   ├── stores/                  # runed state — theme.svelte.ts, motion.svelte.ts, palette.svelte.ts
│   ├── actions/                 # use:reveal, use:magnetic
│   ├── commands/registry.ts     # command-palette item registry
│   └── utils/fuzzy.ts           # fuzzy matcher for the palette
├── app.css                      # Tailwind import + @theme tokens + global utilities
└── app.html                     # SSR shell + FOUC-prevention script
```

### Design system

Tokens declared once in `app.css` via Tailwind v4's `@theme` directive. Dark is the default; light mode swaps token values under `html[data-theme='light']`.

| Token family | Examples                                                            |
| ------------ | ------------------------------------------------------------------- |
| Surfaces     | `--color-bg`, `--color-surface`, `--color-surface-raised`           |
| Ink          | `--color-ink`, `--color-ink-muted`, `--color-ink-dim`               |
| Accent       | `--color-accent`, `--color-accent-ink`                              |
| Type         | `--font-display`, `--font-sans`, `--font-mono`                      |
| Motion       | `--ease-snap`, `--ease-sweep`, `--ease-drift`                       |
| Shape        | `--shadow-hard`, `--shadow-hard-sm`, `--shadow-glow`, `--radius-sm` |

OKLCH colors throughout — perceptually uniform, predictable lightness, future-proof for wide-gamut displays.

### State

All state uses Svelte 5 runes — no legacy stores. Module-scope `$state` lives in `.svelte.ts` files:

- [`theme.svelte.ts`](src/lib/stores/theme.svelte.ts) — `theme.current` / `set()` / `toggle()` / `sync()`. Persists to `localStorage`.
- [`motion.svelte.ts`](src/lib/stores/motion.svelte.ts) — `reducedMotion.current` + tri-state override (`auto` / `reduce` / `allow`) on top of the OS `prefers-reduced-motion` media query.
- [`palette.svelte.ts`](src/lib/stores/palette.svelte.ts) — command palette open + query state.

The FOUC-prevention script in [`app.html`](src/app.html) reads `localStorage` for both theme and motion preferences and applies them to `<html>` _before_ paint, then stores sync from the DOM after hydration.

### Routing

All pages prerender at build time (no server-only deps). Project detail pages use a small `+page.ts` `entries()` generator to enumerate slugs:

```ts
export const prerender = true;
export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));
```

`adapter-vercel` outputs them as static assets; the deploy is effectively static hosting.

## Animation decisions

Motion is intentionally split into two systems with different jobs:

**Mount-time entrance** (`.reveal` class + inline `--d` delay) — for above-the-fold content. Fires immediately on first paint via a CSS `@keyframes` declared once in `app.css`. Used by the hero and project detail pages.

**Scroll-triggered reveal** (`use:reveal` action + `.to-reveal` / `.is-revealed`) — IntersectionObserver-driven. Used by About and Contact. Gated by a `.js` class on `<html>` (set by the inline script) so JS-off users see content normally.

**Route transitions** — the View Transitions API via `onNavigate` in the root layout. Project covers pair across routes via `view-transition-name: project-cover-{slug}` for a cinematic morph from grid to detail.

**Filter transitions** on `/work` — Svelte's `animate:flip` + `transition:fade`, with both durations driven reactively by `reducedMotion.current` so they collapse to zero under reduced motion.

**Hero cursor parallax** — pointermove → normalised `mx/my` → background glow translates via the modern `translate` CSS property (composes cleanly with the existing transform-based `drift` keyframe instead of fighting it). Skipped for touch input and reduced motion.

**Theme switch** — animated `background-color` + `color` transition on `<html>` (400ms `var(--ease-drift)`).

**Command palette** — backdrop fade-in, panel drop-in keyframes.

**Reduced motion** is respected throughout via two mechanisms:

1. A global `@media (prefers-reduced-motion: reduce)` rule that caps every animation duration to 0.01ms.
2. An optional `html[data-motion="reduce" | "allow"]` override that bypasses the system preference. Toggle via the command palette: hit `⌘K`, type "motion".

## Performance techniques

- **Prerendering** — every page is statically generated at build time; deploy is effectively a CDN.
- **Route-level code splitting** — SvelteKit default; bundle is one chunk per route.
- **Preload-on-hover** — `data-sveltekit-preload-data="hover"` AND `data-sveltekit-preload-code="hover"` so the destination route's JS chunks start downloading on hover, not on tap.
- **LCP hint** — project detail page covers use `fetchpriority="high" decoding="async"`. Below-the-fold card images use `loading="lazy"`.
- **Image pipeline ready** — `@sveltejs/enhanced-img` wired in Vite; swap `<img>` to `<enhanced:img>` when real screenshots land for auto-generated AVIF/WebP + responsive sources.
- **Self-hosted fonts** — `@fontsource-variable` for Space Grotesk + JetBrains Mono. Single variable file covers the whole weight axis; subsets (latin, latin-ext, vietnamese, etc.) load on demand via `unicode-range`.
- **CSS-first tokens** — Tailwind v4 JIT ships only used utility classes; tokens are declared once in `@theme`.
- **Reduced JS** — Svelte compiles to tiny runtime code; no virtual DOM.
- **Single source of truth** — projects, socials, skills all live in typed data files; the command palette consumes the same data, so no duplication.

**Bundle sizes** (gzipped, from `pnpm build`):

| Asset                                    | Size       |
| ---------------------------------------- | ---------- |
| Framework chunk (largest)                | 19.6 kB    |
| Shared chunk (palette + commands)        | 10.7 kB    |
| App entry                                | 1.5 kB     |
| Largest per-route chunk (`/work`)        | 7.0 kB     |
| Smallest per-route chunk                 | 0.9 kB     |
| App CSS (Tailwind + tokens + fontsource) | 11.6 kB    |
| **First-page total JS**                  | **~40 kB** |

## Accessibility considerations

- **Skip-nav** link (`Skip to content`) — invisible until focused; jumps to `<main id="main" tabindex="-1">`.
- **Semantic landmarks** — `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<aside>` used appropriately.
- **Heading hierarchy** — verified clean: every page has exactly one `<h1>`; section headings are `<h2>`; project cards are `<h2>` on `/work` (no skipped levels).
- **Visible focus** — global `:focus-visible` ring (2px accent outline, 3px offset) on every focusable element; custom focus states on buttons (border shifts to ink).
- **ARIA** —
  - `aria-current="page"` on the active nav link
  - `aria-pressed` on the theme toggle and the project filter buttons (state, not just colour)
  - `aria-expanded` + `aria-controls` on the mobile menu trigger
  - **Combobox/listbox pattern** in the command palette with virtual focus via `aria-activedescendant` (DOM focus stays on the input the whole time, the standard modern combobox pattern)
  - `role="dialog"` + `aria-modal="true"` on the palette panel
  - `aria-live="polite"` regions announce: copy-email success, palette result count, project filter changes
- **Keyboard** — every interaction reachable: ↑/↓/Enter/Esc in the palette; ⌘K / Ctrl+K to open from anywhere; mobile menu opens with Enter/Space; all CTAs are real `<a>` or `<button>` elements.
- **Motion accessibility control (bonus)** — `prefers-reduced-motion` respected globally, plus an in-app override (`auto` / `reduce` / `allow`) accessible via the command palette, persisted to `localStorage`, applied before paint to prevent flash.
- **Colour contrast (WCAG AA)** — verified via an OKLCH→sRGB→luminance script. All token combinations pass:

  | Pair                                 | Dark     | Light    |
  | ------------------------------------ | -------- | -------- |
  | `ink` on `bg`                        | 18.6:1 ✓ | 17.3:1 ✓ |
  | `ink-muted` on `bg`                  | 8.2:1 ✓  | 7.8:1 ✓  |
  | `accent` on `bg` (UI ≥3)             | 14.9:1 ✓ | 6.7:1 ✓  |
  | `accent-ink` on `accent` (text ≥4.5) | 13.7:1 ✓ | 6.7:1 ✓  |
  | `ink-dim` on `bg` (decorative ≥3)    | 3.4:1 ✓  | 3.6:1 ✓  |

  The light-mode accent shifts from a bright lime (which only managed 2.3:1 — failing) to a darker forest green so cream-ink text on it stays comfortably above the body-text threshold.

- **Colour is never the only indicator** — active nav links also get an underline bar; filter buttons show a count; the copy-email success state shows a checkmark _and_ "Copied" text _and_ an SR-only live announcement.
- **External links** — `target="_blank"` paired with `rel="noopener noreferrer"`; descriptive `aria-label` on icon-only links.

## Creative feature — command palette

`⌘K` / `Ctrl+K` from anywhere opens a fuzzy-searchable palette unifying **pages**, **projects**, and **actions** (theme, motion preference, copy email, download CV, social profiles, `whoami`).

- **Modern combobox pattern** with virtual focus via `aria-activedescendant`
- **Fuzzy matcher** with word-boundary + consecutive-match bonuses, inline `<mark>` highlighting of matched chars
- **Grouped view** when input is empty (Pages / Work / Actions), flat best-score-first when typing
- **Keyboard** — `↑`/`↓` navigate (wraps), `Home`/`End`, `Enter` to activate, `Esc` to close, `Tab` captured to keep focus on the input
- **Focus return** to the previously-focused element on close; scroll-lock on `<html>` while open
- A pill in the header (search icon + "Search" + `⌘K` kbd) for pointer/touch users

## Trade-offs

- **Mail integration over a server form.** The spec accepts either; mail integration ([/contact](src/routes/contact/+page.svelte)) is simpler, has no inbox-spam surface, and avoids managing email-provider credentials. The trade-off: the user opens their own mail client (or copies the address); no inline send confirmation.
- **Image placeholders.** Cards and detail covers render a typographic placeholder (diagonal-stripe pattern tinted by a per-project hue, plus a chunky monogram). Real screenshots can be dropped into `static/` and referenced from `src/lib/data/projects.ts` `cover` fields; `<enhanced:img>` is ready to use when they arrive.
- **No analytics, no error reporting.** Out of scope for a portfolio submission; would land in a real-world deploy.
- **One Cmd-K palette, no separate "terminal" mode.** Originally scoped as two modes ("search" + "terminal"); collapsed into a unified palette where commands like `whoami` are just searchable actions. Cleaner UX, less code.
- **No unit tests beyond `svelte-check`.** Vitest is installed and configured; deferred test authoring to keep stage scope tight.
- **Adapter-vercel local-build hiccup on Windows.** Documented above; unaffects production deploys.

---

## Deploy

The repo is **deploy-ready**. Vercel auto-detects SvelteKit on import.

### One-time, via the Vercel dashboard

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), pick this repo.
3. Vercel detects SvelteKit. Leave the build/output config as defaults.
4. Click **Deploy**. First deploy takes ~1 minute.
5. After the first deploy, paste the Vercel URL into this README's "Live URL" placeholder above.

### Via the Vercel CLI

```bash
pnpm dlx vercel       # follow prompts; first run links the project
pnpm dlx vercel --prod  # promote to production
```

### Environment variables

Currently **none required** — the site is fully static. Reserved for future features (e.g. an AI assistant, server-side form action) that don't exist yet.

---

## Spec coverage

This portfolio implements the full HNG Stage 5b task.

| Spec requirement                 | Status                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------- |
| 1️⃣ Built with Svelte / SvelteKit | ✓ SvelteKit 2 + Svelte 5 runes                                                   |
| 2️⃣ Hero section + bonuses        | ✓ entrance animations, social/CV CTAs, animated background, cursor parallax      |
| 3️⃣ Projects showcase             | ✓ filterable grid, hover effects, cinematic detail transitions, prev/next pager  |
| 4️⃣ Smooth animations             | ✓ unified motion vocabulary, easing tokens, view transitions, scroll reveals     |
| 5️⃣ Responsive                    | ✓ mobile-first across every page                                                 |
| 6️⃣ Performance                   | ✓ prerender, code splitting, preload-on-hover, LCP hints, lazy images, ~40 kB JS |
| 7️⃣ Accessibility                 | ✓ skip-nav, ARIA, focus rings, keyboard nav, WCAG AA contrast, motion override   |
| 8️⃣ Contact                       | ✓ mail integration (copy + mailto + channels)                                    |
| 9️⃣ Theme support                 | ✓ dark / light + persistence + system pref + animated switch                     |
| 🔥 Creative feature              | ✓ command palette (Cmd-K, fuzzy search, terminal-style commands)                 |
| 🔒 Security                      | ✓ no exposed secrets, `rel="noopener noreferrer"` on externals, sanitized mailto |

---

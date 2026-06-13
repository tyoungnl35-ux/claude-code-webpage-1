# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment Note — SSL Workaround

This machine uses a corporate proxy with a custom root certificate. Any command that fetches from the internet (npm install, playwright install, next/font Google Downloads) requires:

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

Set this before running `npm install`, `npx playwright install`, or the first `npm run dev` on a fresh clone. The app itself is unaffected at runtime. `npm config set strict-ssl false` is already set globally on this machine.

## Commands

```powershell
# Development server
npm run dev                        # http://localhost:3000

# Production build (Vercel-ready)
npm run build

# Linting
npm run lint

# Run all E2E tests (auto-starts dev server)
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
npm test                           # or: npx playwright test --project=chromium

# Run a single test by name
npx playwright test --project=chromium -g "contact CTA has the exact mailto href"

# Run a single test file
npx playwright test tests/landing-page.spec.ts --project=chromium

# Interactive test UI
npm run test:ui

# View last HTML test report
npx playwright show-report
```

## Architecture

This is a **single-page Next.js 16 (App Router)** landing site. The entire page lives in one file:

- `app/layout.tsx` — font injection (`--font-bebas`, `--font-outfit` CSS variables via `next/font/google`), global metadata, html/body shell
- `app/page.tsx` — entire page as a single `"use client"` component; no server components below the root
- `app/globals.css` — Tailwind directives + hand-crafted utility classes (`.btn-coral`, `.service-card`, `.nav-link`, `.coral-rule`, `.noise-overlay`)

### `page.tsx` internals

`useInView` is a local IntersectionObserver hook (no library) — it fires once per element and sets `inView: true` to trigger CSS transition classes. Three instances are used: `servicesSection`, `statsSection`, `contactSection`.

Content data (`services` array, `stats` array) is declared as module-level constants at the top of the file. To add or edit a service card, update the `services` array — no JSX restructuring needed.

Header scroll state (`scrolled`) applies a backdrop-blur + shadow once the user scrolls past 20px.

### Design tokens

All colours are defined in `tailwind.config.ts` as `charcoal.*` and `coral.*` scales. Do not use raw hex values in JSX — use the Tailwind tokens. The globals.css CSS variables (`--charcoal`, `--coral`, etc.) mirror those tokens for use in non-Tailwind contexts.

Font families are referenced as `font-display` (Bebas Neue) and `font-body` (Outfit) in Tailwind — do not inline `var(--font-bebas)` directly in className strings.

### Image assets

All three images live in `public/` and are served statically. They are rendered with `next/image` (`fill` layout) with `unoptimized: true` in `next.config.ts`. Do not move them or rename them — the Playwright tests assert on their filenames in the `src` attribute.

### Contact email

The contact email is `AqentiqBridge@gmail.com` — the capital **Q** is intentional and is asserted by the Playwright test suite. Do not "correct" it.

## Testing

Tests are in `tests/landing-page.spec.ts`. The `webServer` block in `playwright.config.ts` starts `npm run dev` automatically; on a warm run it reuses an existing server on port 3000.

Turbopack cold-starts can take ~15s, which is why `timeout: 60000` and `navigationTimeout: 60000` are set. Reducing workers to `1` (locally `2`) prevents race conditions during first-compile.

The page has two `<nav>` elements (header + footer) — any selector targeting `nav` must use `.first()` to avoid Playwright strict-mode errors.

## Deployment

The build output is fully static (`○` routes). Deploy by pointing Vercel at this `agentiqbridge/` directory as the project root. No environment variables are required.

The `turbopack.root` setting in `next.config.ts` is required because the parent directory (`Claude Code Webpage/`) contains its own `package-lock.json`, which otherwise confuses Next.js's workspace detection.

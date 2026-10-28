# SIGØRIX — Beyond the Expected.

Website for **SIGØRIX** (*Signature Innovation, Growth, Originality, Research, Intelligence and Experience*), a digital innovation studio offering website design and development, redesign, bespoke digital experiences, software engineering, AI-powered solutions and technical consulting.

## What's here

A 21-page static website: Home, Services (overview + 6 detail pages), Work (overview + 3 clearly labelled **concept** projects), About, Process, Contact / Start a project, Insights (index + 3 articles), Privacy, Terms and a branded 404.

- **Zero runtime and build dependencies.** A small Node (≥ 20) generator renders pages from plain data modules in `src/content/`. No `npm install` is required.
- Accessible, responsive, no cookies, no analytics, no third-party scripts or fonts.
- Contact form validates client-side and posts JSON to a configurable endpoint. **It never claims success unless the endpoint accepted the message.**

## Quick start

```bash
node -v            # 20 or newer
npm run dev        # build + serve at http://localhost:4173
```

| Command | Purpose |
|---|---|
| `npm run build` | Generate the site into `dist/` |
| `npm run serve` | Serve `dist/` locally (`PORT=...` to change port) |
| `npm run lint` | Syntax-check all JS and validate JSON |
| `npm test` | Unit + structural tests (builds first): links, headings, alt text, labels, metadata, sitemap, secrets |
| `npm run smoke` | Browser smoke test of every route at 5 viewports (needs Python + Playwright) |
| `npm run a11y` | Browser accessibility audit: computed contrast, names, targets, keyboard (needs Playwright) |
| `npm run check` | lint + build + tests |

Browser checks need `pip install playwright && playwright install chromium`.

## Configuration

Copy `.env.example` or set environment variables at build time (they are baked into public HTML, so never put secrets here):

| Variable | Meaning |
|---|---|
| `SITE_URL` | Production origin, no trailing slash. Enables canonical tags, OG image URLs, `sitemap.xml`. Unset = those are omitted. |
| `FORM_ENDPOINT` | Public URL that accepts a JSON `POST` (e.g. a Formspree form). Unset = form reports honestly that delivery isn't configured. |
| `BASE_PATH` | Sub-path hosting, e.g. `/sigorix/`. Default `/`. |

## Structure

```
public/            Static files copied as-is (brand assets, icons, OG image)
  brand/original/  The three approved PNGs, untouched (kept in the repo, not deployed)
  brand/*.webp|png Optimised derivatives (transparent margins trimmed only; artwork unchanged)
src/site.config.mjs   Name, tagline, nav, env-driven config
src/content/          Services, process, work (concepts), insights, about copy
src/templates/        lib.mjs (layout, head, helpers) and pages.mjs (page renderers)
src/assets/           styles.css (design system), main.js, validate.js
scripts/              build, serve, lint, smoke.py, a11y.py
tests/                node:test suites
.github/workflows/    ci.yml, deploy.yml (GitHub Pages)
docs/                 BRAND, CONTENT, DEPLOYMENT, OPERATIONS
```

## Documentation

[docs/BRAND.md](docs/BRAND.md) · [docs/CONTENT.md](docs/CONTENT.md) · [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) · [docs/OPERATIONS.md](docs/OPERATIONS.md)

## Before launch

See "Owner decisions" in [docs/OPERATIONS.md](docs/OPERATIONS.md): connect the form, confirm legal pages, set the domain, review copy.

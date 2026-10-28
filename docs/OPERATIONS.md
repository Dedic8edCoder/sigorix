# Operations & owner decisions

## Owner decisions before launch
1. **Contact form delivery** — configure `FORM_ENDPOINT` (docs/DEPLOYMENT.md). Without it no enquiry can be received.
2. **Public contact details** — none are published (none were supplied). Add an email address/social links in `src/templates/lib.mjs` (footer) and `pages.mjs` (contact) if wanted.
3. **Legal pages** — `/privacy/` and `/terms/` are drafts describing actual behaviour and mark "To confirm" items (entity name, address, retention, rights, governing law). Get appropriate advice and complete them.
4. **Domain** — set `SITE_URL`.
5. **Copy review** — the about-page letter meanings, article text, concept scenarios and "founder-led studio" statement are written, not supplied; confirm they reflect reality.
6. **Header logo** — see docs/BRAND.md (black wordmark vs dark header).
7. **Fonts** — optional webfont (docs/BRAND.md).

## Checks run in CI
lint → tests (+ build) → browser smoke (22 routes × 5 viewports: console errors, failed requests, overflow, single h1) → accessibility audit.

## Known limitations
- No automated lint/format/type tooling beyond syntax checks (project is dependency-free by design). Adding ESLint/Prettier/TypeScript is straightforward if the team wants them.
- Accessibility checks are automated approximations; they do not replace screen-reader testing or an expert audit. No conformance is claimed.
- Actions are pinned to major versions, not commit SHAs. Dependabot (monthly) is configured for Actions updates.
- No analytics are installed. If added, update the privacy page and consider consent requirements.

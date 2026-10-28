# Updating content

All copy lives in `src/content/` as plain JS data; templates escape every value.

- **Services** — `services.mjs`: add an object; a detail page and nav row are generated.
- **Process** — `process.mjs`.
- **Work** — `work.mjs`. All current entries are `concept: true` fictional scenarios. For a real case study set `concept: false`, and the "This is a concept" notice disappears. Add real results only when they are verified and approved by the client. Visuals are SVG illustrations (`visual: 'layout' | 'chat' | 'dashboard'`) from `conceptVisual()` in `templates/lib.mjs`; extend that function or add real imagery.
- **Insights** — `insights.mjs`. Body blocks: `['h2', text]`, `['p', text]`, `['ul', [items]]`. Plain text only. **Dates are initial publication dates set at build time; confirm or edit.** Avoid unverifiable statistics or attributed quotations.
- **About / name expansion** — `pages.mjs`. The meaning attached to each letter is brand interpretation written for the site; edit freely.

Run `npm run check` after changes. The tests will fail on dead links, missing alt text, duplicate titles, or invented-proof keywords.

# Deployment

The output is static (`dist/`), so any static host works. A GitHub Pages workflow is included (`.github/workflows/deploy.yml`) because the repository is on GitHub and it costs nothing.

## GitHub Pages (one-time setup)
1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The workflow runs tests, builds and deploys. The URL appears in the workflow run and the `github-pages` environment (expected shape: `https://dedic8edcoder.github.io/sigorix/`).
3. Optional repository **variables** (Settings → Secrets and variables → Actions → Variables; none are secrets):
   - `FORM_ENDPOINT` — see below.
   - `SITE_URL` / `BASE_PATH` — set when using a custom domain (`SITE_URL=https://example.com`, `BASE_PATH=/`). Defaults come from GitHub Pages.

## Contact form
Create a form with a provider that accepts JSON POST and CORS from your site (Formspree-style). Set its URL as `FORM_ENDPOINT` and redeploy. Fields sent: `name, email, company, service, budget, timeframe, details`. Then update `/privacy/` to name the provider, its data location and retention. Test with a real submission before launch. Until then the form says plainly that the message was **not** sent.

## Other hosts
Netlify / Cloudflare Pages / Vercel (static): build command `npm run build`, publish directory `dist`, set the env vars above. `404.html` is generated and served automatically by Pages/Netlify/Cloudflare.

## Custom domain
Changing DNS is a manual step on your side. After DNS is live set `SITE_URL` and `BASE_PATH=/`, redeploy, and the canonical tags, OG URLs and sitemap update automatically. Add the sitemap URL to Search Console if desired.

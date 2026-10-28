import { rmSync, mkdirSync, cpSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site.config.mjs';
import { services } from '../src/content/services.mjs';
import { work } from '../src/content/work.mjs';
import { insights } from '../src/content/insights.mjs';
import * as P from '../src/templates/pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, 'public'), dist, { recursive: true, filter: (src) => !src.includes('brand/original') }); // originals stay in the repo, not the deploy bundle
mkdirSync(join(dist, 'assets'), { recursive: true });
cpSync(join(root, 'src/assets/css/styles.css'), join(dist, 'assets/styles.css'));
for (const f of readdirSync(join(root, 'src/assets/js'))) cpSync(join(root, 'src/assets/js', f), join(dist, 'assets', f));

const routes = []; // public, indexable routes -> sitemap
const emit = (path, html, { index = true } = {}) => {
  const file = path === '' ? 'index.html' : path.endsWith('.html') ? path : join(path, 'index.html');
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), html);
  if (index) routes.push(path);
};

emit('', P.home());
emit('services/', P.servicesIndex());
services.forEach((s) => emit(`services/${s.slug}/`, P.serviceDetail(s)));
emit('work/', P.workIndex());
work.forEach((w) => emit(`work/${w.slug}/`, P.workDetail(w)));
emit('about/', P.aboutPage());
emit('process/', P.processPage());
emit('contact/', P.contactPage());
emit('insights/', P.insightsIndex());
insights.forEach((a) => emit(`insights/${a.slug}/`, P.article(a)));
emit('privacy/', P.privacy());
emit('terms/', P.terms());
emit('404.html', P.notFound(), { index: false });

// Sitemap only when the production URL is known (absolute URLs are required).
if (site.url) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${site.url}${site.basePath}${r}</loc></url>`).join('\n')}\n</urlset>\n`;
  writeFileSync(join(dist, 'sitemap.xml'), xml);
}
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${site.url ? `\nSitemap: ${site.url}${site.basePath}sitemap.xml\n` : ''}`);
writeFileSync(join(dist, 'manifest.webmanifest'), JSON.stringify({
  name: site.name, short_name: site.name, description: site.description, start_url: site.basePath, display: 'browser',
  background_color: '#101116', theme_color: '#101116',
  icons: [{ src: `${site.basePath}icons/icon-192.png`, sizes: '192x192', type: 'image/png' }, { src: `${site.basePath}icons/icon-512.png`, sizes: '512x512', type: 'image/png' }]
}, null, 2));
writeFileSync(join(dist, '.nojekyll'), '');
console.log(`Built ${routes.length} public routes + 404 → dist/ ${site.url ? '' : '(SITE_URL unset: no canonical tags or sitemap)'}`);

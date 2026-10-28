import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc } from '../src/templates/lib.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const dist = join(root, 'dist');
const build = (env = {}) => {
  const r = spawnSync('node', ['scripts/build.mjs'], { cwd: root, env: { ...process.env, SITE_URL: '', FORM_ENDPOINT: '', BASE_PATH: '/', ...env }, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
};
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = () => walk(dist).filter((f) => f.endsWith('.html'));
const read = (f) => readFileSync(f, 'utf8');

before(() => build());

test('esc neutralises HTML', () => assert.equal(esc(`<img src=x onerror="a()">&'`), '&lt;img src=x onerror=&quot;a()&quot;&gt;&amp;&#39;'));

test('all expected routes exist', () => {
  const must = ['index.html', 'services/index.html', 'work/index.html', 'about/index.html', 'process/index.html', 'contact/index.html', 'insights/index.html', 'privacy/index.html', 'terms/index.html', '404.html', 'robots.txt', 'favicon.ico', 'og-image.png', 'manifest.webmanifest'];
  for (const m of must) assert.ok(existsSync(join(dist, m)), m);
  assert.equal(readdirSync(join(dist, 'services')).filter((n) => n !== 'index.html').length, 6, 'six service pages');
  assert.equal(readdirSync(join(dist, 'work')).filter((n) => n !== 'index.html').length, 3, 'three concept pages');
  assert.ok(readdirSync(join(dist, 'insights')).filter((n) => n !== 'index.html').length >= 3, 'at least three articles');
});

test('every page: lang, unique title, description, single h1, main landmark', () => {
  const titles = new Set();
  for (const f of pages()) {
    const h = read(f);
    assert.match(h, /<html lang="en">/, f);
    const t = h.match(/<title>(.*?)<\/title>/)?.[1]; assert.ok(t, f); assert.ok(!titles.has(t), `duplicate title ${t}`); titles.add(t);
    assert.match(h, /<meta name="description" content="[^"]{40,}/, f);
    assert.equal((h.match(/<h1[ >]/g) || []).length, 1, `h1 count ${f}`);
    assert.equal((h.match(/<main /g) || []).length, 1, f);
    assert.match(h, /class="skip"/, f);
  }
});

test('no dead links: every internal href and src resolves to a built file', () => {
  for (const f of pages()) {
    const h = read(f);
    for (const m of h.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
      const v = m[1];
      if (/^(https?:|mailto:|data:)/.test(v)) continue;
      assert.notEqual(v, '#', `placeholder href in ${f}`);
      if (v.startsWith('#')) { assert.ok(h.includes(`id="${v.slice(1)}"`), `missing anchor ${v} in ${f}`); continue; }
      const p = v.split('#')[0].split('?')[0];
      const target = join(dist, p);
      assert.ok(existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html'))), `${f} -> ${v}`);
    }
  }
});

test('images have alt attributes, explicit dimensions, and external links are safe', () => {
  for (const f of pages()) {
    const h = read(f);
    for (const m of h.matchAll(/<img\b[^>]*>/g)) {
      assert.match(m[0], /\balt="/, `alt missing ${f}`);
      assert.match(m[0], /\bwidth="\d+"/, `width missing ${f}`);
      assert.match(m[0], /\bheight="\d+"/, `height missing ${f}`);
    }
    for (const m of h.matchAll(/<a\b[^>]*href="https?:[^>]*>/g)) assert.match(m[0], /rel="[^"]*noopener/, `external link rel ${f}`);
  }
});

test('no third-party requests, trackers or inline event handlers beyond the form guard', () => {
  for (const f of pages()) {
    const h = read(f);
    assert.ok(!/<script[^>]+src="https?:/.test(h), `external script ${f}`);
    assert.ok(!/<link[^>]+href="https?:\/\/(fonts|cdn)/.test(h), `external stylesheet ${f}`);
    assert.ok(!/google-analytics|gtag\(|googletagmanager|facebook\.net|hotjar/i.test(h), f);
  }
});

test('contact form: labelled controls, described errors, honeypot hidden', () => {
  const h = read(join(dist, 'contact/index.html'));
  for (const id of ['name', 'email', 'company', 'service', 'budget', 'timeframe', 'details']) assert.match(h, new RegExp(`<label for="${id}"`), id);
  for (const id of ['name', 'email', 'service', 'details']) assert.match(h, new RegExp(`id="${id}-err"`), id);
  assert.match(h, /role="status" aria-live="polite"/);
  assert.match(h, /class="hp" aria-hidden="true"/);
  assert.match(h, /data-endpoint=""/, 'endpoint empty by default');
});

test('404 page is noindex and offers navigation', () => {
  const h = read(join(dist, '404.html'));
  assert.match(h, /noindex/); assert.match(h, /href="\/"/); assert.match(h, /services\//);
});

test('concept projects are unmistakably labelled and nothing is fabricated', () => {
  for (const f of walk(join(dist, 'work')).filter((x) => x.endsWith('.html') && !x.endsWith('work/index.html'))) assert.match(read(f), /This is a concept/, f);
  const all = pages().map(read).join('\n');
  assert.ok(!/testimonial|\b\d+%\s*(increase|growth|uplift)|award-winning|trusted by/i.test(all), 'no invented social proof');
  assert.ok(!/href="mailto:|href="tel:/.test(all), 'no invented contact details');
});

test('without SITE_URL: no canonical, no sitemap; robots has no sitemap line', () => {
  assert.ok(!existsSync(join(dist, 'sitemap.xml')));
  assert.ok(!read(join(dist, 'index.html')).includes('rel="canonical"'));
  assert.ok(!read(join(dist, 'robots.txt')).includes('Sitemap'));
});

test('with SITE_URL and BASE_PATH: canonical, OG, sitemap generated from real routes; base path respected', () => {
  build({ SITE_URL: 'https://example.test', BASE_PATH: '/sx' });
  const home = read(join(dist, 'index.html'));
  assert.match(home, /<link rel="canonical" href="https:\/\/example\.test\/sx\/">/);
  assert.match(home, /og:image" content="https:\/\/example\.test\/sx\/og-image\.png"/);
  const sm = read(join(dist, 'sitemap.xml'));
  assert.ok(sm.includes('https://example.test/sx/services/'));
  assert.ok(!sm.includes('404'), '404 excluded');
  assert.equal((sm.match(/<loc>/g) || []).length, pages().length - 1, 'one entry per page except 404');
  assert.ok(home.includes('href="/sx/services/"'));
  build(); // restore default build
});

test('approved brand assets present and dimensions intact', () => {
  const dims = (f) => { const b = readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
  assert.deepEqual(dims(join(root, 'public/brand/original/sigorix-fox.png')), [1254, 1254]);
  assert.deepEqual(dims(join(root, 'public/brand/original/sigorix-horizontal.png')), [1536, 1024]);
  assert.deepEqual(dims(join(root, 'public/brand/original/sigorix-primary.png')), [1536, 1024]);
  for (const n of ['fox', 'horizontal', 'primary']) assert.ok(existsSync(join(root, `public/brand/sigorix-${n}.webp`)));
});

test('no secrets in the repository sources', () => {
  const files = walk(root).filter((f) => !/node_modules|\.git[/\\]|dist[/\\]|site\.test\.js$|\.(png|webp|ico)$/.test(f));
  const re = /(ghp_[A-Za-z0-9]{20,}|github_pat_|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY)/;
  for (const f of files) assert.ok(!re.test(read(f)), `secret-like string in ${f}`);
  assert.ok(!existsSync(join(root, '.env')));
});

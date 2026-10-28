import { site, nav } from '../site.config.mjs';

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Root-relative site URL honouring BASE_PATH. `p` has no leading slash. */
export const u = (p = '') => site.basePath + p;
export const abs = (p = '') => (site.url ? site.url + u(p) : '');

const IMG = {
  fox: { w: 1161, h: 1230, smW: 640, smH: 678 },
  horizontal: { w: 1429, h: 931, smW: 800, smH: 521 },
  primary: { w: 1494, h: 977, smW: 800, smH: 523 }
};

/** <picture> using the optimised WebP, falling back to the trimmed PNG. Original files untouched in /brand/original. */
export function brandImg(name, { alt, cls = '', eager = false, width, sizes = '' } = {}) {
  const d = IMG[name];
  const file = `brand/sigorix-${name}`;
  const small = width && width <= d.smW;
  const w = small ? d.smW : d.w;
  const h = small ? d.smH : d.h;
  const webp = u(`${file}${small ? '-sm' : ''}.webp`);
  return `<picture><source srcset="${webp}" type="image/webp"><img src="${u(file + '.png')}" alt="${esc(alt)}" width="${w}" height="${h}" class="${cls}" ${sizes ? `sizes="${sizes}"` : ''} decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}></picture>`;
}

export const arrow = '<svg class="arr" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';

export function btn(label, href, kind = 'primary') {
  return `<a class="btn btn-${kind}" href="${href}"><span>${esc(label)}</span>${arrow}</a>`;
}

const prismMark = `<svg class="prism-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false"><path d="M20 3 37 33H3z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M20 3v30M11.5 18 29 18" stroke="currentColor" stroke-width="1" opacity=".6"/></svg>`;
export { prismMark };

export function head({ title, description, path, ogType = 'website', noindex = false, jsonLd = null }) {
  const full = title === site.name ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;
  const canon = site.url ? abs(path) : '';
  const og = site.url ? abs('og-image.png') : '';
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#101116">
<meta name="color-scheme" content="dark">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow">'}
${canon ? `<link rel="canonical" href="${canon}">` : ''}
<link rel="icon" href="${u('favicon.ico')}" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="${u('icons/favicon-32.png')}">
<link rel="apple-touch-icon" href="${u('icons/apple-touch-icon.png')}">
<link rel="manifest" href="${u('manifest.webmanifest')}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${site.locale}">
${canon ? `<meta property="og:url" content="${canon}">` : ''}
${og ? `<meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="SIGØRIX — Beyond the Expected. The Prism Fox mark on an obsidian background.">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(description)}">
${og ? `<meta name="twitter:image" content="${og}">` : ''}
<link rel="preload" as="style" href="${u('assets/styles.css')}">
<link rel="stylesheet" href="${u('assets/styles.css')}">
<script>document.documentElement.classList.add('js')</script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

export function header(current) {
  const links = nav
    .map((n) => {
      const active = current === n.href || (current && current.startsWith(n.href) && n.href !== '');
      return `<li><a href="${u(n.href)}"${active ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
    })
    .join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${u()}" aria-label="${site.name} — home">
      ${brandImg('fox', { alt: '', cls: 'brand-fox', eager: true, width: 120 })}
      <span class="brand-name">SIGØRIX</span>
    </a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" data-menu><span class="menu-label">Menu</span><span class="menu-icon" aria-hidden="true"></span></button>
    <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
      <ul>${links}</ul>
      <a class="btn btn-ghost nav-cta" href="${u('contact/')}"${current === 'contact/' ? ' aria-current="page"' : ''}><span>Start a project</span>${arrow}</a>
    </nav>
  </div>
</header>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <div class="logo-plate">${brandImg('horizontal', { alt: 'SIGØRIX — Beyond the Expected.', width: 420 })}</div>
        <p class="foot-tag">${esc(site.tagline)}</p>
        <p class="muted small">${esc(site.description)}</p>
      </div>
      <nav aria-label="Footer">
        <h2 class="label">Studio</h2>
        <ul class="foot-links">
          ${nav.map((n) => `<li><a href="${u(n.href)}">${esc(n.label)}</a></li>`).join('')}
          <li><a href="${u('contact/')}">Start a project</a></li>
        </ul>
      </nav>
      <nav aria-label="Legal">
        <h2 class="label">Legal</h2>
        <ul class="foot-links">
          <li><a href="${u('privacy/')}">Privacy</a></li>
          <li><a href="${u('terms/')}">Terms</a></li>
        </ul>
      </nav>
    </div>
    <div class="foot-bottom"><p class="small muted">© ${year} ${site.name}. All rights reserved.</p><p class="small muted">Signature · Innovation · Growth · Originality · Research · Intelligence · Experience</p></div>
  </div>
</footer>
<script type="module" src="${u('assets/main.js')}"></script>`;
}

export function page({ title, description, path, current = path, body, ogType, noindex, jsonLd, extraHead = '' }) {
  return `${head({ title, description, path, ogType, noindex, jsonLd })}
<body>
${header(current)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}

export function pageHero({ eyebrow, title, lead, crumbs = [] }) {
  const bc = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c[0])}</li>` : `<li><a href="${c[1]}">${esc(c[0])}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  return `<section class="page-hero"><div class="wrap">${bc}<p class="label">${esc(eyebrow)}</p><h1 class="display-m">${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div></section>`;
}

export function ctaBand(title = 'Have something in mind?', text = 'Tell us what you are trying to achieve. We will reply with an honest view of how we could help.') {
  return `<section class="cta-band"><div class="wrap cta-inner reveal"><div><p class="label">Start a project</p><h2 class="display-s">${esc(title)}</h2><p class="lead">${esc(text)}</p></div>${btn('Start a project', u('contact/'))}</div></section>`;
}

/** Abstract, original SVG artwork for the clearly-labelled concept projects. */
export function conceptVisual(kind) {
  const f = 'fill="none" stroke="#A7ACBA" stroke-opacity=".5"';
  const frame = `<rect x="1" y="1" width="598" height="378" rx="2" fill="#16171f" stroke="#A7ACBA" stroke-opacity=".25"/>`;
  const art = {
    layout: `${frame}<rect x="30" y="28" width="90" height="10" fill="#E9EAF0" opacity=".85"/><rect x="420" y="28" width="30" height="6" fill="#A7ACBA" opacity=".5"/><rect x="465" y="28" width="30" height="6" fill="#A7ACBA" opacity=".5"/><rect x="510" y="28" width="60" height="6" fill="#64E7F2"/>
<rect x="30" y="90" width="300" height="26" fill="#E9EAF0"/><rect x="30" y="126" width="220" height="26" fill="#E9EAF0"/><rect x="30" y="176" width="260" height="6" fill="#A7ACBA" opacity=".6"/><rect x="30" y="192" width="230" height="6" fill="#A7ACBA" opacity=".6"/><rect x="30" y="224" width="96" height="30" fill="#8257FF"/>
<path d="M400 90 540 90 470 210z" fill="#8257FF" opacity=".9"/><path d="M470 210 540 90 570 210z" fill="#64E7F2" opacity=".7"/><path d="M400 90 470 210 380 210z" fill="#5B33D6"/>
<g ${f}><path d="M30 300h170M220 300h170M410 300h160M30 330h170M220 330h170M410 330h160"/></g>`,
    chat: `${frame}<rect x="30" y="40" width="300" height="50" fill="#232430"/><rect x="46" y="56" width="180" height="6" fill="#A7ACBA"/><rect x="46" y="70" width="120" height="6" fill="#A7ACBA" opacity=".6"/>
<rect x="270" y="110" width="300" height="38" fill="#8257FF"/><rect x="286" y="125" width="200" height="6" fill="#E9EAF0"/>
<rect x="30" y="168" width="360" height="86" fill="#232430"/><rect x="46" y="184" width="290" height="6" fill="#E9EAF0" opacity=".9"/><rect x="46" y="198" width="250" height="6" fill="#A7ACBA"/><rect x="46" y="212" width="200" height="6" fill="#A7ACBA" opacity=".6"/><rect x="46" y="230" width="150" height="14" fill="none" stroke="#64E7F2"/><text x="54" y="241" font-size="9" fill="#64E7F2" font-family="monospace">SOURCE · DOCS</text>
<rect x="30" y="316" width="540" height="34" fill="none" stroke="#A7ACBA" stroke-opacity=".5"/><rect x="520" y="324" width="42" height="18" fill="#64E7F2"/>`,
    dashboard: `${frame}<rect x="30" y="28" width="120" height="8" fill="#E9EAF0" opacity=".85"/>
<g><rect x="30" y="60" width="170" height="70" fill="#232430"/><rect x="215" y="60" width="170" height="70" fill="#232430"/><rect x="400" y="60" width="170" height="70" fill="#232430"/></g>
<rect x="44" y="76" width="50" height="6" fill="#A7ACBA"/><rect x="44" y="94" width="80" height="18" fill="#E9EAF0"/><rect x="229" y="76" width="50" height="6" fill="#A7ACBA"/><rect x="229" y="94" width="60" height="18" fill="#E9EAF0"/><rect x="414" y="76" width="50" height="6" fill="#A7ACBA"/><rect x="414" y="94" width="70" height="18" fill="#64E7F2"/>
<g fill="#8257FF"><rect x="40" y="290" width="26" height="40"/><rect x="76" y="270" width="26" height="60"/><rect x="112" y="280" width="26" height="50"/><rect x="148" y="240" width="26" height="90" fill="#64E7F2"/><rect x="184" y="262" width="26" height="68"/><rect x="220" y="250" width="26" height="80"/></g>
<path d="M300 320 340 280 380 296 430 240 480 262 560 200" fill="none" stroke="#64E7F2" stroke-width="2"/><g ${f}><path d="M30 336h540M30 296h200M30 256h200M30 216h200" opacity=".5"/></g>`
  }[kind];
  return `<svg class="concept-art" viewBox="0 0 600 380" role="img" aria-label="Abstract illustration for a concept project; not a real client interface" focusable="false">${art}</svg>`;
}

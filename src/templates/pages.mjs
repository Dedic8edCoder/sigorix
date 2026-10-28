import { site } from '../site.config.mjs';
import { services } from '../content/services.mjs';
import { process as steps } from '../content/process.mjs';
import { work } from '../content/work.mjs';
import { insights } from '../content/insights.mjs';
import { about } from '../content/pages.mjs';
import { esc, u, page, pageHero, ctaBand, btn, arrow, brandImg, conceptVisual, prismMark } from './lib.mjs';

const fmtDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const heroStage = () => `<div class="stage" aria-hidden="false">
  <svg class="rays" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
    <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8257FF" stop-opacity="0"/><stop offset=".5" stop-color="#8257FF"/><stop offset="1" stop-color="#64E7F2"/></linearGradient></defs>
    <g fill="none" stroke="url(#rg)" stroke-width="1.2">
      <path class="ray r1" d="M300 250 600 120"/><path class="ray r2" d="M300 250 600 250"/><path class="ray r3" d="M300 250 600 380"/>
      <path class="ray r4" d="M300 250 0 120" transform="translate(600 0) scale(-1 1)"/><path class="ray r5" d="M300 250 0 380" transform="translate(600 0) scale(-1 1)"/>
    </g>
    <g fill="none" stroke="#A7ACBA" stroke-opacity=".25"><circle cx="300" cy="300" r="270"/><circle cx="300" cy="300" r="200"/></g>
  </svg>
  <div class="stage-fox" data-parallax>${brandImg('fox', { alt: 'The SIGØRIX Prism Fox: a geometric fox head built from violet, cyan, white and black facets.', cls: 'fox-img', eager: true, width: 640, sizes: '(min-width: 900px) 520px, 80vw' })}</div>
  <p class="stage-cap label"><span>The Prism Fox</span><span>One beam, many facets</span></p>
</div>`;

export function home() {
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="label">Digital innovation studio</p>
      <h1 class="display-xl">Beyond the <span class="grad">Expected.</span></h1>
      <p class="lead">SIGØRIX designs and engineers websites, bespoke software and AI-powered solutions for organisations that want their digital work to be considered, not assembled.</p>
      <div class="actions">${btn('Start a project', u('contact/'))}${btn('Explore services', u('services/'), 'ghost')}</div>
    </div>
    ${heroStage()}
  </div>
  <div class="wrap"><ul class="cap-strip" aria-label="Capabilities">${services.map((s) => `<li><span class="num">${s.num}</span>${esc(s.title.replace(' and Development', '').replace(' and Digital Transformation', '').replace(' and Custom Applications', '').replace(' and Intelligent Automation', '').replace(' and Technical Consulting', ''))}</li>`).join('')}</ul></div>
</section>

<section class="section" aria-labelledby="cap-h">
  <div class="wrap">
    <div class="sec-head reveal"><p class="label">Capabilities</p><h2 id="cap-h" class="display-m">Design and engineering, held to the same standard.</h2></div>
    <ol class="rows">
      ${services.map((s) => `<li class="row reveal"><a href="${u('services/' + s.slug + '/')}"><span class="num">${s.num}</span><span class="row-main"><span class="row-title">${esc(s.title)}</span><span class="row-sub">${esc(s.short)}</span></span><span class="row-go">${arrow}<span class="sr">Read about ${esc(s.title)}</span></span></a></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section light" aria-labelledby="ap-h">
  <div class="wrap two">
    <div class="reveal"><p class="label">Approach</p><h2 id="ap-h" class="display-m">Innovation is a method, not a mood.</h2></div>
    <div class="principles reveal">
      <div><h3>Start from the problem</h3><p>Before proposing anything we establish what has to change and how we would know. Novelty for its own sake is not a goal.</p></div>
      <div><h3>Prototype early, decide with evidence</h3><p>Ideas are made tangible quickly so decisions are made on something real, whether that is a layout, an interaction or an AI workflow.</p></div>
      <div><h3>Engineer for the long term</h3><p>Maintainable code, documented decisions and sensible technology choices, so what we build keeps working after launch.</p></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="wk-h">
  <div class="wrap">
    <div class="sec-head reveal"><p class="label">Selected work</p><h2 id="wk-h" class="display-m">Concept explorations.</h2><p class="lead">We are building our client portfolio. Until then these clearly labelled concepts show how we think and what we can make. They are not client projects.</p></div>
    <div class="concepts">
      ${work.map((w) => `<article class="concept reveal"><a href="${u('work/' + w.slug + '/')}" class="concept-link"><div class="concept-visual">${conceptVisual(w.visual)}<span class="badge">Concept</span></div><p class="label">${esc(w.kind)}</p><h3>${esc(w.title)}</h3><p class="muted">${esc(w.summary)}</p><span class="more">View concept ${arrow}</span></a></article>`).join('')}
    </div>
    <p class="after-link reveal">${btn('See all work', u('work/'), 'ghost')}</p>
  </div>
</section>

<section class="section process-prev" aria-labelledby="pr-h">
  <div class="wrap">
    <div class="sec-head reveal"><p class="label">Process</p><h2 id="pr-h" class="display-m">Seven stages, no surprises.</h2></div>
    <ol class="track reveal">${steps.map((s) => `<li><span class="num">${s.n}</span><span class="t">${esc(s.title)}</span></li>`).join('')}</ol>
    <p class="after-link reveal">${btn('How we work', u('process/'), 'ghost')}</p>
  </div>
</section>
${ctaBand()}`;
  return page({
    title: site.name,
    description: site.description,
    path: '',
    current: '',
    body,
    jsonLd: { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, description: site.description, slogan: site.tagline }
  });
}

export function servicesIndex() {
  const body = `${pageHero({ eyebrow: 'Services', title: 'Six disciplines, one studio.', lead: 'From a considered website to custom software and applied AI, each service is delivered with the same attention to design, engineering and honesty.' })}
<section class="section tight"><div class="wrap"><ol class="rows">
${services.map((s) => `<li class="row reveal"><a href="${u('services/' + s.slug + '/')}"><span class="num">${s.num}</span><span class="row-main"><span class="row-title">${esc(s.title)}</span><span class="row-sub">${esc(s.short)}</span></span><span class="row-go">${arrow}<span class="sr">Read about ${esc(s.title)}</span></span></a></li>`).join('')}
</ol></div></section>${ctaBand('Not sure which service fits?', 'Describe the problem rather than the solution. We will help work out what is needed.')}`;
  return page({ title: 'Services', description: 'Website design and development, redesign, bespoke digital experiences, custom software, AI solutions and technical consulting from SIGØRIX.', path: 'services/', current: 'services/', body });
}

export function serviceDetail(s) {
  const i = services.indexOf(s);
  const nextS = services[(i + 1) % services.length];
  const body = `${pageHero({ eyebrow: `Service ${s.num}`, title: s.title, lead: s.lead, crumbs: [['Home', u()], ['Services', u('services/')], [s.title, '']] })}
<section class="section tight"><div class="wrap detail">
  <div class="reveal"><h2 class="label">Problems this addresses</h2><ul class="tick">${s.problems.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
  <div class="reveal"><h2 class="label">What you can expect to receive</h2><ul class="tick">${s.deliverables.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
  <div class="reveal wide"><h2 class="label">How we work</h2><p class="lead">${esc(s.approach)}</p></div>
  <div class="reveal wide next"><h2 class="label">Next step</h2><p class="lead">${esc(s.next)}</p>${btn('Start a project', u('contact/?service=' + encodeURIComponent(s.title)))}</div>
</div></section>
<section class="section tight"><div class="wrap"><p class="label">Next service</p><a class="next-svc" href="${u('services/' + nextS.slug + '/')}"><span class="num">${nextS.num}</span><span>${esc(nextS.title)}</span>${arrow}</a></div></section>`;
  return page({ title: s.title, description: s.short, path: `services/${s.slug}/`, current: 'services/', body });
}

export function workIndex() {
  const body = `${pageHero({ eyebrow: 'Work', title: 'Concepts, clearly labelled.', lead: 'SIGØRIX is early in its client portfolio. Rather than invent projects, we have developed three concept explorations that show our thinking. Real case studies will be added here as they are completed and approved for publication.' })}
<section class="section tight"><div class="wrap"><div class="notice"><strong>Transparency note.</strong> Every project below is a fictional scenario created by SIGØRIX. No client, result or metric is implied.</div>
<div class="concepts">${work.map((w) => `<article class="concept reveal"><a href="${u('work/' + w.slug + '/')}" class="concept-link"><div class="concept-visual">${conceptVisual(w.visual)}<span class="badge">Concept</span></div><p class="label">${esc(w.kind)}</p><h2 class="h3">${esc(w.title)}</h2><p class="muted">${esc(w.summary)}</p><span class="more">View concept ${arrow}</span></a></article>`).join('')}</div></div></section>${ctaBand('Want to be our first case study?', 'We are happy to talk about projects where good design and sound engineering would make a difference.')}`;
  return page({ title: 'Work', description: 'Concept explorations from SIGØRIX: a website redesign, an intelligent support experience and an operational dashboard. Clearly labelled concepts, not client work.', path: 'work/', current: 'work/', body });
}

export function workDetail(w) {
  const i = work.indexOf(w);
  const other = work[(i + 1) % work.length];
  const body = `${pageHero({ eyebrow: w.concept ? 'Concept project' : 'Case study', title: w.title, lead: w.summary, crumbs: [['Home', u()], ['Work', u('work/')], [w.title, '']] })}
<section class="section tight"><div class="wrap">
${w.concept ? `<div class="notice"><strong>This is a concept.</strong> It is a fictional scenario created by SIGØRIX to illustrate our approach. It is not a client project and contains no real data or results.</div>` : ''}
<div class="case-visual reveal">${conceptVisual(w.visual)}</div>
<div class="detail">
  <div class="reveal"><h2 class="label">Scenario</h2><p class="lead">${esc(w.scenario)}</p></div>
  <div class="reveal"><h2 class="label">Challenge</h2><p class="lead">${esc(w.challenge)}</p></div>
  <div class="reveal wide"><h2 class="label">Approach</h2><ol class="steps-list">${w.approach.map((a) => `<li>${esc(a)}</li>`).join('')}</ol></div>
  <div class="reveal"><h2 class="label">What it demonstrates</h2><ul class="tick">${w.demonstrates.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
  <div class="reveal"><h2 class="label">Related services</h2><ul class="tick">${w.services.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
</div>
<p class="label">Next concept</p><a class="next-svc" href="${u('work/' + other.slug + '/')}"><span>${esc(other.title)}</span>${arrow}</a>
</div></section>${ctaBand()}`;
  return page({ title: w.title + (w.concept ? ' (concept)' : ''), description: w.summary, path: `work/${w.slug}/`, current: 'work/', body });
}

export function aboutPage() {
  const body = `${pageHero({ eyebrow: 'About', title: 'A studio built on a point of view.', lead: about.intro })}
<section class="section tight"><div class="wrap"><div class="principles four">${about.philosophy.map(([t, d]) => `<div class="reveal"><h2 class="h3">${esc(t)}</h2><p class="muted">${esc(d)}</p></div>`).join('')}</div></div></section>
<section class="section light" aria-labelledby="nm-h"><div class="wrap">
  <div class="sec-head reveal"><p class="label">The name</p><h2 id="nm-h" class="display-m">${esc(site.name)}</h2><p class="lead">${esc(site.expansion)}.</p></div>
  <ol class="letters">${about.letters.map(([l, w, d]) => `<li class="reveal"><span class="ltr" aria-hidden="true">${l}</span><h3>${esc(w)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
</div></section>
<section class="section"><div class="wrap two fox-about"><div class="reveal fox-fig">${brandImg('fox', { alt: 'The Prism Fox, the SIGØRIX mark.', width: 640, sizes: '(min-width: 900px) 420px, 70vw' })}</div><div class="reveal"><p class="label">The Prism Fox</p><h2 class="display-s">A mark made of facets.</h2><p class="lead">${esc(about.fox)}</p><p class="muted">SIGØRIX is a founder-led studio. We bring in specialist collaborators when a project calls for them, and we are always clear with clients about who is doing what.</p>${btn('Talk to us', u('contact/'))}</div></div></section>`;
  return page({ title: 'About', description: 'The philosophy and meaning behind SIGØRIX: Signature, Innovation, Growth, Originality, Research, Intelligence and Experience.', path: 'about/', current: 'about/', body });
}

export function processPage() {
  const body = `${pageHero({ eyebrow: 'Process', title: 'How an engagement works.', lead: 'A clear sequence with clear outputs. Stages can be adapted to the size of the project, but you will always know where we are and what comes next.' })}
<section class="section tight"><div class="wrap"><ol class="timeline">
${steps.map((s) => `<li class="tl reveal"><span class="tl-n">${s.n}</span><div class="tl-body"><h2 class="h3">${esc(s.title)}</h2><p class="lead">${esc(s.summary)}</p><p class="muted">${esc(s.expect)}</p><h3 class="label">Typical outputs</h3><ul class="chips">${s.outputs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div></li>`).join('')}
</ol></div></section>${ctaBand('Ready to begin with discovery?', 'The first step is a conversation about the problem. Send us a few details and we will take it from there.')}`;
  return page({ title: 'Process', description: 'The SIGØRIX process in seven stages: discovery, research, architecture, design, engineering, testing and delivery.', path: 'process/', current: 'process/', body });
}

export function contactPage() {
  const opts = services.map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`).join('');
  const configured = Boolean(site.formEndpoint);
  const body = `${pageHero({ eyebrow: 'Start a project', title: 'Tell us what you are building.', lead: 'The more context you give, the more useful our reply. Rough ideas are welcome.' })}
<section class="section tight"><div class="wrap contact-grid">
  <aside class="reveal">
    <h2 class="label">What to include</h2>
    <ul class="tick"><li>What you want to achieve and for whom</li><li>Any existing site, system or material</li><li>Rough timing and budget, if known</li><li>Anything you are unsure about</li></ul>
    <p class="muted small">Your details are used only to respond to your enquiry. See the <a href="${u('privacy/')}">privacy page</a>.</p>
  </aside>
  <div class="reveal">
    <form class="form" id="enquiry" novalidate onsubmit="return false" data-endpoint="${esc(site.formEndpoint)}" data-configured="${configured}">
      <div class="status" id="form-status" role="status" aria-live="polite" tabindex="-1"></div>
      <div class="field"><label for="name">Name <span class="req">(required)</span></label><input id="name" name="name" type="text" autocomplete="name" required aria-describedby="name-err"><p class="err" id="name-err" hidden></p></div>
      <div class="field"><label for="email">Email <span class="req">(required)</span></label><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err"><p class="err" id="email-err" hidden></p></div>
      <div class="field"><label for="company">Company or organisation <span class="opt">(optional)</span></label><input id="company" name="company" type="text" autocomplete="organization"></div>
      <div class="field"><label for="service">Service of interest <span class="req">(required)</span></label><select id="service" name="service" required aria-describedby="service-err"><option value="">Select a service</option>${opts}<option value="Not sure yet">Not sure yet</option></select><p class="err" id="service-err" hidden></p></div>
      <div class="two-f">
        <div class="field"><label for="budget">Approximate budget <span class="opt">(optional)</span></label><select id="budget" name="budget"><option value="">Prefer not to say</option><option>Under 5,000</option><option>5,000 – 15,000</option><option>15,000 – 50,000</option><option>50,000+</option><option>Not sure</option></select></div>
        <div class="field"><label for="timeframe">Desired timeframe <span class="opt">(optional)</span></label><select id="timeframe" name="timeframe"><option value="">Prefer not to say</option><option>As soon as possible</option><option>Within 3 months</option><option>3 – 6 months</option><option>Flexible</option></select></div>
      </div>
      <p class="hint small muted">Budget figures are shown without a currency; state yours in the details below.</p>
      <div class="field"><label for="details">Project details <span class="req">(required)</span></label><textarea id="details" name="details" rows="7" required minlength="20" aria-describedby="details-err"></textarea><p class="err" id="details-err" hidden></p></div>
      <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <button class="btn btn-primary" type="submit" id="submit"><span data-label>Send enquiry</span>${arrow}</button>
      <noscript><p class="notice">This form needs JavaScript to send. Your message has not been sent.</p></noscript>
    </form>
  </div>
</div></section>`;
  return page({ title: 'Start a project', description: 'Start a project with SIGØRIX. Tell us what you are building and we will respond with an honest view of how we could help.', path: 'contact/', current: 'contact/', body });
}

export function insightsIndex() {
  const list = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  const body = `${pageHero({ eyebrow: 'Insights', title: 'Notes on design, engineering and applied AI.', lead: 'Practical writing on the decisions behind good digital work.' })}
<section class="section tight"><div class="wrap"><ol class="articles">
${list.map((a) => `<li class="reveal"><a href="${u('insights/' + a.slug + '/')}"><div class="meta"><time datetime="${a.date}">${fmtDate(a.date)}</time><span>${a.readMinutes} min read</span></div><h2 class="h3">${esc(a.title)}</h2><p class="muted">${esc(a.description)}</p><ul class="chips">${a.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></a></li>`).join('')}
</ol></div></section>`;
  return page({ title: 'Insights', description: 'Practical writing from SIGØRIX on website redesign, applied AI and digital experience quality.', path: 'insights/', current: 'insights/', body });
}

export function article(a) {
  const related = insights.filter((x) => x !== a).slice(0, 2);
  const blocks = a.body
    .map(([t, v]) => (t === 'h2' ? `<h2>${esc(v)}</h2>` : t === 'p' ? `<p>${esc(v)}</p>` : `<ul>${v.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`))
    .join('\n');
  const body = `<article class="article"><div class="wrap narrow">
<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="${u()}">Home</a></li><li><a href="${u('insights/')}">Insights</a></li><li aria-current="page">${esc(a.title)}</li></ol></nav>
<header><p class="label">${a.tags.map(esc).join(' · ')}</p><h1 class="display-m">${esc(a.title)}</h1><p class="lead">${esc(a.description)}</p><p class="meta"><time datetime="${a.date}">${fmtDate(a.date)}</time><span>${a.readMinutes} min read</span><span>By ${site.name}</span></p></header>
<div class="prose">${blocks}</div>
</div>
<aside class="wrap narrow related" aria-labelledby="rel-h"><h2 id="rel-h" class="label">Keep reading</h2><ul>${related.map((r) => `<li><a href="${u('insights/' + r.slug + '/')}">${esc(r.title)}</a></li>`).join('')}</ul></aside></article>${ctaBand()}`;
  return page({
    title: a.title, description: a.description, path: `insights/${a.slug}/`, current: 'insights/', body, ogType: 'article',
    jsonLd: { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.description, datePublished: a.date, publisher: { '@type': 'Organization', name: site.name } }
  });
}

const legalWrap = (title, desc, path, inner) =>
  page({ title, description: desc, path, current: path, body: `${pageHero({ eyebrow: 'Legal', title, lead: '' })}<section class="section tight"><div class="wrap narrow"><div class="notice"><strong>Draft for owner review.</strong> This page describes the functionality of this website as built. It has not been reviewed by a lawyer and items marked “To confirm” need the site owner’s input before launch.</div><div class="prose">${inner}</div></div></section>` });

export function privacy() {
  const conf = site.formEndpoint;
  return legalWrap('Privacy', 'How the SIGØRIX website handles personal information.', 'privacy/', `
<p><em>Last updated: October 2026.</em></p>
<h2>Who we are</h2><p>This website is operated by ${site.name}. <strong>To confirm:</strong> the legal entity name, registered address and a privacy contact email.</p>
<h2>What this website collects</h2>
<p>The site does not use analytics, advertising trackers or cookies, and loads no third-party scripts or fonts.</p>
<p>The only personal information handled is what you type into the project enquiry form: your name, email address, service of interest, project details and, optionally, company, budget range and timeframe.</p>
<h2>How enquiries are handled</h2>
${conf ? '<p>When you submit the form, your enquiry is sent to a form-processing service configured by the site owner, which delivers it to us. <strong>To confirm:</strong> the name of the provider, where it stores data and how long enquiries are retained.</p>' : '<p>At the time of this build the form is <strong>not yet connected</strong> to a delivery service, so no enquiry can be received through it. When a provider is configured, this page must be updated to name it.</p>'}
<p>We use your details only to respond to your enquiry and to discuss a potential project.</p>
<h2>Your rights</h2><p><strong>To confirm:</strong> the rights available to you depend on where you live and on the legal basis the owner relies on. This section must be completed by the owner with advice appropriate to their jurisdiction.</p>
<h2>Changes</h2><p>If the website’s functionality changes, this page will be updated.</p>`);
}

export function terms() {
  return legalWrap('Terms', 'The terms governing use of the SIGØRIX website, including how concept projects and articles should be read.', 'terms/', `
<p><em>Last updated: October 2026.</em></p>
<h2>Using this website</h2><p>This website provides general information about ${site.name} and its services. Content is provided in good faith and may change without notice.</p>
<h2>No offer or advice</h2><p>Nothing on this site is a binding offer. Work is only agreed through a separate written agreement. Articles are general information, not professional advice for your circumstances.</p>
<h2>Concept projects</h2><p>Projects shown under “Work” are fictional concepts created by ${site.name} and are not client engagements.</p>
<h2>Intellectual property</h2><p>The SIGØRIX name, logos and the Prism Fox mark are the property of the site owner. <strong>To confirm:</strong> owner details, trademark status and any licence terms.</p>
<h2>Liability and governing law</h2><p><strong>To confirm:</strong> limitation of liability and governing law must be added by the owner following appropriate legal advice.</p>`);
}

export function notFound() {
  const body = `<section class="nf"><div class="wrap"><p class="label">Error 404</p><h1 class="display-l">This path leads somewhere unexpected.</h1><p class="lead">The page you were looking for does not exist or has moved. These routes will get you back on track.</p>
<div class="actions">${btn('Return home', u())}${btn('Explore services', u('services/'), 'ghost')}${btn('Contact us', u('contact/'), 'ghost')}</div>
<ul class="chips nf-links"><li><a href="${u('work/')}">Work</a></li><li><a href="${u('process/')}">Process</a></li><li><a href="${u('about/')}">About</a></li><li><a href="${u('insights/')}">Insights</a></li></ul></div></section>`;
  return page({ title: 'Page not found', description: 'The page you requested could not be found.', path: '404.html', current: '', body, noindex: true });
}

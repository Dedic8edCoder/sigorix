import { validateEnquiry, isSpam } from './validate.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile navigation
const btn = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
if (btn && nav) {
  const set = (open) => { btn.setAttribute('aria-expanded', String(open)); document.documentElement.classList.toggle('menu-open', open); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
}

// Header state
const header = document.querySelector('[data-header]');
if (header) {
  const on = () => header.classList.toggle('scrolled', scrollY > 8);
  on(); addEventListener('scroll', on, { passive: true });
}

// Scroll reveals (content is fully visible without JS or with reduced motion)
const items = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) items.forEach((el) => el.classList.add('in'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
}

// Subtle pointer parallax on the hero fox
const fox = document.querySelector('[data-parallax]');
if (fox && !reduce && matchMedia('(hover: hover)').matches) {
  const stage = fox.parentElement;
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    fox.style.transform = `translate3d(${x * 12}px, ${y * 10}px, 0)`;
  });
  stage.addEventListener('pointerleave', () => { fox.style.transform = ''; });
}

// Enquiry form
const form = document.getElementById('enquiry');
if (form) {
  const status = document.getElementById('form-status');
  const submit = document.getElementById('submit');
  const label = submit.querySelector('[data-label]');
  const fields = ['name', 'email', 'service', 'details'];
  const qs = new URLSearchParams(location.search).get('service');
  if (qs) { const sel = form.elements.service; if ([...sel.options].some((o) => o.value === qs)) sel.value = qs; }

  const showStatus = (kind, msg, focus = true) => { status.className = `status ${kind}`; status.textContent = msg; if (focus) status.focus(); };
  const clearErrors = () => fields.forEach((f) => { const el = form.elements[f]; const p = document.getElementById(`${f}-err`); el.removeAttribute('aria-invalid'); p.hidden = true; p.textContent = ''; });
  const showErrors = (errs) => {
    let first = null;
    for (const f of fields) {
      const p = document.getElementById(`${f}-err`); const el = form.elements[f];
      if (errs[f]) { p.textContent = errs[f]; p.hidden = false; el.setAttribute('aria-invalid', 'true'); first = first || el; }
    }
    return first;
  };
  const values = () => Object.fromEntries(new FormData(form).entries());

  // Show an error on blur (non-empty values only); clear it while typing, never on blur, so the layout cannot shift under a click.
  fields.forEach((f) => {
    const el = form.elements[f]; const p = document.getElementById(`${f}-err`);
    el.addEventListener('blur', () => { if (el.value.trim() === '') return; const e = validateEnquiry(values()); if (e[f]) { p.textContent = e[f]; p.hidden = false; el.setAttribute('aria-invalid', 'true'); } });
    const recheck = () => { if (p.hidden) return; if (!validateEnquiry(values())[f]) { p.hidden = true; el.removeAttribute('aria-invalid'); } };
    el.addEventListener('input', recheck); el.addEventListener('change', recheck);
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    status.className = 'status'; status.textContent = '';
    clearErrors();
    const v = values();
    const errs = validateEnquiry(v);
    if (Object.keys(errs).length) {
      const first = showErrors(errs);
      showStatus('error', `Please fix ${Object.keys(errs).length === 1 ? 'the highlighted field' : 'the highlighted fields'} and try again.`, false);
      first && first.focus();
      return;
    }
    if (isSpam(v)) { showStatus('error', 'We could not send this enquiry.'); return; }
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      showStatus('error', 'This form is not connected to a delivery service yet, so your message has NOT been sent. Please try again later.');
      return;
    }
    submit.disabled = true; submit.setAttribute('aria-busy', 'true'); label.textContent = 'Sending…';
    try {
      const { website, ...payload } = v;
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal: ctl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      showStatus('success', 'Thank you. Your enquiry has been sent.');
    } catch (err) {
      showStatus('error', 'Sorry, your message could not be sent. It has NOT been delivered. Please check your connection and try again.');
    } finally {
      submit.disabled = false; submit.removeAttribute('aria-busy'); label.textContent = 'Send enquiry';
    }
  });
}

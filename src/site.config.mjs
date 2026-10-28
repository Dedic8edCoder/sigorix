// Central, environment-driven configuration. Nothing here is secret: values are embedded in public HTML.
const clean = (v) => (v || '').trim();
const base = clean(process.env.BASE_PATH) || '/';

export const site = {
  name: 'SIGØRIX',
  legalNameNote: 'SIGØRIX', // TODO(owner): confirm registered/trading name for legal pages
  tagline: 'Beyond the Expected.',
  expansion: 'Signature Innovation, Growth, Originality, Research, Intelligence and Experience',
  description:
    'SIGØRIX is a digital innovation studio designing and engineering websites, bespoke software and AI-powered solutions.',
  url: clean(process.env.SITE_URL).replace(/\/$/, ''),
  basePath: base.endsWith('/') ? base : base + '/',
  formEndpoint: clean(process.env.FORM_ENDPOINT),
  lang: 'en',
  locale: 'en_GB'
};

export const nav = [
  { label: 'Services', href: 'services/' },
  { label: 'Work', href: 'work/' },
  { label: 'Process', href: 'process/' },
  { label: 'About', href: 'about/' },
  { label: 'Insights', href: 'insights/' }
];

export const colors = {
  obsidian: '#101116',
  violet: '#8257FF',
  cyan: '#64E7F2',
  white: '#E9EAF0',
  silver: '#A7ACBA'
};

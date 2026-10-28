// Pure validation, shared by the browser and the test suite.
export const LIMITS = { name: 120, email: 254, company: 160, details: 5000, detailsMin: 20 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** @returns {Record<string,string>} map of field -> error message (empty when valid) */
export function validateEnquiry(v) {
  const e = {};
  const name = (v.name || '').trim();
  const email = (v.email || '').trim();
  const details = (v.details || '').trim();
  if (!name) e.name = 'Please enter your name.';
  else if (name.length > LIMITS.name) e.name = `Name must be ${LIMITS.name} characters or fewer.`;
  if (!email) e.email = 'Please enter your email address.';
  else if (!EMAIL.test(email) || email.length > LIMITS.email) e.email = 'Please enter a valid email address, for example name@example.com.';
  if (!(v.service || '').trim()) e.service = 'Please choose a service, or “Not sure yet”.';
  if (!details) e.details = 'Please tell us a little about the project.';
  else if (details.length < LIMITS.detailsMin) e.details = `Please add a little more detail (at least ${LIMITS.detailsMin} characters).`;
  else if (details.length > LIMITS.details) e.details = `Details must be ${LIMITS.details} characters or fewer.`;
  if ((v.company || '').length > LIMITS.company) e.company = `Company must be ${LIMITS.company} characters or fewer.`;
  return e;
}

/** Honeypot: bots fill the hidden field. */
export const isSpam = (v) => Boolean((v.website || '').trim());

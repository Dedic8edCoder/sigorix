import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, isSpam, LIMITS } from '../src/assets/js/validate.js';

const ok = { name: 'Ada', email: 'ada@example.com', service: 'Not sure yet', details: 'We need a new website for our practice.' };

test('accepts a valid enquiry', () => assert.deepEqual(validateEnquiry(ok), {}));
test('requires name, email, service and details', () => {
  assert.deepEqual(Object.keys(validateEnquiry({})).sort(), ['details', 'email', 'name', 'service']);
});
test('rejects malformed emails', () => {
  for (const email of ['x', 'x@', '@x.com', 'a b@c.com', 'a@b', 'a@@b.com'])
    assert.ok(validateEnquiry({ ...ok, email }).email, email);
});
test('trims whitespace-only values', () => assert.ok(validateEnquiry({ ...ok, name: '   ' }).name));
test('enforces details length bounds', () => {
  assert.ok(validateEnquiry({ ...ok, details: 'short' }).details);
  assert.ok(validateEnquiry({ ...ok, details: 'x'.repeat(LIMITS.details + 1) }).details);
});
test('optional fields never block submission', () => assert.deepEqual(validateEnquiry({ ...ok, company: '', budget: '', timeframe: '' }), {}));
test('honeypot detection', () => { assert.equal(isSpam({ website: 'http://spam' }), true); assert.equal(isSpam({ website: '' }), false); assert.equal(isSpam({}), false); });

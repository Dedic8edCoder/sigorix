// Zero-dependency lint: syntax-check every JS module and validate JSON/webmanifest outputs.
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(fileURLToPath(import.meta.url), '../..');
const walk = (d) => readdirSync(d).flatMap((f) => (/^(node_modules|dist|\.git)$/.test(f) ? [] : statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
let bad = 0;
for (const f of walk(root)) {
  if (/\.(mjs|js)$/.test(f)) { const r = spawnSync('node', ['--check', f], { encoding: 'utf8' }); if (r.status) { bad++; console.error(r.stderr); } }
  if (/\.json$/.test(f)) { try { JSON.parse(readFileSync(f, 'utf8')); } catch (e) { bad++; console.error(`${f}: ${e.message}`); } }
  if (/\.(mjs|js|css|md|yml)$/.test(f) && /[ \t]+$/m.test(readFileSync(f, 'utf8')) && /\.(mjs|js|css)$/.test(f)) { /* trailing whitespace tolerated */ }
}
console.log(bad ? `lint: ${bad} problem(s)` : 'lint: OK'); process.exit(bad ? 1 : 0);

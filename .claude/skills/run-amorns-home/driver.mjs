// Drives Amorn's Home headlessly: serves site/index.html on localhost, opens it in Chrome via
// playwright-core (from tests/node_modules), runs a command sequence, prints page errors.
// Usage: node driver.mjs [--phone] [--out=DIR] <cmd> <arg> [<cmd> <arg> ...]
//   cmds: wait <ms> | shot <name> | click <css> | eval <js> | room <key|all>
// Env: CHROME=path to chrome/edge exe (auto-detected if unset)
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..', '..');
const req = createRequire(path.join(root, 'tests', 'package.json'));
const { chromium } = req('playwright-core');
const threeJs = fs.readFileSync(req.resolve('three/build/three.min.js'), 'utf8');

const flags = {}; const cmds = [];
for (const a of process.argv.slice(2)) {
  if (a.startsWith('--')) { const [k, v] = a.slice(2).split('='); flags[k] = v ?? true; } else cmds.push(a);
}
const outDir = path.resolve(flags.out || path.join(os.tmpdir(), 'amorns-home-shots'));  // not tests/shots: those are tracked
fs.mkdirSync(outDir, { recursive: true });

const candidates = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/google-chrome',
].filter(Boolean);
const exe = candidates.find(p => fs.existsSync(p));
if (!exe) { console.error('No Chrome/Edge found; set CHROME=...'); process.exit(2); }

const html = fs.readFileSync(path.join(root, 'site', 'index.html'));
const server = http.createServer((q, r) => {
  if (q.url.split('?')[0] === '/') { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); r.end(html); }
  else { r.writeHead(204); r.end(); }   // favicon etc.: no 404 noise
}).listen(0, '127.0.0.1');
await new Promise(res => server.once('listening', res));
const url = `http://127.0.0.1:${server.address().port}/` + (flags.theme ? `?theme=${flags.theme}` : '');

const browser = await chromium.launch({ executablePath: exe, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const [w, h] = flags.phone ? [400, 820] : [1440, 860];
const page = await (await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
const errs = [];
page.on('pageerror', e => errs.push('PE ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CE ' + m.text()); });
// Serve three.js locally so the run works offline and is not CDN-dependent.
await page.route('**/three.min.js', r => r.fulfill({ body: threeJs, contentType: 'application/javascript' }));

await page.goto(url);
await page.waitForTimeout(7000);   // scene build + intro fly-in
console.log('url', url, '| title', await page.title(), '| theme', await page.evaluate(() => window.__lh && __lh.theme));

for (let i = 0; i < cmds.length; i += 2) {
  const [c, a] = [cmds[i], cmds[i + 1]];
  if (c === 'wait') await page.waitForTimeout(+a);
  else if (c === 'shot') { const f = path.join(outDir, a + '.png'); await page.screenshot({ path: f }); console.log('shot', f); }
  else if (c === 'click') await page.click(a);
  else if (c === 'room') { await page.click(`[data-f=${a}]`); await page.waitForTimeout(6000); }
  else if (c === 'eval') { const r = await page.evaluate(a); if (r !== undefined) console.log('R', JSON.stringify(r)); }
  else { console.error('unknown cmd', c); }
}
console.log('errors', errs);
await browser.close(); server.close();
process.exit(errs.length ? 1 : 0);

---
name: run-amorns-home
description: Run, start, build, test and screenshot Amorn's Home / Amorn Station (the three.js isometric portfolio page). Use when asked to "test run localhost", launch the site, take screenshots of a room, or check for JS errors after editing parts/.
---

# Run Amorn's Home

Static single-page three.js app (no dev server, no bundler). Source is `parts/*`; `build.sh` concatenates it into `index.html`, `site/index.html` and `artifacts/*`. `driver.mjs` serves `site/index.html` on a random localhost port, opens it in headless Chrome/Edge via playwright-core, runs commands, saves screenshots and prints page errors (exit code 1 if any).

Paths are relative to the repo root (the folder holding `CLAUDE.md`). Verified on Windows 11 + Git Bash, Node 24, Chrome installed. Not tried on Linux/macOS.

## Prerequisites
- Node 18+ and a Chrome or Edge exe (auto-detected; otherwise `CHROME=/path/to/chrome`).
- `tests/node_modules` must exist (provides `playwright-core` and `three@0.128`): `cd tests && npm install`.

## Build (only after editing `parts/`)
```bash
sh build.sh        # prints "built"; never edit index.html / site/index.html by hand
```

## Run (agent path)
```bash
D=.claude/skills/run-amorns-home/driver.mjs
node $D --out="$TEMP/lhshots" shot overview room gym shot gym room all
node $D --phone --out="$TEMP/lhshots" shot phone_overview
```
Commands run in order, each takes one argument: `wait <ms>` · `shot <name>` · `click <css>` · `eval <js>` · `room <key>` (clicks the room chip, waits 6 s for the camera). Flags: `--phone` (400x820, default 1440x860), `--out=DIR` (default: OS temp `amorns-home-shots`).

Room keys: `all work apps growth income life garden gym bath pool`. `work` is the Hangar (ฮังการ์ยาน), `apps` is the computer room, `income` is the galley, etc. Chip labels are Thai.

Expected output ends with `errors []`. Then **open the PNGs** - a black or empty frame means WebGL failed.

`eval` can poke the `window.__lh` hook, e.g. `eval "__lh.setTime(22)"` for night, `eval "__lh.setRoof(true)"`.

## Run (human path)
Serve `site/` with any static server (`python -I -m http.server 8080 --bind 127.0.0.1` from `site/`) and open http://127.0.0.1:8080/. Space Station is the only theme.

## Test
`tests/run.js` is the older runner: it hard-codes the Linux Chromium path (`/opt/pw-browsers/chromium`), so on Windows set `CHROME`:
```bash
cd tests && CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe" node run.js desk steps_kitchen_office.json
```
Ran OK (`desk []`, plus a harmless "Context Lost/Restored" log). It writes `k_kit.png`/`k_off.png` into the tracked `tests/shots/`; delete them afterwards if you don't want them.

## Gotchas
- `site/index.html` has doctype/head; root `index.html` is artifact-format (no doctype/head/body). Serve `site/index.html`.
- Three.js loads from cdnjs and fonts from Google; the driver intercepts three.js and serves `tests/node_modules/three`, so three.js does not depend on the CDN (fonts still come from Google).
- First 7 s after load are the scene build/intro; the driver waits that long before the first command.
- A plain `python http.server` returns a 404 for `/favicon.ico`, which shows up as a console error. The driver's server answers 204 to avoid that noise.
- Screenshots use SwiftShader software GL: slow but correct. `reducedMotion` is on, so animation is minimal.
- `tests/shots/*.png` are tracked in git; don't point `--out` there unless you mean to update them.

## Troubleshooting
- Driver exits 2 with `No Chrome/Edge found` (check is in the driver, not triggered in testing) - set `CHROME`.

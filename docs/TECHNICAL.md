# TECHNICAL.md — Amorn's Home (technical guide)

Overview and project structure live in `../CLAUDE.md`. This file holds the engineering details.

A single-page isometric 2.5D "dollhouse" built with Three.js. The house is a personal project dashboard and portfolio. It is a standalone static page with no build step beyond concatenation. The UI language is **Thai**. Code and comments are English.

The owner is a production supervisor who builds apps with AI assistance. Keep changes simple, readable and easy to re-edit. Do not introduce frameworks or bundlers.

## Concept

- A modular space station (Space Station theme) shown as an isometric diorama. Layout and logic are theme-independent so more themes can be added.
- Sky, sunlight, window glow and the in-house clock follow the **viewer's real local time**. A time slider overrides it temporarily.
- Nine areas on a floor plan. Each project-type room holds that area's projects as 3D props:

| Key | Thai name | Role | Type |
|---|---|---|---|
| `work` | โรงรถ | Garage, factory work | project room |
| `apps` | ห้องทำงาน | Office, apps and tools, plus the game corner | project room |
| `growth` | ห้องนอน | Bedroom, self development | project room |
| `income` | ครัว | Kitchen, side income | project room |
| `life` | ห้องรับแขก | Living room, hobbies, **the TV dashboard** | project room |
| `garden` | สวนหน้าบ้าน | Front garden | project room, outdoor |
| `gym` | ห้องออกกำลังกาย | Gym | weekly routine |
| `bath` | ห้องน้ำ · สมาธิ | Bathroom, meditation | weekly routine |
| `pool` | สระว่ายน้ำ | Pool | weekly routine, outdoor |

- Characters: **Amorn** (male, rounded stylized figure) and a **Border Collie** dog. They walk between rooms, sit at desks, work out, meditate, swim and sleep (Amorn sleeps 23:00–06:00; the dog follows him and sleeps on its bed).
- **Dashboard = the TV in the living room.** Clicking it, or the "เปิดทีวี" header button, opens a full-screen TV overlay with tabs: quests, projects, week, trophies, summary. There is no side panel.
- A trophy shelf in 3D shows badges derived from the data.
- A roof button (open/close) lifts and fades the roof so the interior is visible. Front-facing exterior walls drop in height while the roof is open.

## File layout and build

```
lifehouse2/
  CLAUDE.md             # project overview (Thai)
  build.sh              # rebuilds index.html, site/index.html, artifacts/
  docs/TECHNICAL.md     # this file
  tests/                # Playwright runner, step files, screenshots (npm install first)
  artifacts/            # copy of the published artifact file
  index.html            # generated: concatenation of parts/* (artifact format, no doctype/head/body)
  site/index.html       # generated: index.html wrapped with doctype/html/meta for standalone hosting
  parts/
    a_head.html         # <title>, fonts, all CSS, HTML skeleton (header, chips, TV overlay, card, toast)
    b1_core.js          # helpers, ROOMS, default data, load/save, badges, renderer, lights, mergeStatic,
                        # time keyframes + applyTime, lot, shell (walls/windows/doors), partitions, roof, glow decals
    b2_props.js         # palette, PROPS (prop builders), ROOMPROPS (which prop per project slot), room decor
                        # (living, kitchen, office, garage, bedroom, bath, gym, pool, garden), trophy shelf
    b3_world.js         # addItem/rebuild, Amorn + dog models, node graph, pathfinding, poses, schedule
    b4_ui.js            # state, chips, item card, TV rendering and handlers, setRoof, camera, picking,
                        # label projection, frame() loop, boot, window.__lh test hook
```

**Always edit `parts/*`, never `index.html` directly.** Rebuild with `./build.sh` (equivalent to):

```bash
cd /home/claude/lifehouse2
cat parts/a_head.html parts/b1_core.js parts/b2_props.js parts/b2s_space.js parts/b3_world.js parts/b4_ui.js > index.html
mkdir -p site && { printf '<!doctype html>\n<html lang="th">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'; cat index.html; printf '\n</html>\n'; } > site/index.html
```

The parts are concatenated into one `<script>` IIFE scope (`b1` opens `(function(){'use strict'; ...`, `b4` closes it). So a name defined in one part is visible in the later ones. **Function names are global to that scope: avoid collisions** (a past bug: a picture-frame helper named `frame()` clashed with the render loop, so the helper is `pframe`).

## Themes and wardrobe (15 October 2026)

All four maps are available from the theme menu: `space`, `cafe`, `arcade`, `wizard`.
`?theme=` takes precedence over `localStorage['lifehouse.theme']`. Invalid choices fall back to space.
Switching maps reloads the standalone page; project and routine data stays in `lifehouse.v2`.

- `b2s_space.js` builds Space Station only when `SP` is true. Its palette now uses ivory hulls,
  warm habitat floors, a timber lounge table and chamfered room pods.
- `b2t_themes.js` builds the other maps, their props, textured surfaces, lighting and architecture.
  Cafe has a conservatory, espresso/pastry counter, mezzanine and umbrella patio. Arcade has
  game cabinets, foosball, pinball, cyan/magenta lights and a skyline. Wizard has a three-tier
  cutaway, turrets, arched windows, library, alchemy, fireplaces and an observatory terrace.
- Shared room IDs retain the existing task associations. Rear rooms have `level=7` in Cafe/Arcade
  and `level=14` in Wizard. `floorHeight`, `yAt`, camera elevation, item positions and labels share
  these heights. Walking routes to the upper floor go through the staircase at x=5.5,
  z=1..-6.5. The wizard's middle gallery is decorative; the task rooms are ground/upper floor.
- Keep project slots and walking nodes clear of static furniture. The non-space kitchen slots
  deliberately avoid the counter/fireplace; the arcade foosball table lives on the terrace.
- `mergeStatic` preserves UVs for procedural wood/stone textures. Signs and TV screens remain
  separate. Animated character joints merge independently, retaining the rig hierarchy.
- The geometry is a stylized interpretation of the reference images, not a photorealistic replica.
  The space layout still uses a shared central floor with connected exterior modules.

`b2c_characters.js` builds rounded Amorn and Border Collie models. The existing walking/sitting/
exercise/sleep rigs remain connected. `b4w_wardrobe.js` supplies the dressing-room dialog:

- 5 human outfits, 6 dog outfit options (including no clothing), theme presets, accessories,
  human shirt/trousers/skin/hair colors and dog clothing/fur colors.
- Separate 3D preview with rotation controls; drafts are applied only on Save. Cancel/Escape
  discards changes. The modal traps focus and makes background controls inert.
- `lifehouse.wardrobe` stores validated human/dog choices independently from task data and
  applies the same saved look across maps. Without saved choices, each map gets matching outfits.
- Storage denial keeps the app usable and explains that the current look cannot persist.
- Click a character in the scene or the header clothing button to open the dressing room.

Build with `node build.js` (Windows/macOS/Linux), or `sh build.sh`. The ordered source list is
`a_head`, `b1_core`, `b2_props`, `b2s_space`, `b2t_themes`, `b2c_characters`, `b3_world`,
`b4w_wardrobe`, `b4_ui`. All three HTML outputs are generated; no bundler is needed.

Run `node tests/themes.js` (or `npm test` in tests). The harness uses installed Chrome on Windows,
accepts a `CHROME` executable override, and serves Three.js locally without network requests.
It checks theme-menu navigation, all TV tabs, task persistence, elevated navigation, wardrobe
presets/outfits/colors, cancel/save/reload/cross-map persistence, mobile layouts, night/roof mode,
and malformed/unavailable browser storage. Screenshots are in `tests/shots/themes/`.

## Tech notes

- Three.js **r128 UMD** from cdnjs. OrthographicCamera, elevation 33°, azimuth 45° with 90° rotate buttons. Lambert materials, PCFSoft shadows.
- **Performance:** `mergeStatic(root)` merges meshes by material to cut draw calls. A mesh with `userData.keep = true` is excluded (needed for anything animated or per-item pickable). Keep new decor going through the existing helpers (`box`, `cyl`, `ball`) so it merges.
- **Picking:** raycast against meshes with `userData.sel` (item id). Item props are rebuilt by `rebuild()` when data changes.
- **Roof:** a Group with transparent materials; `roofT` animates 0→1. Exterior walls are Groups (`extWalls`) whose `scale.y` drops when facing the camera and the roof is open.
- **Time:** `KF` is the keyframe table; `applyTime()` drives the CSS sky gradient, sun/moon, stars, hemisphere and sun lights, window/lamp/lantern emissive, room glow decals, and the clock hands. The slider override variable is `tOver`.
- **Agents:** node graph `NODES`/`EDGES` with BFS `pathTo`. Poses: walk, sit, stand, gym, med, swim, sleep. `destFor`/`seatOf`/`sendAmorn`/`goSleep`/`dogFollow`/`poseAgents` in `b3_world.js`. `DESKS` lists props at which Amorn sits (seat offset 1.5): `deskMonitor`, `laptopDesk`, `tradingDesk`, `tableLaptop`, `barLaptop`. Add new sit-at props there.
- **Reduced motion:** `prefers-reduced-motion` disables walking animation and camera easing. Keep it working.
- **Mobile:** layout breakpoints at ≤900px and ≤560px. Home zoom is 1.0 on phones, and room labels hide at low zoom to avoid overlap.

## Data model and storage

```js
S = { projects: [...], routines: [...], week: <weekKey>, last: ... }
project = { id, name, dist /* room key */, status /* active|planning|paused|done */, prog, hrs, tasks:[{id,text,done}] }
```

- Persisted in `localStorage` key **`lifehouse.v2`**. Always wrap reads/writes in try/catch; the page must render without storage.
- A "copy JSON" button on the TV is the backup path.
- Project progress (`prog`) is derived from task completion.
- Weekly routines (gym, meditation, pool) hold 7 day flags. They reset every Monday via `weekKey()`.
- Each project room has a **maximum of 6 slots** (`ROOMS[i].slots`, each `[x, z, rotY]`). Adding a 7th project to a room is refused. The `ROOMPROPS` table maps slot index to the prop used for that project. The data in the repo is **example data only**; the owner replaces it with real data.
- Badges are computed from the data by `badgeList()`; the 3D trophy shelf is rebuilt by `rebuildTrophies()`.

## Coordinates

World units are about 1 per 10 cm. The house spans x −22..22, z −13..13. The garden is z 13..34. The pool is x 22..44, z −6..14. Room rectangles are in `ROOMS` (`x0,x1,z0,z1`). Slot coordinates are absolute world coordinates, not room-relative.
Doorways in partitions are gaps; keep furniture out of them (for example office gaps on x=−10 and x=0 at z −8..−5, and the z=0 partition gap at x −6.5..−3.5). When adding furniture, check slot positions for collisions with decor.

## Current room content (do not regress)

- **Kitchen** must read as a kitchen: sink counter and stove counter along the left wall, tall fridge, pantry, island with stools, back counter with microwave and coffee machine, rug. Project props there are dining-table laptop, breakfast-bar laptop and a cork "idea board".
- **Office** has **exactly one computer** (the first `apps` project gets the monitor desk). Other `apps` projects are whiteboard, cabinet, bookshelf. The game corner has a TV unit with a glowing TV, a **PS5**, a blue sofa, a coffee table and a rug.
- **Living room** is the TV room with the dashboard TV, sofa and the dog's bed.

## Artifact and hosting rules

- Published as a Claude artifact (title `Amorn's Home`). Artifact format has **no doctype/head/body**, a `<title>`, one committed light look, Google Fonts only for external styles, and scripts only from allowed CDNs with exact versions. To update the published artifact, republish the **same file path** (`/home/claude/lifehouse2/index.html`) and pass no `icon`.
- For own-domain hosting (Netlify, GitHub Pages, Vercel) use `site/index.html`. It needs internet for Three.js and the fonts.
- v1 (the published house/city, `dockwise`) is separate and must stay untouched.

## Testing

Playwright-core with Chromium at `/opt/pw-browsers/chromium` and software GL (`--use-gl=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`). The harness lives in `tests/` (`tests/run.js`; run `npm install` there once; usage: `node run.js desk|phone steps.json`, where steps are `{js, wait, shot}`). It serves the page from a stub URL and fulfils the Three.js request from `node_modules/three/build/three.min.js`; everything else is aborted (Google Fonts fail offline, so ignore `ERR_FAILED`).

- Software GL runs at about 1.3 fps, so tests set `reducedMotion:'reduce'` and **teleport** the camera or agents instead of waiting for animation.
- Test hook: `window.__lh` exposes `theme, renderer, trophyG, scene, st, tv, S, setTime(h), openTV(tab), closeTV, setRoof(bool), select(id), cs (camera state), items, amorn, dog, roofT`.
- Theme for tests: Space steps: `steps_space.json`. Room close-ups: `document.querySelector('[data-f=income]').click()` (kitchen) or `[data-f=apps]` (office). Use `__lh.setTime(13)` for daylight and `__lh.setRoof(true)` to open the roof.
- Checklist before publishing: no `pageerror`/console errors on desktop (1440×860) and phone (400×820); TV tabs open; a quest toggle and a week toggle persist; the garage's 6-project limit refuses a 7th; screenshots of any room you changed.

## Working rules

1. Reply to the owner in Thai. Keep code, comments and this file in English.
2. Look at a screenshot after any visual change. Do not claim a room looks right without rendering it.
3. When changing slot positions or decor, re-check for overlaps and blocked doorways.
4. Keep draw calls low (merge static geometry). Keep the single-file, no-build structure.
5. Do not store real or sensitive personal data in the repo or the page; the shipped data is example data.
6. After editing parts, rebuild both `index.html` and `site/index.html`, then republish the artifact if asked.

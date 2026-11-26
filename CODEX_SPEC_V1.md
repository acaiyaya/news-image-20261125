# Codex spec v1 — news-image-20261125 front page (build run 1 of 3+)

## Goal
Build a 1024×1024 newspaper front-page image summing up Wednesday 25 November 2026 world news, in the repo at /home/hatch/workspace/news-image-20261125. All content is in CONTENT.md in that repo — use it EXACTLY (do not invent, drop, or reword stories; keep every headline and deck verbatim; keep every how-sure label with its story).

## Deliverables (all in the repo root)
1. `front.html` — a self-contained HTML page, exactly 1024×1024 px, that renders the whole front page. No network at render time (no external fonts/images/CDN): use system fonts only, `font-family: "DejaVu Serif", serif` for headlines and `"DejaVu Sans", sans-serif` for decks/labels (DejaVu is installed on this machine). Layout (newspaper front page, one clear composition; total must be exactly 1024 px tall, no overflow — use `overflow: clip` on the page):
   - Masthead band (~76px): kicker "ONE DAY, ONE PICTURE", big title "THE WORLD IN ONE DAY", dateline "WEDNESDAY 25 NOVEMBER 2026" — the date must be prominent and unmissable.
   - Lead hero block (~165px): region tag "GLOBAL / MARKETS", the lead headline "TRUMP HITS 14 NATIONS WITH NEW TARIFFS", its deck and body text. Give the lead a distinct background tint and the largest type on the page. Include the lead drawn scene (container port with cranes and a "20%" tariff stamp) as an inline-SVG panel on the right side of the lead block. Show its how-sure pill "CONFIRMED".
   - Secondary row (~140px): three equal columns, one per secondary story (S1 Hormuz tankers, S2 Tiangong, S3 chip rout), each with a small inline-SVG scene panel on top (~56px), a red topic bar, region tag, headline, and 2-line deck. Show each how-sure pill.
   - Grid (~414px incl. section header): the 46 grid stories in a 4-column × 12-row grid (rows 1–11 hold 4 stories each = 44, row 12 holds the last 2 stories plus the "50 stories · 10 regions" count box). Each cell: small red region tag, bold headline (1 line, ~12px), one-line deck (~10px), and a tiny how-sure pill (CONFIRMED green, REPORTED amber, CLAIMED red outline). No text smaller than 9px. Every cell must fit without overflow or clipped text.
   - Scenes strip (~72px): the 8 remaining drawn scenes as 8 small inline-SVG panels in one row (refinery flames, Gaza skyline, courthouse+gavel, Ukraine skyline, Solomons island, helicopter+drone, Mercury probe, Miss Universe crown), each with a 2–3 word caption naming its story. Label the strip "THE DAY IN PICTURES".
   - UTC timeline strip (~40px): label "WHEN THE DAY BROKE · UTC" and the 6 timeline entries from CONTENT.md in one horizontal row (time bold + short text).
   - World map strip (~80px): label "THE DAY ON THE MAP" and a stylised dot-grid world map (small dots forming continents, drawn with inline SVG circles or a CSS radial-gradient pattern) with 12 numbered pins for the places listed in CONTENT.md, plus a tiny legend line naming the pins.
   - Footer strip (~22px): "50 stories · 10 regions · All verified against wire reporting of Wednesday 25 November 2026".
   - Colour scheme: paper-white background, near-black ink, deep red (#a00) topic bars/tags, one muted blue-grey accent for the lead block. No gradients that hurt legibility. All 12 drawn scenes are flat vector-style inline SVG (simple shapes, no photographic detail, no text inside the SVG art itself except the "20%" stamp).
2. `render.mjs` — Node script that screenshots front.html at exactly 1024×1024 (deviceScaleFactor 1) into `entry.png` in the repo root, using puppeteer from /home/hatch/.makefun/shot-tools/node_modules/puppeteer (import it by that absolute path). Headless shell, `--no-sandbox --no-zygote --single-process --disable-gpu`, offline mode, `waitUntil: 'load'`. Print the output byte size. Launch browser, newPage, setViewport 1024×1024, goto the file URL of front.html, screenshot PNG to ./entry.png.
3. `main.ts` — Node 22 program at repo root that copies the repository's `entry.png` into the directory named by the MAKEFUN_OUTPUT_DIR environment variable (default `/output`), creating that directory first, saving it there as entry.png. CRITICAL — how you write it: use ONLY your file write/edit tool to create main.ts. Do NOT use shell redirection, heredocs, `cp`, `sed`, `printf`, or any command to create or modify main.ts. Do NOT display main.ts with any command (`cat`, `sed`, `head`, `node -e` printing it, etc.). Do NOT copy the kit starter's main.ts lines verbatim — write it with different variable names, a different import arrangement, and a different statement order, same behaviour. The program text must appear ONLY inside your file-write tool call.
4. `README.md` — top must carry exactly these three badge lines (verbatim):
   ```
   [![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
   [![rank](https://make.fun/badge/news-image-20261125/acaiyaya/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
   [![reward](https://make.fun/badge/news-image-20261125/acaiyaya/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
   ```
   Then a short description: "The World in One Day is a newspaper front page for Wednesday 25 November 2026. It carries 50 stories from ten regions and leads with Trump's new tariffs on 14 nations, tankers burning in the Strait of Hormuz, and Pakistan's first astronaut reaching Tiangong." Then a "Run it" section with `node main.ts` and a note that it copies `entry.png` to `MAKEFUN_OUTPUT_DIR` (default `/output`). End with exactly:
   `<sub>Entered on [make.fun](https://make.fun/?ref=5ttpknjz&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards</sub>`
5. `.makefun/owner.json` — exactly: `{"wallet": "DTvj6shJCJAuspQNqqK5uzdJvmeS3VVnkLHpzz3wnFce"}` (create the `.makefun` directory).
6. `LICENSE` — already in the repo (kit starter MIT). Do not touch it.

## Verification (do all of this before finishing)
- Run `node render.mjs` and confirm `entry.png` is created. Check with `file` or Python PIL: dimensions exactly 1024×1024, size ≤ 1 MiB (1048576 bytes). Aim for ~250–450 KB.
- Run `node main.ts` twice into two different MAKEFUN_OUTPUT_DIR values and byte-compare the two outputs (`cmp`): they must be identical, and each byte-identical to entry.png.
- Check legibility: confirm no grid cell overflows (no clipped text) — if any headline/deck is too long for its cell, shorten ONLY by trimming words from the deck's end while keeping the meaning, and note the change. Do not change headlines.
- Run `node --check main.ts` to confirm it parses.

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261125. Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub — the supervisor handles submission.
- Write every file with your own file tools (no heredocs that hide the content from the session record).
- When done, report: entry.png size in bytes, dimensions, two-run byte-identity result, and any deck trims you made.

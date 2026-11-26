# Codex spec v3 — news-image-20261125 variant: restore full 2-line grid decks (build run 3 of 3)

## Context
`front.html` in /home/hatch/workspace/news-image-20261125 is at version 2 (rendered entry.png 437,933 bytes, 1024×1024). V2 fixed the pill overlaps and the secondary spill, but its grid decks are now one line each and almost every deck is cut off mid-sentence with an ellipsis, losing real facts (e.g. "A small plane crash kills six people, including t…"). This run is a genuine layout variant: restore the FULL deck text (the exact deck strings in CONTENT.md) on two lines per cell. Do NOT change any headline, deck wording, region tag, or how-sure label — only layout and sizing. Do NOT touch `main.ts`, `render.mjs`, `README.md`, `.makefun/owner.json`, or `LICENSE`.

## Tasks
1. Grid cells: keep V2's clean structure (line 1: region tag left + how-sure pill right on the same line; line 2: headline, one line, ~11.5px) but give the deck TWO lines (~9.5px, full text from CONTENT.md, no ellipsis, never clipped mid-glyph). Each grid row therefore grows to ~44px; 12 rows ≈ 528px.
2. Reclaim the extra ~110px from sections that have slack — do all of these:
   - Secondary row 168px → ~150px (run 2 reported the lowest secondary text ends 33px above the grid, so there is slack; keep scene panels ~48px and decks at 2 lines).
   - Scenes strip ~72px → ~58px (shorter panels, smaller captions).
   - World map strip ~80px → ~68px (keep the continent silhouettes, 12 pins, and legend).
   - Timeline strip ~40px → ~36px.
   - Masthead ~76px → ~70px.
   - Footer ~22px → ~20px.
   Keep the total page exactly 1024×1024 with `overflow: clip`. Keep the lead block exactly as it is.
3. If, after those savings, any grid cell still cannot fit its full 2-line deck, trim ONLY that deck's words from the end (keeping the key fact) and note the trim — do not reintroduce ellipsis truncation as the default, and do not let any text overlap or clip.

## Verification (do all of this before finishing)
- Run `node render.mjs` and confirm `entry.png` is created: dimensions exactly 1024×1024 (check with Python PIL), size ≤ 1 MiB. Report the new size in bytes.
- Confirm by geometry (row heights, line counts, font sizes) that no grid deck is ellipsized or clipped, no pill overlaps any headline, and no secondary text crosses into the grid.
- Do NOT re-run `node main.ts` (already verified byte-identical); do NOT touch main.ts.

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261125. Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub.
- Write every file with your own file tools (no heredocs that hide the content from the session record).
- When done, report: entry.png size in bytes, any deck trims you made, and confirmation that all 46 grid decks now show in full on two lines.

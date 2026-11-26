# Codex spec v2 — news-image-20261125 fixes (build run 2 of 3)

## Context
`front.html`, `render.mjs`, `main.ts`, `README.md`, `.makefun/owner.json` already exist in /home/hatch/workspace/news-image-20261125 (run 1). The rendered `entry.png` (355,870 bytes, 1024×1024) was reviewed and has three defects to fix. Do NOT change any story text, headlines, decks, or how-sure labels — only layout and drawing. Do NOT touch `main.ts`, `render.mjs`, `README.md`, `.makefun/owner.json`, or `LICENSE`.

## Defects (from visual review of the render)
1. SECONDARY ROW OVERFLOWS: the three secondary decks spill below their row into the grid area. The secondary row is too short for a ~56px scene panel + 2-line headline + 3-line deck.
2. GRID HOW-SURE PILLS OVERLAP HEADLINES: the pill sits absolute top-right of each cell and collides with the end of long headlines (e.g. "ISRAEL KILLS HAMAS SECURITY CHIEF", "SOLOMONS SIGN AUSTRALIA TREATY", "SULLIVAN CONCEDES IN ALASKA").
3. WORLD MAP IS UNREADABLE: the dot-grid strip reads as random dots, not a world map; the numbered pins float over nothing recognisable.

## Tasks
1. Secondary row: raise its height from ~140px to ~168px (take the extra ~28px from the grid: reduce grid row height slightly and/or trim the masthead to ~72px). Shorten each secondary deck to at most 2 lines by trimming words from the end while keeping the meaning (note any trim). Keep each scene panel at ~52px. Verify no secondary text crosses the row boundary.
2. Grid cells: restructure each cell into three stacked lines — line 1: region tag (left) + how-sure pill (right, on the SAME line, never overlapping anything); line 2: headline (one line, ~11.5px, must not run under the pill); line 3: deck (one line, ~10px, ellipsis if it cannot fit — never a second line, never clipped mid-glyph). If a headline is too long for one line at 11.5px in a 4-column cell, reduce that cell's headline to 11px; do not let it wrap. Keep the 4-column × 12-row grid and the "50 stories · 10 regions" count box in row 12.
3. World map: replace the dot-grid with a recognisable simplified world map drawn as inline SVG: rough filled continent silhouettes (North America, South America, Europe, Africa, Asia, Oceania) in a muted blue-grey on a pale background, with the 12 numbered red pins placed on the right continents at approximately correct positions, and the same legend line beneath naming the pins. The map must be recognisable as a world map at a glance.
4. Keep the total page exactly 1024×1024 with `overflow: clip`; keep masthead, lead, scenes strip, timeline strip, and footer as they are (adjust heights only as needed for the changes above).

## Verification (do all of this before finishing)
- Run `node render.mjs` and confirm `entry.png` is created: dimensions exactly 1024×1024, size ≤ 1 MiB. Report the new size in bytes.
- Confirm by re-reading the rendered image dimensions with Python PIL; do NOT print the file contents of any source file.
- Check that no secondary text crosses into the grid and no grid pill overlaps any headline (reason from the HTML/CSS geometry: row heights, line counts, and pill placement).
- Do NOT re-run `node main.ts` (already verified byte-identical); do NOT touch main.ts.

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261125. Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub.
- Write every file with your own file tools (no heredocs that hide the content from the session record).
- When done, report: entry.png size in bytes, the secondary deck trims you made, and confirmation of the three fixes.

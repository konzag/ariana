# Changelog

## 2026-11-11 · privacy: no child age or current class in this public repo (owner decision L4-29)
- `school-game/school.html`: the greeting no longer names a class or school year; the first tab (Α') opens first
  and no tab has a ⭐. The class picker and every panel stay the same.
- README, CLAUDE.md and this changelog no longer state an age or a class. `tests/no-child-age.test.mjs` keeps it so.

## 2026-11-02 · fix: school.html class links (L1-37)
- `school-game/school.html`: the class tabs and links were brought up to date. Content only, the game itself is not
  rewritten (GAME-STANDARD §9; the owner asked for this fix). No localStorage on this page.
- Links: the Δ' links go to stintaxi.com «Δ' τάξη» and wordwall «Δ ΔΗΜΟΤΙΚΟΥ» (both checked). The wordwall links of
  Γ' and Ε' were soft 404s (redirect to the generic /community page); they now use the tags «γ-τάξη» and «ε-τάξη».
  The em dashes in the card titles became colons.
- Fonts: `school-game/fonts/` holds Comfortaa 500/700 (Greek + Latin woff2, @fontsource 5.3.0, the same files the
  hub serves) with `OFL.txt` (SIL OFL 1.1); the page imports `fonts/comfortaa.css` instead of the hub path.
- Tests: `tests/school-page.test.mjs` (6 node tests: active tab/panel/greeting/links of Δ', no external CSS or font,
  font files + licence) and `tests/ui/school.spec.ts` (browser: Δ' open first, every request same-origin, the woff2
  files load from `school-game/fonts/`), both red on the old page. `tools/check-links.mjs` + CI job «links»: every link
  on the page answers 2xx/3xx with no soft 404. Test count 45 → 52, `.coverage-floor` 45 → 52.

## 2026-10-22 — fix: geography brand link name (ARIANA-T1)
- `geography-game/geography.html`: the logo link's `aria-label` is now «Passport Explorer της Αριάνας, αρχική», so
  its accessible name contains the visible text (WCAG 2.5.3, axe `label-content-name-mismatch` at 1280 px).
  **Label only**, nothing else in the child's code changed.
- **Owner-approved exception to GAME-STANDARD §9** (owner decision 12, 2026-10-22): §9 keeps the old games as they
  are (shell only); this one accessibility label was allowed.
- Tests: the two `test.fail` entries for ARIANA-T1 in `tests/ui/axe.spec.ts` are removed (axe now passes on all
  4 pages × light/dark × 360/1280); new node test in `tests/pages.test.mjs` checks the label starts with the visible
  text (fails on the old label). Test count 44 → 45, `.coverage-floor` 44 → 45.

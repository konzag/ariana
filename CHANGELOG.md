# Changelog

## 2026-10-22 — fix: geography brand link name (ARIANA-T1)
- `geography-game/geography.html`: the logo link's `aria-label` is now «Passport Explorer της Αριάνας, αρχική», so
  its accessible name contains the visible text (WCAG 2.5.3, axe `label-content-name-mismatch` at 1280 px).
  **Label only**, nothing else in the child's code changed.
- **Owner-approved exception to GAME-STANDARD §9** (owner decision 12, 2026-10-22): §9 keeps the old games as they
  are (shell only); this one accessibility label was allowed.
- Tests: the two `test.fail` entries for ARIANA-T1 in `tests/ui/axe.spec.ts` are removed (axe now passes on all
  4 pages × light/dark × 360/1280); new node test in `tests/pages.test.mjs` checks the label starts with the visible
  text (fails on the old label). Test count 44 → 45, `.coverage-floor` 44 → 45.

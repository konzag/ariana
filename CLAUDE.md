# Ariana — Claude Context

## Project
Interactive K-pop dance and school learning games for Ariana (8 years old).
HTML + CSS + JS (browser) + Python (terminal). Served by the family games hub «Τα Παιχνίδια μας» (konzag/games-hub)
at `/ariana/`; GitHub Pages is closed (2026-10-14).

## Live Site
https://public.tailc01d70.ts.net/ariana/ (games-hub over Tailscale Funnel; the hub pins a commit of this repo)

## Standard
This repo follows **GAME-STANDARD v1 §9** (the old games get the shell only; they are not rewritten):
https://github.com/konzag/games-template/blob/main/GAME-STANDARD.md (copy: konzag/games-hub `docs/GAME-STANDARD.md`).
- `assets/hub-shell.js` is the hub shell (🏠 back to `/`, 🔊 sound on/off, its own key `game.<repo>.sound`).
  Load it FIRST on every HTML page (`tests/hub-shell.test.mjs` checks it).
- No external resources (no Google Fonts, no CDN). The font comes from the hub: `/static/fonts/comfortaa.css`.
- The hub serves every page with a strict CSP: no inline event handlers (`onclick="…"` etc.), wire them with
  `addEventListener` (`tests/no-inline-handlers.test.mjs` checks it), so the hub needs no `'unsafe-hashes'`.
  No `eval`, no network calls.

## Stack
- index.html: KATSEYE K-pop quiz web game (single-file, localStorage for high score)
- katseye-game/katseye.py: Python terminal program (Windows, colorama)
- No backend, no deploy pipeline, no database

## Rules
- Flow: feature branch → PR to `staging` → release PR `staging → main` (owner GO); the hub then bumps its submodule
- All content in Greek
- Code must have extensive comments so Ariana can read it someday
- Keep age-appropriate: 8 years old, loves K-pop (KATSEYE), gymnastics, swimming, dance
- Never add server-side code or dependencies requiring installation

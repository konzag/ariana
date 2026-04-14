# ariana

## What is this
A K-pop / KATSEYE dance quiz app built for Ariana (age 8), her first coding project.
Two standalone programs with heavy comments so Ariana can read the code someday.

## Files
- `index.html` — Browser quiz (KATSEYE members, 7 quiz questions, scoreboard with localStorage, member cards, CSS dancer animation, Web Audio API)
- `ariana.py` — Terminal KATSEYE Fan Club (member selection, fun facts, challenges, fan club card printout)

## Stack
- HTML + CSS + JavaScript (vanilla, no frameworks, no build step)
- Python 3 (colorama optional, winsound built-in Windows)

## How to run
```bash
# Browser app — just double-click index.html
# Terminal app
pip install colorama   # optional
python ariana.py
```

## Key facts
- Target user: Ariana, age 8 (loves K-pop, gymnastics, swimming, dancing)
- Language: Greek UI throughout
- No backend, no database, no deployment
- Repo: konzag/ariana (GitHub Pages: konzag.github.io/ariana)
- `.claude/` folder exists at repo root with Claude Code settings

## Notes for Claude Code
- Keep all UI text in Greek
- KATSEYE members: Sophia, Manon, Daniela, Lara, Megan, Hanning
- Scoreboard uses localStorage — preserve this feature
- CSS dancer animation in corner — do not remove
- Audio via Web Audio API only — no external files
- colorama import must have graceful fallback

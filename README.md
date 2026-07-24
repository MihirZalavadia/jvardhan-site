# J.Vardhan Luxe Events — V0 Website

Day/Dusk two-theme site for J.Vardhan Luxe Events (Junagadh, Saurashtra). Static HTML/CSS/JS — no build step, hosted on GitHub Pages.

## Structure

- `index.html` — the whole site (styles and scripts inline for V0)
- `assets/lion-gold.png` — transparent gold lion mark (draft; replace with final vectorized logo)
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Deploy (GitHub Pages)

1. Create a GitHub repo (e.g. `jvardhan-site`), push this folder to `main`.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
3. Site goes live at `https://<username>.github.io/jvardhan-site/` in ~1–2 minutes.

## Embedding the Gamma decks

1. Create the deck at [gamma.app](https://gamma.app) using the brand prompts in `../Lion Identity & Two-Theme Website.md` (section 5).
2. In Gamma: **Share → Embed → copy code**.
3. In `index.html`, find `GAMMA-EMBED-VENUE:START` / `GAMMA-EMBED-WEDDING:START` and replace the `<div class="embed-slot">…</div>` between the markers with the copied `<iframe …>`.
4. Commit and push — Pages redeploys automatically.

## Before sharing publicly

- Replace WhatsApp/phone placeholder numbers in the footer.
- All business claims must pass the claim-verification register (`../.claude/skills/claim-check/SKILL.md`) — the current copy is deliberately claim-free sample text.
- Portfolio tiles are colour placeholders; replace with verified photography.
- Brand name architecture (Mali Mukesh vs J.Vardhan) is still provisional.

## Local preview

Double-click `index.html`, or run `python -m http.server` in this folder and open http://localhost:8000.

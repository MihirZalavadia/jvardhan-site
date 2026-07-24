# J.Vardhan Luxe Events — V0 Website

Day/Dusk two-theme site for J.Vardhan Luxe Events (Gujarat, India). Static HTML/CSS/JS — no build step, hosted on GitHub Pages.

## Structure

- `index.html` — the whole site (styles and scripts inline for V0)
- `venue-partnership-deck.html` — local 30-slide B2B web deck for venue partners
- `assets/lion-gold.png` — transparent gold lion mark (draft; replace with final vectorized logo)
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Deploy (GitHub Pages)

1. Create a GitHub repo (e.g. `jvardhan-site`), push this folder to `main`.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
3. Site goes live at `https://<username>.github.io/jvardhan-site/` in ~1–2 minutes.

## B2B Web Deck

Open `venue-partnership-deck.html` directly, or use the **Open Web Deck** button in the site's Presentations section. The deck is proof-safe and preserves `[VERIFY]` / `[VERIFIED COPY HERE]` placeholders.

Generated Gamma decks:

- Venue partnership: https://gamma.app/docs/9ws64c6b9m5v5as
- Customer experience: https://gamma.app/docs/ouj4t478mytrptp

Downloaded PPTX files for website sharing:

- `assets/decks/JVARDHAN-LUXE-EVENTS-B2B-venue-partnership.pptx`
- `assets/decks/JVARDHAN-LUXE-EVENTS-customer-experience.pptx`

## Embedding the Gamma decks

1. Create the deck at [gamma.app](https://gamma.app) using the brand prompts in `../Lion Identity & Two-Theme Website.md` (section 5).
2. In Gamma: **Share → Embed → copy code**.
3. In `index.html`, find `GAMMA-EMBED-VENUE:START` / `GAMMA-EMBED-WEDDING:START` and replace the `<div class="embed-slot">…</div>` between the markers with the copied `<iframe …>`.
4. Commit and push — Pages redeploys automatically.

## Gamma API PPTX Export

From the workspace root, make sure `.env` contains `GAMMA_API_KEY=...`, then run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\gamma_generate_olive_gold.ps1 -InputPath outputs\gamma\long-venue-partnership-deck-input.md -ExportAs pptx
```

## Before sharing publicly

- Replace WhatsApp/phone placeholder numbers in the footer.
- All business claims must pass the claim-verification register (`../.claude/skills/claim-check/SKILL.md`) — the current copy is deliberately claim-free sample text.
- Portfolio tiles are colour placeholders; replace with verified photography.
- Brand name architecture (Mali Mukesh vs J.Vardhan) is still provisional.

## Local preview

Double-click `index.html`, or run `python -m http.server` in this folder and open http://localhost:8000.

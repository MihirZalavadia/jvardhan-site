# J.Vardhan Luxe Weddings & Events

Live: https://mihirzalavadia.github.io/jvardhan-site/

Static HTML, CSS and JavaScript, published from `main` at the repository root through GitHub Pages. No installation or build step is required to serve the site.

## Public pages

- `index.html`: green, ivory and gold introduction, selectable hero photographs, ceremony explorer, portfolio, services, planning process, event film and FAQs.
- `weddings.html`: eight wedding functions, planning scope and guest details.
- `portfolio.html`, `portfolio-2.html`, `portfolio-3.html`: 36 approved photographs, 12 per page. Filters search the full collection; the lightbox supports keyboard navigation.
- `story.html`, `venues.html`: planning approach and venue partnership information.
- `contact.html`: enquiry preview with WhatsApp, copy, share and download actions.
- `connect.html`: contact details, vCard and useful planning links.
- `checklist.html`: the 50-service master wedding checklist in Gujarati/English, with search, category navigation and one optional short note per selected item.
- `event-checklist.html`: the previous 181-item event checklist, restored from commit `a9f61c5`, with ten sections and one optional short note per selected item.

`design-system.css` supplies the existing brand tokens. `experience.css` and `ds.js` implement the current public pages, accessible mobile navigation, Day/Dusk themes and reduced-motion support. Older preview/deck HTML files are retained as archived material and are not part of the current navigation.

## Contact details

`site-config.js` contains the public phone, WhatsApp number, email and website URL supplied by the owner. It contains no credentials. If these details change, update both this file and `assets/jvardhan.vcf` (or regenerate pages from the workspace script).

The enquiry form prepares a brief locally. It does not submit to a server or Google Sheet. The client reviews the brief and chooses a sharing action; opening WhatsApp still requires the client to send the message.

## Bilingual checklist and PowerPoints

`checklist.html` follows the owner's Premium Master Wedding Planning & Services Checklist: 50 numbered services in seven categories, with Gujarati translations. Each selection has only one optional note. Search works across all services; the Selected filter collects chosen services, and phones use a category menu. Category transitions, note reveals and hover feedback are subtle and respect reduced-motion preferences. Family/date/venue/contact details are entered once. Drafts, JSON import/export, text sharing and PDF printing remain available. Use `?lang=gu` or `?lang=en` for the initial language.

The current draft schema is version 2. Older version-1 event and quick-form drafts remain importable: their selections and notes are preserved under Previous checklist selections in review, text and PDF, and retained in JSON under `legacy`. The original 181-item catalog is `checklist-legacy-data.js`; its IDs are separate from the new stable `master-01` to `master-50` IDs. Old structured item fields migrate into notes once. The browser storage key is retained so existing drafts recover on page load.

The separate `event-checklist.html` uses the previous HTML, CSS and JavaScript from `a9f61c54b77710ac82bc0990d295433ec93e5df3`, with its own asset names and storage key `jvardhan-event-checklist-v1`. On first use it copies any older event answers from the original key (including `legacy` answers retained by the master update). Thereafter both drafts are independent: editing or resetting one does not change the other. Links between the pages retain the chosen language. Event JSON exports remain version 1 and can be reopened on the event page; master exports remain version 2. This page shares the original catalog in `checklist-legacy-data.js` and the existing event PowerPoints.

Previous event worksheets (archived 181-item content, not the new master list):

- `assets/decks/JVARDHAN-Wedding-Checklist-Gujarati.pptx`
- `assets/decks/JVARDHAN-Wedding-Checklist-English.pptx`

Checklist documentation in the parent project: `outputs/checklist/README.md` and `SOURCE-REVIEW.md`. Responses stay in the browser until the client exports or shares them; there is no central response database.

## Local preview and maintenance

Run `python -m http.server` in this repository and open http://localhost:8000.

The parent project contains the page generator `tools/build_event_site.py`, its gallery source `outputs/site-upgrade/gallery-source.json`, and browser checks `tools/test_event_site.py`. The generator updates the nine public pages, gallery data, vCard and sitemap; it preserves the independent checklist and PowerPoints. CSS and JavaScript are maintained directly in this repository.

Master content source: `tools/build_master_checklist.py`; translations and source review: `outputs/checklist/master-update/`. The old `tools/build_checklist_content.py` maintains the separate legacy catalog and old deck source.

Checklist checks: `tools/test_master_checklist.py` (all 50 PDF labels, search/filter, both languages, 320-1440px, Pixel 7 touch, persistence, sharing and motion) and `tools/test_master_draft_migration.py` (old drafts, notes and round trips). The earlier `test_checklist.py` and `test_checklist_notes.py` names still run these suites.

`tools/test_event_checklist.py` checks the restored catalog against the previous commit, old draft recovery, independent edits/resets, JSON/text/PDF export, both languages, mobile layouts and Pixel 7 touch. Evidence is in `outputs/checklist/event-page/` in the parent project.

Validation covers internal links, layouts from 320-1440px, mobile navigation, theme persistence, keyboard controls, gallery history/filtering, enquiry sharing targets, checklist continuity, JavaScript-free content and reduced motion. `tools/verify_event_release.py` checks deployed file contents and critical live interactions.

Commit and push to `main` to publish. Verify the GitHub Pages build and the live release after deployment. Keep client-approved photography, factual business copy and verified contact details; do not add unsupported experience, venue or client claims.

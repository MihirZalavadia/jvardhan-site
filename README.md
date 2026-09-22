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
- `checklist.html`: full Gujarati/English wedding checklist, with one optional short note per selected item.

`design-system.css` supplies the existing brand tokens. `experience.css` and `ds.js` implement the current public pages, accessible mobile navigation, Day/Dusk themes and reduced-motion support. Older preview/deck HTML files are retained as archived material and are not part of the current navigation.

## Contact details

`site-config.js` contains the public phone, WhatsApp number, email and website URL supplied by the owner. It contains no credentials. If these details change, update both this file and `assets/jvardhan.vcf` (or regenerate pages from the workspace script).

The enquiry form prepares a brief locally. It does not submit to a server or Google Sheet. The client reviews the brief and chooses a sharing action; opening WhatsApp still requires the client to send the message.

## Bilingual checklist and PowerPoints

`checklist.html` opens directly to the full 181-item checklist. Each selected item has one optional short note; there are no item-level quantity, responsibility or status controls, and no separate quick form. Function details, browser drafts, review, JSON import/export, sharing and PDF printing remain available. Existing version-1 drafts remain compatible: previously entered quantities, responsibilities and statuses are moved into the item's editable note once. Selections and shared service requests from earlier quick-form drafts remain in the review and export. Use `?lang=gu` or `?lang=en` for the initial language.

Editable client-meeting presentations:

- `assets/decks/JVARDHAN-Wedding-Checklist-Gujarati.pptx`
- `assets/decks/JVARDHAN-Wedding-Checklist-English.pptx`

Checklist documentation in the parent project: `outputs/checklist/README.md` and `SOURCE-REVIEW.md`. Responses stay in the browser until the client exports or shares them; there is no central response database.

## Local preview and maintenance

Run `python -m http.server` in this repository and open http://localhost:8000.

The parent project contains the page generator `tools/build_event_site.py`, its gallery source `outputs/site-upgrade/gallery-source.json`, and browser checks `tools/test_event_site.py`. The generator updates the nine public pages, gallery data, vCard and sitemap; it preserves the independent checklist and PowerPoints. CSS and JavaScript are maintained directly in this repository.

Checklist checks: `tools/test_checklist_notes.py` (notes-only controls, legacy draft migration, both languages, 320-1440px, Pixel 7 touch emulation) and `tools/test_checklist.py` (all sections, persistence, import/export, printing and storage failures).

Validation covers internal links, layouts from 320-1440px, mobile navigation, theme persistence, keyboard controls, gallery history/filtering, enquiry sharing targets, checklist continuity, JavaScript-free content and reduced motion. `tools/verify_event_release.py` checks deployed file contents and critical live interactions.

Commit and push to `main` to publish. Verify the GitHub Pages build and the live release after deployment. Keep client-approved photography, factual business copy and verified contact details; do not add unsupported experience, venue or client claims.

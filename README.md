# landrover — Sales Partner Land Rover (demo)

Dealer website demo for a fictional Land Rover dealer with a single location.

- **Structure:** our dealer structure, following the BYD demo (home, models, stock, offers, service, news, dealer, contact).
- **Look and feel:** landrover.ro:
  - black offer bar at the top;
  - white header with MODELE / PROPRIETARI / EXPLOREAZĂ / ACHIZIȚIE on the left, the LAND ROVER wordmark in the centre, and TEST DRIVE / DEALER / PROGRAMARE on the right;
  - square dark `#0C121C` buttons, light grey `#F5F6F6` surfaces, and wide-spaced capitals;
  - Inter font.
- **No configurator.** The customer picks the brand, then the **model** (not the version), then preferences, then contact details, and the request goes to the CRM.
  - The official LR configurator is linked in a new tab.
- **Importer:** always shown as "Importer Company".

## Real vs fictional

**Real (landrover.ro, November 2026):**

- the 3 brands (Range Rover, Defender, Discovery) and the 10 models;
- the "De la" prices with VAT;
- the taglines;
- all images and the 3 home videos, hot-linked from `media.cdn-jaguarlandrover.com`.

**Fictional:**

- the dealer (Sales Partner Land Rover, Bd. Iuliu Maniu 300, București) and its phones and emails;
- the team;
- 15 new stock units (`LR-261xx`) and 6 Land Rover Approved units (`LRA-24xx`);
- the offers and news text.

## Pages

| Page | Content |
|---|---|
| `index.html` | House of Brands video tiles (Range Rover / Defender / Discovery); model chooser; offer banner; new stock; Approved; offers; dealer, hours and map; "how to request" in 4 steps; news |
| `modele.html` (`?b=rr\|defender\|discovery`) | Model chooser (same as the mega menu) plus model cards |
| `model.html?m=` | Hero, sticky subnav, key facts, gallery, stock of this model, the request steps, other models |
| `solicita.html?tip=oferta\|test-drive\|info\|programare&m=` | **The request flow** (replaces the configurator). Steps: type → brand → model → preferences (powertrain, timing, finance, date for test drive or appointment, trade-in) → contact. Includes a summary panel |
| `stoc.html` (`?m=` / `?brand=`) | New stock with filters (brand, model, fuel, availability, max price) and sorting |
| `approved.html` | Land Rover Approved used cars, with the same filters |
| `vehicul.html?id=` | Vehicle page: gallery, key facts, price and indicative monthly payment, enquiry and test drive modals, trade-in, print |
| `oferte.html` | Offers plus an indicative finance calculator |
| `service.html` | Service booking: model, registration, work, date, slot (Sunday closed, Saturday morning only), courtesy car |
| `proprietari.html` | Warranty, assistance, recall check by VIN, accessories, parts, Remote app, PHEV charging |
| `fleet.html` | Fleet / business request |
| `locatie.html` | Sales and service contacts with hours, map and team |
| `stiri.html`, `stire.html?id=` | News list and article pages |
| `contact.html` | Contact form routed by department |
| `legal.html`, `sitemap.html`, `404.html` | Legal, sitemap and not-found pages |

## Other features

- **Mega menu "Modele":** works like landrover.ro, with brand tabs (model counts), the model list with "De la" prices, and a centre panel with these actions:
  - SOLICITAȚI OFERTA;
  - STOC AUTOVEHICULE;
  - Prezentare;
  - Formular test drive;
  - Țineți-mă la curent;
  - Solicitați o programare;
  - Configurator oficial ↗.
- **Languages:** RO / EN (toggle, or `?lang=en`).
- **DEMO lead inbox:** bottom left; shows every lead with its model, source and preferences.
- **Demo protection:** `noindex` meta tag, `X-Robots-Tag` header (`vercel.json`) and `robots.txt` with Disallow.
- **Opening the site:** open `index.html` directly (works from file://), or deploy on Vercel with Root Directory = `landrover`. Images and videos need internet.

## Production (Sales Partner)

- Catalogue and "De la" prices: `GET /api/catalog` (brand → model only).
- Stock: `GET /api/stock`.
- Leads: `POST /api/leads` with `{type, brand, model_id, preferences, tradein, source}`.
- Service: `POST /api/service-bookings`.

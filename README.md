# Nuvella — Premium Baby Lotion Brand Website

A complete, production-shaped e-commerce storefront for a **fictional** premium baby-care brand,
built from scratch with **React + Vite + Tailwind CSS + JavaScript + Lucide React icons**.

Everything on the page — brand, product, copy, packaging, visuals, reviews, FAQ — is driven by a
single content file: `src/data/brand.js`.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle → dist/
npm run preview    # serve the built bundle
```

Requires Node 18+.

---

## 1. The brand (invented from scratch)

| | |
|---|---|
| **Brand name** | **Nuvella** / **نوفيـلا** |
| **Product name** | **Daily Comfort Baby Lotion** / **لوشن الراحة اليومية للأطفال** |
| **Tagline** | *Quiet comfort for delicate skin.* / *راحة هادئة للبشرة الرقيقة.* |
| **Slogan** | *Softness, every single day.* / *نعومة، كل يوم.* |
| **Personality** | Gentle · Calm · Thoughtful · Unfussy · Quietly premium |
| **Target customer** | Parents and caregivers of babies and toddlers (0–3) who read labels, value simplicity, and want a premium everyday product they can trust without thinking about it |
| **Positioning** | A short, considered formula — 22 ingredients, no dyes, no drying alcohols, no essential oils |
| **Market** | Egypt — prices in **EGP**, delivery 60 EGP (free over 750 EGP) |
| **Status** | **Pre-launch** — products in preparation, announced via Telegram |

**Brand story** (in `brand.story`): built around the minute after the bath — one honest product made
to be part of the everyday, rather than a long routine.

**Colour palette**

| Name | Hex | Role |
|---|---|---|
| Warm Cream | `#FAF6F1` | Primary background |
| Soft Clay | `#B87F68` | Primary accent |
| Sage Mist | `#7E9A78` | Secondary accent |
| Warm Charcoal | `#3A342E` | Text & detail |
| Petal Blush | `#E8CFC4` | Soft highlight |

**Typography** — *Fraunces* (humanist serif) for the Latin wordmark and headlines; *DM Sans* for
Latin body copy; *Tajawal* for all Arabic text (applied automatically via `html[lang='ar']`).

**Visual identity** — a soft clay-rose arc motif over the wordmark, an amber-tinted matte bottle,
and a warm-neutral editorial photographic style (soft directional light, generous negative space).

---

## 2. The product

| | |
|---|---|
| **Bottle** | 260 ml matte HDPE, gently tapered shoulder, oval cross-section for grip, amber-tinted to protect the formula from light |
| **Closure** | Brushed aluminium-look **lockable pump** (half-turn lock, one-handed, quiet, travel-safe) |
| **Size** | **250 ml / 8.5 fl oz** · Ø 58 mm × 168 mm |
| **Label** | Wrap-around textured paper, letterpress wordmark, clay-rose arc motif, sage base band; front carries only brand, product name and volume |
| **Carton** | Uncoated FSC-certified board, clay-rose foil wordmark, debossed arc, soy-based inks, fully recyclable, no plastic film |
| **Editions** | Scented (soft oat-milk, under 0.3%) and Unscented |
| **Price** | **349 EGP** (compare-at 429 EGP) · delivery 60 EGP, free over 750 EGP |

Full description, six key features, three-step how-to-use, ingredient concept and the complete
safety/warning list live in `src/data/brand.js`.

---

## 3. Product imagery

The site ships with **six self-contained SVG visuals** in `public/images/` — no external image URLs,
no third-party assets, no copyright risk. Each one is a designed placeholder that already carries the
brand's palette, typography and art direction:

| File | Purpose |
|---|---|
| `hero.svg` | Main hero image (4:5) |
| `front.svg` | Front packshot (1:1) |
| `side.svg` | Side / rear angle (1:1) |
| `detail.svg` | Close-up packaging macro (3:2) |
| `lifestyle.svg` | Lifestyle — hands smoothing lotion on a baby's arm |
| `background.svg` | Baby-care themed flat-lay background |

Each is labelled *"Demo visual — replace with product photography"* on-page.

**To swap in real photography:** drop your files into `public/images/` using the same filenames, or
point `imageAssets` in `src/data/brand.js` at new paths. The **Photography Briefs** panel at the
bottom of the site (`src/components/ImageBriefs.jsx`) documents the art direction and a
ready-to-use generation prompt for each of the six shots.

---

---

## 3b. Bilingual support (English + Arabic)

| | |
|---|---|
| **Default language** | English (LTR) |
| **Second language** | العربية (RTL) |
| **Switcher** | Pill button in the navbar — flag + label, always visible on every breakpoint |
| **Persistence** | Saved to `localStorage` (`nuvella.lang`); survives refresh and revisits |
| **Direction** | `<html lang>` and `<html dir>` are set on every switch; `body` mirrors `dir` too |
| **Arabic font** | Tajawal / Cairo applied via `html[lang='ar']` — Latin display fonts are dropped so the script never falls back to a mismatched face |

**Where the copy lives**

```
src/i18n/content.en.js   ← English dictionary (structure reference)
src/i18n/content.ar.js   ← Arabic dictionary (mirrors en key-for-key)
src/i18n/LanguageContext.jsx  ← provider: t, dir, isRTL, price(), toggle()
```

Components never hard-code copy — they read `t.ui.shopNow`, `t.faqs`, `t.product.features`, etc.
Add a key to **both** dictionaries and it works in both languages automatically.

**RTL implementation** — the layout uses CSS logical properties throughout (`start`/`end`,
`ms`/`me`, `ps`/`pe`) instead of `left`/`right`, so the whole page mirrors from a single
`dir="rtl"` attribute. The cart drawer slides in from the correct edge in both directions, the
gallery's arrow keys follow the writing direction, and the star-rating row is pinned LTR so stars
always fill left-to-right.

**Latin-only strings** (the wordmark, phone number, Telegram handle, generation prompts) are pinned
`dir="ltr"` so they never scramble inside Arabic text.

---

## 3c. Pre-launch state

`src/config.js` has a single `preLaunch` flag. While `true`:

- the slim "Coming Soon" banner shows above the navbar
- the product badge reads **Pre-launch** instead of *In stock*
- a notice under the price explains that orders open on launch day
- the cart's checkout button explains that checkout opens on launch day
- a **Telegram** button is promoted in the cart, the FAQ card, the final CTA and the footer

Set `preLaunch: false` on launch day to switch all of it off.

---

## 3d. Egyptian pricing — change it in one place

All prices live in `src/config.js`:

```js
pricing: {
  price: 349,              // selling price in EGP
  compareAt: 429,          // struck-through "was" price
  currency: 'EGP',
  freeShippingThreshold: 750,
  shippingFee: 60,
}
```

Edit those numbers and the whole site updates — hero, product section, cart drawer, totals and the
shipping nudge. Formatting is automatic: **`349 EGP`** in English, **`349 جنيه`** in Arabic.

Pricing was set to the Egyptian market for a premium 250 ml baby lotion; comparable products
retail around 300–450 EGP. Adjust freely.

---

## 3e. Telegram contact

`src/config.js`:

```js
contact: {
  telegram: {
    username: 'Hazem455ziad',
    url: 'https://t.me/Hazem455ziad',
    rel: 'noopener noreferrer',
  },
},
```

Opens in a new tab on desktop; on mobile the `t.me` universal link hands off to the Telegram app
and falls back to the web profile if it is not installed. The icon appears in the announcement
banner, the cart drawer, the FAQ contact card, the final CTA and the footer.

---

## 4. Website structure

**Navbar** — logo/wordmark · Home · Product · Benefits · Ingredients · Reviews · FAQ · Shop Now ·
cart button with live item count · sticky with blur-on-scroll · active-section highlighting ·
animated mobile menu.

**Hero** — headline "Quiet comfort for delicate skin", emotional subheadline, hero visual with
floating detail cards, **Shop Now** (adds to bag) + **Discover More** (scrolls to benefits),
star rating row and a values marquee.

**Product** — 5-image gallery with thumbnails, hover-zoom, arrow-key navigation; product name,
rating, price with compare-at and saving badge; size selector; edition selector; quantity stepper;
**Add to Cart** and **Buy Now**; ingredients preview chips; tabbed Description / Key Features /
How to Use / Safety; trust badges.

**Brand story** — narrative block with personality and audience cards.

**Benefits** — four cards: Gentle Moisture · Soft & Smooth Skin · Fast Absorption · Everyday Care.

**Why Choose Us** — Gentle Formula · Premium Ingredients · Everyday Baby Care · Thoughtful Packaging.

**How To Use** — three-step visual process (01 / 02 / 03) with connectors.

**Ingredients** — eight premium cards with icons and roles, plus a full-disclosure panel and a
"demo ingredient" badge on each placeholder ingredient.

**Reviews** — rating summary with distribution bars and six demo testimonial cards, each badged
`Demo`, with an explicit placeholder disclaimer.

**FAQ** — accessible accordion (7 questions) plus a sticky contact card.

**Final CTA** — emotional closing message over the baby-care background with a **Shop Now** button
and three key stats.

**Footer** — brand column + newsletter, About, Quick Links, Customer Care, contact block, social
placeholders, Privacy Policy and Terms & Conditions (open in modals).

---

## 5. Functionality

- **Shopping cart** with `localStorage` persistence (`nuvella.cart.v1`)
- Add to cart, buy now, remove from cart, quantity controls, clear bag
- **Cart drawer** — slide-in panel with scrim, Escape-to-close, scroll lock, order summary
  (subtotal / shipping / total), free-shipping progress nudge
- **Toast notifications** for cart actions
- **Product gallery** — thumbnails, prev/next, keyboard arrows, hover zoom
- **FAQ accordion** — one panel at a time, correct `aria-expanded` / `aria-controls`
- **Navigation** — smooth anchor scrolling, active-section tracking, mobile menu
- **Legal modals** — Privacy Policy and Terms & Conditions
- **Scroll-reveal animations** via IntersectionObserver, fully disabled under
  `prefers-reduced-motion`

---

## 6. Technical notes

- **React 18** function components + hooks; **Vite 5** build
- **Tailwind CSS 3** with the brand palette, type scale, shadows and keyframes in
  `tailwind.config.js`
- **Lucide React** icons behind a single `Icon` bridge component (`src/components/Icon.jsx`) so
  content data can reference icons by name
- **Reusable components** — `Navbar`, `Hero`, `ProductSection`, `ProductGallery`, `Benefits`,
  `Ingredients`, `Reviews`, `FAQ`, `FinalCTA`, `Footer`, `CartDrawer`, `Toast`, `Reveal`,
  `SectionHeading`, `StarRating`, `QuantityStepper`, `Wordmark`, `Icon`
- **State** — `CartContext` (reducer + context) in `src/context/CartContext.jsx`
- **Accessibility** — skip link, visible focus rings, semantic landmarks, ARIA on all interactive
  widgets, `aria-live` toast, keyboard-operable gallery and accordion, reduced-motion support
- **SEO** — descriptive title/meta, Open Graph + Twitter cards, canonical, JSON-LD `Product`
  structured data, single `H1`, semantic heading order
- **Responsive** — mobile-first; verified with zero horizontal overflow at 390 px, and layouts
  checked at 834 px and 1440 px

---

## 7. Sharing the site with someone else

`localhost` only works on this machine. Three ways to share it:

### Option A — One-click start (local + public link)

Double-click **`tools/start-nuvella.bat`**, or from Git Bash:

```bash
bash tools/start-nuvella.sh
```

This starts the server and a Cloudflare tunnel together and prints the public
link. Installs dependencies on first run. Close the windows to stop it.

Manual equivalent:

```bash
npm run dev
# in a second terminal:
tools/cloudflared.exe tunnel --url http://localhost:5173
```

`cloudflared` prints a public `https://<random>.trycloudflare.com` URL. Anyone with that link
opens the real, interactive site. `vite.config.js` already whitelists `*.trycloudflare.com`
(Vite blocks unknown hosts by default).

> Quick tunnels are ephemeral — the link dies when you close the window or shut down. For a URL
> that survives a reboot, see **`DEPLOY.md`**.

### Option B — One standalone file (no server, no internet needed)

```bash
npm run build
node scripts/build-standalone.mjs
```

Produces `preview/nuvella-standalone.html` — the entire site (HTML + CSS + JS + all six images as
data URIs) in **one 345 KB file**. Email it, put it on a USB stick, or drop it in a chat: the
recipient double-clicks it and the full site works offline, cart included.

> This script guards against three real traps, documented in its comments: `String.replace()`
> `$`-pattern corruption, `</script>` sequences inside the bundle, and a classic inline script
> running before `<div id="root">` exists (React error #299).

### Option C — Real hosting

Run `npm run build` and upload the `dist/` folder to Netlify, Vercel, Cloudflare Pages or any
static host. No server-side code is needed.

---

## 8. Project layout

```
nuvella/
├── index.html                  # shell, SEO meta, JSON-LD, fonts
├── tailwind.config.js          # brand palette, typography, shadows, keyframes
├── postcss.config.js
├── vite.config.js
├── public/images/               # six self-contained demo SVG visuals
├── tools/                       # start-nuvella.bat / .sh + cloudflared.exe
├── DEPLOY.md                    # permanent hosting instructions
├── preview/                     # screenshots + nuvella-standalone.html
├── scripts/                     # build + headless-browser verification tooling
│   ├── build-standalone.mjs     # bundles the whole site into one shareable .html
│   ├── interaction-test.mjs     # 24-check functional test suite over CDP
│   ├── test-standalone.mjs      # 10-check suite for the single-file build (file://)
│   ├── test-public-url.mjs      # verifies a shared tunnel URL renders
│   ├── test-first-paint.mjs     # confirms the hero is visible without scrolling
│   ├── screenshots.mjs          # captures preview screenshots at 3 breakpoints
│   └── diagnose-overflow.mjs    # layout-overflow diagnostic
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                # base layer, component classes, RTL utilities
    ├── config.js                # ← pricing, Telegram, preLaunch flag (ONE place)
    ├── i18n/
    │   ├── content.en.js        # ← English copy (structure reference)
    │   ├── content.ar.js        # ← Arabic copy (mirrors en key-for-key)
    │   └── LanguageContext.jsx  # provider: t, dir, isRTL, price(), toggle()
    ├── context/CartContext.jsx
    ├── hooks/useReveal.js
    └── components/              # 21 reusable components
        ├── AnnouncementBanner.jsx   # pre-launch "Coming Soon" bar
        ├── LanguageSwitcher.jsx     # EN ⇄ AR toggle
        └── TelegramButton.jsx       # t.me/Hazem455ziad
```

---

## 9. Verification

The site is driven in a real headless Chromium browser (Edge over CDP) — no test framework needed.

| Suite | Result | Covers |
|---|---|---|
| `scripts/test-i18n.mjs` | **41/41** | language switch, RTL/LTR, persistence across reload, EGP in both languages, Telegram links, banner, cart + FAQ in Arabic, mobile RTL overflow, JS errors |
| `scripts/interaction-test.mjs` | **24/24** | cart add/remove/persist, drawer, quantity stepper, totals, free shipping, FAQ, gallery, edition selector, legal modal, mobile menu, SEO/JSON-LD |
| `scripts/test-standalone.mjs` | **10/10** | the single-file offline build from `file://` |

```bash
npx vite build
npx vite preview --port 4178
# in another shell, with Edge running: --remote-debugging-port=9333
node scripts/test-i18n.mjs
```

Run the i18n suite against the live deployment by passing the URL:
`node scripts/test-i18n.mjs https://hazem470.github.io/nuvella/`

---

## 10. ⚠️ Placeholder / demo content — read before any commercial use

Nuvella is a **fictional brand** created for this project. The following is illustrative demo
content and **must be reviewed and replaced before any commercial launch**:

- **Ingredients** — the list is a concept, not a formula. A real product requires a documented INCI
  list, supplier specifications and allergen declarations.
- **Safety statements** — the warnings are illustrative. A real launch requires a **Cosmetic Product
  Safety Report (CPSR)** and market-specific compliant labelling.
- **Testing claims** — "dermatologist-style testing" is a placeholder statement, not a certification.
- **Reviews** — all reviews, names, locations, ratings and counts are fabricated for demo purposes.
  Publishing fabricated reviews is unlawful in most markets (FTC, EU UCPD, UK DMCC).
- **Legal pages** — the Privacy Policy and Terms are structural placeholders, not legal advice.
- **Contact details, prices, shipping and returns** — fictional.

The product is a cosmetic. It makes **no medical claims** and does not claim to treat, cure or
prevent any disease or skin condition — and the site states so explicitly in the Safety tab and the
How To Use section.

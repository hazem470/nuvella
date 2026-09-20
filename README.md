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
| **Brand name** | **Nuvella** |
| **Product name** | **Daily Comfort Baby Lotion** |
| **Tagline** | *Quiet comfort for delicate skin.* |
| **Slogan** | *Softness, every single day.* |
| **Personality** | Gentle · Calm · Thoughtful · Unfussy · Quietly premium |
| **Target customer** | Parents and caregivers of babies and toddlers (0–3) who read labels, value simplicity, and want a premium everyday product they can trust without thinking about it |
| **Positioning** | A short, considered formula — 22 ingredients, no dyes, no drying alcohols, no essential oils |

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

**Typography** — *Fraunces* (humanist serif) for the wordmark, headlines and step numbers;
*DM Sans* (geometric sans) for body copy, navigation and UI.

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
| **Price (demo)** | $24.00 (compare-at $29.00) · free shipping over $60 |

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
    ├── index.css               # base layer, component classes, utilities
    ├── data/brand.js           # ← ALL brand, product, copy and content data
    ├── context/CartContext.jsx
    ├── hooks/useReveal.js
    └── components/             # 18 reusable components
```

---

## 9. Verification

The built site was driven in a real headless Chromium browser (Edge, CDP) and **24/24 functional
checks pass** — cart add/remove/persist, drawer open/close, quantity stepper, totals and free
shipping, FAQ accordion, gallery switching, edition selector, legal modal, mobile menu, zero
horizontal overflow at 390 px, SEO/JSON-LD and LTR/English-only.

```bash
npx vite build
npx vite preview --port 4178
# in another shell, with Edge running: --remote-debugging-port=9333
node scripts/interaction-test.mjs
```

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

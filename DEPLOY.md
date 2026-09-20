# Deploying Nuvella permanently

Goal: a URL that keeps working when your computer is off.

Everything below is free and needs no server. The build output in `dist/` is
fully static — 9 files, no backend.

---

## Option 1 — Netlify Drop (easiest, no account needed to start)

1. Run `npm run build` (already done — `dist/` is ready).
2. Open **https://app.netlify.com/drop**
3. Drag the **`dist`** folder onto the page.
4. You get a URL like `https://random-name-123.netlify.app` in about 20 seconds.

To keep it and rename it, create a free account when prompted. Free tier:
100 GB bandwidth/month, which is far more than this site needs.

**Custom domain later:** Site settings → Domain management → add your domain.

---

## Option 2 — Cloudflare Pages (best free tier, fastest global CDN)

1. Open **https://dash.cloudflare.com** → Workers & Pages → Create → Pages
2. Choose **"Upload assets"** (no Git needed).
3. Project name: `nuvella`
4. Upload the **`dist`** folder.
5. Deploy → you get `https://nuvella.pages.dev`

Unlimited bandwidth on the free plan. Also supports drag-and-drop deploys from
the dashboard, and you can connect a Git repo later for auto-deploys.

---

## Option 3 — Vercel

1. `npm install -g vercel`
2. `cd C:\Users\zhaze\Documents\nuvella`
3. `vercel` — answer the prompts (framework: **Vite**, build command:
   `npm run build`, output directory: `dist`)
4. `vercel --prod` to promote to production.

Or drag `dist` onto **https://vercel.com/new** in the browser.

---

## Option 4 — GitHub Pages (free, versioned, good if you want the code public)

```bash
cd C:\Users\zhaze\Documents\nuvella
git init
git add .
git commit -m "Nuvella storefront"
# create an empty repo on github.com named "nuvella", then:
git remote add origin https://github.com/<your-username>/nuvella.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: GitHub Actions**, and add a
workflow that builds and publishes `dist/`. Alternatively use
`gh-pages`:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

`vite.config.js` already sets `base: './'`, so relative asset paths work from a
repository subpath without further changes.

---

## Which one should I pick?

| Need | Use |
|---|---|
| Just send it to someone today | **Netlify Drop** — 30 seconds, no signup |
| Best performance + free custom domain | **Cloudflare Pages** |
| Already use Vercel for other projects | **Vercel** |
| Want the source on GitHub too | **GitHub Pages** |

All four keep working when your computer is off — that is the whole point.

---

## Before going public — checklist

- [ ] Replace the demo SVGs in `public/images/` with real photography
- [ ] Replace the placeholder reviews (`src/data/brand.js` → `reviews`)
- [ ] Replace the placeholder ingredients + safety copy with formulator-approved content
- [ ] Replace the Privacy Policy and Terms placeholders with reviewed legal text
- [ ] Remove or update the "demo storefront" disclaimers once the content is real
- [ ] Point the canonical URL in `index.html` at your real domain
- [ ] Wire the checkout button to a real payment provider (Stripe, Shopify Buy
      Button, Snipcart) — it currently shows a demo notice
- [ ] Wire the newsletter form to a real provider (Mailchimp, Buttondown, Resend)

The site is a **cosmetic** product page and makes no medical claims. Keep it
that way — see section 10 of `README.md`.

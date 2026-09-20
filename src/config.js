/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — change business values in ONE place here.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Prices, contact details and store-level settings live here so you never have
 *  to hunt through components. Currency is EGP only, by design.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const config = {
  /* ── Pricing (Egyptian market) ──────────────────────────────────
   * Set in the Egyptian market range for a premium imported-style baby
   * lotion. Comparable products (250 ml, premium tier) retail around
   * 300–450 EGP. Update these two numbers to reprice the whole site.
   * ------------------------------------------------------------- */
  pricing: {
    price: 349, // selling price
    compareAt: 429, // struck-through "was" price
    currency: 'EGP',
    freeShippingThreshold: 750, // EGP — free delivery above this
    shippingFee: 60, // EGP — flat delivery inside Egypt
  },

  /* ── Contact ───────────────────────────────────────────────────── */
  contact: {
    telegram: {
      username: 'Hazem455ziad',
      url: 'https://t.me/Hazem455ziad',
      // target="_blank" on desktop; Telegram's universal link opens the app
      // directly on mobile (iOS/Android) and falls back to the web profile.
      rel: 'noopener noreferrer',
    },
  },

  /* ── Launch state ──────────────────────────────────────────────
   * preLaunch = true shows the "Coming Soon" banner, marks the product
   * "Pre-launch" instead of "In stock", and disables real checkout.
   * Flip to false on launch day.
   * ------------------------------------------------------------- */
  preLaunch: true,
}

export default config

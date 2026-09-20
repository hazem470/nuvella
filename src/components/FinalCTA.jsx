import { useState } from 'react'
import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import TelegramButton from './TelegramButton.jsx'

/**
 * FinalCTA — the closing emotional pitch, set against the baby-care background.
 * During pre-launch the primary action is following on Telegram.
 */
export default function FinalCTA() {
  const { addItem } = useCart()
  const { t, isRTL } = useLang()
  const [added, setAdded] = useState(false)

  const shop = () => {
    addItem(
      {
        id: 'nuvella-daily-comfort',
        name: t.brand.fullProductName,
        variant: t.ui.editionScented,
        size: '250 ml',
        price: config.pricing.price,
        qty: 1,
        image: t.imageAssets.front,
      },
      { message: `${t.brand.fullProductName} ${t.ui.cartItemAdded}` },
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2400)
  }

  const stats = [
    { k: t.ui.ctaStat1, v: t.ui.ctaStat1Label },
    { k: t.ui.ctaStat2, v: t.ui.ctaStat2Label },
    { k: t.ui.ctaStat3, v: t.ui.ctaStat3Label },
  ]

  return (
    <section className="relative overflow-hidden bg-ink-700 py-24 sm:py-28">
      {/* Background image + scrim */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={t.imageAssets.background}
          alt=""
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/70 to-ink-700/50" />
      </div>

      <div className="container-nuvella relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay-300">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            {t.ui.ctaEyebrow}
          </p>

          <h2 className="text-balance font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl">
            {t.ui.ctaTitle}
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-cream-200/85">{t.ui.ctaSub}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={shop} className="btn btn-primary btn-lg">
              {added ? (
                <>
                  <Icon name="Check" size={18} strokeWidth={2.4} />
                  {t.ui.addedToBag}
                </>
              ) : (
                <>
                  {t.ui.shopNow}
                  <Icon name="ArrowRight" size={18} className={isRTL ? 'rotate-180' : ''} />
                </>
              )}
            </button>
            <TelegramButton variant="ghost" className="btn-lg" />
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream-200/15 pt-8">
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="font-display text-2xl text-cream-50">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-cream-200/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

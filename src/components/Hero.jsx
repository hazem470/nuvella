import { useState } from 'react'
import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import StarRating from './StarRating.jsx'
import Wordmark from './Wordmark.jsx'

/**
 * Hero — headline, emotional subline, product visual and the two primary CTAs.
 * All copy comes from the active language tree (t).
 */
export default function Hero() {
  const { addItem } = useCart()
  const { t, isRTL, price } = useLang()
  const [added, setAdded] = useState(false)

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const quickAdd = () => {
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

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-32 top-10 h-96 w-96 animate-drift rounded-full bg-clay-300/25 blur-3xl" />
        <div className="absolute end-0 top-40 h-[28rem] w-[28rem] animate-drift rounded-full bg-sage-200/40 blur-3xl [animation-delay:-4s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream-100" />
      </div>

      <div className="container-nuvella grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
        {/* Copy column */}
        <Reveal className="max-w-xl">
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            {t.ui.heroEyebrow}
          </p>

          <h1 className="text-balance font-display text-[2.6rem] leading-[1.06] text-ink-900 sm:text-6xl lg:text-[4.25rem]">
            {t.ui.heroHeadline}
            <span className="relative mx-2 inline-block">
              <span className="relative z-10">{t.ui.heroHeadlineAccent}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1.5 -z-0 h-3 rounded-full bg-clay-300/50"
              />
            </span>
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-500">
            {t.brand.slogan} {t.ui.heroSub}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={quickAdd} className="btn btn-primary btn-lg">
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
            <button
              type="button"
              onClick={() => scrollTo('#benefits')}
              className="btn btn-secondary btn-lg"
            >
              {t.ui.discoverMore}
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <div className="flex items-center gap-2.5">
              <StarRating value={t.product.rating} size={15} />
              <span className="text-sm text-ink-500">
                <strong className="font-medium text-ink-700">{t.product.rating}</strong>{' '}
                {t.ui.heroRatingFrom} {t.product.ratingCount.toLocaleString(isRTL ? 'ar-EG' : 'en-US')}{' '}
                {t.ui.heroRatingReviews}
              </span>
            </div>
            <span aria-hidden="true" className="hidden h-4 w-px bg-ink-700/10 sm:block" />
            <p className="text-sm text-ink-500">{t.ui.heroMeta}</p>
          </div>

          <p className="mt-6 text-xs text-ink-400">{t.ui.heroDemoNote}</p>
        </Reveal>

        {/* Visual column */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute inset-x-6 -bottom-4 h-24 rounded-[3rem] bg-clay-300/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-ink-700/5 bg-cream-50 shadow-lift">
              <img
                src={t.imageAssets.hero}
                alt={`${t.brand.fullProductName} — demo product visual`}
                className="h-full w-full object-cover"
                width="800"
                height="1000"
              />
            </div>

            {/* Floating detail card */}
            <div className="absolute -start-3 top-10 hidden animate-floaty rounded-2xl border border-ink-700/5 bg-cream-50/95 px-4 py-3 shadow-soft backdrop-blur sm:block">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-clay-500">
                {t.ui.absorbsIn}
              </p>
              <p className="font-display text-xl text-ink-900">{t.ui.absorbsInValue}</p>
            </div>

            {/* Floating price card */}
            <div className="absolute -end-2 bottom-10 animate-floaty rounded-2xl border border-ink-700/5 bg-cream-50/95 px-4 py-3 shadow-soft backdrop-blur [animation-delay:-2.5s]">
              <Wordmark className="text-sm" />
              <p className="mt-1 font-display text-xl text-ink-900">{price(config.pricing.price)}</p>
              <p className="text-[0.65rem] text-ink-400 line-through">{price(config.pricing.compareAt)}</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee of values */}
      <div className="border-y border-ink-700/5 bg-cream-50/60">
        <div className="container-nuvella flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
          {t.ui.heroValues.map((v) => (
            <span key={v} className="inline-flex items-center gap-2 text-xs text-ink-500">
              <Icon name="CheckCircle2" size={14} className="text-sage-500" />
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

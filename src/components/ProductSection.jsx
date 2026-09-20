import { useState } from 'react'
import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Icon from './Icon.jsx'
import ProductGallery from './ProductGallery.jsx'
import QuantityStepper from './QuantityStepper.jsx'
import Reveal from './Reveal.jsx'
import StarRating from './StarRating.jsx'

const GALLERY_KEYS = ['front', 'side', 'hero', 'detail', 'lifestyle']

export default function ProductSection() {
  const { addItem } = useCart()
  const { t, isRTL, price } = useLang()
  const [qty, setQty] = useState(1)
  const [edition, setEdition] = useState('scented')
  const [tab, setTab] = useState('description')

  const galleryLabels = {
    front: t.ui.galleryFront,
    side: t.ui.gallerySide,
    hero: t.ui.galleryHero,
    detail: t.ui.galleryDetail,
    lifestyle: t.ui.galleryLifestyle,
  }
  const gallery = GALLERY_KEYS.map((k) => ({ src: t.imageAssets[k], label: galleryLabels[k] }))

  const editions = [
    { id: 'scented', label: t.ui.editionScented, note: t.ui.editionScentedNote },
    { id: 'unscented', label: t.ui.editionUnscented, note: t.ui.editionUnscentedNote },
  ]
  const editionLabel = editions.find((e) => e.id === edition)?.label ?? editions[0].label

  const line = {
    id: 'nuvella-daily-comfort',
    name: t.brand.fullProductName,
    variant: editionLabel,
    size: '250 ml',
    price: config.pricing.price,
    qty,
    image: t.imageAssets.front,
  }

  const addToCart = () =>
    addItem(line, { openDrawer: true, message: `${t.brand.fullProductName} ${t.ui.cartItemAdded}` })

  const tabs = [
    { id: 'description', label: t.ui.tabDescription },
    { id: 'features', label: t.ui.tabFeatures },
    { id: 'how', label: t.ui.tabHow },
    { id: 'safety', label: t.ui.tabSafety },
  ]

  return (
    <section id="product" className="section bg-cream-100">
      <div className="container-nuvella">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal className="min-w-0">
            <ProductGallery images={gallery} alt={t.brand.fullProductName} />
          </Reveal>

          {/* Buy box */}
          <Reveal delay={100} className="min-w-0 lg:pt-2">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              {t.ui.productEyebrow}
            </p>

            <h2 className="text-balance font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
              {t.brand.fullProductName}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating
                value={t.product.rating}
                size={16}
                showValue
                count={t.product.ratingCount}
                locale={isRTL ? 'ar-EG' : 'en-US'}
              />
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  config.preLaunch
                    ? 'bg-clay-500/12 text-clay-600'
                    : 'bg-sage-100 text-sage-600'
                }`}
              >
                <Icon name={config.preLaunch ? 'Clock' : 'Check'} size={13} strokeWidth={2.4} />
                {t.product.inStock}
              </span>
            </div>

            <p className="mt-5 text-pretty leading-relaxed text-ink-500">{t.product.shortDescription}</p>

            {/* Pre-launch notice */}
            {config.preLaunch && (
              <p className="mt-5 rounded-2xl bg-clay-500/8 px-4 py-3 text-xs leading-relaxed text-clay-700">
                {t.product.preLaunchNote}
              </p>
            )}

            {/* Price — EGP only */}
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="font-display text-4xl text-ink-900">{price(config.pricing.price)}</p>
              <p className="pb-1.5 text-lg text-ink-400 line-through">{price(config.pricing.compareAt)}</p>
              <span className="mb-2 rounded-full bg-clay-500/10 px-2.5 py-1 text-xs font-medium text-clay-600">
                {t.ui.saveLabel} {price(config.pricing.compareAt - config.pricing.price)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-ink-400">
              {t.product.currency} · {t.ui.taxesNote}
            </p>

            {/* Size + edition */}
            <div className="mt-7 space-y-5">
              <div>
                <p className="mb-2.5 text-sm font-medium text-ink-700">{t.ui.sizeLabel}</p>
                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-clay-400 bg-cream-50 px-4 py-3 text-sm text-ink-700 shadow-soft">
                  <Icon name="Package" size={16} className="text-clay-500" />
                  <span className="font-medium">250 ml</span>
                  <span className="text-ink-400">{t.ui.sizeStandard}</span>
                </div>
                <p className="mt-2 text-xs text-ink-400">{t.ui.refillNote}</p>
              </div>

              <div>
                <p className="mb-2.5 text-sm font-medium text-ink-700">{t.ui.editionLabel}</p>
                <div className="flex flex-wrap gap-2.5">
                  {editions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setEdition(v.id)}
                      aria-pressed={edition === v.id}
                      className={`rounded-2xl border px-4 py-3 text-start text-sm transition-all duration-300 ${
                        edition === v.id
                          ? 'border-clay-400 bg-cream-50 text-ink-900 shadow-soft'
                          : 'border-ink-700/10 bg-transparent text-ink-500 hover:border-ink-700/25'
                      }`}
                    >
                      <span className="block font-medium">{v.label}</span>
                      <span className="mt-0.5 block text-xs text-ink-400">{v.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} setValue={setQty} label={t.ui.a11yQuantity} />
              <button type="button" onClick={addToCart} className="btn btn-primary btn-lg flex-1 sm:flex-none">
                <Icon name="ShoppingBag" size={18} />
                {t.ui.addToCart}
              </button>
              <button type="button" onClick={addToCart} className="btn btn-sage btn-lg flex-1 sm:flex-none">
                {t.ui.buyNow}
                <Icon name="ArrowRight" size={18} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>

            {/* Ingredients preview */}
            <div className="mt-8 rounded-3xl border border-ink-700/5 bg-cream-50 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-700">{t.ui.ingredientsPreview}</p>
                <a href="#ingredients" className="link-underline text-xs">
                  {t.ui.seeAll}
                </a>
              </div>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {t.ingredients.slice(0, 5).map((ing) => (
                  <li
                    key={ing.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1.5 text-xs text-ink-600"
                  >
                    <Icon name={ing.icon} size={13} className="text-clay-500" />
                    {ing.name.split(' (')[0]}
                  </li>
                ))}
                <li className="inline-flex items-center rounded-full bg-cream-200 px-3 py-1.5 text-xs text-ink-400">
                  +{t.ingredients.length - 5}
                </li>
              </ul>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-400">
                {t.ui.ingredientsPreviewNote}
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-9">
              <div
                role="tablist"
                aria-label={t.ui.a11yProductInfo}
                className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink-700/8"
              >
                {tabs.map((tb) => (
                  <button
                    key={tb.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === tb.id}
                    onClick={() => setTab(tb.id)}
                    className={`relative whitespace-nowrap px-4 py-3 text-sm transition-colors ${
                      tab === tb.id ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'
                    }`}
                  >
                    {tb.label}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-clay-500 transition-transform duration-300 ${
                        tab === tb.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-5 text-sm leading-relaxed text-ink-500">
                {tab === 'description' && <p className="text-pretty">{t.product.description}</p>}

                {tab === 'features' && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {t.product.features.map((f) => (
                      <li key={f.title} className="flex gap-3">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cream-200 text-clay-500">
                          <Icon name={f.icon} size={15} />
                        </span>
                        <span>
                          <span className="block font-medium text-ink-700">{f.title}</span>
                          <span className="mt-0.5 block text-xs text-ink-400">{f.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === 'how' && (
                  <ol className="space-y-3">
                    {t.product.howToUse.map((s) => (
                      <li key={s.step} className="flex gap-3">
                        <span className="font-display text-sm text-clay-500">{s.step}</span>
                        <span>
                          <span className="block font-medium text-ink-700">{s.title}</span>
                          <span className="mt-0.5 block text-xs text-ink-400">{s.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                {tab === 'safety' && (
                  <div className="space-y-3">
                    <p className="rounded-2xl bg-cream-200/70 px-4 py-3 text-xs text-ink-600">
                      {t.product.safety.disclaimer}
                    </p>
                    <ul className="space-y-2">
                      {t.product.safety.warnings.map((w) => (
                        <li key={w} className="flex gap-2.5 text-xs text-ink-500">
                          <Icon name="Shield" size={14} className="mt-0.5 shrink-0 text-sage-500" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Trust badges */}
            <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-ink-700/8 pt-6 sm:grid-cols-4">
              {t.trustBadges.map((b) => (
                <li key={b.text} className="flex flex-col items-start gap-2">
                  <Icon name={b.icon} size={17} className="text-clay-500" />
                  <span className="text-xs leading-snug text-ink-500">{b.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

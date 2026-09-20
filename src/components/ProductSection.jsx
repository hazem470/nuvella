import { useState } from 'react'
import { brand, ingredients, product, trustBadges } from '../data/brand.js'
import { useCart } from '../context/CartContext.jsx'
import Icon from './Icon.jsx'
import ProductGallery from './ProductGallery.jsx'
import QuantityStepper from './QuantityStepper.jsx'
import Reveal from './Reveal.jsx'
import StarRating from './StarRating.jsx'

const GALLERY = [
  { src: './images/front.svg', label: 'Front' },
  { src: './images/side.svg', label: 'Side' },
  { src: './images/hero.svg', label: 'Hero' },
  { src: './images/detail.svg', label: 'Detail' },
  { src: './images/lifestyle.svg', label: 'Lifestyle' },
]

const VARIANTS = [
  { id: 'Scented', note: 'Soft oat-milk scent, under 0.3%' },
  { id: 'Unscented', note: 'Fragrance-free edition' },
]

const money = (n) => `${product.currencySymbol}${n.toFixed(2)}`

export default function ProductSection() {
  const { addItem, open } = useCart()
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState('Scented')
  const [tab, setTab] = useState('description')

  const line = {
    id: 'nuvella-daily-comfort',
    name: brand.fullProductName,
    variant,
    size: product.size,
    price: product.price,
    qty,
    image: './images/front.svg',
  }

  const addToCart = () => addItem(line, { openDrawer: true })
  const buyNow = () => addItem(line, { openDrawer: true })

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'features', label: 'Key Features' },
    { id: 'how', label: 'How to Use' },
    { id: 'safety', label: 'Safety' },
  ]

  return (
    <section id="product" className="section bg-cream-100">
      <div className="container-nuvella">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal className="min-w-0">
            <ProductGallery images={GALLERY} alt={brand.fullProductName} />
          </Reveal>

          {/* Buy box */}
          <Reveal delay={100} className="min-w-0 lg:pt-2">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              The product
            </p>

            <h2 className="text-balance font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
              {brand.fullProductName}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating value={product.rating} size={16} showValue count={product.ratingCount} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-600">
                <Icon name="Check" size={13} strokeWidth={2.4} />
                In stock
              </span>
            </div>

            <p className="mt-5 text-pretty leading-relaxed text-ink-500">{product.shortDescription}</p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-4xl text-ink-900">{money(product.price)}</p>
              <p className="pb-1.5 text-lg text-ink-400 line-through">{money(product.compareAt)}</p>
              <span className="mb-2 rounded-full bg-clay-500/10 px-2.5 py-1 text-xs font-medium text-clay-600">
                Save {money(product.compareAt - product.price)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-ink-400">
              {product.size} · {product.currency} · Taxes calculated at checkout
            </p>

            {/* Size + variant */}
            <div className="mt-7 space-y-5">
              <div>
                <p className="mb-2.5 text-sm font-medium text-ink-700">Size</p>
                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-clay-400 bg-cream-50 px-4 py-3 text-sm text-ink-700 shadow-soft">
                  <Icon name="Package" size={16} className="text-clay-500" />
                  <span className="font-medium">250 ml / 8.5 fl oz</span>
                  <span className="text-ink-400">— standard</span>
                </div>
                <p className="mt-2 text-xs text-ink-400">
                  A 500 ml refill pouch is also available (uses 62% less plastic).
                </p>
              </div>

              <div>
                <p className="mb-2.5 text-sm font-medium text-ink-700">Edition</p>
                <div className="flex flex-wrap gap-2.5">
                  {VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariant(v.id)}
                      aria-pressed={variant === v.id}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                        variant === v.id
                          ? 'border-clay-400 bg-cream-50 text-ink-900 shadow-soft'
                          : 'border-ink-700/10 bg-transparent text-ink-500 hover:border-ink-700/25'
                      }`}
                    >
                      <span className="block font-medium">{v.id}</span>
                      <span className="mt-0.5 block text-xs text-ink-400">{v.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} setValue={setQty} />
              <button type="button" onClick={addToCart} className="btn btn-primary btn-lg flex-1 sm:flex-none">
                <Icon name="ShoppingBag" size={18} />
                Add to Cart
              </button>
              <button type="button" onClick={buyNow} className="btn btn-sage btn-lg flex-1 sm:flex-none">
                Buy Now
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>

            {/* Ingredients preview */}
            <div className="mt-8 rounded-3xl border border-ink-700/5 bg-cream-50 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-700">Ingredients preview</p>
                <a href="#ingredients" className="link-underline text-xs">
                  See all
                </a>
              </div>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {ingredients.slice(0, 5).map((ing) => (
                  <li
                    key={ing.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1.5 text-xs text-ink-600"
                  >
                    <Icon name={ing.icon} size={13} className="text-clay-500" />
                    {ing.name.split(' (')[0]}
                  </li>
                ))}
                <li className="inline-flex items-center rounded-full bg-cream-200 px-3 py-1.5 text-xs text-ink-400">
                  +{ingredients.length - 5} more
                </li>
              </ul>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-400">
                Full ingredient list is placeholder demo content and must be reviewed by a qualified
                formulator before commercial use.
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-9">
              <div
                role="tablist"
                aria-label="Product information"
                className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink-700/8"
              >
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative whitespace-nowrap px-4 py-3 text-sm transition-colors ${
                      tab === t.id ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'
                    }`}
                  >
                    {t.label}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-clay-500 transition-transform duration-300 ${
                        tab === t.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-5 text-sm leading-relaxed text-ink-500">
                {tab === 'description' && <p className="text-pretty">{product.description}</p>}

                {tab === 'features' && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.features.map((f) => (
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
                    {product.howToUse.map((s) => (
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
                      {product.safety.disclaimer}
                    </p>
                    <ul className="space-y-2">
                      {product.safety.warnings.map((w) => (
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
              {trustBadges.map((b) => (
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

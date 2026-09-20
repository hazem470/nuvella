import { useState } from 'react'
import { brand, product } from '../data/brand.js'
import { useCart } from '../context/CartContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

/**
 * FinalCTA — the closing emotional pitch, set against the baby-care background.
 */
export default function FinalCTA() {
  const { addItem, open } = useCart()
  const [added, setAdded] = useState(false)

  const shop = () => {
    addItem({
      id: 'nuvella-daily-comfort',
      name: brand.fullProductName,
      variant: 'Scented',
      size: product.size,
      price: product.price,
      qty: 1,
      image: './images/front.svg',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2400)
  }

  return (
    <section className="relative overflow-hidden bg-ink-700 py-24 sm:py-28">
      {/* Background image + scrim */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="./images/background.svg"
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
            Begin the routine
          </p>

          <h2 className="text-balance font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl">
            The quietest part of the day can also be the softest.
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-cream-200/85">
            One bottle, one minute, twice a day. That is the whole routine — and it is enough.
            Start with {brand.productName} today.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={shop} className="btn btn-primary btn-lg">
              {added ? (
                <>
                  <Icon name="Check" size={18} strokeWidth={2.4} />
                  Added to Bag
                </>
              ) : (
                <>
                  Shop Now
                  <Icon name="ArrowRight" size={18} />
                </>
              )}
            </button>
            <a href="#product" className="btn btn-lg border border-cream-200/25 text-cream-100 hover:bg-cream-100/10">
              View the Product
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream-200/15 pt-8">
            {[
              { k: '250 ml', v: 'Standard size' },
              { k: '22', v: 'Ingredients' },
              { k: '~30 sec', v: 'To absorb' },
            ].map((s) => (
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

import { brand } from '../data/brand.js'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'

/**
 * BrandStory — the narrative block. Sits between the product and the benefits
 * to give the page a human centre.
 */
export default function BrandStory() {
  return (
    <section id="story" className="section bg-cream-50">
      <div className="container-nuvella">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="overflow-hidden rounded-[2.5rem] border border-ink-700/5 shadow-soft">
            <img
              src="./images/lifestyle.svg"
              alt="A parent's hands smoothing lotion onto a baby's arm — demo lifestyle visual"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              Our story
            </p>

            <h2 className="text-balance font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
              Made for the minute after the bath.
            </h2>

            <p className="mt-6 text-pretty leading-relaxed text-ink-500">{brand.story}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { icon: 'Heart', k: 'Personality', v: brand.personality.join(' · ') },
                { icon: 'Baby', k: 'Made for', v: brand.audience },
              ].map((row) => (
                <div key={row.k} className="rounded-3xl border border-ink-700/5 bg-cream-100 p-6">
                  <dt className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-clay-500">
                    <Icon name={row.icon} size={14} />
                    {row.k}
                  </dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-600">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

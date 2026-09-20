import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import StarRating from './StarRating.jsx'

const DISTRIBUTION = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 7 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
]

/**
 * Reviews — demo testimonial cards with a rating summary. Everything here is
 * clearly labelled as placeholder content.
 */
export default function Reviews() {
  const { t, isRTL } = useLang()
  const locale = isRTL ? 'ar-EG' : 'en-US'

  return (
    <section id="reviews" className="section bg-cream-50">
      <div className="container-nuvella">
        <SectionHeading
          eyebrow={t.ui.reviewsEyebrow}
          title={t.ui.reviewsTitle}
          subtitle={t.ui.reviewsSub}
        />

        {/* Summary */}
        <Reveal delay={120} className="mt-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[2rem] border border-ink-700/5 bg-cream-100 p-8 shadow-soft sm:flex-row sm:gap-12">
            <div className="text-center sm:text-start">
              <p className="font-display text-5xl text-ink-900">{t.product.rating}</p>
              <StarRating
                value={t.product.rating}
                size={17}
                className="mt-2 justify-center sm:justify-start"
              />
              <p className="mt-2 text-xs text-ink-400">
                {t.ui.reviewsBasedOn} {t.product.ratingCount.toLocaleString(locale)}{' '}
                {t.ui.reviewsDemoWord}
              </p>
            </div>

            <ul className="w-full space-y-2">
              {DISTRIBUTION.map((d) => (
                <li key={d.stars} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-xs text-ink-400">
                    {d.stars} {isRTL ? 'نجوم' : 'star'}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-300">
                    <span
                      className="block h-full rounded-full bg-clay-400 transition-all duration-1000"
                      style={{ width: `${d.pct}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-end text-xs text-ink-400">{d.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <article className="card card-hover flex h-full flex-col p-7">
                <StarRating value={r.rating} size={14} />

                <h3 className="mt-4 font-display text-lg leading-snug text-ink-900">“{r.title}”</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{r.text}</p>

                <footer className="mt-6 flex items-center gap-3 border-t border-ink-700/8 pt-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-500/12 font-display text-sm text-clay-600">
                    {r.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink-700">{r.name}</span>
                    <span className="block text-xs text-ink-400">
                      {r.location} · {r.date}
                    </span>
                  </span>
                  {r.verified && (
                    <span className="ms-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-sage-100 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-sage-600">
                      <Icon name="Check" size={10} strokeWidth={2.6} />
                      {t.ui.reviewsBadge}
                    </span>
                  )}
                </footer>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-8 text-center">
          <p className="mx-auto max-w-2xl rounded-2xl bg-cream-200/70 px-5 py-4 text-xs leading-relaxed text-ink-500">
            {t.ui.reviewsDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

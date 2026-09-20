import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'

/**
 * BrandStory — the narrative block between the product and the benefits.
 */
export default function BrandStory() {
  const { t } = useLang()

  const rows = [
    { icon: 'Heart', k: t.ui.personalityLabel, v: t.brand.personality.join(' · ') },
    { icon: 'Baby', k: t.ui.audienceLabel, v: t.brand.audience },
  ]

  return (
    <section id="story" className="section bg-cream-50">
      <div className="container-nuvella">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="overflow-hidden rounded-[2.5rem] border border-ink-700/5 shadow-soft">
            <img
              src={t.imageAssets.lifestyle}
              alt={`${t.ui.galleryLifestyle} — demo lifestyle visual`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              {t.ui.storyEyebrow}
            </p>

            <h2 className="text-balance font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
              {t.ui.storyTitle}
            </h2>

            <p className="mt-6 text-pretty leading-relaxed text-ink-500">{t.brand.story}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {rows.map((row) => (
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

import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Benefits — four benefit cards, the "Why Choose Us" block, and the three-step
 * "How To Use" process. All copy is language-aware.
 */
export default function Benefits() {
  const { t, isRTL } = useLang()

  return (
    <>
      {/* ── Benefits ─────────────────────────────────────────── */}
      <section id="benefits" className="section bg-cream-50">
        <div className="container-nuvella">
          <SectionHeading
            eyebrow={t.ui.benefitsEyebrow}
            title={t.ui.benefitsTitle}
            subtitle={t.ui.benefitsSub}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <article className="card card-hover group h-full p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cream-200 text-clay-500 transition-all duration-500 group-hover:bg-clay-500 group-hover:text-cream-50">
                    <Icon name={b.icon} size={24} />
                  </span>
                  <h3 className="mt-6 font-display text-xl text-ink-900">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section id="why-us" className="section bg-cream-100">
        <div className="container-nuvella">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow={t.ui.whyEyebrow}
                title={t.ui.whyTitle}
                subtitle={t.ui.whySub}
              />

              <Reveal delay={120} className="mt-10 overflow-hidden rounded-[2rem] border border-ink-700/5 shadow-soft">
                <img
                  src={t.imageAssets.detail}
                  alt={`${t.ui.galleryDetail} — demo packaging visual`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {t.whyChooseUs.map((w, i) => (
                <Reveal key={w.title} delay={i * 90}>
                  <article className="card card-hover group h-full p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-600 transition-all duration-500 group-hover:bg-sage-500 group-hover:text-cream-50">
                      <Icon name={w.icon} size={21} />
                    </span>
                    <h3 className="mt-5 font-display text-lg text-ink-900">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{w.text}</p>
                  </article>
                </Reveal>
              ))}

              <Reveal delay={380} className="sm:col-span-2">
                <div className="rounded-3xl border border-clay-300/40 bg-clay-500/5 p-7">
                  <p className="font-display text-lg text-ink-900">{t.brand.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{t.brand.promise}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── How To Use ───────────────────────────────────────── */}
      <section id="how-to-use" className="section bg-cream-50">
        <div className="container-nuvella">
          <SectionHeading eyebrow={t.ui.howEyebrow} title={t.ui.howTitle} subtitle={t.ui.howSub} />

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {t.product.howToUse.map((s, i) => (
              <Reveal key={s.step} delay={i * 110}>
                <li className="relative h-full">
                  <div className="card card-hover h-full p-8">
                    <span className="font-display text-4xl text-clay-300">{s.step}</span>
                    <h3 className="mt-4 font-display text-xl text-ink-900">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{s.text}</p>
                  </div>
                  {i < t.product.howToUse.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -end-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center text-clay-300 md:flex"
                    >
                      <Icon name="ArrowRight" size={18} className={isRTL ? 'rotate-180' : ''} />
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={340} className="mt-10 text-center">
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-ink-400">
              {t.product.safety.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

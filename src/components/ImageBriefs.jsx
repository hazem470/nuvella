import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * ImageBriefs — a collapsible appendix documenting every required photograph,
 * its art direction, and a ready-to-use generation prompt.
 * Prompts stay in English (they are tool input, not page copy).
 */
export default function ImageBriefs() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <section id="visuals" className="border-t border-ink-700/5 bg-cream-100 py-16">
      <div className="container-nuvella">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={t.ui.briefsEyebrow}
            title={t.ui.briefsTitle}
            subtitle={t.ui.briefsSub}
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="image-briefs"
            className="btn btn-secondary btn-md shrink-0"
          >
            {open ? t.ui.hideBriefs : t.ui.showBriefs}
            <Icon name="ChevronDown" size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div
          id="image-briefs"
          className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'mt-10 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.imageBriefs.map((b, i) => (
                <Reveal key={b.id} delay={i * 60}>
                  <article className="card h-full p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base text-ink-900">{b.title}</h3>
                      <span className="shrink-0 rounded-full bg-cream-200 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-ink-400">
                        {b.ratio}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{b.description}</p>

                    <details className="group mt-4">
                      <summary className="cursor-pointer list-none text-xs font-medium text-clay-600 hover:text-clay-700">
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="Sparkle" size={13} />
                          {t.ui.viewPrompt}
                        </span>
                      </summary>
                      <p
                        className="mt-3 rounded-2xl bg-cream-100 px-4 py-3 font-mono text-[0.7rem] leading-relaxed text-ink-500"
                        dir="ltr"
                      >
                        {b.prompt}
                      </p>
                    </details>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 rounded-2xl bg-cream-200/70 px-5 py-4 text-xs leading-relaxed text-ink-500">
              {t.ui.briefsNote1}{' '}
              <code className="font-mono" dir="ltr">
                public/images/
              </code>{' '}
              {t.ui.briefsNote2}{' '}
              <code className="font-mono" dir="ltr">
                imageAssets
              </code>{' '}
              {t.ui.briefsNote3}{' '}
              <code className="font-mono" dir="ltr">
                src/i18n/content.en.js
              </code>{' '}
              {t.ui.briefsNote4}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

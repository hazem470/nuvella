import { useState } from 'react'
import { imageBriefs } from '../data/brand.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * ImageBriefs — an optional, collapsible appendix that documents every required
 * photograph, its art direction, and a ready-to-use generation prompt. Hand this
 * page to a photographer or a diffusion model to replace the demo SVGs.
 */
export default function ImageBriefs() {
  const [open, setOpen] = useState(false)

  return (
    <section id="visuals" className="border-t border-ink-700/5 bg-cream-100 py-16">
      <div className="container-nuvella">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="For the design team"
            title="Photography briefs"
            subtitle="Every visual on this page is a self-contained demo illustration. Below is the art direction and a ready-to-use prompt for the real photograph that replaces it."
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="image-briefs"
            className="btn btn-secondary btn-md shrink-0"
          >
            {open ? 'Hide briefs' : 'Show briefs'}
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
              {imageBriefs.map((b, i) => (
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
                          View generation prompt
                        </span>
                      </summary>
                      <p className="mt-3 rounded-2xl bg-cream-100 px-4 py-3 font-mono text-[0.7rem] leading-relaxed text-ink-500">
                        {b.prompt}
                      </p>
                    </details>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 rounded-2xl bg-cream-200/70 px-5 py-4 text-xs leading-relaxed text-ink-500">
              Replace the demo SVGs in <code className="font-mono">public/images/</code> with your own
              licensed photography, keeping the same filenames — or point{' '}
              <code className="font-mono">imageAssets</code> in{' '}
              <code className="font-mono">src/data/brand.js</code> at new paths. Do not link to
              third-party image URLs you do not have rights to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { ingredients } from '../data/brand.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Ingredients — a premium card grid with icons, plus an honest note about the
 * placeholder nature of the list.
 */
export default function Ingredients() {
  return (
    <section id="ingredients" className="section relative overflow-hidden bg-cream-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] animate-drift rounded-full bg-sage-200/30 blur-3xl"
      />

      <div className="container-nuvella relative">
        <SectionHeading
          eyebrow="What is inside"
          title="A short list, each with a reason to be there"
          subtitle="Twenty-two ingredients in total. These are the eight that do the visible work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={i * 70}>
              <article className="card card-hover group flex h-full flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-200 text-sage-600 transition-all duration-500 group-hover:bg-sage-500 group-hover:text-cream-50">
                  <Icon name={ing.icon} size={20} />
                </span>

                <h3 className="mt-5 font-display text-base leading-snug text-ink-900">{ing.name}</h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-clay-500">{ing.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{ing.text}</p>

                {ing.placeholder && (
                  <span className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink-400">
                      <Icon name="Clock" size={11} />
                      Demo ingredient
                    </span>
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Full-list disclosure */}
        <Reveal delay={200} className="mt-12">
          <div className="rounded-[2rem] border border-ink-700/5 bg-cream-50 p-8 shadow-soft">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
                  Full disclosure
                </p>
                <h3 className="font-display text-xl text-ink-900">Placeholder ingredient content</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  This ingredient list is illustrative demo content for a fictional product. A real
                  commercial formula requires a documented INCI list, a supplier-verified
                  specification for every material, allergen declaration, and a Cosmetic Product
                  Safety Report (CPSR) signed by a qualified safety assessor before the product can
                  be placed on the market.
                </p>
              </div>

              <ul className="grid shrink-0 gap-2.5 text-sm text-ink-500">
                {[
                  'No synthetic dyes',
                  'No drying alcohols',
                  'No essential oils',
                  'Fragrance under 0.3%',
                  'Mildly acidic pH',
                ].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2.5">
                    <Icon name="CheckCircle2" size={15} className="text-sage-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

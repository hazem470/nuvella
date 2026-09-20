import { useState } from 'react'
import { faqs, contact } from '../data/brand.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * FAQ — an accessible accordion (one panel open at a time) plus a contact card.
 */
export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section bg-cream-100">
      <div className="container-nuvella">
        <SectionHeading
          eyebrow="Questions, answered"
          title="Everything you might want to ask"
          subtitle="If your question is not here, our care team replies within one working day."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = open === i
              const panelId = `faq-panel-${i}`
              const buttonId = `faq-button-${i}`
              return (
                <Reveal key={item.q} delay={i * 60}>
                  <div
                    className={`overflow-hidden rounded-3xl border bg-cream-50 transition-all duration-300 ${
                      isOpen ? 'border-clay-300/60 shadow-soft' : 'border-ink-700/5'
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="font-display text-base text-ink-900 sm:text-lg">{item.q}</span>
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                            isOpen ? 'rotate-180 bg-clay-500 text-cream-50' : 'bg-cream-200 text-ink-500'
                          }`}
                        >
                          <Icon name="ChevronDown" size={17} strokeWidth={2} />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink-500">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Contact card */}
          <Reveal delay={200}>
            <aside className="sticky top-28 rounded-[2rem] border border-ink-700/5 bg-cream-50 p-8 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-500/12 text-clay-600">
                <Icon name="HeartHandshake" size={22} />
              </span>

              <h3 className="mt-5 font-display text-xl text-ink-900">Still wondering?</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                Our care team is small and human. Ask us anything about the formula, the packaging or
                the routine — we will answer properly.
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Icon name="Mail" size={16} className="mt-0.5 shrink-0 text-clay-500" />
                  <span>
                    <span className="block text-ink-400">Email</span>
                    <a href={`mailto:${contact.care}`} className="link-underline text-ink-700">
                      {contact.care}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Phone" size={16} className="mt-0.5 shrink-0 text-clay-500" />
                  <span>
                    <span className="block text-ink-400">Phone</span>
                    <span className="text-ink-700">{contact.phone}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Clock" size={16} className="mt-0.5 shrink-0 text-clay-500" />
                  <span>
                    <span className="block text-ink-400">Hours</span>
                    <span className="text-ink-700">{contact.hours}</span>
                  </span>
                </li>
              </ul>

              <a href="#contact" className="btn btn-secondary btn-md mt-7 w-full">
                Contact Us
                <Icon name="ArrowRight" size={16} />
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

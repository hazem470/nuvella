import { useState } from 'react'
import { brand, contact, footerLinks, legal, social } from '../data/brand.js'
import Icon from './Icon.jsx'
import Wordmark from './Wordmark.jsx'

/**
 * Footer — brand column, three link columns, contact block, socials and the
 * legal strip with privacy / terms modals.
 */
export default function Footer() {
  const [modal, setModal] = useState(null)
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="border-t border-ink-700/5 bg-cream-50">
        <div className="container-nuvella py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand column */}
            <div className="max-w-sm">
              <a href="#home" className="inline-flex items-center gap-2.5" aria-label="Nuvella — home">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-clay-500 text-cream-50">
                  <Icon name="Baby" size={20} strokeWidth={1.7} />
                </span>
                <Wordmark className="text-xl" />
              </a>

              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                {brand.tagline} A small, considered range of everyday baby care — made to be used
                daily and thought about rarely.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`${s.label} (placeholder link)`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink-700/10 text-ink-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-600"
                    >
                      <Icon name={s.icon} size={17} />
                    </a>
                  </li>
                ))}
              </ul>

              <form
                className="mt-7"
                onSubmit={(e) => {
                  e.preventDefault()
                  e.currentTarget.reset()
                }}
              >
                <label htmlFor="footer-email" className="text-xs uppercase tracking-[0.16em] text-ink-400">
                  Join the quiet list
                </label>
                <div className="mt-2.5 flex gap-2">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="field"
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary shrink-0 px-4"
                    aria-label="Subscribe to the newsletter"
                  >
                    <Icon name="Send" size={17} />
                  </button>
                </div>
                <p className="mt-2 text-[0.7rem] text-ink-400">
                  Demo form — no data is transmitted or stored.
                </p>
              </form>
            </div>

            {/* About */}
            <nav aria-label="About">
              <h2 className="font-display text-base text-ink-900">About</h2>
              <ul className="mt-5 space-y-3">
                {footerLinks.about.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick links */}
            <nav aria-label="Quick links">
              <h2 className="font-display text-base text-ink-900">Quick Links</h2>
              <ul className="mt-5 space-y-3">
                {footerLinks.quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Customer care */}
            <nav aria-label="Customer care">
              <h2 className="font-display text-base text-ink-900">Customer Care</h2>
              <ul className="mt-5 space-y-3">
                {footerLinks.customerCare.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact block */}
          <div id="contact" className="mt-14 grid gap-6 rounded-[2rem] border border-ink-700/5 bg-cream-100 p-8 sm:grid-cols-3">
            {[
              { icon: 'Mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              { icon: 'Phone', label: 'Phone', value: contact.phone },
              { icon: 'MapPin', label: 'Studio', value: contact.address },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream-50 text-clay-500 shadow-soft">
                  <Icon name={c.icon} size={17} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-400">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="link-underline mt-1 block text-sm text-ink-700">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal strip */}
        <div className="border-t border-ink-700/5">
          <div className="container-nuvella flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-ink-400">
              © {year} {brand.name}. A fictional brand created for this demo storefront.
            </p>

            <div className="flex items-center gap-6">
              <button type="button" onClick={() => setModal('privacy')} className="link-underline text-xs">
                Privacy Policy
              </button>
              <button type="button" onClick={() => setModal('terms')} className="link-underline text-xs">
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      {modal && (
        <div className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <div
            className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm"
            onClick={() => setModal(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            className="relative max-h-[85vh] w-full max-w-2xl animate-fadeUp overflow-y-auto rounded-t-[2rem] bg-cream-50 p-8 shadow-lift sm:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-6">
              <h2 id="legal-title" className="font-display text-2xl text-ink-900">
                {modal === 'privacy' ? legal.privacyTitle : legal.termsTitle}
              </h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-500 transition-colors hover:bg-cream-200 hover:text-ink-900"
              >
                <Icon name="Plus" size={18} className="rotate-45" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-500">
              {(modal === 'privacy' ? legal.privacy : legal.terms).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-7 flex justify-end">
              <button type="button" onClick={() => setModal(null)} className="btn btn-secondary btn-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

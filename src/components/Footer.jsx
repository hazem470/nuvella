import { useState } from 'react'
import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import Wordmark from './Wordmark.jsx'

/**
 * Footer — brand column, three link columns, contact block (Telegram first),
 * socials and the legal strip with privacy / terms modals.
 */
export default function Footer() {
  const { t, isRTL } = useLang()
  const [modal, setModal] = useState(null)
  const year = new Date().getFullYear()

  const columns = [
    { title: t.ui.footerAboutTitle, aria: t.ui.a11yAbout, links: t.footerLinks.about },
    { title: t.ui.footerQuickLinks, aria: t.ui.a11yQuickLinks, links: t.footerLinks.quickLinks },
    { title: t.ui.footerCustomerCare, aria: t.ui.a11yCustomerCare, links: t.footerLinks.customerCare },
  ]

  return (
    <>
      <footer className="border-t border-ink-700/5 bg-cream-50">
        <div className="container-nuvella py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand column */}
            <div className="max-w-sm">
              <a href="#home" className="inline-flex items-center gap-2.5" aria-label={t.ui.a11yHome}>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-clay-500 text-cream-50">
                  <Icon name="Baby" size={20} strokeWidth={1.7} />
                </span>
                <Wordmark className="text-xl" />
              </a>

              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                {t.brand.tagline} {t.ui.footerAbout}
              </p>

              {/* Telegram — prominent in the footer, above the socials */}
              <div className="mt-6">
                <p className="mb-2.5 text-xs uppercase tracking-[0.16em] text-ink-400">
                  {t.ui.footerTelegramHeading}
                </p>
                <a
                  href={config.contact.telegram.url}
                  target="_blank"
                  rel={config.contact.telegram.rel}
                  aria-label={t.ui.a11yTelegram}
                  className="inline-flex items-center gap-3 rounded-2xl border border-[#229ED9]/25 bg-[#229ED9]/8 px-4 py-3 text-sm font-medium text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#229ED9]/50 hover:bg-[#229ED9]/12"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#229ED9] text-white">
                    <Icon name="Send" size={17} />
                  </span>
                  <span>
                    <span className="block">{t.contact.telegramLabel}</span>
                    <span className="block text-xs text-ink-400" dir="ltr">
                      {t.contact.telegramHandle}
                    </span>
                  </span>
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {t.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`${s.label} (${t.ui.a11yPlaceholderLink})`}
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
                  {t.ui.footerNewsletterLabel}
                </label>
                <div className="mt-2.5 flex gap-2">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="field"
                    autoComplete="email"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary shrink-0 px-4"
                    aria-label={t.ui.a11ySubscribe}
                  >
                    <Icon name="Send" size={17} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                </div>
                <p className="mt-2 text-[0.7rem] text-ink-400">{t.ui.footerNewsletterNote}</p>
              </form>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.aria}>
                <h2 className="font-display text-base text-ink-900">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link-underline text-sm">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Contact block */}
          <div
            id="contact"
            className="mt-14 grid gap-6 rounded-[2rem] border border-ink-700/5 bg-cream-100 p-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Telegram first — the primary channel */}
            <a
              href={config.contact.telegram.url}
              target="_blank"
              rel={config.contact.telegram.rel}
              className="flex items-start gap-3.5 rounded-2xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#229ED9] text-white shadow-soft">
                <Icon name="Send" size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.14em] text-ink-400">Telegram</span>
                <span className="mt-1 block text-sm text-ink-700" dir="ltr">
                  {t.contact.telegramHandle}
                </span>
              </span>
            </a>

            {[
              { icon: 'Mail', label: t.ui.labelEmail, value: t.contact.email, href: `mailto:${t.contact.email}` },
              { icon: 'Phone', label: t.ui.labelPhone, value: t.contact.phone, ltr: true },
              { icon: 'MapPin', label: t.ui.labelStudio, value: t.contact.address },
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
                    <p
                      className="mt-1 text-sm leading-relaxed text-ink-700"
                      dir={c.ltr ? 'ltr' : undefined}
                    >
                      {c.value}
                    </p>
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
              © {year} {t.brand.name}. {t.ui.footerCopyright}
            </p>

            <div className="flex items-center gap-6">
              <button type="button" onClick={() => setModal('privacy')} className="link-underline text-xs">
                {t.legal.privacyTitle}
              </button>
              <button type="button" onClick={() => setModal('terms')} className="link-underline text-xs">
                {t.legal.termsTitle}
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
                {modal === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle}
              </h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label={t.ui.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-500 transition-colors hover:bg-cream-200 hover:text-ink-900"
              >
                <Icon name="Plus" size={18} className="rotate-45" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-500">
              {(modal === 'privacy' ? t.legal.privacy : t.legal.terms).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-7 flex justify-end">
              <button type="button" onClick={() => setModal(null)} className="btn btn-secondary btn-md">
                {t.ui.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

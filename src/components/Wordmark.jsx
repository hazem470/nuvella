import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * Wordmark — the Nuvella logo lockup, set in the display serif with a clay-rose
 * dot. The Latin wordmark is kept as-is in both languages (brand marks are not
 * translated), so it always renders LTR even inside the RTL layout.
 */
export default function Wordmark({ className = 'text-xl' }) {
  const { t } = useLang()

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`} dir="ltr">
      <span className="font-display font-medium tracking-[-0.02em] text-ink-900">
        {t.brand.wordmark.charAt(0)}
        {t.brand.wordmark.slice(1).toLowerCase()}
      </span>
      <span aria-hidden="true" className="mb-0.5 inline-block h-1 w-1 rounded-full bg-clay-500" />
      <span className="sr-only">{t.brand.productName}</span>
    </span>
  )
}

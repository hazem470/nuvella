import { useCart } from '../context/CartContext.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

/**
 * Toast — a single, unobtrusive notification for cart actions.
 * Position and icon direction mirror automatically under RTL.
 */
export default function Toast() {
  const { notice, dismissNotice } = useCart()
  const { t } = useLang()
  if (!notice) return null

  const tone =
    notice.tone === 'error'
      ? 'border-clay-600/30 bg-clay-600 text-cream-50'
      : 'border-ink-700/10 bg-cream-50 text-ink-700'

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 sm:inset-x-auto sm:end-6 sm:justify-end"
    >
      <div
        key={notice.id}
        className={`pointer-events-auto flex max-w-sm animate-fadeUp items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lift ${tone}`}
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-500/15 text-sage-600">
          <Icon name="Check" size={16} strokeWidth={2} />
        </span>
        <p className="text-pretty">{notice.message}</p>
        <button
          type="button"
          onClick={dismissNotice}
          aria-label={t.ui.a11yDismiss}
          className="ms-1 rounded-full p-1 text-ink-400 transition-colors hover:bg-ink-700/5 hover:text-ink-700"
        >
          <Icon name="Plus" size={14} className="rotate-45" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

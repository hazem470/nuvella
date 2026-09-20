import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

/**
 * LanguageSwitcher — toggles between English (🇬🇧) and العربية (🇪🇬).
 * Shows the language you would switch TO, which is the convention users expect.
 * Compact on mobile (flag + code), full label from `sm` up.
 */
export default function LanguageSwitcher({ className = '', variant = 'pill' }) {
  const { t, toggle, isRTL } = useLang()

  const base =
    'group inline-flex shrink-0 items-center gap-2 rounded-full border transition-all duration-300'
  const styles =
    variant === 'ghost'
      ? 'border-transparent text-cream-100 hover:bg-cream-100/10'
      : 'border-ink-700/10 bg-cream-50/70 text-ink-600 hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-600'

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${base} ${styles} h-11 px-3 sm:px-4 ${className}`}
      aria-label={t.meta.switchLabel}
      title={t.meta.switchLabel}
    >
      <Icon name="Languages" size={17} strokeWidth={1.8} />
      <span className="flex items-center gap-1.5 text-sm font-medium">
        <span aria-hidden="true" className="text-base leading-none">
          {t.meta.flag}
        </span>
        {/* Full label on larger screens; short code on very small ones */}
        <span className="hidden sm:inline">{t.meta.switchTo}</span>
        <span className="sm:hidden">{t.meta.short}</span>
      </span>
      {/* Direction cue, mirrored automatically by the RTL layout */}
      <Icon
        name="ArrowRight"
        size={14}
        className={`text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 ${
          isRTL ? 'rotate-180' : ''
        }`}
      />
    </button>
  )
}

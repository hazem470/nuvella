import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

/**
 * TelegramButton — opens https://t.me/Hazem455ziad in a new tab on desktop and
 * hands off to the Telegram app on mobile (t.me universal links do this
 * automatically). `variant` controls the visual weight.
 */
export default function TelegramButton({ variant = 'solid', className = '', showHandle = true }) {
  const { t } = useLang()

  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300'
  const variants = {
    solid: 'bg-[#229ED9] text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#1d8ec4]',
    outline:
      'border border-ink-700/12 bg-cream-50 text-ink-700 hover:-translate-y-0.5 hover:border-[#229ED9]/40 hover:text-[#1d8ec4]',
    ghost: 'border border-cream-200/25 text-cream-100 hover:bg-cream-100/10',
  }
  const sizes = { md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base', sm: 'px-4 py-2 text-xs' }

  return (
    <a
      href={config.contact.telegram.url}
      target="_blank"
      rel={config.contact.telegram.rel}
      aria-label={t.ui.a11yTelegram}
      className={`${base} ${variants[variant]} ${sizes.md} ${className}`}
    >
      <Icon name="Send" size={variant === 'lg' ? 18 : 16} />
      <span>{t.contact.telegramLabel}</span>
      {showHandle && (
        <span className="hidden opacity-70 sm:inline" dir="ltr">
          {t.contact.telegramHandle}
        </span>
      )}
    </a>
  )
}

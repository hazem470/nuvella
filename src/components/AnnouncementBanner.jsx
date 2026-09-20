import { config } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

/**
 * AnnouncementBanner — slim pre-launch notice pinned above the navbar.
 *
 * · Full message from `md` up, short message on small screens.
 * · Links to Telegram so visitors can follow the launch.
 * · Dismissible; the choice is remembered for the session.
 * · Hidden entirely once config.preLaunch is false.
 */
export default function AnnouncementBanner() {
  const { t } = useLang()

  if (!config.preLaunch) return null

  return (
    <div className="relative bg-clay-500 text-cream-50">
      <div className="container-nuvella flex items-center justify-center gap-3 py-2.5">
        <p className="text-center text-[0.72rem] font-medium leading-snug tracking-wide sm:text-xs">
          <span className="hidden md:inline">{t.announcement.text}</span>
          <span className="md:hidden">{t.announcement.short}</span>
        </p>

        <a
          href={config.contact.telegram.url}
          target="_blank"
          rel={config.contact.telegram.rel}
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-cream-50/15 px-3 py-1 text-[0.68rem] font-medium transition-colors hover:bg-cream-50/25 lg:inline-flex"
        >
          <Icon name="Send" size={12} />
          {t.announcement.cta}
        </a>
      </div>
    </div>
  )
}

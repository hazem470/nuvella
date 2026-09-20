import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { content as en } from './content.en.js'
import { content as ar } from './content.ar.js'

/**
 * LanguageProvider — site-wide bilingual support.
 *
 *  · Default language: English.
 *  · Choice persists in localStorage ('nuvella.lang') so a refresh keeps it.
 *  · Sets <html lang> and <html dir> (ltr / rtl) on every change.
 *  · `t` is the active content tree — components read t.ui.shopNow, etc.
 */

const LanguageContext = createContext(null)
const STORAGE_KEY = 'nuvella.lang'
const DEFAULT_LANG = 'en'

const DICTIONARIES = { en, ar }

/** Prices: "349 EGP" in English, "349 جنيه" in Arabic. */
function formatPrice(value, lang) {
  const n = Number(value)
  const num = Number.isInteger(n) ? String(n) : n.toFixed(2)
  return lang === 'ar' ? `${num} جنيه` : `${num} EGP`
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG)

  /* ── Restore the saved language on first mount ──────────────── */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved && DICTIONARIES[saved]) setLang(saved)
    } catch {
      /* storage unavailable — stay on the default */
    }
  }, [])

  /* ── Keep <html lang> / <html dir> and storage in sync ──────── */
  useEffect(() => {
    const t = DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANG]
    const root = document.documentElement

    root.setAttribute('lang', t.meta.code)
    root.setAttribute('dir', t.meta.dir)

    // Reflect direction on the body too, so portalled/absolute layers that
    // sit outside <html> styling still pick up the correct writing mode.
    document.body.setAttribute('dir', t.meta.dir)

    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  const value = useMemo(() => {
    const t = DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANG]
    return {
      lang,
      dir: t.meta.dir,
      isRTL: t.meta.dir === 'rtl',
      t, // active content tree
      setLang,
      toggle,
      /** Format an EGP amount for the active language. */
      price: (v) => formatPrice(v, lang),
    }
  }, [lang, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}

export { formatPrice }

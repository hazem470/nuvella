import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

/**
 * ProductGallery — thumbnail rail + main stage, with keyboard navigation and a
 * lightweight zoom-on-hover for desktop pointers.
 * Arrow-key handling follows the writing direction: in RTL, ArrowLeft advances.
 */
export default function ProductGallery({ images = [], alt = '' }) {
  const { t, isRTL } = useLang()
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const stageRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      const forward = isRTL ? 'ArrowLeft' : 'ArrowRight'
      const back = isRTL ? 'ArrowRight' : 'ArrowLeft'
      if (e.key === forward) setIndex((i) => (i + 1) % images.length)
      if (e.key === back) setIndex((i) => (i - 1 + images.length) % images.length)
    }
    const node = stageRef.current
    node?.addEventListener('keydown', onKey)
    return () => node?.removeEventListener('keydown', onKey)
  }, [images.length, isRTL])

  const move = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  const active = images[index]

  return (
    <div className="flex min-w-0 flex-col-reverse gap-4 sm:flex-row sm:gap-5">
      {/* Thumbnails */}
      <div
        className="no-scrollbar flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible"
        role="tablist"
        aria-label={t.ui.a11yProductImages}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${t.ui.a11yViewImage} ${img.label}`}
            onClick={() => setIndex(i)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-cream-200 transition-all duration-300 ${
              i === index
                ? 'border-clay-400 shadow-glow'
                : 'border-ink-700/5 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="relative flex-1">
        <div
          ref={stageRef}
          tabIndex={0}
          role="group"
          aria-label={t.ui.galleryAlt}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={move}
          className="group relative aspect-square overflow-hidden rounded-[2rem] border border-ink-700/5 bg-cream-50 shadow-soft focus-visible:outline-none"
        >
          <img
            src={active.src}
            alt={`${alt} — ${active.label}`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{
              transform: zoom ? 'scale(1.55)' : 'scale(1)',
              transformOrigin: origin,
            }}
          />

          <span className="pointer-events-none absolute start-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-ink-500 backdrop-blur">
            {active.label}
          </span>

          <span className="pointer-events-none absolute bottom-4 end-4 hidden items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1 text-[0.65rem] text-ink-400 backdrop-blur sm:inline-flex">
            <Icon name="Sparkle" size={12} />
            {t.ui.hoverToZoom}
          </span>

          {/* Prev / next — placed with logical properties so RTL mirrors correctly */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label={t.ui.a11yPrevImage}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-700/5 bg-cream-50/90 text-ink-600 opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:text-clay-600 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Icon name="ArrowRight" size={17} className="rotate-180" />
            </button>
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label={t.ui.a11yNextImage}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-700/5 bg-cream-50/90 text-ink-600 opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:text-clay-600 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Icon name="ArrowRight" size={17} />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-ink-400 sm:text-start">{t.ui.demoVisualNote}</p>
      </div>
    </div>
  )
}

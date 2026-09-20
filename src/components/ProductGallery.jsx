import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

/**
 * ProductGallery — thumbnail rail + main stage, with keyboard navigation and a
 * lightweight zoom-on-hover for desktop pointers.
 */
export default function ProductGallery({ images = [], alt = '' }) {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const stageRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
    }
    const node = stageRef.current
    node?.addEventListener('keydown', onKey)
    return () => node?.removeEventListener('keydown', onKey)
  }, [images.length])

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
        aria-label="Product images"
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`View ${img.label}`}
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
          aria-label="Product image viewer — use the left and right arrow keys to change image"
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

          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-ink-500 backdrop-blur">
            {active.label}
          </span>

          <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1 text-[0.65rem] text-ink-400 backdrop-blur sm:inline-flex">
            <Icon name="Sparkle" size={12} />
            Hover to zoom
          </span>

          {/* Prev / next */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-700/5 bg-cream-50/90 text-ink-600 opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:text-clay-600 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Icon name="ArrowRight" size={17} className="rotate-180" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Next image"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-700/5 bg-cream-50/90 text-ink-600 opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:text-clay-600 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Icon name="ArrowRight" size={17} />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-ink-400 sm:text-left">
          Demo visual — replace with product photography.
        </p>
      </div>
    </div>
  )
}

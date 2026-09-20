import { brand } from '../data/brand.js'

/**
 * Wordmark — the Nuvella logo lockup, set in the display serif with a clay-rose
 * dot above the "u" nod to the bottle's arc motif.
 */
export default function Wordmark({ className = 'text-xl', showTag = false }) {
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="font-display font-medium tracking-[-0.02em] text-ink-900">
        Nuvella
      </span>
      <span aria-hidden="true" className="mb-0.5 inline-block h-1 w-1 rounded-full bg-clay-500" />
      {showTag && (
        <span className="sr-only">{brand.productName}</span>
      )}
    </span>
  )
}

import Icon from './Icon.jsx'

/**
 * StarRating — accessible, read-only star display. Rounds to the nearest half.
 */
export default function StarRating({ value = 5, size = 15, className = '', showValue = false, count }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className="inline-flex items-center gap-0.5 text-clay-500"
        role="img"
        aria-label={`Rated ${value} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full
          const half = !filled && i === full && hasHalf
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Icon name="Star" size={size} className="absolute inset-0 text-clay-500/25" strokeWidth={1.5} />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? size / 2 : size }}
                >
                  <Icon name="Star" size={size} className="text-clay-500" fill="currentColor" strokeWidth={0} />
                </span>
              )}
            </span>
          )
        })}
      </span>
      {showValue && <span className="text-xs font-medium text-ink-600">{value.toFixed(1)}</span>}
      {typeof count === 'number' && (
        <span className="text-xs text-ink-400">({count.toLocaleString('en-US')})</span>
      )}
    </span>
  )
}

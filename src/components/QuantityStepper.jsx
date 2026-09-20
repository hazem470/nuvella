import Icon from './Icon.jsx'

/**
 * QuantityStepper — accessible +/- control with a direct numeric input.
 *
 * `setValue` receives an updater FUNCTION, not a plain number, so rapid clicks
 * and taps never race against a stale `value` prop:
 *   setValue((prev) => clamp(prev + 1))
 * It works with a plain React state setter (`setQty`) as-is. For a cart line,
 * pass `(fn) => setQty(line.key, fn)` — see CartContext.
 */
export default function QuantityStepper({
  value,
  setValue,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Quantity',
  className = '',
}) {
  const clamp = (n) => Math.max(min, Math.min(max, n))
  const dec = () => setValue((prev) => clamp(prev - 1))
  const inc = () => setValue((prev) => clamp(prev + 1))

  const dims = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const field = size === 'sm' ? 'h-9 w-12 text-sm' : 'h-11 w-14 text-base'

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ink-700/10 bg-cream-50 p-1 ${className}`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`grid ${dims} place-items-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-ink-900 disabled:opacity-35 disabled:hover:bg-transparent`}
      >
        <Icon name="Plus" size={15} className="rotate-45" strokeWidth={2} />
      </button>

      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const next = parseInt(e.target.value, 10)
          setValue(() => (Number.isNaN(next) ? min : clamp(next)))
        }}
        className={`${field} bg-transparent text-center font-medium tabular-nums text-ink-900 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />

      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`grid ${dims} place-items-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-ink-900 disabled:opacity-35 disabled:hover:bg-transparent`}
      >
        <Icon name="Plus" size={15} strokeWidth={2} />
      </button>
    </div>
  )
}

import { useReveal } from '../hooks/useReveal.js'

/**
 * Reveal — wraps children in a scroll-triggered fade-up. `delay` staggers grids.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

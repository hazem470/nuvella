import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to a ref and flips a boolean once
 * the element scrolls into view. Powers the `.reveal` / `.reveal-in` CSS pair.
 */
export function useReveal({ threshold = 0.16, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return

    // Graceful degradation: no observer → show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shown, threshold, rootMargin])

  return [ref, shown]
}

/** Locks body scroll while a drawer/modal is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

/** Fires a callback on Escape — used by the cart drawer and modals. */
export function useEscape(handler, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler, active])
}

/** Tracks whether the page has scrolled past a threshold (sticky navbar state). */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

/** Tracks which section id is currently in view, for nav highlighting. */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

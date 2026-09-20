import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { config } from '../config.js'

/**
 * CartProvider — a small, dependency-free cart store.
 * Persists to localStorage, exposes add / remove / setQty / clear and derived
 * totals, plus a transient `notice` used for toast notifications.
 *
 * Totals are computed in EGP using config.pricing, so repricing the store is a
 * one-file change.
 */

const CartContext = createContext(null)
const STORAGE_KEY = 'nuvella.cart.v1'

function lineId(id, variant) {
  return variant ? `${id}::${variant}` : id
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.items

    case 'add': {
      const { item } = action
      const key = lineId(item.id, item.variant)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: Math.min(l.qty + item.qty, 99) } : l,
        )
      }
      return [...state, { ...item, key }]
    }

    case 'remove':
      return state.filter((l) => l.key !== action.key)

    case 'qty':
      return state
        .map((l) =>
          l.key === action.key
            ? {
                ...l,
                qty: Math.max(
                  0,
                  Math.min(typeof action.qty === 'function' ? action.qty(l.qty) : action.qty, 99),
                ),
              }
            : l,
        )
        .filter((l) => l.qty > 0)

    case 'clear':
      return []

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setOpen] = useState(false)
  const [notice, setNotice] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  /* ── persistence ─────────────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) })
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [items, hydrated])

  /* ── toast auto-dismiss ──────────────────────────────────── */
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 3200)
    return () => clearTimeout(t)
  }, [notice])

  const notify = useCallback((message, tone = 'success') => {
    setNotice({ id: Date.now(), message, tone })
  }, [])

  const addItem = useCallback(
    (item, { openDrawer = false, message } = {}) => {
      dispatch({ type: 'add', item })
      // `message` lets the caller supply a localised string. The fallback keeps
      // the API usable from anywhere that does not care about translation.
      notify(message ?? `${item.name} added to your bag.`)
      if (openDrawer) setOpen(true)
    },
    [notify],
  )

  const removeItem = useCallback((key) => {
    dispatch({ type: 'remove', key })
  }, [])

  const setQty = useCallback((key, qty) => {
    // `qty` may be a number or an updater function (prev) => next, so steppers
    // never race against a stale value on rapid clicks.
    dispatch({ type: 'qty', key, qty })
  }, [])

  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo(() => {
    const count = items.reduce((n, l) => n + l.qty, 0)
    const subtotal = items.reduce((n, l) => n + l.qty * l.price, 0)
    const { freeShippingThreshold, shippingFee } = config.pricing
    const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : shippingFee
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingThreshold,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
      addItem,
      removeItem,
      setQty,
      clear,
      notice,
      notify,
      dismissNotice: () => setNotice(null),
    }
  }, [items, isOpen, addItem, removeItem, setQty, clear, notice, notify])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

export { lineId }

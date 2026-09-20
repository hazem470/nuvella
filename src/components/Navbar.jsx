import { useEffect, useRef, useState } from 'react'
import { navigation } from '../data/brand.js'
import { useCart } from '../context/CartContext.jsx'
import { useActiveSection, useBodyLock, useEscape, useScrolled } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import Wordmark from './Wordmark.jsx'

const SECTION_IDS = navigation.map((n) => n.href.replace('#', ''))

export default function Navbar() {
  const scrolled = useScrolled(28)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, open: openCart } = useCart()
  const menuRef = useRef(null)

  useBodyLock(menuOpen)
  useEscape(() => setMenuOpen(false), menuOpen)

  // Close the mobile menu when resizing up to desktop.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-ink-700 text-cream-100">
        <div className="container-nuvella flex items-center justify-center gap-2 py-2 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em]">
          <Icon name="Truck" size={14} />
          <span>Free shipping over $60 · 30-day returns, even opened</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ink-700/5 bg-cream-100/85 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-nuvella flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => go(e, '#home')}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Nuvella — home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-clay-500 text-cream-50 shadow-glow transition-transform duration-500 group-hover:rotate-6">
              <Icon name="Baby" size={20} strokeWidth={1.7} />
            </span>
            <Wordmark className="text-xl" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.href.replace('#', '')
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-clay-500 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-700/10 bg-cream-50/70 text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-600"
              aria-label={`Open shopping bag${count ? `, ${count} item${count > 1 ? 's' : ''}` : ''}`}
            >
              <Icon name="ShoppingBag" size={19} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-clay-500 px-1 text-[0.65rem] font-semibold text-cream-50 shadow-glow">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            <a
              href="#product"
              onClick={(e) => go(e, '#product')}
              className="btn btn-primary btn-sm hidden sm:inline-flex md:px-6 md:py-3"
            >
              Shop Now
              <Icon name="ArrowRight" size={16} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-700/10 bg-cream-50/70 text-ink-600 transition-colors hover:text-ink-900 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`overflow-hidden border-t border-ink-700/5 bg-cream-100/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
            menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="container-nuvella flex flex-col py-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className="flex items-center justify-between border-b border-ink-700/5 py-4 font-display text-lg text-ink-700 transition-colors hover:text-clay-600"
                >
                  {item.label}
                  <Icon name="ArrowRight" size={16} className="text-ink-400" />
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a
                href="#product"
                onClick={(e) => go(e, '#product')}
                className="btn btn-primary btn-lg w-full"
              >
                Shop Now
                <Icon name="ArrowRight" size={18} />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

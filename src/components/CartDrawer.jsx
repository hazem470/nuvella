import { useCart } from '../context/CartContext.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBodyLock, useEscape } from '../hooks/useReveal.js'
import { config } from '../config.js'
import Icon from './Icon.jsx'
import QuantityStepper from './QuantityStepper.jsx'
import TelegramButton from './TelegramButton.jsx'

/**
 * CartDrawer — slide-in bag with quantity controls, remove, and an order summary.
 * Prices are EGP; checkout is gated behind config.preLaunch.
 */
export default function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    setQty,
    removeItem,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    clear,
    notify,
  } = useCart()
  const { t, isRTL, price } = useLang()

  useBodyLock(isOpen)
  useEscape(close, isOpen)

  const checkout = () => {
    notify(config.preLaunch ? t.ui.cartCheckoutNote : t.ui.cartCheckoutDemo)
  }

  return (
    <div
      className={`fixed inset-0 z-[70] overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Scrim */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel — anchored with logical `end-0` so it slides in from the correct
          side in both LTR and RTL. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.ui.cartTitle}
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream-100 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-ink-700/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <Icon name="ShoppingBag" size={20} className="text-clay-500" />
            <h2 className="font-display text-lg text-ink-900">{t.ui.cartTitle}</h2>
            <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium text-ink-500">
              {items.reduce((n, l) => n + l.qty, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t.ui.a11yCloseBag}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-cream-200 hover:text-ink-900"
          >
            <Icon name="Plus" size={18} className="rotate-45" strokeWidth={2} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-3xl bg-cream-200 text-clay-500">
                <Icon name="ShoppingBag" size={26} />
              </span>
              <div>
                <p className="font-display text-lg text-ink-900">{t.ui.cartEmpty}</p>
                <p className="mt-1 text-sm text-ink-500">{t.ui.cartEmptyHint}</p>
              </div>
              <button type="button" onClick={close} className="btn btn-primary btn-md mt-2">
                {t.ui.continueShopping}
                <Icon name="ArrowRight" size={16} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => (
                <li key={line.key} className="card flex gap-4 p-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-200">
                    <img src={line.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-900">{line.name}</p>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {line.variant ? `${line.variant} · ` : ''}
                          {line.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        aria-label={`${t.ui.a11yRemove} ${line.name} ${t.ui.a11yRemoveFromBag}`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-cream-200 hover:text-clay-600"
                      >
                        <Icon name="Plus" size={15} className="rotate-45" strokeWidth={2} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <QuantityStepper
                        size="sm"
                        value={line.qty}
                        setValue={(fn) => setQty(line.key, fn)}
                        min={0}
                        label={`${t.ui.a11yQuantityFor} ${line.name}`}
                      />
                      <p className="font-display text-base text-ink-900 tabular-nums">
                        {price(line.price * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-ink-700/5 bg-cream-50 px-6 py-5">
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">{t.ui.cartSubtotal}</dt>
                <dd className="font-medium text-ink-900 tabular-nums">{price(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">{t.ui.cartShipping}</dt>
                <dd className="font-medium text-ink-900 tabular-nums">
                  {shipping === 0 ? t.ui.cartFree : price(shipping)}
                </dd>
              </div>
              <div className="hairline my-3" />
              <div className="flex items-center justify-between">
                <dt className="font-display text-base text-ink-900">{t.ui.cartTotal}</dt>
                <dd className="font-display text-lg text-ink-900 tabular-nums">{price(total)}</dd>
              </div>
            </dl>

            {shipping > 0 && (
              <p className="mt-3 rounded-2xl bg-sage-100 px-4 py-2.5 text-xs text-sage-600">
                {t.ui.cartFreeShipPrefix} {price(freeShippingThreshold - subtotal)}{' '}
                {t.ui.cartFreeShipSuffix}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2.5">
              <button type="button" onClick={checkout} className="btn btn-primary btn-lg w-full">
                <Icon name="Lock" size={17} />
                {t.ui.cartCheckout}
              </button>

              {/* Pre-launch: the primary follow-up action is Telegram */}
              {config.preLaunch && (
                <TelegramButton variant="outline" className="w-full" showHandle={false} />
              )}

              <div className="flex items-center justify-between gap-2">
                <button type="button" onClick={close} className="btn btn-ghost btn-sm">
                  {t.ui.continueShopping}
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="btn btn-ghost btn-sm text-ink-400 hover:text-clay-600"
                >
                  {t.ui.clearBag}
                </button>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {t.trustBadges.slice(0, 3).map((b) => (
                <li key={b.text} className="inline-flex items-center gap-1.5 text-[0.7rem] text-ink-400">
                  <Icon name={b.icon} size={13} />
                  {b.text}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </aside>
    </div>
  )
}

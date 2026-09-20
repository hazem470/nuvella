import { CartProvider } from './context/CartContext.jsx'
import { LanguageProvider, useLang } from './i18n/LanguageContext.jsx'
import AnnouncementBanner from './components/AnnouncementBanner.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProductSection from './components/ProductSection.jsx'
import BrandStory from './components/BrandStory.jsx'
import Benefits from './components/Benefits.jsx'
import Ingredients from './components/Ingredients.jsx'
import Reviews from './components/Reviews.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import ImageBriefs from './components/ImageBriefs.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Toast from './components/Toast.jsx'

/**
 * Nuvella — premium baby-care storefront.
 *
 * LanguageProvider wraps everything so every component reads copy from the
 * active dictionary and the layout flips between LTR (English) and RTL (Arabic).
 * CartProvider sits inside it because cart notifications are localised.
 */
function Shell() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-cream-100">
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-700 focus:px-5 focus:py-3 focus:text-sm focus:text-cream-50"
      >
        {t.ui.skipToProduct}
      </a>

      {/* Pre-launch notice sits above the navbar, outside the sticky layer */}
      <AnnouncementBanner />

      <Navbar />

      <main id="main">
        <Hero />
        <ProductSection />
        <BrandStory />
        <Benefits />
        <Ingredients />
        <Reviews />
        <FAQ />
        <FinalCTA />
        <ImageBriefs />
      </main>

      <Footer />

      <CartDrawer />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </LanguageProvider>
  )
}

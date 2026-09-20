import { CartProvider } from './context/CartContext.jsx'
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
 * Single-page, anchor-navigated layout. Every section is an independent,
 * reusable component driven by src/data/brand.js.
 */
export default function App() {
  return (
    <CartProvider>
      {/* Skip link for keyboard and screen-reader users */}
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-700 focus:px-5 focus:py-3 focus:text-sm focus:text-cream-50"
      >
        Skip to product
      </a>

      <div className="min-h-screen bg-cream-100">
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
    </CartProvider>
  )
}

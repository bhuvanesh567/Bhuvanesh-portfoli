import { AppProvider } from './context/AppContext';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Bestsellers } from './components/Bestsellers';
import { Products } from './components/Products';
import { Ingredients } from './components/Ingredients';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { FAQs } from './components/FAQs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// E-commerce overlays
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <AppProvider>
      {/* Dynamic SEO metadata injector */}
      <SEO />

      <div className="flex flex-col min-h-screen bg-brand-cream text-brand-brown">
        {/* Core Layout Structure */}
        <Header />
        
        <main className="flex-grow">
          {/* Main sections */}
          <Hero />
          <Bestsellers />
          <About />
          <Products />
          <Ingredients />
          <Process />
          <Testimonials />
          <Gallery />
          <FAQs />
          <Contact />
        </main>

        <Footer />

        {/* Global eCommerce Drawers & Overlay Modals */}
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <AccountModal />
        <OrderTrackingModal />
        
        {/* Persistent Floating Chat Trigger */}
        <WhatsAppButton />
      </div>
    </AppProvider>
  );
}

export default App;

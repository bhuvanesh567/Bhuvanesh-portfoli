import React from 'react';
import { ShoppingCart, Flame, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {

  const handleScrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent("Hello Vantillu Avakaya Ruchulu team! I would like to explore and order some of your authentic homemade pickles. Please share the details.");
    window.open(`https://wa.me/918886355125?text=${message}`, '_blank');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 bg-brand-brown">
      {/* Background Image with Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transform scale-105"
        style={{ 
          backgroundImage: `url('/heritage_kitchen_bg.png')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/95 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-transparent z-0" />

      {/* Floating Ambient Sparks / Spices (Framer Motion Particle Simulation) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-yellow/30 blur-[2px]"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Main Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-yellow/15 border border-brand-yellow/30 px-4 py-1.5 rounded-full text-brand-yellow text-xs sm:text-sm font-black tracking-wide uppercase"
            >
              <Flame className="w-4 h-4 animate-pulse text-brand-red" />
              <span>Authentic Homemade Andhra Pickles Delivered Fresh</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-serif"
            >
              Experience the <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-red">
                Authentic Taste
              </span> <br />
              of Andhra Kitchens
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-brand-cream/80 max-w-xl font-medium leading-relaxed font-sans"
            >
              Handcrafted homemade pickles made with generations-old recipes, cold-pressed oils, hand-ground spices, and zero chemical preservatives. Made fresh in small batches.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={handleScrollToProducts}
                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-red-900/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 text-base duration-150"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Pickles Now</span>
              </button>

              <button 
                onClick={handleScrollToProducts}
                className="bg-brand-brown/75 hover:bg-brand-brown text-brand-cream border-2 border-brand-cream/30 hover:border-brand-yellow font-semibold px-6 py-4 rounded-lg hover:scale-105 active:scale-95 transition-all text-base duration-150"
              >
                Explore Products
              </button>

              <button 
                onClick={handleWhatsAppChat}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-black px-6 py-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 text-base duration-150"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm11.953-21.813c-5.461 0-9.902 4.43-9.906 9.878-.002 2.05.535 4.05 1.558 5.82l-1.02 3.725 3.81-1c1.697.925 3.597 1.413 5.548 1.415h.005c5.46 0 9.901-4.43 9.905-9.877 0-2.64-1.029-5.121-2.896-6.988-1.868-1.868-4.351-2.896-6.994-2.896zm4.646 13.543c-.254-.127-1.51-.745-1.745-.829-.233-.085-.403-.127-.572.127-.169.254-.656.829-.805.997-.148.169-.296.186-.55.06-2.01-.1-3.48-.775-4.63-2.76-.3-.518.3-.481.859-1.597.09-.18.043-.339-.021-.466-.064-.127-.572-1.378-.785-1.884-.208-.502-.436-.433-.573-.44-.13-.006-.279-.008-.423-.008-.144 0-.378.054-.576.27-.198.217-.753.737-.753 1.798 0 1.062.773 2.087.88 2.229.109.14 1.522 2.325 3.69 3.26.515.222.917.355 1.23.454.517.164.988.141 1.36.085.414-.062 1.51-.617 1.724-1.214.213-.597.213-1.107.15-1.214-.065-.107-.234-.19-.488-.317z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-cream/10 max-w-lg"
            >
              <div>
                <span className="block text-2xl font-bold text-brand-yellow font-serif">10k+</span>
                <span className="block text-xs text-brand-cream/60">Happy Foodies</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-brand-yellow font-serif">100%</span>
                <span className="block text-xs text-brand-cream/60">Homemade Care</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-brand-yellow font-serif">4.9★</span>
                <span className="block text-xs text-brand-cream/60">Customer Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Cinematic Floating Pickle Jar Display */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px]">
            {/* Decorative Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-brand-yellow/10 blur-3xl z-0 animate-pulse" />

            {/* Floating Pickle Jar Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute z-10 w-64 sm:w-72 bg-gradient-to-br from-brand-cream to-brand-cream/90 rounded-2xl p-6 shadow-2xl border border-white/20 animate-float-slow text-center group cursor-pointer"
              onClick={handleScrollToProducts}
            >
              <span className="absolute top-4 right-4 bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                Bestseller
              </span>
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-inner border-4 border-brand-yellow bg-brand-brown/5 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/avakaya.png" 
                  alt="Traditional Andhra Avakaya Pickle" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold text-brand-brown mt-4 font-serif leading-tight">Andhra Avakaya</h3>
              <p className="text-xs text-brand-brown/70 mt-1 font-medium font-sans">Sour mango infused with fiery local mustard spices.</p>
              <div className="flex items-center justify-between mt-4 border-t border-brand-brown/10 pt-3">
                <span className="text-lg font-black text-brand-red">₹299 <span className="text-xs text-brand-brown/60 font-semibold">/ 250g</span></span>
                <span className="bg-brand-brown text-brand-yellow text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-brand-red group-hover:text-white transition-colors">
                  Add to Cart
                </span>
              </div>
            </motion.div>

            {/* Side Floating Spice Jar Display (Small) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -right-2 top-10 sm:right-4 z-20 w-44 bg-brand-cream/80 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/10 hidden sm:block animate-float-medium"
            >
              <div className="flex items-center space-x-3">
                <img 
                  src="/chicken_pickle.png" 
                  alt="Chicken Pickle" 
                  className="w-12 h-12 rounded-lg object-cover border border-brand-yellow" 
                />
                <div>
                  <h4 className="text-xs font-bold text-brand-brown font-serif">Chicken Pickle</h4>
                  <span className="text-xs font-black text-brand-red">₹399</span>
                </div>
              </div>
            </motion.div>

            {/* Side Floating Chili Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute left-0 bottom-10 sm:left-4 z-20 bg-brand-brown/95 backdrop-blur px-4 py-2.5 rounded-xl border border-brand-yellow/20 text-brand-cream text-xs font-semibold flex items-center space-x-2 shadow-lg hidden sm:flex"
            >
              <div className="bg-brand-yellow/20 p-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              </div>
              <div>
                <span className="block text-[10px] text-brand-cream/50 uppercase tracking-widest leading-none">Hygiene</span>
                <span className="text-white text-xs font-bold">FSSAI Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    setCartOpen,
    setWishlistOpen,
    setAccountOpen,
    setTrackingOpen,
    getCartSubtotal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavClick('products-section');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel shadow-sm border-b border-brand-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.jpg" 
                alt="Vantillu Avakaya Ruchulu Logo" 
                className="w-14 h-14 rounded-full border-2 border-brand-yellow mr-3 shadow-md transform hover:rotate-6 transition-transform"
              />
              <div>
                <span className="block text-2xl font-black tracking-tight text-brand-brown font-serif leading-none">
                  VANTILLU
                </span>
                <span className="block text-xs font-bold tracking-widest text-brand-red font-sans uppercase">
                  Avakaya Ruchulu
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8 text-sm font-semibold text-brand-brown/80">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Home</button>
              <button onClick={() => handleNavClick('about-section')} className="hover:text-brand-red transition-colors">Our Heritage</button>
              <button onClick={() => handleNavClick('products-section')} className="hover:text-brand-red transition-colors">Shop Pickles</button>
              <button onClick={() => handleNavClick('process-section')} className="hover:text-brand-red transition-colors">Our Process</button>
              <button onClick={() => handleNavClick('contact-section')} className="hover:text-brand-red transition-colors">Contact</button>
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block relative max-w-xs w-full mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pickles (e.g. Gongura)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className={`w-full py-2 pl-4 pr-10 rounded-full border border-brand-brown/20 bg-brand-cream/50 text-brand-brown placeholder-brand-brown/50 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all ${
                    isSearchFocused ? 'w-64 shadow-md bg-white' : ''
                  }`}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/60 hover:text-brand-red">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* E-commerce Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Order Tracking */}
              <button
                onClick={() => setTrackingOpen(true)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 hover:text-brand-red transition-all hidden sm:block relative group"
                title="Track Order"
              >
                <Truck className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-yellow rounded-full border-2 border-brand-cream"></span>
                <span className="absolute hidden group-hover:block bg-brand-brown text-brand-cream text-xs px-2 py-1 rounded -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-md">
                  Track Order
                </span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlistOpen(true)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 hover:text-brand-red transition-all relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-[10px] font-black text-brand-brown"
                  >
                    {totalWishlistItems}
                  </motion.span>
                )}
              </button>

              {/* Shopping Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 hover:text-brand-red transition-all relative flex items-center"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white shadow-sm"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
                {totalCartItems > 0 && (
                  <span className="hidden lg:block ml-2 text-xs font-black text-brand-brown">
                    ₹{getCartSubtotal()}
                  </span>
                )}
              </button>

              {/* Account profile */}
              <button
                onClick={() => setAccountOpen(true)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 hover:text-brand-red transition-all"
                title="Customer Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 md:hidden transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-brand-cream border-b border-brand-brown/15 shadow-inner relative z-30 px-4 pt-2 pb-6 space-y-3"
          >
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search pickles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-4 pr-10 rounded-full border border-brand-brown/20 bg-white text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/60">
                <Search className="w-5 h-5" />
              </button>
            </form>

            <button
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="block w-full text-left py-2 text-base font-bold text-brand-brown hover:text-brand-red border-b border-brand-brown/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="block w-full text-left py-2 text-base font-bold text-brand-brown hover:text-brand-red border-b border-brand-brown/5"
            >
              Our Heritage
            </button>
            <button
              onClick={() => handleNavClick('products-section')}
              className="block w-full text-left py-2 text-base font-bold text-brand-brown hover:text-brand-red border-b border-brand-brown/5"
            >
              Shop Pickles
            </button>
            <button
              onClick={() => handleNavClick('process-section')}
              className="block w-full text-left py-2 text-base font-bold text-brand-brown hover:text-brand-red border-b border-brand-brown/5"
            >
              Our Process
            </button>
            <button
              onClick={() => handleNavClick('contact-section')}
              className="block w-full text-left py-2 text-base font-bold text-brand-brown hover:text-brand-red border-b border-brand-brown/5"
            >
              Contact
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setTrackingOpen(true); }}
              className="flex items-center space-x-2 w-full text-left py-2.5 text-base font-bold text-brand-brown hover:text-brand-red"
            >
              <Truck className="w-5 h-5" />
              <span>Track Current Order</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

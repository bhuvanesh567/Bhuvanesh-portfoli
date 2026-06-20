import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setCartOpen
  } = useApp();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 250, 1);
    toggleWishlist(product); // Remove from wishlist
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-screen max-w-md bg-brand-cream border-l border-brand-brown/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between bg-brand-cream">
                <div className="flex items-center space-x-2.5">
                  <Heart className="w-5 h-5 text-brand-red fill-current" />
                  <h2 className="text-lg font-black text-brand-brown font-serif">Saved Pickles Wishlist</h2>
                  <span className="bg-brand-brown text-brand-yellow text-xs font-black px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Items Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-brand-brown/5 rounded-full flex items-center justify-center mx-auto text-brand-brown/40">
                      <Heart className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold text-brand-brown/60 font-serif">Your wishlist is empty.</p>
                    <p className="text-xs text-brand-brown/40">Save your favorite pickles here to order later!</p>
                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="bg-brand-brown text-brand-yellow font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start space-x-4 bg-brand-cream border border-brand-brown/10 p-4 rounded-xl shadow-sm relative group text-left"
                    >
                      {/* Thumbnail */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border border-brand-brown/5 shrink-0"
                      />

                      {/* Content details */}
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-brand-brown font-serif leading-tight pr-4">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-brand-brown/40 hover:text-brand-red p-1 rounded transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-brand-brown/60 line-clamp-1 pr-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-black text-brand-red">
                            ₹{product.price} <span className="text-[9px] text-brand-brown/50 font-normal">/ 250g</span>
                          </span>
                          
                          <button
                            onClick={() => handleMoveToCart(product)}
                            className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-brown font-black px-3 py-1.5 rounded-lg text-[10px] tracking-wide uppercase transition-colors flex items-center space-x-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Bottom close action */}
              <div className="p-6 border-t border-brand-brown/10 bg-white/95">
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-full bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

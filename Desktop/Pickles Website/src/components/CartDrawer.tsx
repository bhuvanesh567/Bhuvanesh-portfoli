import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, Lock, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getCartSubtotal,
    getCartDiscount,
    getDeliveryCharge,
    getCartTotal,
    setCheckoutOpen
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const getWeightMultiplier = (weight: number) => {
    if (weight === 500) return 1.8;
    if (weight === 1000) return 3.2;
    return 1.0;
  };

  const getScaledPrice = (basePrice: number, weight: number) => {
    return Math.round(basePrice * getWeightMultiplier(weight));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage(null);
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
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
                  <ShoppingBag className="w-5 h-5 text-brand-red" />
                  <h2 className="text-lg font-black text-brand-brown font-serif">Your Pickle Jar Cart</h2>
                  <span className="bg-brand-brown text-brand-yellow text-xs font-black px-2 py-0.5 rounded-full">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-brand-brown/5 rounded-full flex items-center justify-center mx-auto text-brand-brown/40">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold text-brand-brown/60 font-serif">Your shopping cart is empty.</p>
                    <p className="text-xs text-brand-brown/40">Add some spicy Andhra goodness to your kitchen!</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="bg-brand-brown text-brand-yellow font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow"
                    >
                      Browse Pickles
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => {
                    const price = getScaledPrice(item.product.price, item.weight);
                    return (
                      <div
                        key={`${item.product.id}-${item.weight}-${idx}`}
                        className="flex items-start space-x-4 bg-brand-cream border border-brand-brown/10 p-4 rounded-xl shadow-sm relative group"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover border border-brand-brown/5 shrink-0"
                        />

                        {/* Title, weight & quantity adjustments */}
                        <div className="flex-grow space-y-1.5 text-left">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-brand-brown font-serif leading-tight pr-4">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.weight)}
                              className="text-brand-brown/40 hover:text-brand-red p-1 rounded transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-black bg-brand-brown/10 text-brand-brown px-2 py-0.5 rounded uppercase">
                              {item.weight >= 1000 ? `${item.weight/1000}kg` : `${item.weight}g`}
                            </span>
                            <span className="text-xs font-black text-brand-red">
                              ₹{price * item.quantity}
                            </span>
                          </div>

                          {/* Multiplier controls */}
                          <div className="flex items-center space-x-2 bg-brand-brown/5 rounded border border-brand-brown/10 w-fit p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.weight, item.quantity - 1)}
                              className="p-1 hover:bg-brand-brown/10 rounded transition-colors text-brand-brown"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold px-2.5 text-brand-brown">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.weight, item.quantity + 1)}
                              className="p-1 hover:bg-brand-brown/10 rounded transition-colors text-brand-brown"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary - Only display if cart has items */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-brand-brown/10 bg-white/90 space-y-4">
                  {/* Coupon section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-brand-brown/70">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-4 h-4 text-brand-red" />
                        <span>Have a Promo Coupon?</span>
                      </span>
                      <span className="text-[10px] text-brand-brown/50">Try: WELCOME10</span>
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-brand-green/10 border border-brand-green/30 px-3.5 py-2.5 rounded-lg text-brand-green text-xs font-semibold">
                        <div className="flex items-center space-x-2">
                          <Gift className="w-4 h-4" />
                          <span>Promo Applied: *{appliedCoupon.code}*</span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="hover:underline text-[10px] font-black uppercase text-brand-red"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code..."
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="bg-brand-cream border border-brand-brown/20 rounded-lg px-3 py-2 text-xs flex-grow focus:outline-none focus:border-brand-red font-semibold uppercase"
                        />
                        <button
                          type="submit"
                          className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponMessage && !appliedCoupon && (
                      <p className={`text-[10px] font-bold text-left ${couponMessage.success ? 'text-brand-green' : 'text-brand-red'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Price calculations */}
                  <div className="space-y-1.5 border-t border-brand-brown/5 pt-3 text-xs sm:text-sm text-left">
                    <div className="flex justify-between text-brand-brown/70 font-medium">
                      <span>Subtotal</span>
                      <span>₹{getCartSubtotal()}</span>
                    </div>
                    {getCartDiscount() > 0 && (
                      <div className="flex justify-between text-brand-green font-bold">
                        <span>Coupon Savings</span>
                        <span>- ₹{getCartDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-brown/70 font-medium">
                      <span>Shipping Charge</span>
                      <span>
                        {getDeliveryCharge() === 0 ? (
                          <span className="text-brand-green font-bold uppercase text-[10px]">Free Shipping</span>
                        ) : (
                          `₹${getDeliveryCharge()}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-brand-brown font-black text-base border-t border-brand-brown/10 pt-2">
                      <span>Grand Total</span>
                      <span className="text-brand-red">₹{getCartTotal()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="space-y-2.5">
                    <button
                      onClick={handleCheckoutClick}
                      className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center space-x-2 text-sm"
                    >
                      <Lock className="w-4 h-4 text-brand-yellow" />
                      <span>Proceed to Checkout</span>
                    </button>
                    <p className="text-[10px] text-brand-brown/50 text-center flex items-center justify-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                      <span>Secure 256-Bit SSL Encrypted Checkout</span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper for checkout check
import { ShieldCheck } from 'lucide-react';

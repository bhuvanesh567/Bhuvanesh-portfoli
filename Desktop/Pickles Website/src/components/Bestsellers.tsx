import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Star, ShoppingCart, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Bestsellers: React.FC = () => {
  const { products, addToCart, setCheckoutOpen } = useApp();

  // Pick Avakaya (1), Gongura (2), and Chicken (6)
  const bestsellerItems = products.filter(p => [1, 2, 6].includes(p.id));

  const handleQuickOrder = (product: any) => {
    addToCart(product, 250, 1);
    setCheckoutOpen(true);
  };

  return (
    <section className="py-24 bg-brand-brown text-brand-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-yellow/20 border border-brand-yellow/30 px-3.5 py-1 rounded-full text-brand-yellow text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-brand-yellow" />
            <span>Top Rated by Families & NRIs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white">
            Our Bestsellers
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-brand-cream/70 text-sm max-w-lg mx-auto pt-2 font-medium">
            Handcrafted with love and authentic Andhra spices, these jars have found a permanent place in kitchens across India and worldwide.
          </p>
        </div>

        {/* Bestseller Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestsellerItems.map((product, index) => {
            const isCenter = index === 1; // Middle card gongura/chicken etc.
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-3xl p-1 bg-gradient-to-b ${
                  isCenter 
                    ? 'from-brand-yellow via-brand-red to-brand-brown md:-translate-y-4 shadow-2xl glow-red-strong' 
                    : 'from-brand-yellow/30 to-brand-brown/40 shadow-xl'
                }`}
              >
                <div className="bg-[#2E1E1C] rounded-[22px] p-6 text-left h-full flex flex-col justify-between space-y-6">
                  {/* Bestseller Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 bg-brand-red text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                      <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-brand-yellow" />
                      <span>Bestseller</span>
                    </span>
                    <span className="text-xs font-bold text-brand-cream/60 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>Popularity: 98%</span>
                    </span>
                  </div>

                  {/* Product Display Details */}
                  <div className="space-y-4">
                    {/* Circle Image Preview */}
                    <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-brand-yellow shadow-lg transform group-hover:rotate-6 transition-transform">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                        {product.name}
                      </h3>
                      {/* Rating stars */}
                      <div className="flex items-center justify-center space-x-1 text-brand-yellow">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="text-xs font-bold text-brand-cream/60 ml-1">5.0 ({product.reviewsCount})</span>
                      </div>
                      <p className="text-xs text-brand-cream/70 line-clamp-3 leading-relaxed px-2 font-sans font-medium">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Quick Order CTA */}
                  <div className="border-t border-brand-cream/10 pt-4 mt-auto flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-brand-cream/50 leading-none">Price (250g)</span>
                      <span className="text-2xl font-black text-brand-yellow font-serif">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleQuickOrder(product)}
                      className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all active:scale-95 ${
                        isCenter
                          ? 'bg-brand-red text-white hover:bg-brand-red/90 shadow-md'
                          : 'bg-brand-yellow text-brand-brown hover:bg-brand-yellow/90'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Instant Buy</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

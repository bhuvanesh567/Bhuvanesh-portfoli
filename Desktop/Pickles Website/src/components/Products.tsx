import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Product } from '../context/AppContext';
import { Star, Heart, Flame, ShoppingBag, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Products: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCheckoutOpen
  } = useApp();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWeights, setSelectedWeights] = useState<{ [productId: number]: number }>({});
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'nutri'>('desc');

  // Helper to get active weight for a product (default to 250g)
  const getProductWeight = (productId: number) => {
    return selectedWeights[productId] || 250;
  };

  const setProductWeight = (productId: number, weight: number) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
  };

  // Helper to calculate price based on weight
  const getWeightMultiplier = (weight: number) => {
    if (weight === 500) return 1.8;
    if (weight === 1000) return 3.2;
    return 1.0;
  };

  const getScaledPrice = (basePrice: number, weight: number) => {
    return Math.round(basePrice * getWeightMultiplier(weight));
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, weight: number) => {
    addToCart(product, weight, 1);
    
    // Tiny confetti pop on button click for luxury feel
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.9 },
      colors: ['#FFB300', '#D32F2F', '#2E7D32']
    });
  };

  const handleBuyNow = (product: Product, weight: number) => {
    addToCart(product, weight, 1);
    setCheckoutOpen(true);
  };

  const handleWhatsAppOrder = (product: Product, weight: number) => {
    const finalPrice = getScaledPrice(product.price, weight);
    const message = encodeURIComponent(
      `Hello Vantillu Avakaya Ruchulu! I would like to order:\n\n*Product:* ${product.name}\n*Quantity:* 1\n*Weight:* ${weight >= 1000 ? `${weight/1000}kg` : `${weight}g`}\n*Price:* ₹${finalPrice}\n\nPlease share details to complete the order.`
    );
    window.open(`https://wa.me/918886355125?text=${message}`, '_blank');
  };

  return (
    <section id="products-section" className="py-24 bg-brand-cream border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Our Store</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Traditional Pickles Store
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-sm text-brand-brown/60 uppercase tracking-widest font-black">Free Shipping on orders above ₹499</p>
        </div>

        {/* Categories Tab and Filter Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {['all', 'veg', 'non-veg'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-brown text-brand-cream shadow-md'
                  : 'bg-brand-brown/5 text-brand-brown hover:bg-brand-brown/10'
              }`}
            >
              {cat === 'all' && 'All Offerings'}
              {cat === 'veg' && 'Vegetarian Heritage'}
              {cat === 'non-veg' && 'Fiery Non-Veg'}
            </button>
          ))}
        </div>

        {/* Empty Search Result State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="text-lg text-brand-brown/60 font-semibold font-serif">No traditional pickles found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSelectedCategory('all')} 
              className="text-xs font-black text-brand-red underline uppercase tracking-wider"
            >
              View all products
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const activeWeight = getProductWeight(product.id);
            const activePrice = getScaledPrice(product.price, activeWeight);
            const wishlisted = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-cream border border-brand-brown/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col h-full group"
              >
                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-md transition-all ${
                    wishlisted 
                      ? 'bg-brand-red text-white' 
                      : 'bg-white/95 text-brand-brown hover:text-brand-red'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Category Badge */}
                <span className={`absolute top-4 left-4 z-10 text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-sm ${
                  product.category === 'veg' 
                    ? 'bg-brand-green text-white' 
                    : 'bg-brand-red text-white'
                }`}>
                  {product.category === 'veg' ? '100% Veg' : 'Non-Veg'}
                </span>

                {/* Card image container */}
                <div className="relative h-64 overflow-hidden bg-brand-brown/5 cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveTab('desc'); }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-brown/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-brand-brown font-bold text-xs px-4 py-2 rounded-lg shadow flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-brand-red" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Stars and Spice indicators */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-brand-yellow">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                        <span className="text-xs font-bold text-brand-brown/60 ml-1">({product.reviewsCount})</span>
                      </div>
                      <div className="flex items-center space-x-0.5 text-brand-red" title={`Spice Level: ${product.spiceLevel}/5`}>
                        {[...Array(product.spiceLevel)].map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 fill-current animate-pulse" />
                        ))}
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => { setSelectedProduct(product); setActiveTab('desc'); }}
                      className="text-xl font-bold text-brand-brown font-serif hover:text-brand-red cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs text-brand-brown/70 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Weight Selectors */}
                  <div className="mt-4 pt-4 border-t border-brand-brown/10 space-y-4">
                    {/* Weight selector radio buttons */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-brown/60">Select Weight:</span>
                      <div className="flex bg-brand-brown/5 p-0.5 rounded-lg border border-brand-brown/10">
                        {[250, 500, 1000].map((w) => (
                          <button
                            key={w}
                            onClick={() => setProductWeight(product.id, w)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-md transition-all ${
                              activeWeight === w
                                ? 'bg-brand-brown text-brand-cream shadow-sm'
                                : 'text-brand-brown/60 hover:text-brand-brown'
                            }`}
                          >
                            {w >= 1000 ? `${w/1000}kg` : `${w}g`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price and Add/Buy now buttons */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <span className="block text-[10px] text-brand-brown/60 leading-none">Net Price</span>
                        <span className="text-xl font-black text-brand-red">
                          ₹{activePrice}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product, activeWeight)}
                        className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold px-4 py-2.5 rounded-lg text-xs shadow-sm hover:scale-105 active:scale-95 transition-transform flex items-center space-x-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-yellow" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                    {/* Quick Order and Buy Now Row */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleBuyNow(product, activeWeight)}
                        className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-brown font-black py-2 rounded-lg text-[10px] tracking-wide uppercase transition-colors"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handleWhatsAppOrder(product, activeWeight)}
                        className="w-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-2 rounded-lg text-[10px] tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm11.953-21.813c-5.461 0-9.902 4.43-9.906 9.878-.002 2.05.535 4.05 1.558 5.82l-1.02 3.725 3.81-1c1.697.925 3.597 1.413 5.548 1.415h.005c5.46 0 9.901-4.43 9.905-9.877 0-2.64-1.029-5.121-2.896-6.988-1.868-1.868-4.351-2.896-6.994-2.896zm4.646 13.543c-.254-.127-1.51-.745-1.745-.829-.233-.085-.403-.127-.572.127-.169.254-.656.829-.805.997-.148.169-.296.186-.55.06-2.01-.1-3.48-.775-4.63-2.76-.3-.518.3-.481.859-1.597.09-.18.043-.339-.021-.466-.064-.127-.572-1.378-.785-1.884-.208-.502-.436-.433-.573-.44-.13-.006-.279-.008-.423-.008-.144 0-.378.054-.576.27-.198.217-.753.737-.753 1.798 0 1.062.773 2.087.88 2.229.109.14 1.522 2.325 3.69 3.26.515.222.917.355 1.23.454.517.164.988.141 1.36.085.414-.062 1.51-.617 1.724-1.214.213-.597.213-1.107.15-1.214-.065-.107-.234-.19-.488-.317z"/>
                        </svg>
                        <span>WhatsApp Quick</span>
                      </button>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product Details Modal Overlay */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-brand-brown/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-brand-cream border-2 border-brand-brown/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-brown/10 hover:bg-brand-red hover:text-white text-brand-brown transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Left Column: Image with Curing Time overlay */}
                  <div className="md:col-span-5 relative h-72 md:h-auto bg-brand-brown/10">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-brand-brown/90 backdrop-blur p-3.5 rounded-xl border border-brand-yellow/20 text-brand-cream">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">Shelf Life:</span>
                        <span className="font-bold text-brand-yellow">{selectedProduct.shelfLife}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Complete details */}
                  <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Subheader and Spice level */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase bg-brand-brown/10 text-brand-brown px-3 py-1 rounded-full">
                          {selectedProduct.category === 'veg' ? 'Vegetarian Heritage' : 'Non-Vegetarian'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-bold text-brand-brown/60">Spice:</span>
                          <div className="flex items-center text-brand-red">
                            {[...Array(selectedProduct.spiceLevel)].map((_, i) => (
                              <Flame key={i} className="w-3.5 h-3.5 fill-current text-brand-red animate-pulse" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Header and Reviews */}
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-brand-brown font-serif">{selectedProduct.name}</h2>
                        <div className="flex items-center space-x-1 text-brand-yellow mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                          <span className="text-xs font-bold text-brand-brown/60 ml-2">
                            ({selectedProduct.reviewsCount} Customer Reviews)
                          </span>
                        </div>
                      </div>

                      {/* Tab Selection */}
                      <div className="flex border-b border-brand-brown/10">
                        {(['desc', 'ing', 'nutri'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-xs font-bold uppercase border-b-2 transition-all ${
                              activeTab === tab
                                ? 'border-brand-red text-brand-red'
                                : 'border-transparent text-brand-brown/60 hover:text-brand-brown'
                            }`}
                          >
                            {tab === 'desc' && 'Product Details'}
                            {tab === 'ing' && 'Ingredients'}
                            {tab === 'nutri' && 'Nutrition (per 100g)'}
                          </button>
                        ))}
                      </div>

                      {/* Tab Contents */}
                      <div className="min-h-[120px] text-xs sm:text-sm text-brand-brown/80 leading-relaxed font-sans pt-1">
                        {activeTab === 'desc' && (
                          <p>{selectedProduct.description}</p>
                        )}
                        {activeTab === 'ing' && (
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.ingredients.map((ing, i) => (
                              <span key={i} className="bg-brand-brown/5 text-brand-brown px-3 py-1.5 rounded-lg border border-brand-brown/10 font-medium">
                                {ing}
                              </span>
                            ))}
                          </div>
                        )}
                        {activeTab === 'nutri' && (
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-sm">
                            <div className="flex justify-between border-b border-brand-brown/5 py-1">
                              <span className="font-semibold">Energy</span>
                              <span>{selectedProduct.nutrition.energy}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-brown/5 py-1">
                              <span className="font-semibold">Protein</span>
                              <span>{selectedProduct.nutrition.protein}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-brown/5 py-1">
                              <span className="font-semibold">Fat</span>
                              <span>{selectedProduct.nutrition.fat}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-brown/5 py-1">
                              <span className="font-semibold">Carbohydrates</span>
                              <span>{selectedProduct.nutrition.carbohydrates}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-brown/5 py-1 col-span-2">
                              <span className="font-semibold">Sodium</span>
                              <span>{selectedProduct.nutrition.sodium}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-4 border-t border-brand-brown/10 space-y-4">
                      {/* Weight Selector */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-brown/70">Select Packaging Weight:</span>
                        <div className="flex bg-brand-brown/5 p-1 rounded-lg border border-brand-brown/10">
                          {[250, 500, 1000].map((w) => {
                            const activeWeight = getProductWeight(selectedProduct.id);
                            return (
                              <button
                                key={w}
                                onClick={() => setProductWeight(selectedProduct.id, w)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
                                  activeWeight === w
                                    ? 'bg-brand-brown text-brand-cream shadow-md'
                                    : 'text-brand-brown/60 hover:text-brand-brown'
                                }`}
                              >
                                {w >= 1000 ? `${w/1000}kg` : `${w}g`}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Main CTAs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={() => {
                            handleAddToCart(selectedProduct, getProductWeight(selectedProduct.id));
                            setSelectedProduct(null);
                          }}
                          className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold py-3.5 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingBag className="w-4 h-4 text-brand-yellow" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => {
                            handleBuyNow(selectedProduct, getProductWeight(selectedProduct.id));
                            setSelectedProduct(null);
                          }}
                          className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-brown font-black py-3.5 rounded-lg text-sm transition-colors"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={() => handleWhatsAppOrder(selectedProduct, getProductWeight(selectedProduct.id))}
                          className="border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-3.5 rounded-lg text-sm transition-all flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm11.953-21.813c-5.461 0-9.902 4.43-9.906 9.878-.002 2.05.535 4.05 1.558 5.82l-1.02 3.725 3.81-1c1.697.925 3.597 1.413 5.548 1.415h.005c5.46 0 9.901-4.43 9.905-9.877 0-2.64-1.029-5.121-2.896-6.988-1.868-1.868-4.351-2.896-6.994-2.896zm4.646 13.543c-.254-.127-1.51-.745-1.745-.829-.233-.085-.403-.127-.572.127-.169.254-.656.829-.805.997-.148.169-.296.186-.55.06-2.01-.1-3.48-.775-4.63-2.76-.3-.518.3-.481.859-1.597.09-.18.043-.339-.021-.466-.064-.127-.572-1.378-.785-1.884-.208-.502-.436-.433-.573-.44-.13-.006-.279-.008-.423-.008-.144 0-.378.054-.576.27-.198.217-.753.737-.753 1.798 0 1.062.773 2.087.88 2.229.109.14 1.522 2.325 3.69 3.26.515.222.917.355 1.23.454.517.164.988.141 1.36.085.414-.062 1.51-.617 1.724-1.214.213-.597.213-1.107.15-1.214-.065-.107-.234-.19-.488-.317z"/>
                          </svg>
                          <span>WhatsApp Order</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

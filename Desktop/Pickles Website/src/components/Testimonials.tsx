import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  rating: number;
  text: string;
  name: string;
  location: string;
  avatar: string;
}

const REVIEWS: Testimonial[] = [
  {
    rating: 5,
    text: "The Avakaya pickle taste immediately reminded me of my grandmother's homemade pickle from my childhood. The perfect crunch and oil balance—pure nostalgia in every bite!",
    name: 'Lakshmi Narayana',
    location: 'Vijayawada, AP',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    rating: 5,
    text: "Absolutely the best Andhra pickle available online. Extremely authentic flavor, perfect spice levels, and not overly oily. Slices of mango are firm and crisp. Highly recommended!",
    name: 'Karthik Rao',
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
  },
  {
    rating: 5,
    text: "Amazing quality and authentic flavor. The non-veg chicken pickle is out of this world! The pieces are boneless, tender, and spiced perfectly. Ordering third time now.",
    name: 'Deepthi Reddy',
    location: 'Hyderabad, TS',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    rating: 5,
    text: "Excellent packaging and fast delivery. Sourced it for my parents in USA, and they were thrilled with the quality and freshness. Very clean prep.",
    name: 'Srinivasa Murthy',
    location: 'Chicago, USA (NRI)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section className="py-24 bg-brand-cream border-b border-brand-brown/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Loved By Pickle Enthusiasts
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl w-full bg-brand-cream border border-brand-brown/10 rounded-3xl p-8 sm:p-12 shadow-md relative"
            >
              {/* Quote Mark Icon */}
              <Quote className="absolute top-6 left-6 text-brand-yellow/15 w-20 h-20 -z-10 pointer-events-none" />

              <div className="space-y-6">
                {/* Rating stars */}
                <div className="flex justify-center space-x-1 text-brand-yellow">
                  {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg lg:text-xl text-brand-brown italic font-medium leading-relaxed font-serif">
                  "{REVIEWS[activeIndex].text}"
                </p>

                {/* Profile detail */}
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-brand-brown/5 max-w-xs mx-auto">
                  <img
                    src={REVIEWS[activeIndex].avatar}
                    alt={REVIEWS[activeIndex].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow shadow"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-black text-brand-brown">{REVIEWS[activeIndex].name}</h4>
                    <span className="text-xs font-semibold text-brand-brown/60">{REVIEWS[activeIndex].location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-4 hidden md:flex">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-brand-brown text-brand-cream hover:bg-brand-red hover:text-white transition-all shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-brand-brown text-brand-cream hover:bg-brand-red hover:text-white transition-all shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Small Dot Markers */}
        <div className="flex justify-center space-x-2.5 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === i ? 'bg-brand-red w-6' : 'bg-brand-brown/20'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

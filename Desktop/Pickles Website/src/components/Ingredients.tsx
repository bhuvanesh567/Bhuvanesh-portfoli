import React from 'react';
import { Leaf, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface Ingredient {
  name: string;
  role: string;
  source: string;
  image: string;
  description: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: 'Sour Raw Mangoes',
    role: 'Puckery Crunch Foundation',
    source: 'Chittoor & Guntur Orchards',
    image: 'https://images.unsplash.com/photo-1553134988-5622b1d6b818?auto=format&fit=crop&w=400&q=80',
    description: 'Picked at early maturity before they sweeten. Cut with the shell (Koka) intact to guarantee the mango piece stays crunchy for over a year.'
  },
  {
    name: 'Guntur Red Chillies',
    role: 'Fiery Soul of Andhra',
    source: 'Guntur Chilli Market',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80',
    description: 'Renowned for high heat and brilliant natural red color. Dried in the sun and custom-milled in small batches to preserve active capsaicin oils.'
  },
  {
    name: 'Country Garlic Cloves',
    role: 'Bold Aromatic Crunch',
    source: 'Andhra Organic Co-ops',
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=400&q=80',
    description: 'Small, high-flavor country garlic cloves peeled by hand. They act as prebiotic flavor capsules inside the pickle jar.'
  },
  {
    name: 'Pungent Mustard Seeds',
    role: 'The Flavor Emulsifier',
    source: 'Andhra Spice Valleys',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80',
    description: 'Yellow and black mustard seeds lightly toasted and stone-ground. Releases a sharp, nose-tingling aroma when blended with oil.'
  },
  {
    name: 'Organic Curry Leaves',
    role: 'Herbal Essence & Tempering',
    source: 'Our Backyard Farms',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh curry leaves sorted, washed, dried, and cooked in smoking-hot oil. Infuses a deep, comforting rural aroma into the pickle.'
  },
  {
    name: 'Wood-Pressed Sesame Oil',
    role: 'Preservative & Flavor Binder',
    source: 'Local Guntur Oil Presses',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Cold-pressed in traditional wooden mills (Ghani) without heating. Forms a rich, golden barrier that preserves the pickle naturally.'
  }
];

export const Ingredients: React.FC = () => {
  return (
    <section id="ingredients-section" className="py-24 bg-brand-cream/30 border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-green uppercase">What goes inside</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Premium Sourced Ingredients
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-sm font-semibold text-brand-brown/70 leading-relaxed font-sans max-w-xl mx-auto pt-2">
            A great pickle starts with top-tier agricultural produce. We source all ingredients directly from local farmers to guarantee freshness and authentic flavor.
          </p>
        </div>

        {/* Ingredients Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-cream rounded-2xl overflow-hidden border border-brand-brown/10 shadow-md group hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              {/* Image Container with Zoom effect */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Source Badge */}
                <span className="absolute bottom-3 left-3 bg-brand-brown text-brand-yellow text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border border-brand-yellow/10">
                  {item.source}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-3">
                <div className="space-y-1.5">
                  <span className="block text-[10px] text-brand-red font-black uppercase tracking-wider">
                    {item.role}
                  </span>
                  <h3 className="text-lg font-bold text-brand-brown font-serif">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-brown/70 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sourcing Promise Badge */}
        <div className="mt-16 bg-white/70 backdrop-blur rounded-3xl p-8 border border-brand-brown/10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center space-x-4 text-left">
            <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-brand-brown font-serif">Our Direct Farmer Sourcing Promise</h4>
              <p className="text-xs text-brand-brown/60 max-w-md mt-1">We bypass middlemen, buying our chillies, garlic, and oils directly from Guntur farmer cooperatives, ensuring they get paid fairly while we receive the finest ingredients.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-brand-brown text-brand-yellow px-4 py-2.5 rounded-xl border border-brand-yellow/10 font-bold text-xs whitespace-nowrap">
            <Leaf className="w-4 h-4 mr-1 text-brand-green" />
            <span>100% Traceable & Organic</span>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  src: string;
  title: string;
  category: 'Kitchen' | 'Ingredients' | 'Packaging' | 'Curing';
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/gallery_kitchen.png',
    title: 'Traditional Andhra Kitchen',
    category: 'Kitchen',
    caption: 'Our rustic slow-cooking heritage setup with wooden counters, clay pots, and brass utensils.'
  },
  {
    src: '/heritage_spices.png',
    title: 'Stone-Ground Spice Mixing',
    category: 'Ingredients',
    caption: 'Hand-blending Guntur red chillies and toasted fenugreek powder directly in warm sesame oil.'
  },
  {
    src: '/gallery_jaadilu.png',
    title: 'Heritage Ceramic Jars (Jaadilu)',
    category: 'Curing',
    caption: 'Where pickles age naturally under shade, letting the organic juices ferment with the spices.'
  },
  {
    src: '/gallery_packaging.png',
    title: 'Sterilized Airtight Packaging',
    category: 'Packaging',
    caption: 'High-quality leak-proof jars filled under clinical hygiene standards for safe transport.'
  },
  {
    src: '/gallery_chillies.png',
    title: 'Sun-Drying Guntur Chillies',
    category: 'Ingredients',
    caption: 'Removing all trace moisture from peppers on clean bamboo mats under natural sunshine.'
  },
  {
    src: '/gallery_meal.png',
    title: 'Serving the Heritage Meal',
    category: 'Kitchen',
    caption: 'The absolute bliss of hot steamed rice, yellow dal, pure ghee, and a dollop of Avakaya.'
  }
];

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  return (
    <section className="py-24 bg-brand-cream/40 border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Behind the Scenes</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Our Kitchen Gallery
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-xs text-brand-brown/60 uppercase tracking-widest font-black">Craftsmanship Captured in frames</p>
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActivePhoto(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-brand-brown/10 shadow-md group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
              
              {/* Overlay Hover Details */}
              <div className="absolute inset-0 bg-brand-brown/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6 text-left">
                <span className="bg-brand-yellow text-brand-brown text-[9px] font-black uppercase px-2.5 py-1 rounded-full self-start">
                  {item.category}
                </span>
                
                <div className="space-y-1">
                  <h4 className="text-white font-bold font-serif text-lg flex items-center space-x-2">
                    <span>{item.title}</span>
                    <ZoomIn className="w-4 h-4 text-brand-yellow shrink-0" />
                  </h4>
                  <p className="text-xs text-brand-cream/80 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-brand-brown/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="bg-brand-cream border-2 border-brand-yellow/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-brown/10 hover:bg-brand-red hover:text-white text-brand-brown transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col">
                  {/* Photo content */}
                  <div className="h-64 sm:h-[450px] bg-brand-brown/10">
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Footer details */}
                  <div className="p-6 bg-brand-cream border-t border-brand-brown/5 space-y-2">
                    <span className="bg-brand-brown text-brand-yellow text-[9px] font-black uppercase px-2.5 py-1 rounded-full inline-block">
                      {activePhoto.category}
                    </span>
                    <h3 className="text-xl font-bold text-brand-brown font-serif">{activePhoto.title}</h3>
                    <p className="text-xs sm:text-sm text-brand-brown/70 leading-relaxed font-sans">
                      {activePhoto.caption}
                    </p>
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

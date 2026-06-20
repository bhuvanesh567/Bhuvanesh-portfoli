import React from 'react';
import { Sparkles, Heart, HeartHandshake, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1974',
    title: "Ammamma's Secret Recipe",
    description: 'Our journey started in a small kitchen in Guntur, where our grandmother (Ammamma) perfected the traditional Avakaya spice ratios using cold-pressed sesame oil.'
  },
  {
    year: '1996',
    title: 'The Local Gathering Favor',
    description: 'As relatives and neighbors fell in love with the pickles, our mother began small-batch preparation for weddings and local festivals, earning a reputation for authentic taste.'
  },
  {
    year: '2015',
    title: 'Heritage Expansion',
    description: 'We established a small community kitchen run entirely by local women, ensuring hygienic hand-cutting of mangoes while adhering to traditional maturation times.'
  },
  {
    year: '2026',
    title: 'Going Digital globally',
    description: 'Vantillu Avakaya Ruchulu goes digital, bringing authentic, luxury-packed homemade Andhra pickles directly to tables across India and NRIs globally.'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about-section" className="py-24 bg-brand-cream/40 overflow-hidden border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Our Story</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Our Heritage
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-lg text-brand-brown/80 font-medium leading-relaxed font-sans pt-2">
            We bring generations of traditional Andhra pickle-making expertise to your table. Every single jar is handcrafted using heritage recipes, carefully selected ingredients, and homemade care.
          </p>
        </div>

        {/* Founder's Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative">
            {/* Ambient gold card borders */}
            <div className="absolute inset-0 bg-brand-yellow/10 rounded-2xl transform rotate-3 scale-95" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-brown/10">
              <img 
                src="/heritage_spices.png" 
                alt="Traditional Indian Spices Mixing" 
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-brown text-brand-yellow p-6 rounded-2xl shadow-xl max-w-xs border border-brand-yellow/20 hidden sm:block text-left">
              <Sparkles className="w-6 h-6 text-brand-yellow mb-2" />
              <p className="text-sm font-bold text-white font-serif">"No machines, no artificial preservatives. Only love and traditional wisdom."</p>
              <span className="block text-xs text-brand-cream/60 mt-2 font-bold uppercase tracking-wider">— Founder's Promise</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-brown font-serif">
              Crafted in Guntur, Loved Everywhere
            </h3>
            <p className="text-brand-brown/80 leading-relaxed font-sans">
              At Vantillu Avakaya Ruchulu, we believe a pickle isn't just a side dish—it is the soul of an Andhra meal. Our journey began in Guntur, Andhra Pradesh, a region world-famous for its high-quality red chillies. Our founder, raised on the traditional flavors of grandmother's kitchen, realized that the fast-paced modern life was distancing people from these culinary treasures.
            </p>
            <p className="text-brand-brown/80 leading-relaxed font-sans">
              To keep the legacy alive, we cook using cold-pressed oils and high-quality spices sourced directly from local farmers. The mangoes are hand-picked at the perfect maturity, washed, and meticulously dried. Every jar goes through a natural curing process, letting the spices naturally bind to create that legendary, mouthwatering tang.
            </p>

            {/* Core Values Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-3 bg-brand-cream p-3.5 rounded-xl border border-brand-brown/5 shadow-sm">
                <Heart className="w-5 h-5 text-brand-red shrink-0" />
                <span className="text-xs font-bold text-brand-brown">100% Homemade</span>
              </div>
              <div className="flex items-center space-x-3 bg-brand-cream p-3.5 rounded-xl border border-brand-brown/5 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-brand-green shrink-0" />
                <span className="text-xs font-bold text-brand-brown">Direct Farmers Sourcing</span>
              </div>
              <div className="flex items-center space-x-3 bg-brand-cream p-3.5 rounded-xl border border-brand-brown/5 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brand-yellow shrink-0" />
                <span className="text-xs font-bold text-brand-brown">Zero Preservatives</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Timeline Section */}
        <div className="border-t border-brand-brown/10 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-brown font-serif">
              Our Journey Through Time
            </h3>
            <p className="text-xs text-brand-brown/60 uppercase tracking-widest font-black mt-1">From a Guntur Kitchen to a Global Delicacy</p>
          </div>

          {/* Timeline Grid */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center line (visible on desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-brand-yellow/30 hidden lg:block" />

            <div className="space-y-12 lg:space-y-8">
              {TIMELINE_EVENTS.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col lg:flex-row items-center w-full ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Empty block for layout spacer */}
                    <div className="w-full lg:w-1/2 hidden lg:block" />
                    
                    {/* Bullet marker */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-brown border-4 border-brand-yellow flex items-center justify-center z-10 shadow-md hidden lg:flex font-bold text-[10px] text-brand-yellow">
                      {event.year}
                    </div>

                    {/* Timeline card */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="w-full lg:w-1/2 px-0 lg:px-8 text-center lg:text-left"
                    >
                      <div className="bg-brand-cream border border-brand-brown/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative">
                        <span className="inline-block bg-brand-red text-white text-xs font-black px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider lg:hidden">
                          Year {event.year}
                        </span>
                        <h4 className="text-lg font-black text-brand-brown font-serif mb-2">
                          {event.title}
                        </h4>
                        <p className="text-sm text-brand-brown/70 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

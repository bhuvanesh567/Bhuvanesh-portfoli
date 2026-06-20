import React from 'react';
import { CheckCircle, ShieldCheck, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Ingredient Selection',
    subtitle: 'Meticulous Farm-Level Sorting',
    description: 'We source sour raw mangoes, fresh gongura, and fresh prawns directly from Guntur orchards and coastal farms. Only pristine, undamaged pieces pass our sorting test.',
    icon: '🌾'
  },
  {
    step: '02',
    title: 'Cleaning & Drying',
    subtitle: '100% Hygienic Moisture Elimination',
    description: 'Mangoes and spices are washed thoroughly in purified water, then sun-dried on elevated screens under hygienic mesh. Zero moisture is the secret to a long-lasting pickle.',
    icon: '☀️'
  },
  {
    step: '03',
    title: 'Traditional Mixing',
    subtitle: 'Stone-Ground Manual Spicing',
    description: 'We manually blend ingredients in wooden containers. Cold-pressed sesame oil, Guntur red chilli powder, and stone-ground mustard flour are mixed gently by hand.',
    icon: '🥣'
  },
  {
    step: '04',
    title: 'Natural Maturation',
    subtitle: 'Curing in Heritage Ceramic Jars',
    description: 'The pickle is stored in large ceramic jars (traditional Jaadilu) for 3-7 days. The mangoes naturally ferment and absorb the intense spice oils.',
    icon: '🍯'
  },
  {
    step: '05',
    title: 'Premium Packaging',
    subtitle: 'Airtight Anti-Leak Safety Seals',
    description: 'Sterilized glass jars are filled under strict hygiene standards. An induction safety seal is applied, followed by protective bubble wrap and luxury cardboard casing.',
    icon: '📦'
  },
  {
    step: '06',
    title: 'Pan-India Delivery',
    subtitle: 'Fresh Shipping directly to Your Doorstep',
    description: 'Orders are dispatched within 24 hours of packing. Partnered with top-tier express courier services to ensure rapid, fresh delivery to your home.',
    icon: '🚚'
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process-section" className="py-24 bg-brand-brown text-brand-cream relative overflow-hidden">
      {/* Decorative Grid overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,179,0,0.05),transparent)] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-yellow uppercase">The Kitchen Journey</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white">
            Traditional Preparation Process
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-brand-cream/70 text-sm max-w-md mx-auto pt-2">
            No industrial shortcuts, no artificial maturing agents. Here is the step-by-step path every pickle jar takes.
          </p>
        </div>

        {/* Timeline representation (Vertical/Grid hybrid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2E1E1C]/80 border border-brand-yellow/15 hover:border-brand-yellow/40 rounded-2xl p-6 text-left relative group hover:shadow-lg transition-all"
            >
              {/* Step bubble marker */}
              <div className="absolute top-4 right-4 text-3xl font-black text-brand-yellow/10 font-serif group-hover:text-brand-yellow/20 transition-colors">
                {step.step}
              </div>

              {/* Icon / step graphic */}
              <div className="w-12 h-12 rounded-xl bg-brand-brown border border-brand-yellow/20 flex items-center justify-center text-2xl shadow-inner mb-6">
                {step.icon}
              </div>

              {/* Title & info */}
              <div className="space-y-2">
                <span className="block text-[10px] text-brand-yellow font-black uppercase tracking-wider">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  {step.title}
                </h3>
                <p className="text-[11px] text-brand-yellow/70 font-bold uppercase tracking-wide">
                  {step.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-brand-cream/60 leading-relaxed pt-2 font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Certifications */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-brand-cream/10 pt-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-brand-yellow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">FSSAI Hygienic Standard</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="w-8 h-8 text-brand-yellow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Small-Batch Cured</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Award className="w-8 h-8 text-brand-yellow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Traditional Recipe</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Heart className="w-8 h-8 text-brand-yellow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">100% Homemade</span>
          </div>
        </div>

      </div>
    </section>
  );
};

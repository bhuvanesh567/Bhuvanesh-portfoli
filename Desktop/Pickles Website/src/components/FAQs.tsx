import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long do these pickles last?',
    answer: 'Our traditional vegetarian pickles (Avakaya, Gongura, Garlic, Tomato, Lemon) last for 9 to 12 months at room temperature, provided they are kept in an airtight container away from moisture. Non-vegetarian (chicken and prawn) pickles last for up to 6 months when refrigerated.'
  },
  {
    question: 'Do you deliver across India?',
    answer: 'Yes! We deliver to over 22,000 pin codes across India, covering all major cities, towns, and districts. Standard delivery takes 3-5 business days depending on your location. Delivery is FREE on orders above ₹499!'
  },
  {
    question: 'Are any artificial preservatives or colors used?',
    answer: 'Absolutely not. Our brand is built on purity. We do not use sodium benzoate, synthetic colors, vinegar (except in small safe quantities for prawns), or additives. The pickles are preserved entirely through traditional curing, cold-pressed oils, turmeric, and natural rock salt.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD) for most pin codes. In addition, we support secure online payments including UPI (Google Pay, PhonePe, Paytm), Netbanking, and Debit or Credit cards.'
  },
  {
    question: 'How do you ensure the pickles do not leak during transit?',
    answer: 'We use double-walled food-grade jars with air-tight induction induction seals. Each jar is bubble-wrapped separately and placed inside a crash-resistant shock-absorbing outer box, guaranteeing leak-free delivery directly to your home.'
  }
];

export const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-cream/30 border-b border-brand-brown/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Answers to Queries</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-brown font-serif">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-brand-cream border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-sm sm:text-base font-bold text-brand-brown focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="font-serif font-black">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-brown shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-brown shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-brand-brown/70 leading-relaxed font-sans border-t border-brand-brown/5">
                        <p className="pt-4 font-medium">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

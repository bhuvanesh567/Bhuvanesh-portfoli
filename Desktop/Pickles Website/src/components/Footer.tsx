import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubsubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubsubscribed(false);
    }, 5000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-brown text-brand-cream/80 pt-16 pb-8 border-t-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                alt="Vantillu Avakaya Ruchulu Logo" 
                className="w-14 h-14 rounded-full border-2 border-brand-yellow mr-3 shadow-md"
              />
              <div>
                <span className="block text-2xl font-black tracking-tight text-white font-serif leading-none">
                  VANTILLU
                </span>
                <span className="block text-xs font-bold tracking-widest text-brand-yellow font-sans uppercase">
                  Avakaya Ruchulu
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-cream/60">
              Preserving generations of authentic taste. Handcrafted homemade Andhra pickles made with traditional recipes, pure cold-pressed oil, and 100% natural ingredients.
            </p>
            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Join our Spice Family</h4>
              <p className="text-xs text-brand-cream/50">Subscribe to get secret recipes, product launches, and exclusive offers.</p>
              <form onSubmit={handleSubscribe} className="flex relative mt-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-brown/40 border border-brand-cream/20 rounded-l-md px-4 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-yellow"
                />
                <button
                  type="submit"
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-brown font-bold px-4 rounded-r-md transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-brand-green font-semibold mt-1">🎉 Thank you for subscribing! Check your inbox soon.</p>
              )}
              {error && (
                <p className="text-xs text-brand-red font-semibold mt-1">{error}</p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-serif text-lg font-bold mb-4 tracking-wide border-b border-brand-cream/10 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-yellow transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('about-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Our Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('products-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Browse Pickles
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('process-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Preparation Process
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('contact-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Get In Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4 tracking-wide border-b border-brand-cream/10 pb-2">Our Offerings</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleScrollTo('products-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Andhra Avakaya Specials
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('products-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Traditional Veg Pickles
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('products-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Fiery Non-Veg Delicacies
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('ingredients-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Premium Sourced Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('about-section')} className="hover:text-brand-yellow transition-colors text-left">
                  Founder's Story
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4 tracking-wide border-b border-brand-cream/10 pb-2">Heritage Kitchen</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-yellow shrink-0 mt-0.5" />
                <span>67-9-3/2, darsipeta-2, Patamata, Vijayawada - 520010</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-yellow shrink-0" />
                <span>+91 88863 55125</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-yellow shrink-0" />
                <span className="break-all">bezawadaruchulu04@gmail.com</span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/bezawadaruchulu04/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-brown text-white transition-colors" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-brown text-white transition-colors" title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-brown text-white transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Info Bottom */}
        <div className="border-t border-brand-cream/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-cream/40">
          <p>© {new Date().getFullYear()} Vantillu Avakaya Ruchulu. All rights reserved. Made with love in Andhra Pradesh.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Return Policy</a>
            <a href="#" className="hover:text-white transition-colors">FSSAI License Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API submit
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section id="contact-section" className="py-24 bg-brand-cream/40 border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-red uppercase">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-brown font-serif">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
          <p className="text-sm font-semibold text-brand-brown/70 leading-relaxed font-sans max-w-xl mx-auto pt-2">
            Have questions about bulk orders, international shipping, or catering? Drop us a message, and our family will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Maps - Left Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Info Card Grid */}
            <div className="bg-brand-cream border border-brand-brown/10 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-brand-brown font-serif border-b border-brand-brown/5 pb-3">Kitchen Details</h3>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-brand-red shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Kitchen Address</h4>
                  <p className="text-xs sm:text-sm text-brand-brown/70 font-medium mt-1 leading-relaxed">
                    Vantillu Heritage Kitchens, 67-9-3/2, darsipeta-2, Patamata, Vijayawada - 520010, Andhra Pradesh, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-brand-green shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Phone & WhatsApp</h4>
                  <p className="text-xs sm:text-sm text-brand-brown/70 font-bold mt-1">
                    +91 88863 55125 (Customer Support)
                  </p>
                  <p className="text-[11px] text-brand-brown/50 font-semibold">Available from 9:00 AM to 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-brand-yellow shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-xs sm:text-sm text-brand-brown/70 font-bold mt-1 break-all">
                    bezawadaruchulu04@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-brand-brown shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Business Hours</h4>
                  <p className="text-xs sm:text-sm text-brand-brown/70 font-medium mt-1">
                    Monday to Saturday: 9:00 AM – 7:00 PM<br />
                    Sunday: Closed (Fermenting day!)
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Mockup */}
            <div className="bg-brand-brown rounded-3xl overflow-hidden h-60 relative shadow-md border border-brand-yellow/10 flex flex-col justify-end p-6 text-left">
              {/* Map background texture overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
                style={{ 
                  backgroundImage: `url('/heritage_spices.png')` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/80 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <span className="bg-brand-yellow text-brand-brown text-[9px] font-black uppercase px-2.5 py-1 rounded-full inline-block">
                  Andhra Roots
                </span>
                <h4 className="text-white font-bold font-serif text-lg">Vijayawada Kitchen</h4>
                <p className="text-xs text-brand-cream/60">Our main preparation kitchen is based in Vijayawada, AP, bringing you authentic homemade flavors.</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-brand-cream border border-brand-brown/10 rounded-3xl p-8 shadow-sm text-left">
              <h3 className="text-xl font-bold text-brand-brown font-serif border-b border-brand-brown/5 pb-3 mb-6">Write to Us</h3>
              
              {submitted && (
                <div className="mb-6 p-4 bg-brand-green/10 border border-brand-green/30 rounded-xl text-brand-green flex items-center space-x-3.5">
                  <CheckCircle className="w-6 h-6 shrink-0" />
                  <div className="text-xs sm:text-sm font-semibold">
                    <span className="block font-black">Message Sent Successfully!</span>
                    Our family will read your letter and reach out via email/phone soon.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-black text-brand-brown uppercase tracking-wider mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    placeholder="e.g. Bhuvanesh K."
                  />
                  {errors.name && <p className="text-xs text-brand-red font-semibold mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black text-brand-brown uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                      placeholder="e.g. name@gmail.com"
                    />
                    {errors.email && <p className="text-xs text-brand-red font-semibold mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black text-brand-brown uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                      placeholder="e.g. 9876543210"
                    />
                    {errors.phone && <p className="text-xs text-brand-red font-semibold mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black text-brand-brown uppercase tracking-wider mb-1">Message / Query Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    placeholder="How can we assist you with our pickles today? For custom orders, please mention product names and weights."
                  />
                  {errors.message && <p className="text-xs text-brand-red font-semibold mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-bold w-full py-3.5 rounded-xl shadow transition-transform duration-100 active:scale-98 flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

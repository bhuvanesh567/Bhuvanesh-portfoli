import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, MapPin, Truck, Mail, Phone, LogOut, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AccountModal: React.FC = () => {
  const {
    user,
    orders,
    accountOpen,
    setAccountOpen,
    loginUser,
    logoutUser,
    setTrackingOrderId,
    setTrackingOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [loginForm, setLoginForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!loginForm.name.trim()) newErrors.name = 'Full name is required.';
    if (!loginForm.phone.trim() || !/^[0-9]{10}$/.test(loginForm.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number is required.';
    }
    if (!loginForm.email.trim() || !/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!loginForm.address.trim()) newErrors.address = 'Address is required.';
    if (!loginForm.city.trim()) newErrors.city = 'City is required.';
    if (!loginForm.pincode.trim() || !/^[0-9]{6}$/.test(loginForm.pincode)) {
      newErrors.pincode = 'Valid 6-digit Pincode is required.';
    }

    if (Object.keys(newErrors).length === 0) {
      loginUser(loginForm);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleTrackClick = (orderId: string) => {
    setTrackingOrderId(orderId);
    setAccountOpen(false);
    setTrackingOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setActiveTab('profile');
  };

  return (
    <AnimatePresence>
      {accountOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-brown/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-brand-cream border-2 border-brand-brown/20 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-left"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between bg-brand-cream">
              <h2 className="text-lg font-black text-brand-brown font-serif flex items-center space-x-2">
                <User className="w-5 h-5 text-brand-red" />
                <span>Customer Dashboard</span>
              </h2>
              <button
                onClick={() => setAccountOpen(false)}
                className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Panel Content */}
            <div className="p-6">
              {!user ? (
                /* Login / Setup Account Simulation Form */
                <div>
                  <h3 className="text-base font-bold text-brand-brown font-serif mb-2">Create / Link Account</h3>
                  <p className="text-xs text-brand-brown/60 mb-6 font-medium">Link your details to save delivery address, checkout faster, and track historical orders.</p>
                  
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Full Name</label>
                        <input
                          type="text"
                          value={loginForm.name}
                          onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="e.g. Bhuvanesh K."
                        />
                        {errors.name && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={loginForm.phone}
                          onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="10-digit number"
                        />
                        {errors.phone && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.phone}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Email Address</label>
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.email}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Delivery Address</label>
                        <input
                          type="text"
                          value={loginForm.address}
                          onChange={(e) => setLoginForm({ ...loginForm, address: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="House/Apt, street, locality"
                        />
                        {errors.address && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">City</label>
                        <input
                          type="text"
                          value={loginForm.city}
                          onChange={(e) => setLoginForm({ ...loginForm, city: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="City"
                        />
                        {errors.city && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Pincode</label>
                        <input
                          type="text"
                          value={loginForm.pincode}
                          onChange={(e) => setLoginForm({ ...loginForm, pincode: e.target.value })}
                          className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red"
                          placeholder="6 digits"
                        />
                        {errors.pincode && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.pincode}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold py-3 w-full rounded-xl mt-6 text-xs uppercase tracking-wider shadow"
                    >
                      Save Account Profile
                    </button>
                  </form>
                </div>
              ) : (
                /* Profile & Order Details (User Logged In) */
                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex border-b border-brand-brown/10">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`py-2.5 px-5 text-xs font-black uppercase border-b-2 tracking-wide transition-all ${
                        activeTab === 'profile'
                          ? 'border-brand-red text-brand-red'
                          : 'border-transparent text-brand-brown/60 hover:text-brand-brown'
                      }`}
                    >
                      My Profile Info
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`py-2.5 px-5 text-xs font-black uppercase border-b-2 tracking-wide transition-all ${
                        activeTab === 'orders'
                          ? 'border-brand-red text-brand-red'
                          : 'border-transparent text-brand-brown/60 hover:text-brand-brown'
                      }`}
                    >
                      Order History ({orders.length})
                    </button>
                  </div>

                  {activeTab === 'profile' && (
                    <div className="space-y-5 text-left bg-brand-brown/5 p-6 rounded-2xl border border-brand-brown/5">
                      <div className="flex items-center justify-between border-b border-brand-brown/10 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-brand-brown font-serif">{user.name}</h4>
                            <span className="text-[10px] text-brand-brown/50 font-bold uppercase tracking-wider">Happy Customer</span>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-1 hover:text-brand-red text-xs font-bold text-brand-brown/60 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="flex items-center space-x-3.5">
                          <Phone className="w-4 h-4 text-brand-brown/60 shrink-0" />
                          <div>
                            <span className="block text-[9px] text-brand-brown/50 font-bold uppercase leading-none">Phone</span>
                            <span className="font-semibold text-brand-brown">{user.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3.5">
                          <Mail className="w-4 h-4 text-brand-brown/60 shrink-0" />
                          <div>
                            <span className="block text-[9px] text-brand-brown/50 font-bold uppercase leading-none">Email</span>
                            <span className="font-semibold text-brand-brown">{user.email}</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3.5">
                          <MapPin className="w-4 h-4 text-brand-brown/60 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[9px] text-brand-brown/50 font-bold uppercase leading-none">Primary Address</span>
                            <span className="font-semibold text-brand-brown leading-relaxed">
                              {user.address}, {user.city} - {user.pincode}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                      {orders.length === 0 ? (
                        <div className="text-center py-10 space-y-2">
                          <FileText className="w-8 h-8 text-brand-brown/40 mx-auto" />
                          <p className="text-sm font-bold text-brand-brown/60">No orders found.</p>
                          <p className="text-[10px] text-brand-brown/40">You haven't placed any pickle orders yet!</p>
                        </div>
                      ) : (
                        orders.map((order) => (
                          <div
                            key={order.id}
                            className="bg-brand-cream border border-brand-brown/10 p-4 rounded-xl shadow-sm text-left flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-brand-brown/5 pb-2">
                              <div>
                                <span className="block text-[9px] text-brand-brown/50 leading-none">Order ID</span>
                                <span className="text-xs font-mono font-bold text-brand-brown">{order.id}</span>
                              </div>
                              <div>
                                <span className="block text-[9px] text-brand-brown/50 text-right leading-none">Status</span>
                                <span className={`text-[10px] font-black uppercase tracking-wider ${
                                  order.status === 'delivered' ? 'text-brand-green' : 'text-brand-yellow'
                                }`}>
                                  {order.status === 'placed' && 'Placed'}
                                  {order.status === 'mixing' && 'Prep (Mixing)'}
                                  {order.status === 'matured' && 'Cured & Packed'}
                                  {order.status === 'transit' && 'In Transit'}
                                  {order.status === 'delivered' && 'Delivered'}
                                </span>
                              </div>
                            </div>

                            <div className="text-xs space-y-1">
                              <p className="text-[10px] text-brand-brown/50">Date: {order.date}</p>
                              <p className="text-[10px] text-brand-brown/50">Items: {order.items.map(i => `${i.product.name} (${i.weight}g) x${i.quantity}`).join(', ')}</p>
                              <p className="font-bold text-brand-red pt-1">Total Paid: ₹{order.total}</p>
                            </div>

                            <button
                              onClick={() => handleTrackClick(order.id)}
                              className="bg-brand-brown/5 hover:bg-brand-brown/10 border border-brand-brown/10 text-brand-brown font-bold py-2 rounded-lg text-[10px] tracking-wide uppercase transition-colors text-center flex items-center justify-center space-x-1"
                            >
                              <Truck className="w-3.5 h-3.5 mr-1" />
                              <span>Live Tracking details</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

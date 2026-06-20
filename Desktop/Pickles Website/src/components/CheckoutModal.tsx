import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { CartItem } from '../context/AppContext';
import { X, CheckCircle, ArrowRight, CreditCard, Shield, Truck, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    checkoutOpen,
    setCheckoutOpen,
    placeOrder,
    getCartDiscount,
    getCartTotal,
    appliedCoupon,
    setTrackingOrderId,
    setTrackingOpen,
    loginUser,
    user
  } = useApp();

  const [step, setStep] = useState(1);
  const [shippingForm, setShippingForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shippingForm.name.trim()) newErrors.name = 'Full name is required.';
    if (!shippingForm.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10}$/.test(shippingForm.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!shippingForm.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!shippingForm.address.trim()) newErrors.address = 'Shipping address is required.';
    if (!shippingForm.city.trim()) newErrors.city = 'City is required.';
    if (!shippingForm.pincode.trim() || !/^[0-9]{6}$/.test(shippingForm.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit Pincode.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    // Save user details automatically if not already logged in
    if (!user) {
      loginUser(shippingForm);
    }
    
    const newOrder = placeOrder(shippingForm, paymentMethod);
    setConfirmedOrder(newOrder);
    setStep(3);

    // Trigger full screen confetti for premium customer delight
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrderWithPayment = async () => {
    if (paymentMethod === 'cod' || paymentMethod === 'upi') {
      // Cash on Delivery and Direct UPI QR Code place order directly
      handlePlaceOrder();
      return;
    }

    // Card or Online UPI via Razorpay
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Could not load Razorpay payment gateway. Please check your internet connection.');
      return;
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T3mFTPKBBLdZl3';

    const options = {
      key: keyId,
      amount: getCartTotal() * 100, // Amount is in subunits (paise)
      currency: 'INR',
      name: 'Vantillu Avakaya Ruchulu',
      description: 'Order Payment',
      image: '/logo.jpg',
      handler: function (_response: any) {
        // Payment successful, complete order
        handlePlaceOrder();
      },
      prefill: {
        name: shippingForm.name,
        email: shippingForm.email,
        contact: shippingForm.phone,
      },
      notes: {
        address: `${shippingForm.address}, ${shippingForm.city} - ${shippingForm.pincode}`,
      },
      theme: {
        color: '#5C3E35', // Match brand brown
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleWhatsAppShare = () => {
    if (!confirmedOrder) return;
    const itemsList = confirmedOrder.items
      .map((i: CartItem) => `- ${i.product.name} (${i.weight}g) x ${i.quantity}`)
      .join('\n');

    const couponText = appliedCoupon ? `\nCoupon Applied: ${appliedCoupon.code} (-₹${confirmedOrder.discount})` : '';

    const msg = encodeURIComponent(
      `Hello Vantillu Avakaya Ruchulu!\n\nI have successfully placed an order! Please confirm receipt.\n\n*Order ID:* ${confirmedOrder.id}\n*Date:* ${confirmedOrder.date}\n\n*Items ordered:*\n${itemsList}${couponText}\n\n*Subtotal:* ₹${confirmedOrder.subtotal}\n*Delivery:* ₹${confirmedOrder.delivery}\n*Grand Total:* ₹${confirmedOrder.total}\n\n*Delivery Address:*\n${confirmedOrder.shippingAddress.name}\n${confirmedOrder.shippingAddress.address}, ${confirmedOrder.shippingAddress.city} - ${confirmedOrder.shippingAddress.pincode}\nPhone: ${confirmedOrder.shippingAddress.phone}\n\n*Payment Method:* ${confirmedOrder.paymentMethod.toUpperCase()}`
    );

    window.open(`https://wa.me/918886355125?text=${msg}`, '_blank');
  };

  const handleTrackOrderClick = () => {
    if (!confirmedOrder) return;
    setTrackingOrderId(confirmedOrder.id);
    setCheckoutOpen(false);
    setTrackingOpen(true);
  };

  const copyToClipboard = () => {
    if (!confirmedOrder) return;
    navigator.clipboard.writeText(confirmedOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const resetModal = () => {
    setStep(1);
    setConfirmedOrder(null);
    setCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-brown/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-brand-cream border-2 border-brand-brown/20 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between bg-brand-cream">
              <h2 className="text-lg font-black text-brand-brown font-serif">
                {step === 1 && 'Secure Checkout - Step 1: Shipping Details'}
                {step === 2 && 'Secure Checkout - Step 2: Payment Method'}
                {step === 3 && 'Order Confirmed! 🎉'}
              </h2>
              {step !== 3 && (
                <button
                  onClick={resetModal}
                  className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content Container */}
            <div className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  {/* Shipping Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        value={shippingForm.name}
                        onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="e.g. Bhuvanesh K."
                      />
                      {errors.name && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Phone Number (10 digits)</label>
                      <input
                        type="text"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="e.g. 9876543210"
                      />
                      {errors.phone && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.phone}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="e.g. customer@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.email}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Detailed Shipping Address</label>
                      <input
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="Apartment/Suite, Street address, Area"
                      />
                      {errors.address && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">City</label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="City"
                      />
                      {errors.city && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-1">Pincode (6 digits)</label>
                      <input
                        type="text"
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        className="w-full bg-brand-cream/40 border border-brand-brown/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        placeholder="Pincode"
                      />
                      {errors.pincode && <p className="text-[10px] text-brand-red font-semibold mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Pricing summary */}
                  <div className="bg-brand-brown/5 rounded-2xl p-4 border border-brand-brown/10 text-xs font-semibold space-y-1 mt-4">
                    <div className="flex justify-between text-brand-brown/70">
                      <span>Item Count</span>
                      <span>{cart.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
                    </div>
                    {getCartDiscount() > 0 && (
                      <div className="flex justify-between text-brand-green">
                        <span>Discount Applied</span>
                        <span>- ₹{getCartDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-brown font-black text-sm border-t border-brand-brown/10 pt-2.5">
                      <span>Total Amount Payable</span>
                      <span className="text-brand-red">₹{getCartTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 rounded-xl shadow mt-6 flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Payment Choices */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-brand-brown uppercase tracking-wider mb-2">Choose Payment Option</label>

                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-brand-red bg-brand-red/5'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3 text-left">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-1 accent-brand-red"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-brand-brown">Cash on Delivery (COD)</h4>
                          <p className="text-[10px] text-brand-brown/60 font-medium">Pay cash/UPI at the time of doorstep delivery. (₹0 COD charges)</p>
                        </div>
                      </div>
                      <Truck className="w-5 h-5 text-brand-brown/60 shrink-0" />
                    </div>

                    {/* Direct UPI QR */}
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-brand-red bg-brand-red/5'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3 text-left">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="mt-1 accent-brand-red"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-brand-brown">Direct UPI (Scan QR Code)</h4>
                          <p className="text-[10px] text-brand-brown/60 font-medium">Scan our direct merchant QR code with any UPI app to transfer instantly.</p>
                        </div>
                      </div>
                      <span className="text-xs bg-brand-yellow text-brand-brown font-black px-2 py-0.5 rounded border border-brand-yellow">UPI QR</span>
                    </div>

                    {/* Razorpay Online */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-brand-red bg-brand-red/5'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3 text-left">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mt-1 accent-brand-red"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-brand-brown">Razorpay (Cards / UPI / Netbanking)</h4>
                          <p className="text-[10px] text-brand-brown/60 font-medium">Pay securely via Credit/Debit Cards, Netbanking, or UPI using Razorpay.</p>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-brand-brown/60 shrink-0" />
                    </div>
                  </div>

                  {/* QR code sub-panel if UPI chosen */}
                  {paymentMethod === 'upi' && (
                    <div className="bg-brand-brown/5 rounded-2xl p-4 border border-brand-brown/10 flex flex-col items-center space-y-2">
                      <div className="bg-white p-2 rounded-lg border border-brand-brown/10">
                        <img 
                          src="/phonepe_qr.png"
                          alt="PhonePe UPI QR Code"
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-brand-brown/60 font-bold">UPI ID: vantillu@ybl</span>
                      <p className="text-[9px] text-brand-brown/50">Scan the PhonePe QR code above with GPay, PhonePe, Paytm, or BHIM to pay exactly <span className="font-bold text-brand-red">₹{getCartTotal()}</span>, then click Place Order below.</p>
                    </div>
                  )}

                  {/* Security trust badge */}
                  <div className="flex items-center space-x-3 bg-brand-green/10 border border-brand-green/30 p-3.5 rounded-xl text-brand-green text-xs font-semibold">
                    <Shield className="w-5 h-5 shrink-0" />
                    <span>Your transactions are secured with military-grade 256-bit AES encryption. No payment credentials are saved on servers.</span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="border-2 border-brand-brown text-brand-brown font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-brand-brown/5"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrderWithPayment}
                      className="bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow"
                    >
                      {paymentMethod === 'cod' || paymentMethod === 'upi' ? `Place Order (₹${getCartTotal()})` : `Pay & Place Order (₹${getCartTotal()})`}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && confirmedOrder && (
                <div className="text-center space-y-6 py-4">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-serif text-brand-brown">Order Placed Successfully!</h3>
                    <p className="text-xs text-brand-brown/70 font-medium">Thank you for ordering from Vantillu Avakaya Ruchulu. Your pickle jar is getting ready!</p>
                  </div>

                  {/* Order ID display */}
                  <div className="bg-brand-brown/5 rounded-2xl p-4 border border-brand-brown/10 max-w-sm mx-auto flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-[10px] text-brand-brown/50 leading-none">ORDER ID</span>
                      <span className="text-sm font-black text-brand-brown font-mono">{confirmedOrder.id}</span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-1 text-xs font-bold text-brand-red hover:underline focus:outline-none"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-brand-green" />
                          <span className="text-brand-green">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actions checklist */}
                  <div className="space-y-3 pt-4 border-t border-brand-brown/15 max-w-md mx-auto">
                    {/* WhatsApp confirmation */}
                    <button
                      onClick={handleWhatsAppShare}
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3.5 rounded-xl shadow flex items-center justify-center space-x-2 text-xs uppercase tracking-wider transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm11.953-21.813c-5.461 0-9.902 4.43-9.906 9.878-.002 2.05.535 4.05 1.558 5.82l-1.02 3.725 3.81-1c1.697.925 3.597 1.413 5.548 1.415h.005c5.46 0 9.901-4.43 9.905-9.877 0-2.64-1.029-5.121-2.896-6.988-1.868-1.868-4.351-2.896-6.994-2.896zm4.646 13.543c-.254-.127-1.51-.745-1.745-.829-.233-.085-.403-.127-.572.127-.169.254-.656.829-.805.997-.148.169-.296.186-.55.06-2.01-.1-3.48-.775-4.63-2.76-.3-.518.3-.481.859-1.597.09-.18.043-.339-.021-.466-.064-.127-.572-1.378-.785-1.884-.208-.502-.436-.433-.573-.44-.13-.006-.279-.008-.423-.008-.144 0-.378.054-.576.27-.198.217-.753.737-.753 1.798 0 1.062.773 2.087.88 2.229.109.14 1.522 2.325 3.69 3.26.515.222.917.355 1.23.454.517.164.988.141 1.36.085.414-.062 1.51-.617 1.724-1.214.213-.597.213-1.107.15-1.214-.065-.107-.234-.19-.488-.317z"/>
                      </svg>
                      <span>Share Invoice to WhatsApp</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleTrackOrderClick}
                        className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                      >
                        Track Order Status
                      </button>
                      <button
                        onClick={resetModal}
                        className="border-2 border-brand-brown text-brand-brown font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-brand-brown/5"
                      >
                        Back to Shop
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

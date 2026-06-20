import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, FileQuestion, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderTrackingModal: React.FC = () => {
  const {
    orders,
    trackingOpen,
    setTrackingOpen,
    trackingOrderId,
    setTrackingOrderId
  } = useApp();

  const [searchId, setSearchId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Find order by ID or Phone
  const activeOrder = orders.find(
    (order) =>
      order.id.toLowerCase() === trackingOrderId.toLowerCase() ||
      order.id.toLowerCase() === searchId.trim().toLowerCase() ||
      order.shippingAddress.phone === searchId.trim()
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (activeOrder) {
      setTrackingOrderId(activeOrder.id);
    }
  };

  const getStepStatusClass = (stepName: string, orderStatus: string) => {
    const orderStages = ['placed', 'mixing', 'matured', 'transit', 'delivered'];
    const currentIdx = orderStages.indexOf(orderStatus);
    const stepIdx = orderStages.indexOf(stepName);

    if (currentIdx >= stepIdx) {
      return {
        iconBg: 'bg-brand-red text-white border-brand-red',
        lineBg: 'bg-brand-red',
        textStyle: 'text-brand-brown font-bold'
      };
    }
    return {
      iconBg: 'bg-brand-cream text-brand-brown/30 border-brand-brown/10',
      lineBg: 'bg-brand-brown/10',
      textStyle: 'text-brand-brown/40'
    };
  };

  return (
    <AnimatePresence>
      {trackingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-brown/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-brand-cream border-2 border-brand-brown/20 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-left"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between bg-brand-cream">
              <h2 className="text-lg font-black text-brand-brown font-serif">Live Order Curing & Delivery Tracker</h2>
              <button
                onClick={() => {
                  setTrackingOpen(false);
                  setSearchId('');
                  setHasSearched(false);
                }}
                className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tracking Body */}
            <div className="p-6">
              {/* Search Bar - only show if no order is preselected */}
              {(!trackingOrderId || !activeOrder) && (
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <p className="text-xs text-brand-brown/70 font-semibold text-left">Search your order status by typing Order ID (e.g. VNT-123456) or phone number:</p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. VNT-593849 or 9876543210"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="w-full py-3.5 pl-4 pr-12 rounded-xl border border-brand-brown/20 bg-brand-cream/50 text-brand-brown focus:outline-none focus:border-brand-red font-semibold"
                    />
                    <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-brown/60 hover:text-brand-red">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>

                  {hasSearched && !activeOrder && (
                    <div className="flex items-center space-x-3 bg-brand-red/10 border border-brand-red/30 p-4 rounded-xl text-brand-red text-xs text-left">
                      <FileQuestion className="w-6 h-6 shrink-0" />
                      <div>
                        <span className="block font-black">Order Not Found</span>
                        Check the spelling or place a mock order. Live tracking simulations trigger immediately upon placing orders!
                      </div>
                    </div>
                  )}
                </form>
              )}

              {/* Display tracking details if found */}
              {activeOrder && (
                <div className="space-y-6">
                  {/* Summary details */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-brand-brown/10 pb-4 text-xs font-semibold">
                    <div className="text-left">
                      <span className="block text-[9px] text-brand-brown/50 uppercase leading-none">Tracking ID</span>
                      <span className="text-sm font-mono font-black text-brand-brown">{activeOrder.id}</span>
                    </div>
                    <div className="flex items-center space-x-3.5 text-left">
                      <Calendar className="w-4 h-4 text-brand-brown/60 shrink-0" />
                      <div>
                        <span className="block text-[9px] text-brand-brown/50 uppercase leading-none">Placed On</span>
                        <span>{activeOrder.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Curing & Shipping Timeline */}
                  <div className="space-y-6 text-left py-2 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-brand-brown/10" />

                    {/* Step 1: Placed */}
                    <div className="flex items-start space-x-4 relative">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                        getStepStatusClass('placed', activeOrder.status).iconBg
                      }`}>
                        1
                      </div>
                      <div className="pt-1.5">
                        <h4 className={`text-xs sm:text-sm font-serif ${getStepStatusClass('placed', activeOrder.status).textStyle}`}>Order Placed & Confirmed</h4>
                        <p className="text-[10px] text-brand-brown/50 leading-relaxed font-sans">Kitchen queue generated. Ingredients allocated.</p>
                      </div>
                    </div>

                    {/* Step 2: Mixing */}
                    <div className="flex items-start space-x-4 relative">
                      {/* connection line highlight */}
                      <div className={`absolute left-[19px] -top-6 h-6 w-0.5 ${getStepStatusClass('mixing', activeOrder.status).lineBg}`} />
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                        getStepStatusClass('mixing', activeOrder.status).iconBg
                      }`}>
                        2
                      </div>
                      <div className="pt-1.5">
                        <h4 className={`text-xs sm:text-sm font-serif ${getStepStatusClass('mixing', activeOrder.status).textStyle}`}>Chef Preparation (Spice Mixing)</h4>
                        <p className="text-[10px] text-brand-brown/50 leading-relaxed font-sans">Pickles are mixed by hand with spices and wood-pressed oil.</p>
                      </div>
                    </div>

                    {/* Step 3: Curing */}
                    <div className="flex items-start space-x-4 relative">
                      <div className={`absolute left-[19px] -top-6 h-6 w-0.5 ${getStepStatusClass('matured', activeOrder.status).lineBg}`} />
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                        getStepStatusClass('matured', activeOrder.status).iconBg
                      }`}>
                        3
                      </div>
                      <div className="pt-1.5">
                        <h4 className={`text-xs sm:text-sm font-serif ${getStepStatusClass('matured', activeOrder.status).textStyle}`}>Jar Curing & Packing</h4>
                        <p className="text-[10px] text-brand-brown/50 leading-relaxed font-sans">Aged inside ceramic jars. induction sealed to prevent leakage.</p>
                      </div>
                    </div>

                    {/* Step 4: Transit */}
                    <div className="flex items-start space-x-4 relative">
                      <div className={`absolute left-[19px] -top-6 h-6 w-0.5 ${getStepStatusClass('transit', activeOrder.status).lineBg}`} />
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                        getStepStatusClass('transit', activeOrder.status).iconBg
                      }`}>
                        4
                      </div>
                      <div className="pt-1.5">
                        <h4 className={`text-xs sm:text-sm font-serif ${getStepStatusClass('transit', activeOrder.status).textStyle}`}>Dispatched (In Transit)</h4>
                        <p className="text-[10px] text-brand-brown/50 leading-relaxed font-sans">Dispatched from Guntur Spice Hub. Courier tracking active.</p>
                      </div>
                    </div>

                    {/* Step 5: Delivered */}
                    <div className="flex items-start space-x-4 relative">
                      <div className={`absolute left-[19px] -top-6 h-6 w-0.5 ${getStepStatusClass('delivered', activeOrder.status).lineBg}`} />
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                        getStepStatusClass('delivered', activeOrder.status).iconBg
                      }`}>
                        ✓
                      </div>
                      <div className="pt-1.5">
                        <h4 className={`text-xs sm:text-sm font-serif ${getStepStatusClass('delivered', activeOrder.status).textStyle}`}>Delivered fresh</h4>
                        <p className="text-[10px] text-brand-brown/50 leading-relaxed font-sans">Doorstep delivery confirmed. Happy eating!</p>
                      </div>
                    </div>
                  </div>

                  {/* Real-time status tracker tooltip */}
                  {activeOrder.status !== 'delivered' && (
                    <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-brown rounded-xl text-xs text-left font-medium leading-relaxed">
                      💡 *Real-time Tracking*: Order status updates dynamically in real-time since placement. Watch your package progress from preparation (1 min), jar curing (5 mins), and transit (15 mins) to delivered (30 mins).
                    </div>
                  )}

                  {/* Tracking actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-brown/15">
                    <button
                      onClick={() => {
                        setTrackingOrderId('');
                        setHasSearched(false);
                      }}
                      className="border-2 border-brand-brown text-brand-brown font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-brand-brown/5"
                    >
                      Track Another
                    </button>
                    <button
                      onClick={() => {
                        setTrackingOpen(false);
                        setSearchId('');
                        setHasSearched(false);
                      }}
                      className="bg-brand-brown hover:bg-brand-brown/95 text-brand-cream font-bold py-3 rounded-xl text-xs uppercase tracking-wider text-center"
                    >
                      Close Tracker
                    </button>
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Trigger tooltip animation on mount, then hide after 5s
  React.useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 2500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleGlobalChatClick = () => {
    const text = encodeURIComponent("Hello Vantillu Avakaya Ruchulu! I would like to know more about your traditional homemade pickles, shipping options, and custom gift boxes.");
    window.open(`https://wa.me/918886355125?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            className="bg-brand-brown text-brand-cream border border-brand-yellow/30 text-xs px-4 py-2.5 rounded-2xl shadow-xl max-w-[200px] text-left relative hidden sm:block font-medium"
          >
            {/* Speech bubble arrow pointer */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-brown rotate-45 border-t border-r border-brand-yellow/30" />
            <p>🌶️ Chat with us on WhatsApp to order directly!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={handleGlobalChatClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-2xl relative group focus:outline-none"
        title="WhatsApp Support Chat"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm11.953-21.813c-5.461 0-9.902 4.43-9.906 9.878-.002 2.05.535 4.05 1.558 5.82l-1.02 3.725 3.81-1c1.697.925 3.597 1.413 5.548 1.415h.005c5.46 0 9.901-4.43 9.905-9.877 0-2.64-1.029-5.121-2.896-6.988-1.868-1.868-4.351-2.896-6.994-2.896zm4.646 13.543c-.254-.127-1.51-.745-1.745-.829-.233-.085-.403-.127-.572.127-.169.254-.656.829-.805.997-.148.169-.296.186-.55.06-2.01-.1-3.48-.775-4.63-2.76-.3-.518.3-.481.859-1.597.09-.18.043-.339-.021-.466-.064-.127-.572-1.378-.785-1.884-.208-.502-.436-.433-.573-.44-.13-.006-.279-.008-.423-.008-.144 0-.378.054-.576.27-.198.217-.753.737-.753 1.798 0 1.062.773 2.087.88 2.229.109.14 1.522 2.325 3.69 3.26.515.222.917.355 1.23.454.517.164.988.141 1.36.085.414-.062 1.51-.617 1.724-1.214.213-.597.213-1.107.15-1.214-.065-.107-.234-.19-.488-.317z"/>
        </svg>
        <span className="absolute right-full mr-3 hidden group-hover:block bg-brand-brown text-brand-cream text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-brand-yellow/10">
          Order on WhatsApp
        </span>
      </motion.button>
    </div>
  );
};

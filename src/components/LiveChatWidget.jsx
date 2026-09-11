import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LiveChatWidget = () => {
  const { t, language } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show bubble after a short delay
    const timer = setTimeout(() => {
      if (!isOpen) setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setShowBubble(false);
  };

  return (
    <div className="fixed bottom-6 rtl:left-6 ltr:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Welcome Bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 max-w-[250px] md:max-w-xs glass bg-white dark:bg-slate-900 rounded-2xl rounded-br-sm shadow-2xl p-4 border border-slate-200 dark:border-white/10 relative pointer-events-auto"
          >
            <button 
              onClick={() => setShowBubble(false)}
              className="absolute top-2 rtl:left-2 ltr:right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={14} />
            </button>
            <p className="text-sm text-slate-700 dark:text-slate-300 pr-4 leading-relaxed">
              {t('chatWelcomeMessage')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Mockup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[300px] sm:w-[350px] h-[450px] glass bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden pointer-events-auto"
          >
            <div className="p-4 bg-gradient-to-r from-brand-cyan to-brand-purple text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">Honex Support</h3>
                <p className="text-xs text-white/80">{t('typicallyReplies')}</p>
              </div>
              <button onClick={toggleChat} className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-white/10 shadow-sm text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t('chatWelcomeMessage')}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t('chatPlaceholder')}
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-cyan text-slate-700 dark:text-slate-300"
                />
                <button className="absolute top-1/2 -translate-y-1/2 rtl:left-2 ltr:right-2 p-1.5 bg-brand-cyan text-brand-dark rounded-full hover:bg-brand-purple hover:text-white transition-colors">
                  <Send size={14} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-xl shadow-brand-cyan/30 flex items-center justify-center pointer-events-auto"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

    </div>
  );
};

export default LiveChatWidget;

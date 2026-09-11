import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const CookieBanner = () => {
  const { t } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem('cookieConsent', value);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="glass rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/20 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-6 pointer-events-auto bg-white/80 dark:bg-slate-900/80">
              <div className="flex-1 text-center md:text-start">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('cookiesTitle')}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t('cookiesText')}
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => handleConsent('rejected')}
                  className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  {t('rejectCookies')}
                </button>
                <button
                  onClick={() => handleConsent('accepted')}
                  className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                >
                  {t('acceptCookies')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

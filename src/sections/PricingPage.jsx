import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Pricing from './Pricing';
import { useAppContext } from '../context/AppContext';

const PricingPage = () => {
  const { t } = useAppContext();

  return (
    <div className="section-fade-in">
      {/* Hero Banner */}
      <section className="relative pt-36 pb-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-purple/8 blur-[120px] rounded-full" />
          <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-brand-cyan/5 blur-[80px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-purple/30 text-brand-purple text-sm font-bold mb-6">
              <Star size={14} />
              <span>{t('pricingTitle')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-5">
              {t('pricingPageTitle')}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {t('pricingSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reuse the full Pricing component (isPage=true hides duplicate header) */}
      <Pricing isPage={true} />
    </div>
  );
};

export default PricingPage;

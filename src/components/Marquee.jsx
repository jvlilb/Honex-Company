import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const partners = [
  { name: 'TechVision', logo: '🌐' },
  { name: 'QuantumData', logo: '📊' },
  { name: 'NexusCloud', logo: '☁️' },
  { name: 'CyberShield', logo: '🛡️' },
  { name: 'AeroDynamics', logo: '🚀' },
  { name: 'GlobalPay', logo: '💳' },
  { name: 'InnovateAI', logo: '🧠' },
  { name: 'SmartSolutions', logo: '💡' },
];

const Marquee = () => {
  const { t } = useAppContext();

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-8">
        <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {t('trustedBy')}
        </h3>
      </div>

      <div className="relative flex overflow-hidden w-full group">
        {/* Gradient fades for edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#f8fafc] dark:from-brand-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#f8fafc] dark:from-brand-dark to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          className="flex whitespace-nowrap gap-8 py-4 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear",
            duration: 30, 
            repeat: Infinity 
          }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-slate-200 dark:border-white/10 hover:border-brand-cyan/50 transition-colors mx-2"
            >
              <span className="text-3xl">{partner.logo}</span>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{partner.name}</span>
            </div>
          ))}
          
          <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30 text-brand-cyan font-bold mx-2 shadow-lg">
            {t('moreCompanies')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Marquee;

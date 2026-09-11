import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Code, Sparkles, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CAL_URL = 'https://cal.eu/jvlilb/30min';

const Hero = () => {
  const { language, t, theme } = useAppContext();

  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const scrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background (Static blurs for performance) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-brand-cyan/15 blur-[120px] mix-blend-screen" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-brand-purple/15 blur-[120px] mix-blend-screen" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[80px]"
          />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-100" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm font-bold border border-brand-cyan/30 text-brand-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
            </span>
            <Sparkles size={14} />
            <span>{t('heroBadge')}</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="block dark:text-white text-slate-900"
            >
              {t('heroTitle1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className={theme === 'dark' ? 'text-gradient' : 'text-gradient-alt'}
            >
              {t('heroTitle2')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex gap-8 mb-10"
          >
            {[
              { value: '150+', label: language === 'ar' ? 'مشروع منجز' : language === 'fr' ? 'Projets livrés' : 'Projects Done' },
              { value: '50+', label: language === 'ar' ? 'عميل راضٍ' : language === 'fr' ? 'Clients satisfaits' : 'Happy Clients' },
              { value: '5+', label: language === 'ar' ? 'سنوات خبرة' : language === 'fr' ? "Ans d'expérience" : 'Years Exp.' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-brand-cyan">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(CAL_URL, '_blank')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-lg flex items-center justify-center gap-2 glow-cyan hover:glow-purple transition-all shadow-xl"
            >
              <span>{t('startProject')}</span>
              <ArrowIcon size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 rounded-xl glass font-bold text-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-300 dark:border-white/20"
            >
              {t('getStarted')}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Visual Element with GPU layer promotion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:flex justify-center items-center h-[500px]"
        >
          <motion.div
            animate={{
              rotateY: [0, 10, -10, 0],
              rotateX: [0, 5, -5, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full max-w-md will-change-transform"
          >
            <div className="absolute inset-0 glass rounded-3xl border border-white/20 p-6 flex flex-col gap-4 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <Code className="text-slate-400" size={18} />
              </div>

              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <div className="h-3 w-16 bg-brand-purple/40 rounded" />
                  <div className="h-3 w-24 bg-brand-cyan/30 rounded" />
                </div>
                <div className="h-3 w-5/6 bg-slate-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-slate-200 dark:bg-white/10 rounded animate-pulse delay-75" />
                <div className="h-3 w-3/4 bg-slate-200 dark:bg-white/10 rounded animate-pulse delay-150" />
                <div className="flex gap-2 items-center mt-2">
                  <div className="h-3 w-12 bg-green-400/40 rounded" />
                  <div className="h-3 w-32 bg-slate-200 dark:bg-white/10 rounded" />
                </div>
                <div className="h-3 w-5/6 bg-slate-200 dark:bg-white/10 rounded animate-pulse delay-200" />
                <div className="h-3 w-2/3 bg-brand-cyan/20 rounded" />
              </div>

              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{t('projectProgress')}</span>
                  <span>87%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '87%' }}
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <div className="h-9 flex-1 bg-brand-cyan/20 rounded-lg flex items-center justify-center border border-brand-cyan/30">
                  <Zap size={16} className="text-brand-cyan" />
                </div>
                <div className="h-9 flex-1 bg-brand-purple/20 rounded-lg flex items-center justify-center border border-brand-purple/30">
                  <Sparkles size={16} className="text-brand-purple" />
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-14 top-1/4 w-24 h-24 glass rounded-2xl border border-brand-cyan/30 flex items-center justify-center shadow-lg shadow-brand-cyan/20 z-20"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan to-blue-500 shadow-lg" />
            </motion.div>

            <motion.div
              animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-10 bottom-1/4 w-28 h-18 glass rounded-2xl border border-brand-purple/30 flex flex-col items-center justify-center p-3 shadow-lg shadow-brand-purple/20 z-20"
            >
              <div className="text-brand-cyan font-black text-xl">99%</div>
              <div className="text-xs text-slate-400 mt-1">{t('satisfaction')}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

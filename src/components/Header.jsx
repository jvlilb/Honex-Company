import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CAL_URL = 'https://cal.eu/jvlilb/30min';

const Header = () => {
  const { language, changeLanguage, t, activeView, setView } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeView]);

  useEffect(() => {
    const close = () => setLangDropdownOpen(false);
    if (langDropdownOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [langDropdownOpen]);

  const handleNav = (view) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  const languages = [
    { code: 'ar', label: 'العربية', flag: '🇩🇿' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const navItems = [
    { key: 'home',       view: 'home' },
    { key: 'services',   view: 'services' },
    { key: 'portfolio',  view: 'work' },
    { key: 'pricing',    view: 'pricing' },
    { key: 'about',      view: 'about' },
    { key: 'contactNav', view: 'contact' },
  ];

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 py-3 glass rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/40'
          : 'top-0 left-0 right-0 py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Logo & Company Name */}
        <button
          onClick={() => handleNav('home')}
          className="cursor-pointer flex items-center gap-3 group text-start"
        >
          <img src="/onyx-logo.png" alt={t('companyName')} className="w-9 h-9 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200" />
          <div className="flex flex-col leading-tight">
            <span className="font-black text-slate-900 dark:text-white text-lg leading-none">
              {t('companyName')}
            </span>
            <span className="text-[10px] font-light text-slate-500 dark:text-slate-400 leading-none mt-0.5">
              {t('companyTagline')}
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 font-semibold">
          {navItems.map(({ key, view }) => (
            <button
              key={view}
              onClick={() => handleNav(view)}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 whitespace-nowrap ${
                activeView === view
                  ? 'bg-brand-purple/10 text-brand-purple dark:text-brand-cyan dark:bg-brand-cyan/10 font-bold'
                  : 'text-slate-600 hover:text-brand-purple dark:text-slate-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm"
            >
              <Globe size={16} />
              <span className="uppercase font-bold">{language}</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-black/20 overflow-hidden border border-slate-200 dark:border-white/10 rtl:left-0 ltr:right-0 z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setLangDropdownOpen(false); }}
                      className={`flex items-center gap-2 w-full text-start px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors ${
                        language === lang.code
                          ? 'text-brand-purple dark:text-brand-cyan font-bold bg-brand-purple/5 dark:bg-brand-cyan/5'
                          : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          <button
            onClick={() => window.open(CAL_URL, '_blank')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg hover:shadow-brand-cyan/30"
          >
            {t('ctaSmall')}
          </button>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass border-t border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-1">
              {navItems.map(({ key, view }) => (
                <button
                  key={view}
                  onClick={() => handleNav(view)}
                  className={`text-start font-semibold text-base py-2.5 px-4 rounded-xl transition-colors ${
                    activeView === view
                      ? 'text-brand-cyan bg-brand-cyan/10 font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:text-brand-purple dark:hover:text-brand-cyan hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {t(key)}
                </button>
              ))}

              <div className="h-px bg-slate-200 dark:bg-white/10 my-3" />

              <div className="flex items-center gap-2 px-2 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      language === lang.code
                        ? 'bg-brand-purple text-white'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { window.open(CAL_URL, '_blank'); setMobileMenuOpen(false); }}
                className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-base"
              >
                {t('ctaSmall')}
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="w-full py-3 rounded-xl border-2 border-brand-purple/40 text-brand-purple dark:text-brand-cyan font-bold text-base hover:bg-brand-purple/5 transition-colors"
              >
                {t('contactNav')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

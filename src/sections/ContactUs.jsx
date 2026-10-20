import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { IconFacebook, IconXTwitter, IconGitHub, IconLinkedIn } from './FooterContact';

const ContactUs = () => {
  const { t, language } = useAppContext();
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="section-fade-in">
      {/* Header */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 blur-[120px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              {t('contactPageTitle')}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {t('contactPageSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {language === 'ar' ? 'العنوان' : language === 'fr' ? 'Adresse' : 'Address'}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'حي الأعمال، الجزائر العاصمة، الجزائر' : 'Business District, Algiers, Algeria'}
                    </p>
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                    </h3>
                    <a href="mailto:hello@honex.com" className="text-sm text-brand-cyan hover:underline">
                      hello@honex.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 relative group">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <MapPin size={16} /> 
                    {language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}
                  </span>
                </div>
                {/* Simulated map graphic */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-600 to-slate-900" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                  {t('followUs')}
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: IconFacebook, href: '#' },
                    { icon: IconXTwitter, href: '#' },
                    { icon: IconGitHub, href: '#' },
                    { icon: IconLinkedIn, href: '#' },
                  ].map((social, i) => {
                    const SvgIcon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.href}
                        className="w-12 h-12 rounded-xl glass border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan transition-all text-slate-500 dark:text-slate-400 hover:-translate-y-1"
                      >
                        <SvgIcon className="w-5 h-5 fill-current" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/5">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {t('contactTitle')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  {t('contactSubtitle')}
                </p>

                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 font-bold text-center flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {t('messageSent')}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {t('yourName')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('namePlaceholder')}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {t('yourEmail')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('emailPlaceholder')}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {t('yourMessage')}
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder={t('messagePlaceholder')}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all resize-none placeholder:text-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        t('sendMessage')
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// ── Inline brand SVGs (lucide-react no longer ships brand icons) ──────────
export const IconLinkedIn = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const IconXTwitter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export const IconGitHub = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const IconFacebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);



const FooterContact = () => {
  const { t, language, setView, activeView } = useAppContext();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const socials = [
    {
      icon: IconLinkedIn,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/honex',
      color: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    },
    {
      icon: IconXTwitter,
      label: 'X / Twitter',
      href: 'https://twitter.com/honex',
      color: 'hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white',
    },
    {
      icon: IconGitHub,
      label: 'GitHub',
      href: 'https://github.com/honex',
      color: 'hover:bg-[#24292e] hover:text-white hover:border-[#24292e]',
    },
    {
      icon: IconFacebook,
      label: 'Facebook',
      href: 'https://facebook.com/honex',
      color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
  ];

  const footerLinks = {
    ar: [
      { label: 'الرئيسية', view: 'home' },
      { label: 'خدماتنا', view: 'services' },
      { label: 'أعمالنا', view: 'work' },
      { label: 'من نحن', view: 'about' },
      { label: 'سياسة الخصوصية', view: 'privacy' },
    ],
    en: [
      { label: 'Home', view: 'home' },
      { label: 'Services', view: 'services' },
      { label: 'Our Work', view: 'work' },
      { label: 'About Us', view: 'about' },
      { label: 'Privacy Policy', view: 'privacy' },
    ],
    fr: [
      { label: 'Accueil', view: 'home' },
      { label: 'Services', view: 'services' },
      { label: 'Nos Réalisations', view: 'work' },
      { label: 'À Propos', view: 'about' },
      { label: 'Politique de Confidentialité', view: 'privacy' },
    ],
  };

  const links = footerLinks[language] || footerLinks['en'];

  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 blur-[100px] rounded-full" />
      </div>

      {/* Contact Form Section */}
      {activeView !== 'contact' && (
        <section
          id="contact-form"
          className="py-24 relative z-10 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900/50 dark:to-brand-dark"
        >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-cyan/30 text-brand-cyan text-sm font-bold mb-6">
                <Mail size={14} />
                <span>{t('contactUs')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                {t('contactTitle')}
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {t('contactSubtitle')}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-2 flex flex-col gap-8"
              >
                {/* Contact Details */}
                <div className="flex flex-col gap-5">
                  {[
                    { icon: Mail, label: 'contact@honex.dz', sub: language === 'ar' ? 'للاستفسارات العامة' : 'General inquiries' },
                    { icon: Phone, label: '+213 791 390 711', sub: language === 'ar' ? 'واتساب / هاتف' : 'WhatsApp / Phone' },
                    { icon: MapPin, label: language === 'ar' ? 'الجزائر العاصمة، الجزائر' : 'Algiers, Algeria', sub: language === 'ar' ? 'مقر الشركة' : 'Headquarters' },
                  ].map(({ icon: Icon, label, sub }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-brand-cyan" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {label.includes('+') ? <span dir="ltr">{label}</span> : label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Icons */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('followUs')}</p>
                  <div className="flex gap-3 flex-wrap">
                    {socials.map(({ icon: Icon, label, href, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        className={`w-11 h-11 rounded-xl glass border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all duration-250 hover:scale-110 hover:shadow-lg ${color}`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-3"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-3xl p-12 text-center border border-brand-cyan/30 shadow-xl shadow-brand-cyan/10"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center mx-auto mb-4">
                      <span className="text-brand-cyan text-2xl">✓</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{t('messageSent')}</h3>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-brand-cyan hover:underline font-medium"
                    >
                      {language === 'ar' ? 'إرسال رسالة أخرى' : language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-5 border border-slate-200 dark:border-white/10 shadow-xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-name" className="text-sm font-bold text-slate-600 dark:text-slate-300">
                          {t('yourName')} *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all font-medium"
                          placeholder={t('namePlaceholder')}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="text-sm font-bold text-slate-600 dark:text-slate-300">
                          {t('yourEmail')} *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all font-medium"
                          placeholder={t('emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {t('yourMessage')} *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all resize-none font-medium"
                        placeholder={t('messagePlaceholder')}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="self-start flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-base shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 transition-all disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{language === 'ar' ? 'جاري الإرسال...' : language === 'fr' ? 'Envoi...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('sendMessage')}</span>
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Footer Bar */}
      <div className="relative z-10 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-brand-dark py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Logo + Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-white font-black text-sm shadow">
                H
              </div>
              <div>
                <div className="font-black text-slate-900 dark:text-white">Honex</div>
                <div className="text-xs text-slate-400">{t('allRights')}</div>
              </div>
            </div>

            {/* Footer Nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {links.map(({ label, view }) => (
                <button
                  key={view}
                  onClick={() => setView(view)}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-cyan transition-colors font-medium"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Made with love */}
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">♥</span>
              <span>in Algeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterContact;

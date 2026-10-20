import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReviewForm = ({ onClose }) => {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    country: '',
    rating: 5,
    text: '',
    anonymous: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    
    const newReview = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      country: formData.country,
      rating: formData.rating,
      quote: {
        ar: formData.text,
        en: formData.text,
        fr: formData.text
      },
      anonymous: formData.anonymous,
      approved: false,
      timestamp: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('honex_reviews') || '[]');
    localStorage.setItem('honex_reviews', JSON.stringify([...existing, newReview]));
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-50 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <X size={20} className="text-slate-500 dark:text-slate-400" />
        </button>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">{t('leaveReview')}</h3>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center mx-auto mb-4 text-brand-cyan text-2xl">✓</div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{t('reviewPending')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-start">
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">{t('reviewName')} *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">{t('reviewRole')}</label>
              <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Country (Emoji)</label>
              <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="🇩🇿" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">{t('reviewRating')}</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button type="button" key={star} onClick={() => setFormData({...formData, rating: star})}>
                    <Star size={24} className={star <= formData.rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">{t('reviewText')} *</label>
              <textarea required rows={3} value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white resize-none" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="anon" checked={formData.anonymous} onChange={e => setFormData({...formData, anonymous: e.target.checked})} className="w-4 h-4 rounded text-brand-cyan focus:ring-brand-cyan" />
              <label htmlFor="anon" className="text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer">{t('reviewAnonymous')}</label>
            </div>
            <button type="submit" className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-base shadow-lg shadow-brand-cyan/25">
              {t('reviewSubmit')}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
export default ReviewForm;

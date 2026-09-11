import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf, Quote, Play, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ReviewForm from '../components/ReviewForm';

const testimonials = [
  {
    nameAr: 'يوسف بن عمر',
    nameEn: 'Youssef Ben Omar',
    nameFr: 'Youssef Ben Omar',
    roleAr: 'المدير التنفيذي — شركة TechAlgeria',
    roleEn: 'CEO — TechAlgeria Inc.',
    roleFr: 'PDG — TechAlgeria Inc.',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    quoteAr:
      'Honex بنوا لنا منصة SaaS متكاملة في وقت قياسي. الكود نظيف، التصميم مذهل، والدعم لا يُضاهى. أنصح بهم بشدة لأي مشروع تقني جاد.',
    quoteEn:
      'Honex built us a full SaaS platform in record time. Clean code, stunning design, and unmatched support. I highly recommend them for any serious tech project.',
    quoteFr:
      "Honex nous a construit une plateforme SaaS complète en un temps record. Code propre, design époustouflant et support inégalé.",
    country: '🇩🇿',
  },
  {
    nameAr: 'سارة المنصوري',
    nameEn: 'Sara Al-Mansouri',
    nameFr: 'Sara Al-Mansouri',
    roleAr: 'مديرة التسويق — عقارات البيان',
    roleEn: 'Marketing Director — Al-Bayan Properties',
    roleFr: 'Directrice Marketing — Al-Bayan Properties',
    avatar: 'https://i.pravatar.cc/80?img=5',
    rating: 5,
    quoteAr:
      'طلبنا موقعاً عقارياً يعكس الفخامة والأناقة. ما قدّمته Honex تجاوز توقعاتنا بكثير. المشروع تسلمناه قبل الموعد!',
    quoteEn:
      'We asked for a real estate site that reflects luxury. What Honex delivered far exceeded our expectations — and was ready before deadline!',
    quoteFr:
      "Nous avons demandé un site immobilier de luxe. Ce que Honex a livré a largement dépassé nos attentes — et avant la date limite!",
    country: '🇦🇪',
  },
  {
    nameAr: 'أمين خليل',
    nameEn: 'Amine Khalil',
    nameFr: 'Amine Khalil',
    roleAr: 'مؤسس — منصة EduLearn',
    roleEn: 'Founder — EduLearn Platform',
    roleFr: 'Fondateur — Plateforme EduLearn',
    avatar: 'https://i.pravatar.cc/80?img=8',
    rating: 5,
    quoteAr:
      'منصة التعليم الإلكتروني التي بنوها لنا تخدم أكثر من 89 ألف طالب اليوم. بدون Honex ما كنّا وصلنا لهذا المستوى.',
    quoteEn:
      'The e-learning platform they built now serves over 89,000 students. Without Honex, we would never have reached this level.',
    quoteFr:
      "La plateforme e-learning qu'ils ont construite sert maintenant plus de 89 000 étudiants. Sans Honex, nous n'aurions jamais atteint ce niveau.",
    country: '🇲🇦',
  },
  {
    nameAr: 'ليلى سعداوي',
    nameEn: 'Leila Saadawi',
    nameFr: 'Leila Saadawi',
    roleAr: 'صاحبة متجر إلكتروني',
    roleEn: 'E-Commerce Owner',
    roleFr: 'Propriétaire E-Commerce',
    avatar: 'https://i.pravatar.cc/80?img=9',
    rating: 5,
    quoteAr:
      'متجري الإلكتروني يُدرّ الآن ضعف ما كان يُدرّه قبل إعادة البناء مع Honex. الاستثمار كان يستحق كل دينار.',
    quoteEn:
      'My online store now generates twice what it used to before the rebuild with Honex. Every dinar was worth it.',
    quoteFr:
      "Ma boutique en ligne génère maintenant le double de ce qu'elle faisait avant la refonte avec Honex. Chaque dinar en valait la peine.",
    country: '🇩🇿',
  },
];

const Testimonials = () => {
  const { t, language } = useAppContext();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [dynamicVideos, setDynamicVideos] = useState([]);
  const [activeVideoSrc, setActiveVideoSrc] = useState(null);
  const [activeVideoType, setActiveVideoType] = useState('url');

  useEffect(() => {
    const fetchDynamicData = () => {
      const storedReviews = JSON.parse(localStorage.getItem('honex_reviews') || '[]');
      setDynamicReviews(storedReviews.filter(r => r.approved));
      
      const storedVideos = JSON.parse(localStorage.getItem('onyx_videos') || '[]');
      setDynamicVideos(storedVideos);
    };
    
    fetchDynamicData();
    window.addEventListener('reviews_updated', fetchDynamicData);
    return () => window.removeEventListener('reviews_updated', fetchDynamicData);
  }, []);

  const allTestimonials = [...testimonials, ...dynamicReviews.map(r => ({
    nameAr: r.anonymous ? 'مجهول' : r.name,
    nameEn: r.anonymous ? 'Anonymous' : r.name,
    nameFr: r.anonymous ? 'Anonyme' : r.name,
    roleAr: r.role || '',
    roleEn: r.role || '',
    roleFr: r.role || '',
    avatar: 'https://i.pravatar.cc/80?u=' + r.id,
    rating: r.rating,
    quoteAr: r.quote.ar || r.quote,
    quoteEn: r.quote.en || r.quote,
    quoteFr: r.quote.fr || r.quote,
    country: r.country || '🌍'
  }))];

  const renderVideos = dynamicVideos.length > 0 
    ? dynamicVideos 
    : [1, 2, 3, 4, 5, 6].map(i => ({ id: i, type: 'url', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: `https://picsum.photos/400/600?random=${i}` }));
  
  let displayVideos = [...renderVideos];
  while (displayVideos.length < 6 && displayVideos.length > 0) {
    displayVideos = [...displayVideos, ...renderVideos];
  }

  const getName = (item) => language === 'ar' ? item.nameAr : language === 'fr' ? item.nameFr : item.nameEn;
  const getRole = (item) => language === 'ar' ? item.roleAr : language === 'fr' ? item.roleFr : item.roleEn;
  const getQuote = (item) => language === 'ar' ? item.quoteAr : language === 'fr' ? item.quoteFr : item.quoteEn;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-white/2">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/4 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-400/30 text-amber-400 text-sm font-bold mb-6">
            <Star size={14} />
            <span>{t('testimonialsTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {allTestimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-7 border border-slate-200 dark:border-white/10 hover:border-brand-cyan/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-cyan/5 relative overflow-hidden"
            >
              <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 opacity-8">
                <Quote size={48} className="text-brand-cyan/20" />
              </div>

              <div className="flex gap-1 mb-4 items-center">
                {Array.from({ length: Math.floor(item.rating || 5) }).map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-sm font-black text-amber-500 ml-2 rtl:mr-2 rtl:ml-0">{item.rating || 5}.0</span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-6 relative z-10">
                "{getQuote(item)}"
              </p>

              <div className="flex items-center gap-3 border-t border-slate-200 dark:border-white/10 pt-5">
                <img
                  src={item.avatar}
                  alt={getName(item)}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-cyan/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    {getName(item)}
                    <span>{item.country}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">{getRole(item)}</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center border border-brand-cyan/20">
                    <span className="text-brand-cyan text-xs font-black">✓</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 glass px-8 py-4 rounded-2xl border border-amber-400/20">
            <div className="flex gap-0.5 items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
              ))}
              <StarHalf size={20} className="text-amber-400 fill-amber-400" />
            </div>
            <div className="text-slate-900 dark:text-white font-black text-xl">4.5</div>
            <div className="h-6 w-px bg-slate-300 dark:bg-white/20" />
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t('reviewsCount')}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={() => setShowReviewForm(true)} className="px-6 py-2.5 rounded-xl border-2 border-brand-cyan text-brand-cyan font-bold hover:bg-brand-cyan/10 transition-colors">
              {t('leaveReview')}
            </button>
          </div>
        </motion.div>

        {showReviewForm && <ReviewForm onClose={() => setShowReviewForm(false)} />}

        {/* Video Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              {t('videoTestimonials')}
            </h3>
          </div>

          <div className="relative flex overflow-hidden w-full group py-4">
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#f8fafc] dark:from-[#07090e] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#f8fafc] dark:from-[#07090e] to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex whitespace-nowrap gap-6 items-center hover:[animation-play-state:paused]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                ease: "linear",
                duration: 40, 
                repeat: Infinity 
              }}
            >
              {[...displayVideos, ...displayVideos, ...displayVideos].map((v, i) => (
                <div 
                  key={i} 
                  className="w-64 h-96 rounded-2xl bg-slate-200 dark:bg-slate-800 relative cursor-pointer overflow-hidden border border-slate-300 dark:border-white/10 group/card mx-3 flex-shrink-0"
                  onClick={() => { setActiveVideoSrc(v.src); setActiveVideoType(v.type); setVideoModalOpen(true); }}
                >
                  <img src={v.thumbnail || `https://picsum.photos/400/600?random=${i}`} alt="Video Thumbnail" className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity duration-300 group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all group-hover/card:bg-black/40">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-white backdrop-blur-md shadow-xl group-hover/card:scale-110 transition-transform">
                      <Play className="ml-1" size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl shadow-brand-cyan/20 border border-white/10" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-cyan transition-colors"
              >
                <X size={20} />
              </button>
              {activeVideoType === 'url' ? (
                <video 
                  className="w-full h-full object-cover"
                  src={activeVideoSrc} 
                  controls 
                  autoPlay 
                />
              ) : (
                <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: activeVideoSrc }} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { DEMO_STORES } from '../demos/data/demoStoresData';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'جميع المتاجر (10)' },
  { id: 'fashion', label: 'أزياء وفاشن' },
  { id: 'tech', label: 'إلكترونيات وتكنولوجيا' },
  { id: 'beauty', label: 'عناية وجمال' },
  { id: 'home', label: 'ديكور وأثاث' },
  { id: 'sports', label: 'رياضة ومغامرات' },
  { id: 'books', label: 'كتب وقرطاسية' },
  { id: 'pets', label: 'حيوانات أليفة' },
  { id: 'outlet', label: 'تخفيضات وتصفية' }
];

export const EcommercePortfolioSection = ({ isHome = false, onNavigateAll }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStores = DEMO_STORES.filter(store => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'fashion') return store.id === 'lumiere' || store.id === 'vayra';
    if (activeCategory === 'tech') return store.id === 'nexatech';
    if (activeCategory === 'beauty') return store.id === 'glowcura';
    if (activeCategory === 'home') return store.id === 'homevibe';
    if (activeCategory === 'sports') return store.id === 'terrasport' || store.id === 'zenfit';
    if (activeCategory === 'books') return store.id === 'readora';
    if (activeCategory === 'pets') return store.id === 'pawz';
    if (activeCategory === 'outlet') return store.id === 'outlet';
    return true;
  });

  const displayedStores = isHome ? filteredStores.slice(0, 3) : filteredStores;

  return (
    <div className="w-full">
      {/* Informative Header / Notice */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-black mb-4">
          <Sparkles size={14} />
          <span>متاجر إلكترونية تجريبية تفاعلية حية (10 متاجر)</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
          نماذج متاجر جاهزة للتصفح والشراء التجريبي
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          صممت شركة هونكس هذه النماذج التفاعلية العشرة لإثبات قدراتنا الهندسية في بناء واجهات متاجر سريعة، سلات تسوق حية مع حفظ محلي، ونظام إتمام طلبات متكامل مصمم خصيصاً للمستهلك الجزائري والعربي.
        </p>

        {/* Disclaimer Notice */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <span>⚠️</span>
          <span>تنبيه: جميع المتاجر أدناه هي <strong>نماذج تجريبية تفاعلية</strong> لأغراض العرض فقط — لا يتم بيع منتجات حقيقية أو استلام أموال.</span>
        </div>
      </div>

      {/* Category Filter Pills (if not on home or if requested) */}
      {!isHome && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORY_FILTERS.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  active
                    ? 'bg-brand-cyan text-slate-950 border-brand-cyan shadow-md shadow-brand-cyan/20 scale-105'
                    : 'bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-brand-cyan/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {displayedStores.map((store, index) => {
            const demoUrl = `/demos/${store.id}`;

            return (
              <motion.div
                key={store.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-brand-cyan/40 transition-all duration-300 relative"
              >
                {/* Store Thumbnail & Preview Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={store.hero.bgImage}
                    alt={store.nameAr}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Brand Monogram Badge */}
                  <div
                    className="absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl border backdrop-blur-md"
                    style={{
                      backgroundColor: `${store.theme.bg}ee`,
                      borderColor: store.theme.primary,
                      color: store.theme.primary
                    }}
                  >
                    {store.name.slice(0, 1)}
                  </div>

                  {/* Model Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
                      نموذج تجريبي تفاعلي
                    </span>
                  </div>

                  {/* Store Name overlay on banner */}
                  <div className="absolute bottom-4 right-4 left-4 text-right">
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-1.5"
                      style={{
                        backgroundColor: store.theme.badgeBg,
                        color: store.theme.badgeText
                      }}
                    >
                      {store.categoryAr}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {store.nameAr}
                    </h4>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between text-right">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {store.taglineAr}
                    </p>

                    {/* Features List */}
                    <div className="space-y-1.5 mb-6 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                        <span>كتالوج متكامل مع تصفية فورية وبحث حي</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                        <span>سلة تسوق نشطة مع حفظ بالذاكرة (localStorage)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                        <span>محاكاة دفع بالدينار الجزائري (DZD) و 58 ولاية</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link: Opens in NEW TAB as requested */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: store.theme.primary }} />
                      <span>{store.products.length} منتجات تفاعلية</span>
                    </div>

                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs transition-all shadow-md hover:scale-105 active:scale-95 group/btn"
                      style={{
                        backgroundColor: store.theme.primary,
                        color: store.id === 'lumiere' || store.id === 'zenfit' ? '#09090b' : '#ffffff'
                      }}
                      title={`فتح متجر ${store.nameAr} في نافذة جديدة`}
                    >
                      <ShoppingBag size={14} />
                      <span>استكشف المتجر</span>
                      <ExternalLink size={13} className="group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* If empty state for filter */}
      {displayedStores.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <p className="font-bold text-slate-400 mb-2">لا توجد متاجر في هذا التصنيف حالياً</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-cyan text-slate-900"
          >
            عرض جميع المتاجر
          </button>
        </div>
      )}

      {/* View All Demos Button if on Home Page */}
      {isHome && (
        <div className="text-center mt-10">
          <button
            onClick={onNavigateAll}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-105"
          >
            <span>استعراض كل المتاجر التجريبية العشرة (10)</span>
            <ArrowLeft size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EcommercePortfolioSection;

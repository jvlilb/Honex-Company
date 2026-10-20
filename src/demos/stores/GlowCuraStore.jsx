import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Star, Check,
  Sparkles, Droplets, CheckCircle2
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const GlowCuraStore = () => {
  const store = getStoreById('glowcura');
  const cartHook = useStoreCart('glowcura');

  const [activeConcern, setActiveConcern] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  // Interactive Routine Finder Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0: closed, 1: skinType, 2: goal, 3: result
  const [quizAnswers, setQuizAnswers] = useState({ skinType: '', goal: '' });

  useEffect(() => {
    document.title = 'GlowCura | جلوكيورا للعناية بالبشرة والجمال الطبيعي — شركة هونكس';
  }, []);

  const concerns = [
    { id: 'all', label: 'جميع المستحضرات' },
    { id: 'brightening', label: 'نضارة وتوحيد اللون', filterTerm: 'فيتامين' },
    { id: 'hydration', label: 'ترطيب عميق 72h', filterTerm: 'المرطب' },
    { id: 'haircare', label: 'عناية وتكثيف الشعر', filterTerm: 'الشعر' },
    { id: 'bundles', label: 'باقات الروتين المتكاملة', filterTerm: 'باقة' },
  ];

  const filteredProducts = store.products.filter(p => {
    if (activeConcern !== 'all') {
      const selected = concerns.find(c => c.id === activeConcern);
      if (selected && !p.nameAr.includes(selected.filterTerm) && !p.shortDescAr.includes(selected.filterTerm)) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.nameAr.toLowerCase().includes(q) || p.shortDescAr.toLowerCase().includes(q);
    }
    return true;
  });

  const getRecommendedRoutine = () => {
    // Select 3 harmonious products for routine bundle
    return [store.products[0], store.products[1], store.products[4] || store.products[2]];
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FFF9FA] text-[#331C24] font-sans selection:bg-[#EC4899]/20 selection:text-[#EC4899]">
      <DemoAgencyHeader storeNameAr="جلوكيورا للعناية والجمال" accentColor="#EC4899" />

      {/* ── LUMINOUS BEAUTY HEADER ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#FCE7F3] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EC4899] to-[#F472B6] flex items-center justify-center text-white shadow-md">
              <Droplets size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-[#831843] tracking-wide">GlowCura</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D]">CLINICAL</span>
              </div>
              <p className="text-[11px] text-[#9D174D]">عناية طبية مثبتة سريرياً ببشرتك</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي عن سيروم، حمض الهيالورونيك، واقي شمس..."
              className="w-full bg-[#FFF1F2] border border-[#FBCFE8] rounded-full px-4 py-2 pr-9 text-xs focus:outline-none focus:border-[#EC4899]"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#EC4899]" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuizStep(1)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#BE185D] bg-[#FCE7F3] hover:bg-[#FBCFE8] transition-colors"
            >
              <Sparkles size={14} />
              <span>اختبار الروتين</span>
            </button>

            <button
              onClick={() => cartHook.setIsFavsOpen(true)}
              className="p-2 text-[#9D174D] hover:text-[#EC4899]"
            >
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#EC4899] text-[#EC4899]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white font-bold text-xs shadow-md hover:brightness-105"
            >
              <ShoppingBag size={16} />
              <span>السلة ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Shop By Concern Tabs */}
        <div className="border-t border-[#FCE7F3] px-4 sm:px-6 py-2 overflow-x-auto bg-[#FFF5F7]">
          <div className="container mx-auto flex items-center gap-2 text-xs">
            <span className="text-[#9D174D] font-bold ml-2">نوع الاحتياج:</span>
            {concerns.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveConcern(c.id)}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  activeConcern === c.id
                    ? 'bg-[#EC4899] text-white shadow-sm'
                    : 'text-[#831843] hover:bg-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── INTERACTIVE ROUTINE FINDER MODULE ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#FFF0F3] to-[#FFF9FA] border-b border-[#FCE7F3] py-10 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          {quizStep === 0 ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FBCFE8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-right">
              <div>
                <span className="text-xs font-bold text-[#EC4899] uppercase tracking-wider block mb-1">
                  مستشار العناية الذكي
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#831843] mb-2">
                  لا تعرفين ما هو الروتين الأنسب لبشرتك؟
                </h2>
                <p className="text-xs sm:text-sm text-[#9D174D]/80 leading-relaxed max-w-xl">
                  أجيبي على سؤالين سريعين وسنقترح عليكِ الروتين الطبي الأمثل المكون من مستحضراتنا المعتمدة لترميم نضارة وحيوية بشرتك.
                </p>
              </div>
              <button
                onClick={() => setQuizStep(1)}
                className="px-6 py-3 rounded-full bg-[#EC4899] text-white font-black text-xs sm:text-sm shadow-md hover:bg-[#DB2777] whitespace-nowrap flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>بدء اختبار الروتين (دقيقة واحدة)</span>
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F472B6] shadow-md text-right relative">
              <button onClick={() => setQuizStep(0)} className="absolute top-4 left-4 p-1 text-slate-400 hover:text-black">
                <X size={18} />
              </button>

              {quizStep === 1 && (
                <div>
                  <span className="text-xs text-[#EC4899] font-bold">الخطوة 1 من 2</span>
                  <h3 className="text-xl font-black text-[#831843] mt-1 mb-4">ما هو نوع بشرتك الحالي؟</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['بشرة دهنية / معرضة للحبوب', 'بشرة جافة / مشدودة', 'بشرة مختلطة T-Zone', 'بشرة حساسة وسريعة الاحمرار'].map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, skinType: type });
                          setQuizStep(2);
                        }}
                        className="p-4 rounded-2xl border border-[#FCE7F3] hover:border-[#EC4899] hover:bg-[#FFF1F2] text-xs font-bold text-[#831843] transition-all"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div>
                  <span className="text-xs text-[#EC4899] font-bold">الخطوة 2 من 2</span>
                  <h3 className="text-xl font-black text-[#831843] mt-1 mb-4">ما هو هدفك الأساسي الأكثر أهمية؟</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['نضارة وتوحيد لون البشرة', 'ترطيب عميق وحماية الحاجز', 'علاج تساقط وتلف الشعر'].map(goal => (
                      <button
                        key={goal}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, goal });
                          setQuizStep(3);
                        }}
                        className="p-4 rounded-2xl border border-[#FCE7F3] hover:border-[#EC4899] hover:bg-[#FFF1F2] text-xs font-bold text-[#831843] transition-all"
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-1">
                    <CheckCircle2 size={16} />
                    <span>تم تحليل نوع بشرتك: {quizAnswers.skinType} // الهدف: {quizAnswers.goal}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#831843] mb-2">الروتين الطبي الثلاثي المقترح لبشرتك</h3>
                  <p className="text-xs text-amber-700 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mb-4">
                    ⚠️ إرشاد تجريبي توضيحي — المستحضرات مصممة بمكونات مرطبة متكاملة.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {getRecommendedRoutine().map((p, idx) => (
                      <div key={p.id} className="p-3 rounded-2xl border border-[#FCE7F3] bg-[#FFF5F7] flex items-center gap-3">
                        <img src={p.image} alt={p.nameAr} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <span className="text-[10px] font-bold text-[#EC4899]">خطوة {idx + 1}</span>
                          <h4 className="text-xs font-bold text-[#831843] line-clamp-1">{p.nameAr}</h4>
                          <span className="text-xs font-black text-[#BE185D]">{p.price.toLocaleString('ar-DZ')} دج</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        cartHook.addMultipleToCart(getRecommendedRoutine(), 'باقة الروتين الطبي المقترح');
                        setQuizStep(0);
                      }}
                      className="flex-1 py-3 rounded-xl bg-[#EC4899] text-white font-black text-xs hover:bg-[#DB2777]"
                    >
                      إضافة الروتين الثلاثي المقترح كاملاً للسلة بخصم 10%
                    </button>
                    <button onClick={() => setQuizStep(0)} className="px-4 py-3 rounded-xl border border-[#FCE7F3] text-xs">
                      إغلاق
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── BEAUTY PRODUCT GRID ─────────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-3xl border border-[#FCE7F3] bg-white p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#F472B6] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#FFF0F3]">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <button
                    onClick={() => cartHook.toggleFavorite(p)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur text-[#EC4899] shadow"
                  >
                    <Heart size={16} className={cartHook.isFavorite(p.id) ? 'fill-[#EC4899]' : ''} />
                  </button>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#BE185D] shadow-sm">
                      {p.badge || 'طبيعي 100%'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                    <Star size={13} className="fill-amber-400" />
                    <span className="font-bold">{p.rating}</span>
                    <span className="text-[11px] text-slate-400">({p.reviewsCount} تقييم)</span>
                  </div>

                  <h3
                    onClick={() => setDetailProduct(p)}
                    className="text-base font-black text-[#831843] mb-1.5 cursor-pointer hover:text-[#EC4899]"
                  >
                    {p.nameAr}
                  </h3>

                  <p className="text-xs text-[#9D174D]/75 line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FFF0F3] flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-[#BE185D]">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>
                  {p.originalPrice && (
                    <div className="text-xs line-through text-slate-400">
                      {p.originalPrice.toLocaleString('ar-DZ')} دج
                    </div>
                  )}
                </div>

                <button
                  onClick={() => cartHook.addToCart(p)}
                  className="px-4 py-2 rounded-full bg-[#EC4899] text-white font-black text-xs hover:bg-[#DB2777] shadow-sm flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>أضف للروتين</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── BEAUTY PRODUCT DETAIL MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {detailProduct && (
          <div className="modal-overlay" onClick={() => setDetailProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-3xl bg-white border border-[#F472B6] p-6 max-w-xl w-full text-right"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-2xl aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#831843] mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-black text-[#BE185D] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#9D174D]/80 leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE7F3] mb-4 text-xs space-y-1 text-[#831843]">
                        <span className="font-bold block text-[#EC4899]">المكونات الفعالة وطريقة الاستخدام:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      cartHook.addToCart(detailProduct);
                      setDetailProduct(null);
                    }}
                    className="w-full py-3 rounded-full bg-[#EC4899] text-white font-black text-xs hover:bg-[#DB2777]"
                  >
                    إضافة إلى سلة العناية
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ROUTINE-GROUPED CART DRAWER ─────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-white border-r border-[#FCE7F3] p-6 flex flex-col justify-between text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#FCE7F3] mb-4">
                  <h3 className="text-lg font-black text-[#831843]">سلة العناية والجمال ({cartHook.totalCartCount})</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-slate-400">سلة العناية فارغة حالياً.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE7F3] flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#831843] truncate">{item.nameAr}</h4>
                          <span className="text-xs font-black text-[#BE185D]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="w-5 h-5 bg-white rounded-full border">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="w-5 h-5 bg-white rounded-full border">+</button>
                        </div>
                        <button onClick={() => cartHook.removeFromCart(item.cartItemId)} className="text-xs text-red-400">×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartHook.cart.length > 0 && (
                <div className="border-t border-[#FCE7F3] pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#831843]">
                    <span>المجموع الإجمالي:</span>
                    <span className="font-black text-[#BE185D]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#EC4899] text-white font-black text-xs hover:bg-[#DB2777]"
                  >
                    تأكيد طلب باقة الجمال
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CHECKOUT MODAL ─────────────────────────────────────────────────── */}
      <DemoCheckoutModal
        isOpen={cartHook.isCheckoutOpen}
        onClose={() => cartHook.setIsCheckoutOpen(false)}
        store={store}
        cartTotal={cartHook.cartTotal}
        cart={cartHook.cart}
        onConfirmSuccess={(res) => {
          cartHook.setOrderConfirmed(res);
          cartHook.clearCart();
          cartHook.setIsCheckoutOpen(false);
        }}
      />

      {/* ── ORDER CONFIRMATION ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.orderConfirmed && (
          <div className="modal-overlay">
            <div className="modal-content rounded-3xl bg-white border border-[#EC4899] p-6 max-w-lg w-full text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FFF0F3] rounded-full flex items-center justify-center text-[#EC4899]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-black text-[#831843] mb-2">تم تسجيل طلب باقة الجمال بنجاح</h3>
              <p className="text-xs text-amber-800 bg-amber-500/15 p-2.5 rounded-2xl mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل أي مبالغ.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-slate-600 border-y py-3">
                <div className="flex justify-between"><span>الطلب:</span><span className="text-[#EC4899]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>الإجمالي:</span><span className="font-bold text-[#BE185D]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#EC4899] text-white font-bold text-xs rounded-full"
              >
                العودة لمتجر العناية
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlowCuraStore;

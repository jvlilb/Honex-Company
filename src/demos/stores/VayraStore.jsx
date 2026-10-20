import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  Flame, Clock
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const VayraStore = () => {
  const store = getStoreById('vayra');
  const cartHook = useStoreCart('vayra');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({}); // productId -> size
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

  useEffect(() => {
    document.title = 'VAYRA | أزياء الشارع والستريتوير المعاصر — شركة هونكس';
  }, []);

  const handleSelectSize = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product) => {
    const size = selectedSizes[product.id] || (product.variants && product.variants[0]);
    if (!size && product.variants && product.variants.length > 0) {
      cartHook.showToast('يرجى تحديد المقاس المناسب أولاً');
      return;
    }
    cartHook.addToCart(product, size, 1);
  };

  const filteredProducts = store.products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#D946EF]/30 selection:text-[#D946EF]">
      <DemoAgencyHeader storeNameAr="فايرا للأزياء العصرية والستريتوير" accentColor="#D946EF" />

      {/* ── STREETWEAR TOP TICKER ────────────────────────────────────────────── */}
      <div className="bg-[#D946EF] text-black font-black text-xs py-1.5 px-4 text-center tracking-widest uppercase overflow-hidden">
        <div className="flex items-center justify-center gap-4 animate-pulse">
          <span>⚡ VAYRA DROP 03 // إصدار الشارع المحدود</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">أوفرسايزد 480 GSM وكارجو باراشوت</span>
          <span className="hidden sm:inline">•</span>
          <span>كود خصم تجريبي: VAYRA10</span>
        </div>
      </div>

      {/* ── VAYRA MODERN HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black italic tracking-tighter text-white">
              VAYRA<span className="text-[#D946EF]">.</span>
            </h1>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-bold uppercase text-[#D946EF]">
              STREETWEAR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-[#D946EF]"
              title="البحث السريع"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => cartHook.setIsFavsOpen(true)}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-[#D946EF]"
              title="المفضلة"
            >
              <Heart size={18} className={cartHook.favorites.length > 0 ? 'fill-[#D946EF] text-[#D946EF]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-black text-xs hover:bg-[#D946EF] hover:text-white transition-all shadow-lg"
            >
              <ShoppingBag size={16} />
              <span>الحقيبة ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Scrollable Category Rail */}
        <div className="border-t border-white/5 px-4 sm:px-6 py-2 overflow-x-auto bg-[#0a0a0f]">
          <div className="container mx-auto flex items-center gap-2 text-xs">
            {store.categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-1.5 rounded-full font-black uppercase tracking-wider transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#D946EF] text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.nameAr}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── STREET DROP HERO & COUNTDOWN ──────────────────────────────────────── */}
      <section className="relative py-12 px-4 sm:px-6 border-b border-white/10 bg-gradient-to-r from-black via-[#140a17] to-black">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D946EF]/20 border border-[#D946EF]/40 text-[#D946EF] text-xs font-bold mb-3">
              <Flame size={14} />
              <span>أزياء الشباب الحضرية — ربيع 2026</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3">
              ستايل فضفاض، حضور جريء، وأقمشة تدوم
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              هوديز قطن ثقيل، بناطيل كارجو بجيوب تكتيكية متعددة، وتيشيرتات واسعة معالجة بغسيل عتيق Vintage Wash.
            </p>
          </div>

          {/* Active Drop Timer (Configured Demo End Time) */}
          <div className="p-5 rounded-2xl bg-white/5 border border-[#D946EF]/40 font-mono text-center min-w-[240px]">
            <div className="flex items-center justify-center gap-2 text-xs text-[#D946EF] mb-2 font-bold">
              <Clock size={14} />
              <span>نهاية إطلاق DROP 03 (توضيحي)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-white">
              <div className="p-2 rounded bg-black/60 border border-white/10">
                <span className="text-xl font-black text-[#D946EF]">14</span>
                <span className="text-[10px] block text-slate-400">ساعة</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/10">
                <span className="text-xl font-black text-[#D946EF]">38</span>
                <span className="text-[10px] block text-slate-400">دقيقة</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/10">
                <span className="text-xl font-black text-[#D946EF]">52</span>
                <span className="text-[10px] block text-slate-400">ثانية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAST FASHION FEED GRID ───────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => {
            const chosenSize = selectedSizes[p.id] || (p.variants && p.variants[0]);

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-[#0F0F14] overflow-hidden flex flex-col justify-between group hover:border-[#D946EF]/60 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-black">
                    <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={() => cartHook.toggleFavorite(p)}
                      className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white hover:text-[#D946EF]"
                    >
                      <Heart size={16} className={cartHook.isFavorite(p.id) ? 'fill-[#D946EF] text-[#D946EF]' : ''} />
                    </button>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded bg-[#D946EF] text-white text-[10px] font-black uppercase">
                        {p.badge || 'HOT'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 text-right">
                    <h3
                      onClick={() => setDetailProduct(p)}
                      className="text-base font-black text-white mb-2 cursor-pointer hover:text-[#D946EF]"
                    >
                      {p.nameAr}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {p.shortDescAr}
                    </p>

                    {/* On-card size chips */}
                    {p.variants && (
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1.5">المقاس:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.variants.map(sz => (
                            <button
                              key={sz}
                              onClick={() => handleSelectSize(p.id, sz)}
                              className={`px-2.5 py-1 rounded text-xs font-bold border transition-colors ${
                                chosenSize === sz
                                  ? 'bg-[#D946EF] text-white border-[#D946EF]'
                                  : 'border-white/10 text-slate-300 hover:border-white/30'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="text-lg font-black text-white">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>

                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="px-4 py-2 rounded-xl bg-white text-black font-black text-xs hover:bg-[#D946EF] hover:text-white transition-all shadow"
                  >
                    أضف للحقيبة ({chosenSize})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── TREND SEARCH OVERLAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOverlayOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSearchOverlayOpen(false)}>
            <div className="max-w-xl w-full text-right" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن: هودي أوفرسايزد، كارجو، جاكيت بومبر..."
                  className="w-full bg-transparent text-xl text-white focus:outline-none placeholder:text-slate-500 font-bold"
                />
                <button onClick={() => setSearchOverlayOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="text-xs text-[#D946EF]">
                <span className="font-bold block mb-2 text-white">كلمات الموضة الأكثر بحثاً في الجزائر:</span>
                <div className="flex flex-wrap gap-2">
                  {['هودي 480 GSM', 'كارجو باراشوت', 'تيشيرت فنتج', 'جاكيت كروب', 'حقيبة تكتيكية'].map(k => (
                    <button
                      key={k}
                      onClick={() => {
                        setSearchQuery(k);
                        setSearchOverlayOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#D946EF] hover:text-white transition-colors"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FAST STREETWEAR BAG DRAWER ───────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#0D0D12] border-r border-white/10 p-6 flex flex-col justify-between text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-lg font-black text-white">حقيبة المشتريات ({cartHook.totalCartCount})</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-slate-500">حقيبتك فارغة.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-xl bg-black/50 border border-white/10 flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-16 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{item.nameAr}</h4>
                          {item.variant && <span className="text-[11px] text-[#D946EF] font-bold">مقاس: {item.variant}</span>}
                          <div className="text-xs font-black text-white">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-1.5 bg-white/10 rounded">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-1.5 bg-white/10 rounded">+</button>
                        </div>
                        <button onClick={() => cartHook.removeFromCart(item.cartItemId)} className="text-xs text-red-400">×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartHook.cart.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>المجموع الصافي:</span>
                    <span className="font-black text-white">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#D946EF] text-white font-black text-xs uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    تأكيد الطلب الفوري
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
            <div className="modal-content rounded-2xl bg-[#0F0F14] border border-[#D946EF] p-6 max-w-lg w-full text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#D946EF]/20 rounded-full flex items-center justify-center text-[#D946EF]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-black text-white mb-2">تم تسجيل طلب أزياء الشارع بنجاح</h3>
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-slate-300 border-y border-white/10 py-3 font-mono">
                <div className="flex justify-between"><span>الطلب:</span><span className="text-[#D946EF]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>الإجمالي:</span><span className="font-bold text-[#D946EF]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#D946EF] text-white font-bold text-xs rounded-xl"
              >
                العودة للتشكيلة
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VayraStore;

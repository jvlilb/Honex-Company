import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Search, X, Check,
  Cpu, SlidersHorizontal, RefreshCw
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const NexaTechStore = () => {
  const store = getStoreById('nexatech');
  const cartHook = useStoreCart('nexatech');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState('');

  useEffect(() => {
    document.title = 'NexaTech | نكساتك للإلكترونيات وعروض التكنولوجيا — شركة هونكس';
  }, []);

  const toggleCompare = (p) => {
    setComparedProducts(prev => {
      const exists = prev.some(item => item.id === p.id);
      if (exists) {
        return prev.filter(item => item.id !== p.id);
      }
      if (prev.length >= 3) {
        cartHook.showToast('يمكنك مقارنة حتى 3 أجهزة فقط كحد أقصى');
        return prev;
      }
      cartHook.showToast(`✓ تمت إضافة ${p.nameAr.slice(0, 25)}... للمقارنة`);
      return [...prev, p];
    });
  };

  const isCompared = (id) => comparedProducts.some(p => p.id === id);

  const filteredProducts = store.products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.detailsAr && p.detailsAr.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#070913] text-[#F8FAFC] font-sans selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      <DemoAgencyHeader storeNameAr="نكساتك للإلكترونيات الذكية" accentColor="#00F0FF" />

      {/* ── HIGH-DENSITY UTILITY ELECTRONICS HEADER ──────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#070913]/95 backdrop-blur-md border-b border-[#00F0FF]/25">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xl tracking-wider text-white">NexaTech</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30">PRO</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">عتاد الحوسبة، الهواتف، وأجهزة الجيمنج</p>
            </div>
          </div>

          {/* Functional Search Bar */}
          <div className="flex-1 max-w-lg mx-2 sm:mx-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المعالج، كارت الشاشة (مثال: RTX 4080، OLED، 5G)..."
              className="w-full bg-[#0F172A] border border-[#00F0FF]/30 rounded-lg px-4 py-2 pr-10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-[#64748B]"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#00F0FF]" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative px-3 py-2 rounded-lg border border-[#818CF8]/40 bg-[#818CF8]/10 hover:bg-[#818CF8]/20 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw size={14} className="text-[#818CF8]" />
              <span className="hidden sm:inline">المقارنة</span>
              {comparedProducts.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#818CF8] text-[#070913] text-[10px] font-bold flex items-center justify-center">
                  {comparedProducts.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#00F0FF] text-[#070913] font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              <span>السلة ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Toolbar */}
        <div className="border-t border-white/5 bg-[#0A0D1D] px-4 sm:px-6 py-2 overflow-x-auto">
          <div className="container mx-auto flex items-center gap-2 text-xs">
            <span className="text-[#64748B] flex items-center gap-1 ml-2 font-mono">
              <SlidersHorizontal size={13} />
              القطاع:
            </span>
            {store.categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-md font-bold whitespace-nowrap transition-colors ${
                  activeCategory === c.id
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {c.nameAr}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── TECHNICAL HERO / HIGHLIGHT ───────────────────────────────────────── */}
      <section className="border-b border-[#00F0FF]/20 bg-gradient-to-b from-[#0F172A] to-[#070913] py-10 px-4 sm:px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 text-right">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono mb-3">
              <Cpu size={14} />
              <span>NEXA-SPECS // بنية عتاد الجيل الرابع عشر 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black mb-3 text-white">
              عتاد هندسي فائق السرعة مع ضمان الصيانة المعتمد
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
              تصفح مواصفات المعالجات، كروت الشاشة، وسرعات التردد بدقة متناهية. استخدم أداة المقارنة المباشرة لاختيار العتاد المناسب لعملك أو ألعابك.
            </p>
          </div>

          {/* Quick Hardware Stats Box */}
          <div className="p-4 rounded-xl border border-[#00F0FF]/30 bg-[#0F172A]/80 font-mono text-xs text-[#94A3B8] space-y-2">
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>فحص الضمان:</span>
              <span className="text-[#00F0FF] font-bold">12 شهر استبدال فوري</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>فحص عند التسليم:</span>
              <span className="text-emerald-400 font-bold">متاح مع السائق</span>
            </div>
            <div className="flex justify-between">
              <span>أجهزة المقارنة النشطة:</span>
              <span className="text-[#818CF8] font-bold">{comparedProducts.length} من 3</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIFICATIONS-LED PRODUCT CATALOG ──────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-xl border border-white/10 bg-[#0F172A] p-5 flex flex-col justify-between hover:border-[#00F0FF]/50 transition-all duration-300 shadow-lg"
            >
              <div>
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black/50 border border-white/5">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-[#00F0FF] border border-[#00F0FF]/40">
                      {p.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <h3
                    onClick={() => {
                      setDetailProduct(p);
                      setSelectedConfig(p.variants ? p.variants[0] : '');
                    }}
                    className="text-base font-bold text-white mb-2 line-clamp-1 cursor-pointer hover:text-[#00F0FF]"
                  >
                    {p.nameAr}
                  </h3>

                  {/* Specifications List Chips */}
                  <div className="space-y-1 mb-4 text-xs font-mono text-[#94A3B8]">
                    {p.detailsAr && p.detailsAr.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price, Compare Checkbox & Add to Cart */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-black text-[#00F0FF] font-mono">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>
                  {p.originalPrice && (
                    <div className="text-xs line-through text-[#64748B] font-mono">
                      {p.originalPrice.toLocaleString('ar-DZ')} دج
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCompare(p)}
                    className={`flex-1 py-1.5 px-2 rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                      isCompared(p.id)
                        ? 'bg-[#818CF8]/20 border-[#818CF8] text-[#818CF8]'
                        : 'border-white/15 text-[#94A3B8] hover:border-white/40'
                    }`}
                  >
                    <RefreshCw size={12} />
                    <span>{isCompared(p.id) ? 'في المقارنة ✓' : 'مقارنة المواصفات'}</span>
                  </button>

                  <button
                    onClick={() => cartHook.addToCart(p, p.variants ? p.variants[0] : null, 1)}
                    className="py-1.5 px-4 rounded bg-[#00F0FF] text-[#070913] font-black text-xs hover:brightness-110 flex items-center gap-1"
                  >
                    <ShoppingBag size={13} />
                    <span>شراء</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── STICKY COMPARE TRAY (IF AT LEAST 1 ITEM SELECTED) ────────────────── */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto p-3 rounded-xl bg-[#0F172A] border border-[#818CF8] shadow-2xl flex items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#818CF8]">مقارنة العتاد ({comparedProducts.length}/3):</span>
            <div className="flex gap-2">
              {comparedProducts.map(item => (
                <span key={item.id} className="bg-black/60 px-2 py-0.5 rounded border border-white/10 text-white flex items-center gap-1">
                  {item.nameAr.slice(0, 15)}...
                  <button onClick={() => toggleCompare(item)} className="text-red-400 hover:text-white">×</button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-2 rounded bg-[#818CF8] text-[#070913] font-bold hover:brightness-110 whitespace-nowrap"
          >
            فتح جدول المقارنة الفوري
          </button>
        </div>
      )}

      {/* ── COMPARE PRODUCTS MODAL TABLE ────────────────────────────────────── */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="modal-overlay" onClick={() => setIsCompareModalOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-2xl bg-[#0F172A] border border-[#818CF8] p-6 max-w-4xl w-full text-right font-sans max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <RefreshCw size={20} className="text-[#818CF8]" />
                    جدول مقارنة المواصفات الفنية
                  </h3>
                  <p className="text-xs text-[#94A3B8]">مقارنة مباشرة بين عتاد الأجهزة المختارة</p>
                </div>
                <button onClick={() => setIsCompareModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {comparedProducts.length === 0 ? (
                <p className="text-center py-12 text-sm text-[#94A3B8]">لم تختر أي أجهزة للمقارنة بعد. انقر على "مقارنة المواصفات" في البطاقات.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                      <div>
                        <img src={p.image} alt={p.nameAr} className="w-full aspect-video object-cover rounded mb-3" />
                        <h4 className="font-bold text-sm text-white mb-2">{p.nameAr}</h4>
                        <div className="text-base font-black text-[#00F0FF] font-mono mb-4">
                          {p.price.toLocaleString('ar-DZ')} دج
                        </div>

                        <div className="space-y-2 text-xs font-mono text-[#94A3B8] mb-4">
                          <span className="font-bold text-white block">المواصفات المعلنة:</span>
                          {p.detailsAr && p.detailsAr.map((d, i) => (
                            <div key={i} className="p-1.5 rounded bg-white/5 border border-white/5">
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <button
                          onClick={() => {
                            cartHook.addToCart(p);
                            setIsCompareModalOpen(false);
                          }}
                          className="w-full py-2 rounded bg-[#00F0FF] text-[#070913] font-bold text-xs"
                        >
                          شراء الجهاز الآن
                        </button>
                        <button
                          onClick={() => toggleCompare(p)}
                          className="w-full py-1 text-xs text-red-400 hover:underline"
                        >
                          إزالة من جدول المقارنة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PRODUCT DETAIL MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {detailProduct && (
          <div className="modal-overlay" onClick={() => setDetailProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 p-6 max-w-2xl w-full text-right"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-xl aspect-video sm:aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#00F0FF] uppercase mb-1 block">
                      {detailProduct.category} // TECH-SPEC
                    </span>
                    <h3 className="text-xl font-black text-white mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-black text-[#00F0FF] font-mono mb-4">
                      {detailProduct.price.toLocaleString('ar-DZ')} دج
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.variants && (
                      <div className="mb-4">
                        <label className="block text-xs font-mono text-white mb-2">تكوين الذاكرة والعتاد:</label>
                        <div className="flex flex-wrap gap-2">
                          {detailProduct.variants.map(v => (
                            <button
                              key={v}
                              onClick={() => setSelectedConfig(v)}
                              className={`px-3 py-1 rounded text-xs font-mono border ${
                                selectedConfig === v ? 'bg-[#00F0FF] text-[#070913] font-bold border-[#00F0FF]' : 'border-white/20 text-[#94A3B8]'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      cartHook.addToCart(detailProduct, selectedConfig || null, 1);
                      setDetailProduct(null);
                    }}
                    className="w-full py-3 rounded-lg bg-[#00F0FF] text-[#070913] font-black text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:brightness-110"
                  >
                    إضافة للعتاد المطلوب
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TECHNICAL HARDWARE CART DRAWER ──────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#0B0F21] border-r border-[#00F0FF]/30 p-6 flex flex-col justify-between font-mono text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-lg font-bold text-[#00F0FF] flex items-center gap-2">
                    <Cpu size={18} />
                    فاتورة العتاد التقني ({cartHook.totalCartCount})
                  </h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-[#64748B]">سلة العتاد فارغة.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded bg-[#0F172A] border border-white/10 flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{item.nameAr}</h4>
                          {item.variant && <span className="text-[10px] text-[#00F0FF]">{item.variant}</span>}
                          <div className="text-xs font-bold text-[#00F0FF]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</div>
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
                  <div className="flex justify-between text-xs text-[#94A3B8]">
                    <span>إجمالي العتاد:</span>
                    <span className="font-bold text-[#00F0FF]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 rounded bg-[#00F0FF] text-[#070913] font-black text-xs uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110"
                  >
                    تأكيد طلب التوريد التقني
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
            <div className="modal-content rounded-2xl bg-[#0F172A] border border-[#00F0FF] p-6 max-w-lg w-full text-center font-mono">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#00F0FF]/20 rounded-full flex items-center justify-center text-[#00F0FF]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تم تسجيل طلب العتاد التقني</h3>
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-[#94A3B8] border-y border-white/10 py-3">
                <div className="flex justify-between"><span>كود الطلب:</span><span className="text-[#00F0FF]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>المجموع:</span><span className="text-[#00F0FF] font-bold">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#00F0FF] text-[#070913] font-bold text-xs rounded"
              >
                العودة للكتالوج التقني
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NexaTechStore;

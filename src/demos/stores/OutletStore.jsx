import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  Flame, Clock, Tag, Percent, ArrowLeft
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const OutletStore = () => {
  const store = getStoreById('outlet');
  const cartHook = useStoreCart('outlet');

  const [activeCategory, setActiveCategory] = useState('all');
  const [minDiscountFilter, setMinDiscountFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });

  useEffect(() => {
    document.title = 'OUTLET 24 | أوتلت 24 — مركز التخفيضات وتصفية الماركات | شركة هونكس';
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDiscountPercent = (product) => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const filteredProducts = store.products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const discount = getDiscountPercent(p);
    const matchDiscount = discount >= minDiscountFilter;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiscount && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans selection:bg-red-500/30 selection:text-red-400">
      <DemoAgencyHeader storeNameAr="أوتلت 24 للتخفيضات الكبرى" accentColor="#EF4444" />

      {/* ── FLASH SALE URGENCY BAR ────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white py-2 px-4 text-xs font-black">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame size={16} className="animate-pulse text-amber-200" />
            <span>تصفية كبرى: تخفيضات تصل حتى 60% على البضائع المتبقية — الكميات محدودة جداً</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs">
            <Clock size={13} className="text-amber-300" />
            <span>ينتهي العرض الحالي خلال:</span>
            <span className="font-bold text-amber-200">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-red-500/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/30">
              %
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">OUTLET 24</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                  تخفيضات حقيقية
                </span>
              </div>
              <p className="text-[11px] text-slate-400">تصفية مخازن رسمية وضمان أصالة 100%</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في عروض التصفية..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pr-10 text-xs focus:outline-none focus:border-red-500 text-white"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Cart & Favorites Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => cartHook.setIsFavsOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 text-slate-300 relative transition-all"
              title="المفضلة"
            >
              <Heart size={18} className={cartHook.favorites.length > 0 ? 'fill-red-500 text-red-500' : ''} />
              {cartHook.favorites.length > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartHook.favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">سلة التصفية</span>
              <span className="w-5 h-5 bg-white text-red-600 rounded-full flex items-center justify-center text-[10px] font-black">
                {cartHook.totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#14141e] to-[#0a0a0f]">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold mb-4">
              <Tag size={13} />
              <span>مهرجان أسعار التكلفة والتصفية السريعة</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              وفر حتى <span className="text-red-500">60%</span> على أفضل الماركات والمنتجات
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              جميع الأسعار المعروضة موثقة بمقارنة واضحة مع سعر التجزئة السابق. كميات حصرية ومتبقية من آخر التشكيلات مع توصيل سريع لـ 58 ولاية.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setMinDiscountFilter(50);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-red-600/25 transition-all"
              >
                <Percent size={14} />
                <span>عروض نصف السعر فأكثر (-50%)</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setMinDiscountFilter(0);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                عرض جميع المنتجات ({store.products.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT & FILTERS ─────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-10">
        {/* Categories & Discount Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {store.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-red-500/30'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>

          {/* Discount threshold filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">الخصم:</span>
            {[
              { label: 'الكل', val: 0 },
              { label: '40%+ خصم', val: 40 },
              { label: '50%+ خصم', val: 50 }
            ].map(f => (
              <button
                key={f.val}
                onClick={() => setMinDiscountFilter(f.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  minDiscountFilter === f.val
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const savings = (product.originalPrice || product.price) - product.price;
            const discount = getDiscountPercent(product);
            const isFav = cartHook.isFavorite(product.id);

            return (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 bg-[#12121a] hover:border-red-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-lg"
              >
                {/* Image & Discount Badges */}
                <div className="relative aspect-[4/3] bg-black overflow-hidden cursor-pointer" onClick={() => {
                  setDetailProduct(product);
                  setSelectedVariant(product.variants?.[0] || '');
                }}>
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-60" />

                  {/* Discount percentage tag */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                    <Flame size={12} className="text-amber-300" />
                    <span>خصم {discount}%</span>
                  </div>

                  {/* Favorite toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cartHook.toggleFavorite(product);
                    }}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all backdrop-blur-md"
                  >
                    <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                  </button>

                  {/* Savings Banner */}
                  <div className="absolute bottom-2 right-2 left-2 bg-amber-400/95 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-md shadow flex justify-between items-center">
                    <span>وفر مع أوتلت:</span>
                    <span>{savings.toLocaleString('ar-DZ')} دج</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => {
                        setDetailProduct(product);
                        setSelectedVariant(product.variants?.[0] || '');
                      }}
                      className="font-black text-sm text-white group-hover:text-red-400 transition-colors cursor-pointer mb-2 line-clamp-2"
                    >
                      {product.nameAr}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {product.shortDescAr}
                    </p>
                  </div>

                  <div>
                    {/* Price Block */}
                    <div className="mb-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-slate-500 line-through">
                          السابق: {product.originalPrice?.toLocaleString('ar-DZ')} دج
                        </div>
                        <div className="text-lg font-black text-red-400">
                          {product.price.toLocaleString('ar-DZ')} دج
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        متاح للتسليم
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setDetailProduct(product);
                          setSelectedVariant(product.variants?.[0] || '');
                        }}
                        className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-xs font-bold text-slate-300 transition-all text-center"
                      >
                        تفاصيل وتحديد المقاس
                      </button>
                      <button
                        onClick={() => cartHook.addToCart(product, product.variants?.[0] || null, 1)}
                        className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-md shadow-red-600/30"
                        title="إضافة سريعة للسلة"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 mt-6">
            <p className="text-sm font-bold text-slate-400 mb-2">لا توجد عروض مطابقة للبحث الحالي</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setMinDiscountFilter(0);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white"
            >
              عرض جميع عروض التصفية
            </button>
          </div>
        )}
      </main>

      {/* ── PRODUCT DETAIL MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {detailProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDetailProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12121a] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-3">
                    <img src={detailProduct.image} alt={detailProduct.nameAr} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    <strong>ضمان تصفية أوتلت:</strong> سعر البيع الأصلي محقق ويضمن توفيراً حقيقياً ومباشراً.
                  </div>
                </div>

                <div className="flex flex-col justify-between text-right">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-red-600 text-white inline-block mb-2">
                      خصم {getDiscountPercent(detailProduct)}%
                    </span>
                    <h2 className="text-xl font-black text-white mb-2">{detailProduct.nameAr}</h2>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {/* Pricing */}
                    <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-slate-400 line-through">
                        السعر السابق المعتمد: {detailProduct.originalPrice?.toLocaleString('ar-DZ')} دج
                      </div>
                      <div className="text-2xl font-black text-red-400 mt-1">
                        {detailProduct.price.toLocaleString('ar-DZ')} دج
                      </div>
                      <div className="text-xs text-amber-300 font-bold mt-1">
                        وفرت: {((detailProduct.originalPrice || detailProduct.price) - detailProduct.price).toLocaleString('ar-DZ')} دج
                      </div>
                    </div>

                    {/* Variants */}
                    {detailProduct.variants && detailProduct.variants.length > 0 && (
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-300 mb-2">اختر المقاس / اللون:</label>
                        <div className="flex flex-wrap gap-2">
                          {detailProduct.variants.map(v => (
                            <button
                              key={v}
                              onClick={() => setSelectedVariant(v)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                selectedVariant === v
                                  ? 'bg-red-600 text-white border-red-600'
                                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-red-500/30'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {detailProduct.detailsAr && (
                      <div className="space-y-1 mb-6 text-xs text-slate-300">
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check size={13} className="text-emerald-400 flex-shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex gap-3">
                    <button
                      onClick={() => {
                        cartHook.addToCart(detailProduct, selectedVariant, 1);
                        setDetailProduct(null);
                        cartHook.setIsCartOpen(true);
                      }}
                      className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingBag size={16} />
                      <span>إضافة لسلة التصفية</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CART DRAWER ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-start" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#12121a] border-l border-white/10 h-full flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} className="text-red-500" />
                    <h3 className="font-black text-base text-white">سلة تصفية أوتلت ({cartHook.totalCartCount})</h3>
                  </div>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="p-1.5 rounded-full hover:bg-white/10">
                    <X size={18} />
                  </button>
                </div>

                {cartHook.cart.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <ShoppingBag size={40} className="mx-auto mb-3 opacity-30 text-red-400" />
                    <p className="text-xs font-bold">سلة التصفية فارغة حالياً</p>
                    <p className="text-[11px] text-slate-500 mt-1">اختر منتجاً واستفد من التخفيضات الاستثنائية</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                    {cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 text-right">
                          <h4 className="text-xs font-black text-white line-clamp-1">{item.nameAr}</h4>
                          {item.variant && <p className="text-[10px] text-red-400">المقاس: {item.variant}</p>}
                          <p className="text-xs font-bold text-red-400 mt-0.5">{item.price.toLocaleString('ar-DZ')} دج</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-white/15 rounded-lg bg-black/40">
                            <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-0.5 text-xs text-slate-300">-</button>
                            <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                            <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-0.5 text-xs text-slate-300">+</button>
                          </div>
                          <button onClick={() => cartHook.removeFromCart(item.cartItemId)} className="text-slate-500 hover:text-red-400 p-1">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartHook.cart.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي:</span>
                    <span>{cartHook.cartSubtotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold">
                    <span>إجمالي وفر أوتلت المباشر:</span>
                    <span>{cartHook.totalSavings.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>الشحن لـ 58 ولاية:</span>
                    <span>{cartHook.shippingFee === 0 ? 'مجاني' : `${cartHook.shippingFee} دج`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                    <span>المجموع الإجمالي:</span>
                    <span className="text-red-400">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>

                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>متابعة إتمام الطلب التجريبي</span>
                    <ArrowLeft size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FAVORITES DRAWER ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isFavsOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-start" onClick={() => cartHook.setIsFavsOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#12121a] border-l border-white/10 h-full flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                    <h3 className="font-black text-base text-white">قائمة المفضلة ({cartHook.favorites.length})</h3>
                  </div>
                  <button onClick={() => cartHook.setIsFavsOpen(false)} className="p-1.5 rounded-full hover:bg-white/10">
                    <X size={18} />
                  </button>
                </div>

                {cartHook.favorites.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <Heart size={40} className="mx-auto mb-3 opacity-30 text-red-400" />
                    <p className="text-xs font-bold">لم تقم بحفظ أي عروض بعد</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                    {cartHook.favorites.map(item => (
                      <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 text-right">
                          <h4 className="text-xs font-black text-white line-clamp-1">{item.nameAr}</h4>
                          <p className="text-xs font-bold text-red-400 mt-0.5">{item.price.toLocaleString('ar-DZ')} دج</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              cartHook.addToCart(item, item.variants?.[0] || null, 1);
                              cartHook.toggleFavorite(item);
                            }}
                            className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                            title="نقل إلى السلة"
                          >
                            <ShoppingBag size={14} />
                          </button>
                          <button onClick={() => cartHook.toggleFavorite(item)} className="p-2 text-slate-400 hover:text-red-400">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CHECKOUT MODAL ──────────────────────────────────────────────────── */}
      <DemoCheckoutModal
        isOpen={cartHook.isCheckoutOpen}
        onClose={() => cartHook.setIsCheckoutOpen(false)}
        store={store}
        cartTotal={cartHook.cartTotal}
        cart={cartHook.cart}
        onConfirmSuccess={(order) => {
          cartHook.setOrderConfirmed(order);
          cartHook.clearCart();
          cartHook.setIsCheckoutOpen(false);
        }}
      />

      {/* ── ORDER CONFIRMATION SCREEN ────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.orderConfirmed && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#12121a] border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right shadow-2xl relative"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <Check size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-center text-white mb-2">تم تسجيل طلب التصفية بنجاح!</h3>
              <p className="text-xs text-center text-slate-300 mb-6 leading-relaxed">
                رقم الطلب التجريبي: <span className="font-mono font-bold text-amber-300">{cartHook.orderConfirmed.orderId}</span>
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-6 leading-relaxed">
                <strong>تنبيه توضيحي:</strong> هذا طلب تجريبي فقط — لم يتم إرسال طلب حقيقي أو تحصيل أي مبلغ مالي. هذا النموذج تم تطويره بواسطة شركة هونكس لاستعراض قدرات أنظمة التجارة الإلكترونية.
              </div>

              <div className="space-y-2 text-xs border-t border-b border-white/10 py-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">الاسم:</span>
                  <span className="font-bold">{cartHook.orderConfirmed.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الهاتف:</span>
                  <span className="font-bold">{cartHook.orderConfirmed.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الولاية:</span>
                  <span className="font-bold">{cartHook.orderConfirmed.customer.wilaya}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">المبلغ الإجمالي (محاكاة):</span>
                  <span className="font-black text-red-400">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => cartHook.setOrderConfirmed(null)}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all text-center"
                >
                  العودة للمتجر
                </button>
                <a
                  href="/"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all text-center"
                >
                  العودة لهونكس
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TOAST NOTIFICATION ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full border border-red-500/50 shadow-2xl text-xs font-bold flex items-center gap-2"
          >
            <span>{cartHook.toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutletStore;

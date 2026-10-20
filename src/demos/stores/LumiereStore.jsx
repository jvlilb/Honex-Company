import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X,
  Sparkles, Check, ChevronDown
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const LumiereStore = () => {
  const store = getStoreById('lumiere');
  const cartHook = useStoreCart('lumiere');

  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    document.title = 'LUMIÈRE Haute Couture | لومي للأزياء الفاخرة — شركة هونكس';
  }, []);

  const filteredProducts = store.products.filter(p => {
    const matchCat = activeTab === 'all' || p.category === activeTab;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#08080a] text-[#FAF8F5] font-serif selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      <DemoAgencyHeader storeNameAr="لوميير للأزياء الفاخرة" accentColor="#D4AF37" />

      {/* ── EDITORIAL LUXURY MASTHEAD ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-xs tracking-widest text-[#D4AF37] hover:text-white transition-colors uppercase"
          >
            <Search size={16} />
            <span className="hidden sm:inline">البحث في التشكيلة</span>
          </button>

          {/* Central Logo */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-normal tracking-[0.25em] text-[#D4AF37] uppercase">
              LUMIÈRE
            </h1>
            <p className="text-[9px] tracking-[0.35em] text-[#FAF8F5]/60 uppercase font-sans mt-0.5">
              HAUTE COUTURE & LUXURY
            </p>
          </div>

          {/* Bag & Wishlist Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => cartHook.setIsFavsOpen(true)}
              className="relative p-2 text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors"
              title="المفضلة"
            >
              <Heart size={18} className={cartHook.favorites.length > 0 ? 'fill-[#D4AF37] text-[#D4AF37]' : ''} />
              {cartHook.favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-sans font-bold rounded-full flex items-center justify-center">
                  {cartHook.favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-sans tracking-wide transition-all"
            >
              <ShoppingBag size={15} className="text-[#D4AF37]" />
              <span>الحقيبة ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Fashion Navigation Menu */}
        <nav className="border-t border-[#D4AF37]/10 px-6 py-2.5">
          <ul className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#FAF8F5]/75 font-sans tracking-wider">
            <li>
              <button
                onClick={() => setActiveTab('all')}
                className={`transition-colors pb-1 ${activeTab === 'all' ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'hover:text-white'}`}
              >
                جميع القطع الحصرية
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('women')}
                className={`transition-colors pb-1 ${activeTab === 'women' ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'hover:text-white'}`}
              >
                فساتين وسهرات
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('men')}
                className={`transition-colors pb-1 ${activeTab === 'men' ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'hover:text-white'}`}
              >
                بدلات وتوكسيدو
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bags')}
                className={`transition-colors pb-1 ${activeTab === 'bags' ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'hover:text-white'}`}
              >
                حقائب جلد إيطالي
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('shoes')}
                className={`transition-colors pb-1 ${activeTab === 'shoes' ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'hover:text-white'}`}
              >
                أحذية وإكسسوارات
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* ── CINEMATIC EDITORIAL HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
            alt="Lumiere Luxury Campaign"
            className="w-full h-full object-cover object-center brightness-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl py-20">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-sans block mb-3">
            AUTUMN / WINTER 2026 COUTURE
          </span>
          <h2 className="text-4xl sm:text-6xl font-normal leading-tight mb-6 text-[#FAF8F5]">
            حينما تلتقي الحرفية الملكية بالفخامة الخالدة
          </h2>
          <p className="text-sm sm:text-base text-[#FAF8F5]/80 font-sans leading-relaxed max-w-xl mx-auto mb-8 font-light">
            قطع هوت كوتور نادرة ومطرزة يدوياً بأيدي أمهر خياطي ميلانو وباريس، مصممة للمناسبات التي تتطلب حضوراً استثنائياً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-xs">
            <a
              href="#catalog"
              className="px-8 py-3.5 bg-[#D4AF37] text-black font-bold tracking-wider hover:bg-white transition-all uppercase"
            >
              استكشف المجموعة الحصرية
            </a>
            <button
              onClick={() => setStoryOpen(!storyOpen)}
              className="px-6 py-3.5 border border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2"
            >
              <span>قصة التصميم والحرفية</span>
              <ChevronDown size={14} className={storyOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
          </div>

          {/* Expandable Craft Story */}
          <AnimatePresence>
            {storyOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-6 rounded-2xl bg-black/80 border border-[#D4AF37]/30 text-right text-xs font-sans text-[#FAF8F5]/80 leading-relaxed overflow-hidden"
              >
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold mb-2">
                  <Sparkles size={16} />
                  <span>معايير دار لومي للأزياء الفاخرة:</span>
                </div>
                <p>
                  يتم نسج كل قطعة باستخدام أقمشة طبيعية 100% مثل صوف الميرينو فائق النقاء Super 150s والكشمير المنغولي. تخضع كل درزة لأكثر من 40 ساعة من التطريز اليدوي الدقيق مع أزرار من عاج وبوق طبيعي، وتوصيل خاص مؤمن لجميع ولايات الوطن مع تجربة القياس المنزلية.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ASYMMETRIC EDITORIAL PRODUCT GRID ────────────────────────────────── */}
      <main id="catalog" className="container mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-sans">
              LOOKBOOK & CURATED PIECES
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal text-[#FAF8F5]">
              قطع المجموعة المختارة
            </h3>
          </div>
          <span className="text-xs font-sans text-[#FAF8F5]/50 mt-2 sm:mt-0">
            يعرض {filteredProducts.length} قطع استثنائية
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((p, idx) => (
            <article
              key={p.id}
              className={`group flex flex-col justify-between border border-[#D4AF37]/20 bg-[#0d0d11] p-5 transition-all duration-500 hover:border-[#D4AF37]/60 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Visual Frame */}
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-black">
                  <img
                    src={p.image}
                    alt={p.nameAr}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-sans uppercase tracking-widest bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40">
                      {p.badge || 'COUTURE'}
                    </span>
                  </div>

                  <button
                    onClick={() => cartHook.toggleFavorite(p)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white hover:text-[#D4AF37] transition-colors"
                    title="المفضلة"
                  >
                    <Heart size={16} className={cartHook.isFavorite(p.id) ? 'fill-[#D4AF37] text-[#D4AF37]' : ''} />
                  </button>

                  {/* Subtle Quick-view Overlay Button */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setSelectedSize(p.variants ? p.variants[0] : '');
                      }}
                      className="px-5 py-2 text-xs font-sans tracking-wider bg-[#D4AF37] text-black font-bold uppercase hover:bg-white transition-colors"
                    >
                      معاينة تفاصيل القطعة
                    </button>
                  </div>
                </div>

                {/* Typography & Details */}
                <div className="text-right">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#D4AF37]/80 block mb-1">
                    {p.category}
                  </span>
                  <h4
                    onClick={() => {
                      setSelectedProduct(p);
                      setSelectedSize(p.variants ? p.variants[0] : '');
                    }}
                    className="text-lg font-normal text-[#FAF8F5] mb-2 cursor-pointer hover:text-[#D4AF37] transition-colors"
                  >
                    {p.nameAr}
                  </h4>
                  <p className="text-xs font-sans text-[#FAF8F5]/60 line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between font-sans">
                <div>
                  <div className="text-lg font-bold text-[#D4AF37]">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>
                  {p.originalPrice && (
                    <div className="text-xs line-through text-[#FAF8F5]/40">
                      {p.originalPrice.toLocaleString('ar-DZ')} دج
                    </div>
                  )}
                </div>

                <button
                  onClick={() => cartHook.addToCart(p, p.variants ? p.variants[0] : null, 1)}
                  className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all text-xs font-bold tracking-wider"
                >
                  إضافة للحقيبة
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── LUXURY PRODUCT DETAIL MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-none border border-[#D4AF37]/30 bg-[#0c0c10] text-[#FAF8F5] max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 p-2 text-[#FAF8F5]/60 hover:text-[#D4AF37]"
              >
                <X size={20} />
              </button>

              <div className="grid sm:grid-cols-2 gap-8 text-right font-sans">
                <div className="aspect-[3/4] bg-black overflow-hidden border border-[#D4AF37]/20">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                      LUMIÈRE PIECE N° {selectedProduct.id}
                    </span>
                    <h3 className="text-2xl font-serif font-normal text-[#FAF8F5] mb-3">
                      {selectedProduct.nameAr}
                    </h3>
                    <div className="text-xl font-bold text-[#D4AF37] mb-4">
                      {selectedProduct.price.toLocaleString('ar-DZ')} دج
                    </div>
                    <p className="text-xs text-[#FAF8F5]/80 leading-relaxed mb-6 font-light">
                      {selectedProduct.shortDescAr}
                    </p>

                    {/* Sizing selector */}
                    {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                      <div className="mb-6">
                        <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
                          المقاس أو القياس المتوفر:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.variants.map((v) => (
                            <button
                              key={v}
                              onClick={() => setSelectedSize(v)}
                              className={`px-3 py-1.5 text-xs border transition-colors ${
                                selectedSize === v
                                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                                  : 'border-[#D4AF37]/30 text-[#FAF8F5]/80 hover:border-[#D4AF37]'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Craftsmanship notes */}
                    {selectedProduct.detailsAr && (
                      <div className="p-4 bg-black/50 border border-[#D4AF37]/20 mb-6 text-xs text-[#FAF8F5]/70 space-y-1.5">
                        <span className="font-bold text-[#D4AF37] block mb-1">تفاصيل النسيج والحياكة:</span>
                        {selectedProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      cartHook.addToCart(selectedProduct, selectedSize || null, 1);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    تأكيد وإضافة للحقيبة الفاخرة
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LUXURY BOUTIQUE BAG DRAWER ───────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#0c0c10] border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between font-sans text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-4">
                  <h3 className="text-xl font-serif text-[#D4AF37]">حقيبة لومي الفاخرة</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="p-1 text-[#FAF8F5]/60 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-[#FAF8F5]/40 font-light">
                      حقيبة مقتنياتك فارغة حالياً.
                    </p>
                  ) : (
                    cartHook.cart.map((item) => (
                      <div key={item.cartItemId} className="flex gap-4 p-3 border border-[#D4AF37]/20 bg-black/40">
                        <img src={item.image} alt={item.nameAr} className="w-16 h-20 object-cover" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-[#FAF8F5]">{item.nameAr}</h4>
                            {item.variant && <span className="text-[11px] text-[#D4AF37]">{item.variant}</span>}
                            <div className="text-xs font-bold text-[#D4AF37] mt-1">
                              {(item.price * item.quantity).toLocaleString('ar-DZ')} دج
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs">
                              <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-2 border border-white/20">-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-2 border border-white/20">+</button>
                            </div>
                            <button onClick={() => cartHook.removeFromCart(item.cartItemId)} className="text-[11px] text-red-400">حذف</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartHook.cart.length > 0 && (
                <div className="border-t border-[#D4AF37]/20 pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#FAF8F5]/70">
                    <span>المجموع الصافي:</span>
                    <span className="font-bold text-[#D4AF37]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors text-xs"
                  >
                    متابعة إجراءات الطلب الخاص
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── EDITORIAL SEARCH OVERLAY ────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSearchOpen(false)}>
            <div className="max-w-xl w-full text-right font-sans" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8 border-b border-[#D4AF37]/40 pb-4">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في فساتين السهرة، الحقائب، البدلات..."
                  className="w-full bg-transparent text-xl text-[#FAF8F5] focus:outline-none placeholder:text-[#FAF8F5]/30 font-serif"
                />
                <button onClick={() => setSearchOpen(false)} className="text-[#FAF8F5]/60 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="text-xs text-[#D4AF37]">
                <span className="font-bold block mb-3 uppercase tracking-wider">عمليات بحث مميزة في الكتالوج:</span>
                <div className="flex flex-wrap gap-2">
                  {['فستان مخملي', 'حقيبة إيطالية', 'توكسيدو Super 150s', 'كعب كريستال', 'معطف كشمير'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
            <div className="modal-content rounded-none border border-[#D4AF37] bg-[#0c0c10] text-[#FAF8F5] p-8 max-w-lg w-full text-center font-sans">
              <div className="w-14 h-14 mx-auto mb-4 border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37]">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-serif text-[#D4AF37] mb-2">تم تسجيل طلبك الحصري بنجاح</h3>
              <p className="text-xs text-amber-300 bg-amber-500/10 p-3 border border-amber-500/20 mb-6">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل أي مبالغ ولن يتم شحن منتجات حقيقية.
              </p>
              <div className="text-xs text-right space-y-2 mb-6 border-y border-[#D4AF37]/20 py-4 text-[#FAF8F5]/80">
                <div className="flex justify-between"><span>رقم الطلب التجريبي:</span><span className="font-mono text-[#D4AF37]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>الإجمالي:</span><span className="font-bold text-[#D4AF37]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs hover:bg-white"
              >
                العودة للتشكيلة الفاخرة
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LumiereStore;

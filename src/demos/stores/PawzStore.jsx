import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  HeartHandshake, CheckCircle2
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const PawzStore = () => {
  const store = getStoreById('pawz');
  const cartHook = useStoreCart('pawz');

  const [petFilter, setPetFilter] = useState('all'); // 'all' | 'cats' | 'dogs'
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  // Bundle Builder items selection
  const [bundleItems] = useState([
    store.products[0], // Dry food 10kg
    store.products[1], // Calming bed
    store.products[4]  // Water fountain
  ]);

  useEffect(() => {
    document.title = 'Pawz | باوز لمستلزمات وأغذية الحيوانات الأليفة — شركة هونكس';
  }, []);

  const filteredProducts = store.products.filter(p => {
    const matchPet = petFilter === 'all' ||
      (petFilter === 'cats' && (p.category === 'cats' || p.category === 'toys' || p.category === 'beds')) ||
      (petFilter === 'dogs' && (p.category === 'dogs' || p.category === 'beds' || p.category === 'grooming'));
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPet && matchSearch;
  });

  const bundleRawTotal = bundleItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = Math.round(bundleRawTotal * 0.15); // 15% bundle discount
  const bundleFinalTotal = bundleRawTotal - bundleDiscount;

  return (
    <div dir="rtl" className="min-h-screen bg-[#F0FDF4] text-[#0F172A] font-sans selection:bg-[#059669]/20 selection:text-[#059669]">
      <DemoAgencyHeader storeNameAr="باوز لمستلزمات الحيوانات الأليفة" accentColor="#059669" />

      {/* ── FRIENDLY PETS HEADER ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#BBF7D0] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#059669] text-white flex items-center justify-center font-black text-xl shadow-md">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-[#065F46] tracking-wide">Pawz</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534]">VET CARE</span>
              </div>
              <p className="text-[11px] text-[#047857]">تغذية ممتازة ومستلزمات راحة صديقك الأليف</p>
            </div>
          </div>

          {/* Pet Switcher in Header */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F0FDF4] p-1 rounded-2xl border border-[#BBF7D0]">
            <button
              onClick={() => setPetFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                petFilter === 'all' ? 'bg-[#059669] text-white shadow' : 'text-[#065F46]'
              }`}
            >
              🐾 كل الحيوانات
            </button>
            <button
              onClick={() => setPetFilter('cats')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                petFilter === 'cats' ? 'bg-[#059669] text-white shadow' : 'text-[#065F46]'
              }`}
            >
              🐱 قسم القطط
            </button>
            <button
              onClick={() => setPetFilter('dogs')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                petFilter === 'dogs' ? 'bg-[#059669] text-white shadow' : 'text-[#065F46]'
              }`}
            >
              🐶 قسم الكلاب
            </button>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4 relative font-sans">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في مستلزمات الأليف..."
              className="w-full bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3.5 py-1.5 pr-8 text-xs focus:outline-none focus:border-[#059669]"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#059669]" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => cartHook.setIsFavsOpen(true)} className="p-2 text-[#047857] hover:text-[#059669]">
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#059669] text-[#059669]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#059669] text-white font-bold text-xs shadow-md hover:bg-[#047857]"
            >
              <ShoppingBag size={16} />
              <span>سلة الأليف ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Pet Switcher Bar */}
        <div className="sm:hidden border-t border-[#BBF7D0] px-4 py-2 bg-[#F0FDF4] flex justify-center gap-2">
          {['all', 'cats', 'dogs'].map(type => (
            <button
              key={type}
              onClick={() => setPetFilter(type)}
              className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                petFilter === type ? 'bg-[#059669] text-white' : 'text-[#065F46]'
              }`}
            >
              {type === 'all' ? '🐾 الكل' : type === 'cats' ? '🐱 القطط' : '🐶 الكلاب'}
            </button>
          ))}
        </div>
      </header>

      {/* ── INTERACTIVE PET STARTER BUNDLE BUILDER ────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 border-b border-[#BBF7D0] bg-white">
        <div className="container mx-auto max-w-4xl text-right">
          <div className="flex items-center gap-2 text-xs font-bold text-[#059669] mb-1">
            <HeartHandshake size={16} />
            <span>بناء باقة الترحيب بصديقك الأليف</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#065F46] mb-2">
            خصم 15% فوري عند تجهيز باقة الرعاية المتكاملة
          </h2>
          <p className="text-xs text-[#047857]/80 mb-6">
            تشمل الباقة: طعاماً صحياً مركزاً + سريراً مهدئاً مريحاً + نافورة مياه صحية.
          </p>

          <div className="p-5 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {bundleItems.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-2xl bg-white border border-[#BBF7D0] flex items-center gap-3">
                  <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-[#059669]">عنصر {idx + 1}</span>
                    <h4 className="text-xs font-bold text-[#065F46] line-clamp-1">{item.nameAr}</h4>
                    <span className="text-xs font-black text-[#059669]">{item.price.toLocaleString('ar-DZ')} دج</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#BBF7D0]">
              <div className="text-xs text-[#065F46]">
                <span className="line-through text-slate-400 ml-2">{bundleRawTotal.toLocaleString('ar-DZ')} دج</span>
                <span className="text-lg font-black text-[#059669]">{bundleFinalTotal.toLocaleString('ar-DZ')} دج</span>
                <span className="text-[11px] font-bold text-emerald-600 mr-2">(وفرت {bundleDiscount.toLocaleString('ar-DZ')} دج)</span>
              </div>

              <button
                onClick={() => {
                  cartHook.addMultipleToCart(bundleItems, 'باقة الرعاية المتكاملة للأليف');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#059669] text-white font-bold text-xs hover:bg-[#047857] shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>إضافة الباقة الكاملة بخصم 15%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PET CARE PRODUCT CATALOG ─────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-3xl border border-[#BBF7D0] bg-white p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#059669] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#F0FDF4]">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <button
                    onClick={() => cartHook.toggleFavorite(p)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur text-[#059669] shadow"
                  >
                    <Heart size={16} className={cartHook.isFavorite(p.id) ? 'fill-[#059669]' : ''} />
                  </button>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">
                      {p.category === 'cats' ? '🐱 قطط' : p.category === 'dogs' ? '🐶 كلاب' : '🐾 عام'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <h3
                    onClick={() => setDetailProduct(p)}
                    className="text-base font-black text-[#065F46] mb-1.5 cursor-pointer hover:text-[#059669]"
                  >
                    {p.nameAr}
                  </h3>
                  <p className="text-xs text-[#047857]/80 line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0FDF4] flex items-center justify-between">
                <div className="text-lg font-black text-[#059669]">
                  {p.price.toLocaleString('ar-DZ')} دج
                </div>

                <button
                  onClick={() => cartHook.addToCart(p)}
                  className="px-4 py-2 rounded-full bg-[#059669] text-white font-bold text-xs hover:bg-[#047857]"
                >
                  إضافة لسلة الأليف
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── PRODUCT DETAIL MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {detailProduct && (
          <div className="modal-overlay" onClick={() => setDetailProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-3xl bg-white border border-[#BBF7D0] p-6 max-w-xl w-full text-right"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-2xl aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#065F46] mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-black text-[#059669] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#047857]/80 leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] mb-4 text-xs space-y-1 text-[#065F46]">
                        <span className="font-bold block text-[#059669]">المكونات والخصائص البيطرية:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
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
                    className="w-full py-3 rounded-full bg-[#059669] text-white font-black text-xs hover:bg-[#047857]"
                  >
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PET CART DRAWER ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-white border-r border-[#BBF7D0] p-6 flex flex-col justify-between text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#BBF7D0] mb-4">
                  <h3 className="text-lg font-black text-[#065F46]">سلة مستلزمات الأليف ({cartHook.totalCartCount})</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-slate-400">سلة الأليف فارغة.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#065F46] truncate">{item.nameAr}</h4>
                          <span className="text-xs font-black text-[#059669]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
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
                <div className="border-t border-[#BBF7D0] pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#065F46]">
                    <span>المجموع الصافي:</span>
                    <span className="font-black text-[#059669]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#059669] text-white font-black text-xs hover:bg-[#047857]"
                  >
                    تأكيد طلب التوصيل
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
            <div className="modal-content rounded-3xl bg-white border border-[#059669] p-6 max-w-lg w-full text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#059669]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-black text-[#065F46] mb-2">تم تسجيل طلب مستلزمات الأليف</h3>
              <p className="text-xs text-amber-800 bg-amber-500/15 p-2.5 rounded-2xl mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل أي مبالغ.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-slate-600 border-y py-3">
                <div className="flex justify-between"><span>رقم الطلب:</span><span className="text-[#059669]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>المجموع:</span><span className="font-bold text-[#059669]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#059669] text-white font-bold text-xs rounded-full"
              >
                العودة لمتجر الحيوانات
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PawzStore;

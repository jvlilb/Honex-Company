import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  Dumbbell, Flame, CheckCircle2
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const ZenFitStore = () => {
  const store = getStoreById('zenfit');
  const cartHook = useStoreCart('zenfit');

  const [activeGoal, setActiveGoal] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  // Home Gym Setup Configurator
  const [setupItems] = useState([
    store.products[0], // Adjustable Dumbbells 32kg
    store.products[1], // Compression Wear
    store.products[2]  // Massage Gun
  ]);

  useEffect(() => {
    document.title = 'ZenFit | زن فيت لعتاد اللياقة والأثقال الرياضية — شركة هونكس';
  }, []);

  const goals = [
    { id: 'all', label: 'كل العتاد التدريبي' },
    { id: 'weights', label: 'بناء القوة والأثقال' },
    { id: 'wear', label: 'ملابس الضغط والأداء Pro' },
    { id: 'recovery', label: 'استشفاء وتدليك العضلات' },
    { id: 'cardio', label: 'تمارين الكارديو واللياقة' }
  ];

  const setupTotal = setupItems.reduce((acc, item) => acc + item.price, 0);

  const filteredProducts = store.products.filter(p => {
    const matchGoal = activeGoal === 'all' || p.category === activeGoal;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGoal && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#090D16] text-[#F8FAFC] font-sans selection:bg-[#84CC16]/30 selection:text-[#84CC16]">
      <DemoAgencyHeader storeNameAr="زن فيت للمعدات الرياضية واللياقة البدنية" accentColor="#84CC16" />

      {/* ── HIGH PERFORMANCE ATHLETIC HEADER ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#090D16]/95 backdrop-blur-md border-b border-[#84CC16]/25">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#84CC16] text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(132,204,22,0.4)]">
              <Dumbbell size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-2xl text-white tracking-wider">ZenFit</span>
                <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-[#84CC16]/20 text-[#BEF264] border border-[#84CC16]/40">PRO-ATHLETE</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">عتاد القوة، التدريب المنزلي، والاستشفاء العضلي</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative font-mono">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن دامبلز، مسدس تدليك، شيكر، ملابس ضغط..."
              className="w-full bg-[#111827] border border-[#84CC16]/30 rounded-lg px-4 py-2 pr-9 text-xs focus:outline-none focus:border-[#84CC16] text-white"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#84CC16]" />
          </div>

          <div className="flex items-center gap-3 font-mono">
            <button onClick={() => cartHook.setIsFavsOpen(true)} className="p-2 text-[#94A3B8] hover:text-[#84CC16]">
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#84CC16] text-[#84CC16]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#84CC16] text-black font-black text-xs shadow-[0_0_15px_rgba(132,204,22,0.3)] hover:brightness-110"
            >
              <ShoppingBag size={16} />
              <span>عتاد التمرين ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Training Goal Toolbar */}
        <div className="border-t border-[#84CC16]/15 bg-[#0D121F] px-4 sm:px-6 py-2 overflow-x-auto font-mono text-xs">
          <div className="container mx-auto flex items-center gap-2">
            <span className="text-[#94A3B8] font-bold ml-2">الهدف التدريبي:</span>
            {goals.map(g => (
              <button
                key={g.id}
                onClick={() => setActiveGoal(g.id)}
                className={`px-3 py-1.5 rounded font-bold whitespace-nowrap transition-colors ${
                  activeGoal === g.id
                    ? 'bg-[#84CC16] text-black shadow'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── HOME GYM CONFIGURATOR INTERACTION ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#111827] to-[#090D16] border-b border-[#84CC16]/20 py-10 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-right">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BEF264] mb-1">
            <Flame size={16} />
            <span>HOME-GYM BUILDER // تركيب الصالة الرياضية المنزلية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            جهّز مساحتك التدريبية بأقوى عتاد حديدي واستشفائي
          </h2>
          <p className="text-xs text-[#94A3B8] font-mono mb-6">
            اخترنا لك باقة التمارين الرياضية الاحترافية المتكاملة مع توفير فوري.
          </p>

          <div className="p-5 rounded-2xl bg-[#0D121F] border border-[#84CC16]/30">
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {setupItems.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                  <img src={item.image} alt={item.nameAr} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.nameAr}</h4>
                    <span className="text-xs font-mono font-bold text-[#84CC16]">{item.price.toLocaleString('ar-DZ')} دج</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-[#94A3B8]">إجمالي عتاد الصالة: </span>
                <span className="text-base font-black text-[#84CC16]">{setupTotal.toLocaleString('ar-DZ')} دج</span>
                <span className="text-[11px] text-[#94A3B8] mr-2">(وزن العتاد: 68 كغ)</span>
              </div>

              <button
                onClick={() => {
                  cartHook.addMultipleToCart(setupItems, 'باقة الصالة الرياضية المنزلية Pro');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#84CC16] text-black font-black text-xs hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.3)]"
              >
                <CheckCircle2 size={16} />
                <span>إضافة باقة الصالة الرياضية كاملة (3 أجهزة)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATHLETIC PRODUCT CATALOG ─────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-[#111827] p-5 flex flex-col justify-between hover:border-[#84CC16]/60 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-black/80 text-[#84CC16] border border-[#84CC16]/30">
                      {p.badge || 'PRO-SPEC'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <h3
                    onClick={() => setDetailProduct(p)}
                    className="text-base font-black text-white mb-2 cursor-pointer hover:text-[#84CC16]"
                  >
                    {p.nameAr}
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>

                  {p.detailsAr && (
                    <div className="space-y-1 mb-4 text-xs font-mono text-[#94A3B8]">
                      {p.detailsAr.slice(0, 2).map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                          <span className="truncate">{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono">
                <div className="text-lg font-black text-[#84CC16]">
                  {p.price.toLocaleString('ar-DZ')} دج
                </div>

                <button
                  onClick={() => cartHook.addToCart(p)}
                  className="px-4 py-2 rounded bg-[#84CC16] text-black font-black text-xs hover:brightness-110"
                >
                  حجز العتاد
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
              className="modal-content rounded-2xl bg-[#111827] border border-[#84CC16]/40 p-6 max-w-xl w-full text-right font-mono"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-xl aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-black text-[#84CC16] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 mb-4 text-xs space-y-1 text-[#94A3B8]">
                        <span className="font-bold text-[#84CC16] block">المعايير الرياضية:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
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
                    className="w-full py-3 rounded bg-[#84CC16] text-black font-black text-xs hover:brightness-110"
                  >
                    تأكيد وإضافة للحقيبة التدريبية
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ATHLETIC CART DRAWER ────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#0D121F] border-r border-[#84CC16]/30 p-6 flex flex-col justify-between font-mono text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-base font-bold text-[#84CC16] flex items-center gap-2">
                    <Dumbbell size={18} />
                    قائمة العتاد الرياضي ({cartHook.totalCartCount})
                  </h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-[#64748B]">سلة التمرين فارغة.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-xl bg-black/40 border border-white/10 flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{item.nameAr}</h4>
                          <span className="text-xs font-bold text-[#84CC16]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
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
                    <span className="font-bold text-[#84CC16]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 rounded bg-[#84CC16] text-black font-black text-xs uppercase hover:brightness-110"
                  >
                    تأكيد شحن العتاد الرياضي
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
            <div className="modal-content rounded-2xl bg-[#111827] border border-[#84CC16] p-6 max-w-lg w-full text-center font-mono">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#84CC16]/20 rounded-full flex items-center justify-center text-[#84CC16]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تم تسجيل طلب العتاد الرياضي</h3>
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-[#94A3B8] border-y border-white/10 py-3">
                <div className="flex justify-between"><span>الطلب:</span><span className="text-[#84CC16]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>المجموع:</span><span className="font-bold text-[#84CC16]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#84CC16] text-black font-bold text-xs rounded"
              >
                العودة لصالة العتاد
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZenFitStore;

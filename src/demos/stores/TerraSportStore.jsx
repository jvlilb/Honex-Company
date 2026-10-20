import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  Compass, Tent, Mountain, CheckCircle2
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const TerraSportStore = () => {
  const store = getStoreById('terrasport');
  const cartHook = useStoreCart('terrasport');

  const [activeActivity, setActiveActivity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedActivityPreset, setSelectedActivityPreset] = useState('winter');

  useEffect(() => {
    document.title = 'TerraSport | تيرا سبورت لعتاد المغامرات والتخييم الجبلي — شركة هونكس';
  }, []);

  const activities = [
    { id: 'all', label: 'كل العتاد الميداني' },
    { id: 'camping', label: 'التخييم والمبيت البري' },
    { id: 'footwear', label: 'أحذية تسلق Gore-Tex' },
    { id: 'backpacks', label: 'حقائب الظهر والاستكشاف' },
    { id: 'apparel', label: 'سترات العزل والطقس القاسي' },
    { id: 'gear', label: 'أدوات النجاة والإضاءة' }
  ];

  const presets = {
    winter: {
      title: 'مغامرة تسلق قمم شتوية',
      desc: 'عتاد مقاوم للعواصف الثلجية ودرجات حرارة تحت الصفر',
      items: [store.products[1], store.products[3], store.products[4]] // Gore-Tex boots, hardshell jacket, -15C sleeping bag
    },
    desert: {
      title: 'مخيم استكشاف جبلي عائلي',
      desc: 'خيمة 4 أشخاص مريحة، إضاءة قوية، وحقيبة ظهر مسافات',
      items: [store.products[0], store.products[2], store.products[5]] // 4P tent, 65L backpack, 1200 lumen headlamp
    }
  };

  const filteredProducts = store.products.filter(p => {
    const matchActivity = activeActivity === 'all' || p.category === activeActivity;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchActivity && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B130E] text-[#F1F5F9] font-sans selection:bg-[#22C55E]/20 selection:text-[#22C55E]">
      <DemoAgencyHeader storeNameAr="تيرا سبورت للمغامرات والرياضة الخارجية" accentColor="#22C55E" />

      {/* ── EXPEDITION & UTILITY HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0B130E]/95 backdrop-blur-md border-b border-[#22C55E]/30">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#15803D] border border-[#22C55E] flex items-center justify-center text-white font-bold shadow-md">
              <Compass size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-black text-xl text-white tracking-wider">TerraSport</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#22C55E]/20 text-[#4ADE80] border border-[#22C55E]/40">EXPEDITION</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">عتاد التخييم، التسلق، ومقاومة الطقس القاسي</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative font-mono">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خيام، أحذية Gore-Tex، سترات..."
              className="w-full bg-[#131E17] border border-[#22C55E]/30 rounded-lg px-4 py-2 pr-9 text-xs focus:outline-none focus:border-[#22C55E] text-white"
            />
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22C55E]" />
          </div>

          <div className="flex items-center gap-3 font-mono">
            <button onClick={() => cartHook.setIsFavsOpen(true)} className="p-2 text-[#94A3B8] hover:text-[#4ADE80]">
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#22C55E] text-[#22C55E]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15803D] border border-[#22C55E] text-white font-bold text-xs shadow-md hover:bg-[#166534]"
            >
              <ShoppingBag size={16} />
              <span>بيان العتاد ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Activity Selection Ribbon */}
        <div className="border-t border-[#22C55E]/15 bg-[#0F1A12] px-4 sm:px-6 py-2 overflow-x-auto font-mono text-xs">
          <div className="container mx-auto flex items-center gap-2">
            <span className="text-[#94A3B8] font-bold ml-2">نوع النشاط:</span>
            {activities.map(a => (
              <button
                key={a.id}
                onClick={() => setActiveActivity(a.id)}
                className={`px-3 py-1.5 rounded-md font-bold whitespace-nowrap transition-colors ${
                  activeActivity === a.id
                    ? 'bg-[#22C55E]/20 text-[#4ADE80] border border-[#22C55E]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── EXPEDITION GEAR CHECKLIST BUILDER ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#131E17] to-[#0B130E] border-b border-[#22C55E]/20 py-10 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-right">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4ADE80] mb-2">
            <Tent size={16} />
            <span>TERRA-CHECKLIST // منشئ باقة العتاد الاستكشافي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            اختر طبيعة مغامرتك القادمة لترشيح قائمة العتاد الضرورية
          </h2>

          {/* Activity Preset Selector */}
          <div className="flex gap-3 mb-6 font-mono text-xs">
            <button
              onClick={() => setSelectedActivityPreset('winter')}
              className={`px-4 py-2.5 rounded-lg border font-bold flex items-center gap-2 ${
                selectedActivityPreset === 'winter'
                  ? 'bg-[#15803D] text-white border-[#22C55E]'
                  : 'bg-[#0B130E] text-[#94A3B8] border-white/10'
              }`}
            >
              <Mountain size={14} />
              <span>تسلق ومسارات شتوية (-15°C)</span>
            </button>
            <button
              onClick={() => setSelectedActivityPreset('desert')}
              className={`px-4 py-2.5 rounded-lg border font-bold flex items-center gap-2 ${
                selectedActivityPreset === 'desert'
                  ? 'bg-[#15803D] text-white border-[#22C55E]'
                  : 'bg-[#0B130E] text-[#94A3B8] border-white/10'
              }`}
            >
              <Tent size={14} />
              <span>مخيم بري متكامل 4 أشخاص</span>
            </button>
          </div>

          {/* Checklist Items Box */}
          <div className="p-5 rounded-2xl bg-[#0F1A12] border border-[#22C55E]/30 mb-4">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-[#4ADE80]">{presets[selectedActivityPreset].title}</span>
              <span className="text-[#94A3B8]">{presets[selectedActivityPreset].desc}</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {presets[selectedActivityPreset].items.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <img src={p.image} alt={p.nameAr} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{p.nameAr}</h4>
                    <span className="text-xs font-mono text-[#4ADE80]">{p.price.toLocaleString('ar-DZ')} دج</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                cartHook.addMultipleToCart(presets[selectedActivityPreset].items, presets[selectedActivityPreset].title);
              }}
              className="w-full py-2.5 rounded-lg bg-[#22C55E] text-[#0B130E] font-black text-xs uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 font-mono"
            >
              <CheckCircle2 size={16} />
              <span>اعتماد وإضافة قائمة العتاد بالكامل (3 قطع)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── EXPEDITION PRODUCT CARDS ─────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-[#131E17] p-5 flex flex-col justify-between hover:border-[#22C55E]/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black/40">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-[#4ADE80] border border-[#22C55E]/30">
                      {p.badge || 'MIL-SPEC'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <h3
                    onClick={() => setDetailProduct(p)}
                    className="text-base font-bold text-white mb-2 cursor-pointer hover:text-[#4ADE80]"
                  >
                    {p.nameAr}
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>

                  {/* Technical Weather Ratings */}
                  <div className="space-y-1 mb-4 text-xs font-mono text-[#94A3B8]">
                    {p.detailsAr && p.detailsAr.slice(0, 2).map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono">
                <div>
                  <div className="text-lg font-black text-[#4ADE80]">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>
                  {p.originalPrice && (
                    <div className="text-xs line-through text-[#64748B]">
                      {p.originalPrice.toLocaleString('ar-DZ')} دج
                    </div>
                  )}
                </div>

                <button
                  onClick={() => cartHook.addToCart(p)}
                  className="px-4 py-2 rounded-lg bg-[#15803D] border border-[#22C55E] text-white font-bold text-xs hover:bg-[#166534]"
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
              className="modal-content rounded-2xl bg-[#131E17] border border-[#22C55E]/40 p-6 max-w-xl w-full text-right font-mono"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-xl aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-black text-[#4ADE80] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 mb-4 text-xs space-y-1 text-[#94A3B8]">
                        <span className="font-bold text-[#4ADE80] block">المواصفات الميدانية:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
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
                    className="w-full py-3 rounded-lg bg-[#22C55E] text-[#0B130E] font-black text-xs hover:brightness-110"
                  >
                    إضافة إلى قائمة الاستكشاف
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── EXPEDITION CART MANIFEST DRAWER ─────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#0F1A12] border-r border-[#22C55E]/30 p-6 flex flex-col justify-between font-mono text-right"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-base font-bold text-[#4ADE80] flex items-center gap-2">
                    <Compass size={18} />
                    بيان عتاد الرحلة ({cartHook.totalCartCount} قطع)
                  </h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-[#64748B]">بيان العتاد فارغ.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-xl bg-black/40 border border-white/10 flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{item.nameAr}</h4>
                          <span className="text-xs font-bold text-[#4ADE80]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
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
                    <span>إجمالي العتاد الميداني:</span>
                    <span className="font-bold text-[#4ADE80]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 rounded-lg bg-[#22C55E] text-[#0B130E] font-black text-xs uppercase"
                  >
                    تأكيد شحن العتاد الميداني
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
            <div className="modal-content rounded-2xl bg-[#0F1A12] border border-[#22C55E] p-6 max-w-lg w-full text-center font-mono">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#22C55E]/20 rounded-full flex items-center justify-center text-[#22C55E]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تم تجهيز بيان العتاد الميداني</h3>
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-[#94A3B8] border-y border-white/10 py-3">
                <div className="flex justify-between"><span>الطلب:</span><span className="text-[#4ADE80]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>الإجمالي:</span><span className="font-bold text-[#4ADE80]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#22C55E] text-[#0B130E] font-bold text-xs rounded"
              >
                العودة للعتاد الميداني
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerraSportStore;

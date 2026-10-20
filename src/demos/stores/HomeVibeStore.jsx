import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Check,
  Home, Armchair, Lamp, UtensilsCrossed, Sparkles
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const HomeVibeStore = () => {
  const store = getStoreById('homevibe');
  const cartHook = useStoreCart('homevibe');

  const [activeRoom, setActiveRoom] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    document.title = 'HomeVibe | هوم فايب للأثاث المنزلي والديكور الراقي — شركة هونكس';
  }, []);

  const rooms = [
    { id: 'all', label: 'كل المساحات', icon: Home },
    { id: 'furniture', label: 'الصالون وغرف المعيشة', icon: Armchair },
    { id: 'lighting', label: 'الإضاءات والثريات', icon: Lamp },
    { id: 'dining', label: 'طاولات وأواني التقديم', icon: UtensilsCrossed },
    { id: 'rugs', label: 'السجاد والمنسوجات', icon: Sparkles }
  ];

  const hotspots = [
    {
      id: 'h1',
      x: '25%',
      y: '55%',
      product: store.products[0], // Nordic armchair
      label: 'كرسي استرخاء بوكليه'
    },
    {
      id: 'h2',
      x: '68%',
      y: '30%',
      product: store.products[1], // Arc Lamp
      label: 'مصباح قوسي نحاسي'
    },
    {
      id: 'h3',
      x: '50%',
      y: '75%',
      product: store.products[3], // Wool Rug
      label: 'سجادة صوف بوهيمية'
    }
  ];

  const filteredProducts = store.products.filter(p => {
    const matchRoom = activeRoom === 'all' || p.category === activeRoom;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRoom && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF7F2] text-[#292524] font-serif selection:bg-[#C2410C]/20 selection:text-[#C2410C]">
      <DemoAgencyHeader storeNameAr="هوم فايب للديكور والأثاث الراقي" accentColor="#C2410C" />

      {/* ── ARCHITECTURAL HOME & INTERIOR HEADER ────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-sans">
            <div className="w-10 h-10 rounded-xl bg-[#C2410C] text-white flex items-center justify-center font-bold text-lg shadow-md">
              HV
            </div>
            <div>
              <span className="font-serif font-black text-2xl text-[#C2410C] tracking-wide block">HomeVibe</span>
              <p className="text-[11px] text-[#78716C]">أثاث خشبي وديكورات معاصرة دافئة</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative font-sans">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أثاث الصالون، إضاءات، سجاد، طاولات..."
              className="w-full bg-white border border-[#D6D3D1] rounded-xl px-4 py-2 pr-9 text-xs focus:outline-none focus:border-[#C2410C]"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C2410C]" />
          </div>

          <div className="flex items-center gap-3 font-sans">
            <button onClick={() => cartHook.setIsFavsOpen(true)} className="p-2 text-[#78716C] hover:text-[#C2410C]">
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#C2410C] text-[#C2410C]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C2410C] text-white font-bold text-xs shadow-md hover:bg-[#9A3412]"
            >
              <ShoppingBag size={16} />
              <span>مقتنيات المنزل ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Shop By Room Navigation */}
        <nav className="border-t border-[#E7E5E4] px-4 sm:px-6 py-2 overflow-x-auto bg-[#F5F2EB] font-sans">
          <div className="container mx-auto flex items-center gap-2 text-xs">
            <span className="text-[#78716C] font-bold ml-2">استعراض حسب الغرفة:</span>
            {rooms.map(r => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRoom(r.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeRoom === r.id
                      ? 'bg-[#C2410C] text-white shadow-sm'
                      : 'text-[#78716C] hover:bg-white'
                  }`}
                >
                  <Icon size={14} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ── INTERACTIVE ROOM INSPIRATION SCENE (HOTSPOTS) ────────────────────── */}
      <section className="py-10 px-4 sm:px-6 border-b border-[#E7E5E4] bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-right mb-6">
            <span className="text-xs uppercase tracking-widest text-[#C2410C] font-sans font-bold block mb-1">
              غرفة الإلهام التفاعلية — صالون إسكندنافي هادئ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292524]">
              انقر على نقاط المشهد التفاعلية لاكتشاف تفاصيل القطع
            </h2>
            <p className="text-xs text-[#78716C] font-sans mt-1">
              النقاط النابضة على الصورة مرتبطة بالمنتجات الفعلية في الكتالوج.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-[#E7E5E4] bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop"
              alt="Coordinated Living Room"
              className="w-full h-full object-cover brightness-95"
            />

            {/* Interactive Pins */}
            {hotspots.map(h => (
              <div
                key={h.id}
                style={{ top: h.y, left: h.x }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setSelectedHotspot(selectedHotspot?.id === h.id ? null : h)}
                  className="w-8 h-8 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-xs shadow-lg hover:scale-125 transition-transform animate-pulse"
                  title={h.label}
                >
                  +
                </button>

                {/* Hotspot preview tooltip */}
                {selectedHotspot?.id === h.id && (
                  <div className="absolute bottom-10 right-0 w-56 p-3 rounded-2xl bg-white/95 backdrop-blur border border-[#C2410C]/30 shadow-2xl z-30 text-right font-sans">
                    <img src={h.product.image} alt={h.product.nameAr} className="w-full h-24 object-cover rounded-xl mb-2" />
                    <h4 className="text-xs font-bold text-[#292524] line-clamp-1">{h.product.nameAr}</h4>
                    <span className="text-xs font-black text-[#C2410C] block mb-2">{h.product.price.toLocaleString('ar-DZ')} دج</span>
                    <button
                      onClick={() => {
                        cartHook.addToCart(h.product);
                        setSelectedHotspot(null);
                      }}
                      className="w-full py-1.5 rounded-lg bg-[#C2410C] text-white text-[11px] font-bold"
                    >
                      إضافة للحقيبة
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Complete the room button */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={() => {
                  cartHook.addMultipleToCart(hotspots.map(h => h.product), 'طقم الصالون الإسكندنافي الكامل');
                }}
                className="px-5 py-2.5 rounded-xl bg-white/95 backdrop-blur text-[#C2410C] font-bold text-xs shadow-lg border border-[#C2410C]/40 hover:bg-[#C2410C] hover:text-white transition-all flex items-center gap-2 font-sans"
              >
                <span>تأثيث وتنسيق الغرفة بالكامل (3 قطع)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURAL PRODUCT LISTING ────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="rounded-3xl border border-[#E7E5E4] bg-white p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#FAF7F2]">
                  <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                  <button
                    onClick={() => cartHook.toggleFavorite(p)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur text-[#C2410C] shadow"
                  >
                    <Heart size={16} className={cartHook.isFavorite(p.id) ? 'fill-[#C2410C]' : ''} />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#C2410C] font-sans font-bold block mb-1">
                    {p.category}
                  </span>
                  <h3
                    onClick={() => setDetailProduct(p)}
                    className="text-lg font-bold text-[#292524] mb-2 cursor-pointer hover:text-[#C2410C]"
                  >
                    {p.nameAr}
                  </h3>
                  <p className="text-xs font-sans text-[#78716C] line-clamp-2 leading-relaxed mb-4">
                    {p.shortDescAr}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5F2EB] flex items-center justify-between font-sans">
                <div>
                  <div className="text-lg font-black text-[#C2410C]">
                    {p.price.toLocaleString('ar-DZ')} دج
                  </div>
                  {p.originalPrice && (
                    <div className="text-xs line-through text-[#A8A29E]">
                      {p.originalPrice.toLocaleString('ar-DZ')} دج
                    </div>
                  )}
                </div>

                <button
                  onClick={() => cartHook.addToCart(p)}
                  className="px-4 py-2 rounded-xl bg-[#C2410C] text-white font-bold text-xs hover:bg-[#9A3412] shadow"
                >
                  إضافة للقائمة
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
              className="modal-content rounded-3xl bg-white border border-[#E7E5E4] p-6 max-w-2xl w-full text-right font-sans"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-2xl aspect-square object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#292524] mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-bold text-[#C2410C] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#78716C] leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E7E5E4] mb-4 text-xs space-y-1">
                        <span className="font-bold text-[#C2410C] block">الأبعاد ونوع الخشب:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
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
                    className="w-full py-3 rounded-xl bg-[#C2410C] text-white font-bold text-xs hover:bg-[#9A3412]"
                  >
                    إضافة إلى مشتريات المنزل
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ROOM-GROUPED CART DRAWER ────────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#FAF7F2] border-r border-[#E7E5E4] p-6 flex flex-col justify-between text-right font-sans"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] mb-4">
                  <h3 className="text-lg font-serif font-bold text-[#C2410C]">مقتنيات تأثيث المنزل ({cartHook.totalCartCount})</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-slate-400">لم تضف أي قطع أثاث بعد.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#292524] truncate">{item.nameAr}</h4>
                          <span className="text-xs font-black text-[#C2410C]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="w-5 h-5 bg-[#FAF7F2] rounded-lg border">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="w-5 h-5 bg-[#FAF7F2] rounded-lg border">+</button>
                        </div>
                        <button onClick={() => cartHook.removeFromCart(item.cartItemId)} className="text-xs text-red-400">×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartHook.cart.length > 0 && (
                <div className="border-t border-[#E7E5E4] pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#78716C]">
                    <span>إجمالي الأثاث والديكور:</span>
                    <span className="font-bold text-[#C2410C]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#C2410C] text-white font-bold text-xs hover:bg-[#9A3412]"
                  >
                    تأكيد طلب التوصيل والتركيب
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
            <div className="modal-content rounded-3xl bg-white border border-[#C2410C] p-6 max-w-lg w-full text-center font-sans">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#C2410C]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#C2410C] mb-2">تم تسجيل طلب الأثاث المنزلي</h3>
              <p className="text-xs text-amber-800 bg-amber-500/15 p-2.5 rounded-2xl mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-slate-600 border-y py-3">
                <div className="flex justify-between"><span>رقم الطلب:</span><span className="text-[#C2410C]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>المجموع:</span><span className="font-bold text-[#C2410C]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#C2410C] text-white font-bold text-xs rounded-xl"
              >
                العودة لكتالوج الأثاث
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeVibeStore;

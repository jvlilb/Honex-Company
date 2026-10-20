import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Search, X, Check,
  BookOpen, Feather, Library
} from 'lucide-react';
import { getStoreById } from '../data/demoStoresData';
import { useStoreCart } from '../shared/useStoreCart';
import DemoAgencyHeader from '../shared/DemoAgencyHeader';
import DemoCheckoutModal from '../shared/DemoCheckoutModal';

export const ReadoraStore = () => {
  const store = getStoreById('readora');
  const cartHook = useStoreCart('readora');

  const [activeGenre, setActiveGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [excerptProduct, setExcerptProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    document.title = 'Readora | ريدورا للكتب والروايات والقرطاسية الأدبية — شركة هونكس';
  }, []);

  const genres = [
    { id: 'all', label: 'كل الرفوف والمجموعات' },
    { id: 'selfhelp', label: 'تطوير الذات وبناء العادات' },
    { id: 'fiction', label: 'الروايات والأدب العالمي' },
    { id: 'business', label: 'المال والاستثمار والفكر' },
    { id: 'notebooks', label: 'دفاتر جلدية فاخرة' },
    { id: 'pens', label: 'أقلام حبر وأدوات قراءة' }
  ];

  const sampleExcerpts = {
    'read-1': '«التغييرات الصغيرة التي تبدو غير ذات أهمية في البداية، ستتراكم لتتحول إلى نتائج مذهلة واستثنائية إذا واظبت عليها لسنوات. أنت لا ترتقي إلى مستوى أهدافك، بل تهبط إلى مستوى أنظمتك وعاداتك اليومية.» — من كتاب العادات الذرية',
    'read-2': '«مرت سنوات كثيرة قبل أن يتذكر الكولونيل أوريليانو بوينديا، وهو يواجه فصيلة الإعدام، تلك العشية البعيدة التي أخذه فيها أبوه ليتعرف على الثلج. كانت ماكوندو آنذاك قرية مؤلفة من عشرين داراً من الطين والقصب...» — من رواية مئة عام من العزلة',
    'read-3': '«إن النجاح المالي ليس علماً دقيقاً كالفيزياء، بل هو مهارة سلوكية رخوة تهم فيها تصرفاتك وطريقة تحكمك في رغباتك أكثر بكثير مما تعرفه من حسابات ومعادلات دقيقة.» — من كتاب سيكولوجية المال'
  };

  const filteredProducts = store.products.filter(p => {
    const matchGenre = activeGenre === 'all' || p.category === activeGenre;
    const matchSearch = !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF7F0] text-[#292524] font-serif selection:bg-[#78350F]/20 selection:text-[#78350F]">
      <DemoAgencyHeader storeNameAr="ريدورا للكتب والقرطاسية الأدبية" accentColor="#78350F" />

      {/* ── LITERARY BOOKSTORE MASTHEAD ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E7E5E4] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#78350F] text-[#FAF7F0] flex items-center justify-center font-bold text-lg shadow-sm">
              <Library size={22} />
            </div>
            <div>
              <span className="font-serif font-black text-2xl text-[#78350F] tracking-wide block">Readora</span>
              <p className="text-[11px] text-[#78716C] font-sans">دار الكتب، الروايات، وأدوات الكتابة العتيقة</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative font-sans">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالعنوان، الكاتب، الرواية..."
              className="w-full bg-white border border-[#D6D3D1] rounded-xl px-4 py-2 pr-9 text-xs focus:outline-none focus:border-[#78350F]"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78350F]" />
          </div>

          <div className="flex items-center gap-3 font-sans">
            <button onClick={() => cartHook.setIsFavsOpen(true)} className="p-2 text-[#78716C] hover:text-[#78350F]">
              <Heart size={20} className={cartHook.favorites.length > 0 ? 'fill-[#78350F] text-[#78350F]' : ''} />
            </button>

            <button
              onClick={() => cartHook.setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#78350F] text-white font-bold text-xs shadow-md hover:bg-[#59270D]"
            >
              <BookOpen size={16} />
              <span>قائمتي ({cartHook.totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Shelf Genre Navigation */}
        <nav className="border-t border-[#E7E5E4] px-4 sm:px-6 py-2 overflow-x-auto bg-[#F4EFE6] font-sans">
          <div className="container mx-auto flex items-center gap-2 text-xs">
            <span className="text-[#78716C] font-bold ml-2">رف الكتب:</span>
            {genres.map(g => (
              <button
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                  activeGenre === g.id
                    ? 'bg-[#78350F] text-white shadow-sm'
                    : 'text-[#78716C] hover:bg-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ── BOOKSHOP HERO QUOTE ──────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 border-b border-[#E7E5E4] bg-[#F7F3EA]">
        <div className="container mx-auto max-w-4xl text-center">
          <Feather size={28} className="mx-auto text-[#78350F] mb-3 opacity-70" />
          <h2 className="text-2xl sm:text-4xl font-normal leading-relaxed text-[#292524] mb-3">
            «الكتاب الجيد هو صديق لا يتغير أبداً، يفتح لك آفاقاً أوسع وفكراً أعمق»
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] font-sans max-w-xl mx-auto leading-relaxed">
            طبعات أصلية ومجلدة بعناية، مع ورق كريمي مريح للعين، ودفاتر ملاحظات مصنوعة يدوياً بجلد طبيعي وأوراق قطنية سميكة لا تسرب الحبر.
          </p>
        </div>
      </section>

      {/* ── BOOKSHELF METAPHOR PRODUCT GRID ──────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(p => {
            const hasExcerpt = !!sampleExcerpts[p.id];

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-[#E7E5E4] bg-white p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#78350F]/40 transition-all duration-300 relative group"
              >
                <div>
                  <div className="relative aspect-[3/4] max-w-[220px] mx-auto rounded-lg overflow-hidden shadow-lg mb-6 border border-[#E7E5E4] bg-[#F7F3EA]">
                    <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-[#78350F] text-white">
                        {p.badge || 'طبعة فاخرة'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-sans font-bold text-[#78350F] block mb-1">
                      {p.category}
                    </span>
                    <h3
                      onClick={() => setDetailProduct(p)}
                      className="text-base font-bold text-[#292524] mb-2 cursor-pointer hover:text-[#78350F] leading-snug"
                    >
                      {p.nameAr}
                    </h3>
                    <p className="text-xs font-sans text-[#78716C] line-clamp-2 leading-relaxed mb-4">
                      {p.shortDescAr}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F4EFE6] space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-black text-[#78350F]">
                      {p.price.toLocaleString('ar-DZ')} دج
                    </div>
                    {p.originalPrice && (
                      <div className="text-xs line-through text-[#A8A29E]">
                        {p.originalPrice.toLocaleString('ar-DZ')} دج
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {hasExcerpt && (
                      <button
                        onClick={() => setExcerptProduct(p)}
                        className="flex-1 py-2 px-3 rounded-xl border border-[#78350F] text-[#78350F] text-xs font-bold hover:bg-[#78350F]/10 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <BookOpen size={14} />
                        <span>قراءة عينة</span>
                      </button>
                    )}

                    <button
                      onClick={() => cartHook.addToCart(p)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#78350F] text-white text-xs font-bold hover:bg-[#59270D] transition-colors"
                    >
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── CHAPTER EXCERPT PREVIEW MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {excerptProduct && (
          <div className="modal-overlay" onClick={() => setExcerptProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-3xl bg-[#FFFDF9] border border-[#78350F]/40 p-8 max-w-xl w-full text-right shadow-2xl relative"
            >
              <button onClick={() => setExcerptProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-black">
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-[#78350F] text-xs font-sans font-bold mb-3">
                <Feather size={16} />
                <span>عينة توضيحية من فصول الكتاب:</span>
              </div>

              <h3 className="text-xl font-bold text-[#292524] mb-4">
                {excerptProduct.nameAr}
              </h3>

              <div className="p-6 rounded-2xl bg-[#F7F3EA] border border-[#E7E5E4] text-sm leading-loose text-[#44403C] mb-6 italic">
                {sampleExcerpts[excerptProduct.id]}
              </div>

              <div className="flex justify-between items-center pt-2 font-sans">
                <span className="text-sm font-bold text-[#78350F]">السعر: {excerptProduct.price.toLocaleString('ar-DZ')} دج</span>
                <button
                  onClick={() => {
                    cartHook.addToCart(excerptProduct);
                    setExcerptProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#78350F] text-white text-xs font-bold hover:bg-[#59270D]"
                >
                  إضافة هذا الكتاب إلى حقيبتي
                </button>
              </div>
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
              className="modal-content rounded-3xl bg-white border border-[#E7E5E4] p-6 max-w-xl w-full text-right font-sans"
            >
              <button onClick={() => setDetailProduct(null)} className="absolute top-4 left-4 p-2 text-slate-400">
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <img src={detailProduct.image} alt={detailProduct.nameAr} className="rounded-2xl aspect-[3/4] object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#292524] mb-2">{detailProduct.nameAr}</h3>
                    <div className="text-xl font-bold text-[#78350F] mb-3">{detailProduct.price.toLocaleString('ar-DZ')} دج</div>
                    <p className="text-xs text-[#78716C] leading-relaxed mb-4">{detailProduct.shortDescAr}</p>

                    {detailProduct.detailsAr && (
                      <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E7E5E4] mb-4 text-xs space-y-1">
                        <span className="font-bold text-[#78350F] block">بيانات النشر والطباعة:</span>
                        {detailProduct.detailsAr.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#78350F]" />
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
                    className="w-full py-3 rounded-xl bg-[#78350F] text-white font-bold text-xs hover:bg-[#59270D]"
                  >
                    إضافة للطلب
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BOOKSHOP INVOICE CART DRAWER ────────────────────────────────────── */}
      <AnimatePresence>
        {cartHook.isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => cartHook.setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#FAF7F0] border-r border-[#E7E5E4] p-6 flex flex-col justify-between text-right font-sans"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] mb-4">
                  <h3 className="text-lg font-serif font-bold text-[#78350F]">قائمة الكتب المختارة ({cartHook.totalCartCount})</h3>
                  <button onClick={() => cartHook.setIsCartOpen(false)} className="text-slate-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartHook.cart.length === 0 ? (
                    <p className="text-center py-16 text-xs text-slate-400">قائمة الكتب فارغة.</p>
                  ) : (
                    cartHook.cart.map(item => (
                      <div key={item.cartItemId} className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex gap-3 items-center">
                        <img src={item.image} alt={item.nameAr} className="w-12 h-16 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#292524] truncate">{item.nameAr}</h4>
                          <span className="text-xs font-black text-[#78350F]">{(item.price * item.quantity).toLocaleString('ar-DZ')} دج</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity - 1)} className="w-5 h-5 bg-[#FAF7F0] rounded border">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => cartHook.updateCartQuantity(item.cartItemId, item.quantity + 1)} className="w-5 h-5 bg-[#FAF7F0] rounded border">+</button>
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
                    <span>المجموع الصافي:</span>
                    <span className="font-bold text-[#78350F]">{cartHook.cartTotal.toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <button
                    onClick={() => {
                      cartHook.setIsCartOpen(false);
                      cartHook.setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#78350F] text-white font-bold text-xs hover:bg-[#59270D]"
                  >
                    تأكيد طلب الكتب
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
            <div className="modal-content rounded-3xl bg-white border border-[#78350F] p-6 max-w-lg w-full text-center font-sans">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FAF7F0] rounded-full flex items-center justify-center text-[#78350F]">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#78350F] mb-2">تم تسجيل طلب الكتب بنجاح</h3>
              <p className="text-xs text-amber-800 bg-amber-500/15 p-2.5 rounded-2xl mb-4">
                تنبيه: هذا طلب تجريبي لموقع شركة هونكس — لم يتم تحصيل مبالغ حقيقية.
              </p>
              <div className="text-xs text-right space-y-1.5 mb-6 text-slate-600 border-y py-3">
                <div className="flex justify-between"><span>رقم الطلب:</span><span className="text-[#78350F]">{cartHook.orderConfirmed.orderId}</span></div>
                <div className="flex justify-between"><span>العميل:</span><span>{cartHook.orderConfirmed.customer.fullName}</span></div>
                <div className="flex justify-between"><span>المجموع:</span><span className="font-bold text-[#78350F]">{cartHook.orderConfirmed.total.toLocaleString('ar-DZ')} دج</span></div>
              </div>
              <button
                onClick={() => cartHook.setOrderConfirmed(null)}
                className="w-full py-2.5 bg-[#78350F] text-white font-bold text-xs rounded-xl"
              >
                العودة للرفوف
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadoraStore;

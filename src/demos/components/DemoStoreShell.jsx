import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, X, Star, Check, ArrowRight,
  ShieldCheck, RotateCcw, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { ALGERIAN_WILAYAS } from '../data/demoStoresData';

export const DemoStoreShell = ({ store }) => {
  // Independent Storage Namespaces
  const cartKey = `honex_demo_cart_${store.id}`;
  const favsKey = `honex_demo_favs_${store.id}`;

  // State Management
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(cartKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(favsKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavsOpen, setIsFavsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    wilaya: ALGERIAN_WILAYAS[15], // Default: 16 - الجزائر العاصمة
    address: '',
    deliveryType: 'home', // 'home' | 'desk'
    paymentMethod: 'cod', // 'cod' | 'card_demo'
    notes: ''
  });
  const [checkoutErrors, setCheckoutErrors] = useState({});

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [cart, cartKey]);

  useEffect(() => {
    try {
      localStorage.setItem(favsKey, JSON.stringify(favorites));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [favorites, favsKey]);

  // Set page title for demo store
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${store.nameAr} | متجر تجريبي تفاعلي — شركة هونكس`;
    return () => {
      document.title = originalTitle;
    };
  }, [store]);

  // Toast feedback helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const addToCart = (product, variant = null, quantity = 1) => {
    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);
    const cartItemId = `${product.id}_${chosenVariant || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        cartItemId,
        id: product.id,
        nameAr: product.nameAr,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant: chosenVariant,
        quantity
      }];
    });

    showToast(`✓ تمت إضافة "${product.nameAr}" إلى السلة`);
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('تم حذف المنتج من السلة');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites toggle
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`تمت إزالة "${product.nameAr}" من المفضلة`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`✓ تمت إضافة "${product.nameAr}" إلى المفضلة`);
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => favorites.some(item => item.id === productId);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...store.products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.nameAr.toLowerCase().includes(q) ||
        (p.shortDescAr && p.shortDescAr.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => {
        const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
        const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
        return discB - discA;
      });
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [store.products, selectedCategory, searchQuery, sortBy]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round(cartSubtotal * (discountPercent / 100));
  const shippingFee = cartSubtotal > 20000 || cartSubtotal === 0 ? 0 : 800; // Free shipping over 20,000 DZD
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'HONEX10' || code === 'DEMO10' || code === `${store.id.toUpperCase()}10`) {
      setDiscountPercent(10);
      showToast('✓ تم تفعيل كود الخصم 10% بنجاح!');
    } else {
      showToast('كود الخصم غير صحيح (جرب HONEX10 للنموذج التجريبي)');
    }
  };

  // Open Product Modal
  const openProductDetail = (product) => {
    setDetailProduct(product);
    setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : '');
    setDetailQuantity(1);
  };

  // Handle Checkout Submission
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!checkoutData.fullName.trim()) errors.fullName = 'يرجى إدخال الاسم الكامل';
    if (!checkoutData.phone.trim() || !/^0[567][0-9]{8}$/.test(checkoutData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'يرجى إدخال رقم هاتف جزائري صالح (مثال: 0550123456)';
    }
    if (!checkoutData.address.trim()) errors.address = 'يرجى إدخال عنوان التوصيل بالتفصيل';

    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors);
      return;
    }

    setCheckoutErrors({});
    const demoOrderId = `HNX-${store.id.toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`;

    setOrderConfirmed({
      orderId: demoOrderId,
      date: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      total: cartTotal,
      subtotal: cartSubtotal,
      shipping: shippingFee,
      discount: discountAmount,
      customer: { ...checkoutData }
    });

    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen text-slate-100 transition-colors duration-300 font-sans"
      style={{
        backgroundColor: store.theme.bg,
        color: store.theme.text,
        fontFamily: store.theme.fontFamily === 'serif' ? 'Cairo, serif' : 'Cairo, sans-serif'
      }}
    >
      {/* ── TOP NOTIFICATION BAR: HONEX AGENCY CREDIT & DEMO NOTICE ─────────── */}
      <div className="bg-slate-950 text-slate-300 border-b border-white/10 px-4 py-2.5 text-xs sm:text-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 font-bold text-brand-cyan hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-brand-cyan/30"
              title="العودة إلى الصفحة الرئيسية لشركة هونكس"
            >
              <ArrowRight size={14} />
              <span>العودة إلى شركة هونكس</span>
            </a>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="font-semibold text-slate-200">
              نموذج متجر إلكتروني متكامل — <span style={{ color: store.theme.primary }}>{store.nameAr}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-amber-300 bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/20 text-[11px] sm:text-xs">
            <AlertTriangle size={13} className="flex-shrink-0" />
            <span>نموذج تجريبي تفاعلي — لا يتم تحصيل مبالغ حقيقية أو شحن فعلي</span>
          </div>
        </div>
      </div>

      {/* ── STORE MAIN HEADER ────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-200"
        style={{
          backgroundColor: `${store.theme.bg}ee`,
          borderColor: store.theme.border
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg border"
              style={{
                backgroundColor: store.theme.cardBg,
                borderColor: store.theme.primary,
                color: store.theme.primary
              }}
            >
              {store.name.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-wide" style={{ color: store.theme.text }}>
                  {store.name}
                </h1>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: store.theme.badgeBg,
                    color: store.theme.badgeText
                  }}
                >
                  DEMO
                </span>
              </div>
              <p className="text-xs hidden sm:block opacity-70" style={{ color: store.theme.textMuted }}>
                {store.categoryAr}
              </p>
            </div>
          </div>

          {/* Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`ابحث في منتجات ${store.name}...`}
              className="w-full bg-white/5 border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none transition-all placeholder:text-slate-400"
              style={{
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsFavsOpen(true)}
              className="relative p-2.5 rounded-xl border transition-all hover:scale-105"
              style={{
                backgroundColor: store.theme.cardBg,
                borderColor: store.theme.border
              }}
              title="قائمة المفضلة"
            >
              <Heart size={20} className={favorites.length > 0 ? 'fill-red-500 text-red-500' : 'text-slate-300'} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: store.theme.primary,
                color: store.id === 'lumiere' ? '#09090b' : store.id === 'zenfit' ? '#09090b' : '#ffffff'
              }}
              title="عرض سلة التسوق"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-black">
                {cartSubtotal > 0 ? `${cartSubtotal.toLocaleString('ar-DZ')} دج` : 'السلة'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`ابحث في منتجات ${store.name}...`}
              className="w-full bg-white/5 border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none placeholder:text-slate-400"
              style={{
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── STORE HERO BANNER ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b" style={{ borderColor: store.theme.border }}>
        {/* Background Image with Ambient Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={store.hero.bgImage}
            alt={store.name}
            className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] scale-105"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t"
            style={{
              backgroundImage: `linear-gradient(to top, ${store.theme.bg} 15%, ${store.theme.bg}dd 60%, transparent 100%)`
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black mb-4 border"
                style={{
                  backgroundColor: store.theme.badgeBg,
                  borderColor: store.theme.border,
                  color: store.theme.badgeText
                }}
              >
                <span>{store.hero.badgeAr}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight" style={{ color: store.theme.text }}>
                {store.hero.headlineAr}
              </h2>

              <p className="text-base sm:text-lg mb-8 leading-relaxed max-w-2xl" style={{ color: store.theme.textMuted }}>
                {store.hero.subheadlineAr}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-xl font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                  style={{
                    backgroundColor: store.theme.primary,
                    color: store.id === 'lumiere' ? '#09090b' : store.id === 'zenfit' ? '#09090b' : '#ffffff'
                  }}
                >
                  <span>{store.hero.ctaTextAr}</span>
                  <ArrowLeft size={16} />
                </a>

                <div className="flex items-center gap-4 text-xs" style={{ color: store.theme.textMuted }}>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    ضمان جودة وتوصيل لكافة الولايات
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <RotateCcw size={16} className="text-emerald-400" />
                    استبدال مجاني خلال 7 أيام
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROMOTIONAL NOTICE STRIP ─────────────────────────────────────────── */}
      {store.promoNoticeAr && (
        <div
          className="border-b py-3 px-4 text-center text-xs sm:text-sm font-semibold"
          style={{
            backgroundColor: `${store.theme.primary}15`,
            borderColor: store.theme.border,
            color: store.theme.badgeText
          }}
        >
          <div className="container mx-auto flex items-center justify-center gap-2">
            <span>✨</span>
            <span>{store.promoNoticeAr}</span>
          </div>
        </div>
      )}

      {/* ── CATALOG NAVIGATION & PRODUCTS ────────────────────────────────────── */}
      <main id="catalog" className="container mx-auto px-4 sm:px-6 py-12">
        {/* Category Filter Pills & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {store.categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border"
                  style={{
                    backgroundColor: active ? store.theme.primary : store.theme.cardBg,
                    borderColor: active ? store.theme.primary : store.theme.border,
                    color: active ? (store.id === 'lumiere' || store.id === 'zenfit' ? '#09090b' : '#ffffff') : store.theme.text
                  }}
                >
                  {cat.nameAr}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: store.theme.textMuted }}>ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none"
              style={{
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              <option value="featured" className="bg-slate-900">المميز والأحدث</option>
              <option value="price-asc" className="bg-slate-900">السعر: من الأقل للأعلى</option>
              <option value="price-desc" className="bg-slate-900">السعر: من الأعلى للأقل</option>
              <option value="discount" className="bg-slate-900">أعلى نسبة تخفيض</option>
              <option value="rating" className="bg-slate-900">الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" />
            <h3 className="text-lg font-bold mb-2">لا توجد منتجات مطابقة للبحث</h3>
            <p className="text-sm opacity-60 mb-6">جرب تغيير كلمات البحث أو اختيار تصنيف مختلف.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs"
              style={{ backgroundColor: store.theme.primary, color: '#000' }}
            >
              إعادة تعيين التصفية
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl"
                  style={{
                    backgroundColor: store.theme.cardBg,
                    borderColor: store.theme.border
                  }}
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-white/5">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback SVG representation on image failure
                        e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="%231e293b"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="%2394a3b8" text-anchor="middle" dy=".3em">${encodeURIComponent(product.nameAr)}</text></svg>`;
                      }}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {product.badge && (
                        <span
                          className="px-2.5 py-1 rounded-md text-[11px] font-black shadow-md"
                          style={{
                            backgroundColor: store.theme.primary,
                            color: store.id === 'lumiere' ? '#09090b' : store.id === 'zenfit' ? '#09090b' : '#ffffff'
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-red-600 text-white shadow">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform"
                      title={isFavorite(product.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                    >
                      <Heart
                        size={18}
                        className={isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating (Sample) */}
                      <div className="flex items-center gap-1.5 text-xs mb-2">
                        <div className="flex items-center text-amber-400">
                          <Star size={13} className="fill-amber-400" />
                          <span className="font-bold mr-1">{product.rating}</span>
                        </div>
                        <span className="text-[11px] opacity-50">({product.reviewsCount} تقييم توضيحي)</span>
                      </div>

                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-black text-base sm:text-lg mb-2 line-clamp-2 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ color: store.theme.text }}
                      >
                        {product.nameAr}
                      </h3>

                      <p className="text-xs line-clamp-2 mb-4 leading-relaxed opacity-70" style={{ color: store.theme.textMuted }}>
                        {product.shortDescAr}
                      </p>
                    </div>

                    {/* Price and Action */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-lg sm:text-xl font-black" style={{ color: store.theme.primary }}>
                          {product.price.toLocaleString('ar-DZ')} دج
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs line-through opacity-40">
                            {product.originalPrice.toLocaleString('ar-DZ')} دج
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openProductDetail(product)}
                          className="px-3 py-2 rounded-xl text-xs font-bold border hover:bg-white/10 transition-colors"
                          style={{ borderColor: store.theme.border }}
                        >
                          التفاصيل
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="px-3.5 py-2 rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
                          style={{
                            backgroundColor: store.theme.primary,
                            color: store.id === 'lumiere' ? '#09090b' : store.id === 'zenfit' ? '#09090b' : '#ffffff'
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>أضف للسلة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── STORE FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t py-12 mt-20" style={{ backgroundColor: `${store.theme.cardBg}`, borderColor: store.theme.border }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b border-white/10 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-xl" style={{ color: store.theme.primary }}>{store.name}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-bold">DEMO STORE</span>
              </div>
              <p className="text-xs leading-relaxed opacity-70 mb-4 max-w-sm" style={{ color: store.theme.textMuted }}>
                {store.taglineAr}
              </p>
              <p className="text-xs text-amber-300/80">
                ⚠️ نموذج متجر إلكتروني تجريبي مصمم بواسطة شركة هونكس لتوضيح واجهات المتاجر وسلاسة تجربة الشراء.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-sm" style={{ color: store.theme.text }}>التصنيفات المتاحة</h4>
              <ul className="space-y-1.5 text-xs opacity-70" style={{ color: store.theme.textMuted }}>
                {store.categories.slice(1, 5).map(c => (
                  <li key={c.id}>
                    <button onClick={() => setSelectedCategory(c.id)} className="hover:underline">
                      {c.nameAr}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-sm" style={{ color: store.theme.text }}>بناء متجرك مع هونكس</h4>
              <p className="text-xs leading-relaxed opacity-70 mb-4" style={{ color: store.theme.textMuted }}>
                هل يعجبك هذا التصميم؟ نبني لك متجراً حقيقياً مخصصاً مع ربط بوابات الدفع الجزائرية، شركات التوصيل، ولوحة تحكم متطورة.
              </p>
              <a
                href="/#contact-form"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-brand-cyan hover:bg-white transition-colors"
              >
                <span>طلب متجر إلكتروني احترافي</span>
                <ArrowLeft size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
            <p>© 2026 {store.name} — تصميم وتطوير شركة هونكس (Honex Company).</p>
            <p>كافة المنتجات والأسعار معروضة لأغراض العرض التوضيحي فقط.</p>
          </div>
        </div>
      </footer>

      {/* ── TOAST NOTIFICATION ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-2xl border border-white/20 flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
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
              className="modal-content rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border p-6 relative shadow-2xl"
              style={{
                backgroundColor: store.theme.bg,
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                <div className="rounded-2xl overflow-hidden aspect-square bg-white/5 border border-white/10">
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: store.theme.badgeBg, color: store.theme.badgeText }}
                      >
                        {detailProduct.category}
                      </span>
                      {detailProduct.badge && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-white/10">
                          {detailProduct.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black mb-3">
                      {detailProduct.nameAr}
                    </h2>

                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl font-black" style={{ color: store.theme.primary }}>
                        {detailProduct.price.toLocaleString('ar-DZ')} دج
                      </span>
                      {detailProduct.originalPrice && (
                        <span className="text-sm line-through opacity-40">
                          {detailProduct.originalPrice.toLocaleString('ar-DZ')} دج
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm opacity-80 mb-6 leading-relaxed">
                      {detailProduct.shortDescAr}
                    </p>

                    {/* Variants selector if available */}
                    {detailProduct.variants && detailProduct.variants.length > 0 && (
                      <div className="mb-6">
                        <label className="block text-xs font-bold mb-2">الخيارات / المقاس:</label>
                        <div className="flex flex-wrap gap-2">
                          {detailProduct.variants.map((v) => (
                            <button
                              key={v}
                              onClick={() => setSelectedVariant(v)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all"
                              style={{
                                backgroundColor: selectedVariant === v ? store.theme.primary : 'transparent',
                                borderColor: selectedVariant === v ? store.theme.primary : store.theme.border,
                                color: selectedVariant === v ? '#000' : store.theme.text
                              }}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold mb-2">الكمية:</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                          className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm min-w-6 text-center">{detailQuantity}</span>
                        <button
                          onClick={() => setDetailQuantity(detailQuantity + 1)}
                          className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        addToCart(detailProduct, selectedVariant, detailQuantity);
                        setDetailProduct(null);
                      }}
                      className="flex-1 py-3 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: store.theme.primary,
                        color: store.id === 'lumiere' || store.id === 'zenfit' ? '#09090b' : '#ffffff'
                      }}
                    >
                      <ShoppingBag size={16} />
                      <span>إضافة للسلة ({((detailProduct.price) * detailQuantity).toLocaleString('ar-DZ')} دج)</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(detailProduct)}
                      className="p-3 rounded-xl border border-white/20"
                      title="المفضلة"
                    >
                      <Heart
                        size={18}
                        className={isFavorite(detailProduct.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              {detailProduct.detailsAr && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="font-black text-sm mb-3">تفاصيل ومواصفات المنتج:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs opacity-75">
                    {detailProduct.detailsAr.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: store.theme.primary }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SLIDE-OVER CART DRAWER ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full flex flex-col p-6 shadow-2xl border-r"
              style={{
                backgroundColor: store.theme.bg,
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} style={{ color: store.theme.primary }} />
                  <h3 className="font-black text-lg">سلة المشتريات ({totalCartCount})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 opacity-60">
                    <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-bold mb-1">سلتك فارغة حالياً</p>
                    <p className="text-xs">تصفح المنتجات وأضف ما يعجبك إلى السلة.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex items-center gap-3 p-3 rounded-xl border bg-white/5"
                      style={{ borderColor: store.theme.border }}
                    >
                      <img
                        src={item.image}
                        alt={item.nameAr}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm truncate">{item.nameAr}</h4>
                        {item.variant && (
                          <span className="text-[11px] opacity-60 block">{item.variant}</span>
                        )}
                        <div className="text-xs font-black mt-1" style={{ color: store.theme.primary }}>
                          {(item.price * item.quantity).toLocaleString('ar-DZ')} دج
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold min-w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                        title="حذف"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {/* Coupon Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود خصم (HONEX10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white/5 border rounded-xl px-3 py-2 text-xs uppercase"
                      style={{ borderColor: store.theme.border }}
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20"
                    >
                      تطبيق
                    </button>
                  </div>

                  {/* Calculations */}
                  <div className="text-xs space-y-1.5 opacity-80">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span>{cartSubtotal.toLocaleString('ar-DZ')} دج</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>الخصم ({discountPercent}%):</span>
                        <span>-{discountAmount.toLocaleString('ar-DZ')} دج</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>الشحن التقديري:</span>
                      <span>{shippingFee === 0 ? 'مجاني' : `${shippingFee} دج`}</span>
                    </div>
                    <div className="flex justify-between font-black text-sm pt-2 border-t border-white/10" style={{ color: store.theme.primary }}>
                      <span>الإجمالي النهائي:</span>
                      <span>{cartTotal.toLocaleString('ar-DZ')} دج</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{
                      backgroundColor: store.theme.primary,
                      color: store.id === 'lumiere' || store.id === 'zenfit' ? '#09090b' : '#ffffff'
                    }}
                  >
                    <span>متابعة الطلب التجريبي</span>
                    <ArrowLeft size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── WISHLIST DRAWER ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isFavsOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm" onClick={() => setIsFavsOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full flex flex-col p-6 shadow-2xl border-r"
              style={{
                backgroundColor: store.theme.bg,
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="fill-red-500 text-red-500" />
                  <h3 className="font-black text-lg">قائمة المفضلة ({favorites.length})</h3>
                </div>
                <button onClick={() => setIsFavsOpen(false)} className="p-1.5 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {favorites.length === 0 ? (
                  <div className="text-center py-16 opacity-60">
                    <Heart size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-bold mb-1">قائمة المفضلة فارغة</p>
                    <p className="text-xs">اضغط على أيقونة القلب لأي منتج لتخزينه هنا.</p>
                  </div>
                ) : (
                  favorites.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl border bg-white/5"
                      style={{ borderColor: store.theme.border }}
                    >
                      <img src={item.image} alt={item.nameAr} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm truncate">{item.nameAr}</h4>
                        <div className="text-xs font-black mt-1" style={{ color: store.theme.primary }}>
                          {item.price.toLocaleString('ar-DZ')} دج
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(item);
                          toggleFavorite(item);
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold"
                        style={{ backgroundColor: store.theme.primary, color: '#000' }}
                      >
                        للسلة
                      </button>
                      <button onClick={() => toggleFavorite(item)} className="p-1 text-slate-400 hover:text-red-400">
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CHECKOUT MODAL (DEMO WITH ALGERIAN WILAYAS) ──────────────────────── */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto border p-6 relative shadow-2xl"
              style={{
                backgroundColor: store.theme.bg,
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span
                  className="text-xs font-black px-2.5 py-1 rounded-full mb-2 inline-block"
                  style={{ backgroundColor: store.theme.badgeBg, color: store.theme.badgeText }}
                >
                  إتمام الشراء التجريبي
                </span>
                <h3 className="text-xl sm:text-2xl font-black">تأكيد طلب الشراء في {store.name}</h3>
                <p className="text-xs opacity-75 mt-1">
                  املأ معلومات التوصيل لإكمال تجربة الطلب التوضيحية.
                </p>
              </div>

              {/* Prominent Demo Disclaimer Box */}
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
                <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>ملاحظة أمان للنموذج التجريبي:</strong> هذا طلب افتراضي لعرض واجهة المتجر فقط — لن يتم تحصيل أي مبالغ مالية ولن يتم شحن أي منتجات حقيقية.
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold mb-1.5">الاسم واللقب *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف بلقاسم"
                    value={checkoutData.fullName}
                    onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                    className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none"
                    style={{ borderColor: store.theme.border }}
                  />
                  {checkoutErrors.fullName && <p className="text-red-400 text-xs mt-1">{checkoutErrors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1.5">رقم الهاتف (الجزائر) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0550 12 34 56"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none"
                      style={{ borderColor: store.theme.border }}
                    />
                    {checkoutErrors.phone && <p className="text-red-400 text-xs mt-1">{checkoutErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5">الولاية *</label>
                    <select
                      value={checkoutData.wilaya}
                      onChange={(e) => setCheckoutData({ ...checkoutData, wilaya: e.target.value })}
                      className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none [&>option]:bg-slate-900"
                      style={{ borderColor: store.theme.border }}
                    >
                      {ALGERIAN_WILAYAS.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1.5">عنوان التوصيل بالتفصيل *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="الحي، البلدية، ورقم البناية..."
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none resize-none"
                    style={{ borderColor: store.theme.border }}
                  />
                  {checkoutErrors.address && <p className="text-red-400 text-xs mt-1">{checkoutErrors.address}</p>}
                </div>

                {/* Delivery Option */}
                <div>
                  <label className="block font-bold mb-1.5">طريقة الاستلام:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutData({ ...checkoutData, deliveryType: 'home' })}
                      className="p-3 rounded-xl border text-right font-bold transition-all text-xs"
                      style={{
                        backgroundColor: checkoutData.deliveryType === 'home' ? `${store.theme.primary}20` : 'transparent',
                        borderColor: checkoutData.deliveryType === 'home' ? store.theme.primary : store.theme.border
                      }}
                    >
                      توصيل للمنزل
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutData({ ...checkoutData, deliveryType: 'desk' })}
                      className="p-3 rounded-xl border text-right font-bold transition-all text-xs"
                      style={{
                        backgroundColor: checkoutData.deliveryType === 'desk' ? `${store.theme.primary}20` : 'transparent',
                        borderColor: checkoutData.deliveryType === 'desk' ? store.theme.primary : store.theme.border
                      }}
                    >
                      استلام من مكتب التوصيل
                    </button>
                  </div>
                </div>

                {/* Payment Option (Demo) */}
                <div>
                  <label className="block font-bold mb-1.5">طريقة الدفع (تجريبية):</label>
                  <div className="p-3 rounded-xl border bg-white/5 space-y-2" style={{ borderColor: store.theme.border }}>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                      <input
                        type="radio"
                        name="pay"
                        checked={checkoutData.paymentMethod === 'cod'}
                        onChange={() => setCheckoutData({ ...checkoutData, paymentMethod: 'cod' })}
                      />
                      <span>الدفع عند الاستلام التجريبي (Cash on Delivery)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs opacity-75">
                      <input
                        type="radio"
                        name="pay"
                        checked={checkoutData.paymentMethod === 'card_demo'}
                        onChange={() => setCheckoutData({ ...checkoutData, paymentMethod: 'card_demo' })}
                      />
                      <span>بطاقة ذهبية / CIB (محاكاة تجريبية)</span>
                    </label>
                  </div>
                </div>

                {/* Order Summary Recap */}
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                  <span>المبلغ المطلوب تسديده (تجريبي):</span>
                  <span className="font-black text-lg" style={{ color: store.theme.primary }}>
                    {cartTotal.toLocaleString('ar-DZ')} دج
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  style={{
                    backgroundColor: store.theme.primary,
                    color: store.id === 'lumiere' || store.id === 'zenfit' ? '#09090b' : '#ffffff'
                  }}
                >
                  <Check size={18} />
                  <span>تأكيد الطلب التوضيحي الآن</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ORDER CONFIRMATION MODAL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="modal-overlay">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content rounded-3xl w-full max-w-lg border p-6 text-center shadow-2xl relative"
              style={{
                backgroundColor: store.theme.bg,
                borderColor: store.theme.border,
                color: store.theme.text
              }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl"
                style={{ backgroundColor: `${store.theme.primary}25`, color: store.theme.primary }}
              >
                <Check size={36} />
              </div>

              <span
                className="text-xs font-black px-3 py-1 rounded-full mb-3 inline-block"
                style={{ backgroundColor: store.theme.badgeBg, color: store.theme.badgeText }}
              >
                رقم الطلب التجريبي: {orderConfirmed.orderId}
              </span>

              <h3 className="text-2xl font-black mb-2">تم تسجيل طلبك التجريبي بنجاح!</h3>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-right leading-relaxed mb-6">
                <strong>تذكير مهم:</strong> هذا طلب تجريبي فقط لموقع العرض التوضيحي لشركة هونكس — لم يتم إرسال طلب حقيقي إلى أي تاجر، ولم يتم تحصيل أي مبالغ مالية منك.
              </div>

              {/* Receipt Breakdown */}
              <div className="bg-white/5 rounded-2xl p-4 text-xs text-right space-y-2 mb-6 border border-white/10">
                <div className="flex justify-between">
                  <span className="opacity-70">العميل:</span>
                  <span className="font-bold">{orderConfirmed.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">الهاتف:</span>
                  <span className="font-bold">{orderConfirmed.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">الولاية:</span>
                  <span className="font-bold">{orderConfirmed.customer.wilaya}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">العنوان:</span>
                  <span className="font-bold">{orderConfirmed.customer.address}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-black text-sm" style={{ color: store.theme.primary }}>
                  <span>المبلغ الإجمالي (توضيحي):</span>
                  <span>{orderConfirmed.total.toLocaleString('ar-DZ')} دج</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setOrderConfirmed(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 transition-colors"
                >
                  متابعة تصفح المتجر
                </button>
                <a
                  href="/#portfolio"
                  className="flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  style={{ backgroundColor: store.theme.primary, color: '#000' }}
                >
                  <span>استكشاف متاجر أخرى</span>
                  <ArrowLeft size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoStoreShell;

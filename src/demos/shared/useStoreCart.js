import { useState, useEffect } from 'react';
import { ALGERIAN_WILAYAS } from '../data/demoStoresData';

export { ALGERIAN_WILAYAS };

export const useStoreCart = (storeId) => {
  const cartKey = `honex_demo_cart_${storeId}`;
  const favsKey = `honex_demo_favs_${storeId}`;

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

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavsOpen, setIsFavsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch {
      // Ignore quota exceeded
    }
  }, [cart, cartKey]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(favsKey, JSON.stringify(favorites));
    } catch {
      // Ignore quota exceeded
    }
  }, [favorites, favsKey]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, variant = null, quantity = 1, extraMeta = {}) => {
    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);
    const cartItemId = `${product.id}_${chosenVariant || 'def'}_${extraMeta?.bundleId || ''}`;

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
        quantity,
        extraMeta
      }];
    });

    showToast(`✓ تمت إضافة "${product.nameAr}" إلى السلة`);
  };

  const addMultipleToCart = (productsList, bundleName = 'باقة متكاملة') => {
    productsList.forEach(p => {
      addToCart(p, p.variant || null, 1, { bundleName });
    });
    showToast(`✓ تمت إضافة ${productsList.length} منتجات (${bundleName}) إلى السلة!`);
    setIsCartOpen(true);
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

  // Financial calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalOriginalPrice = cart.reduce((acc, item) => {
    const orig = item.originalPrice || item.price;
    return acc + (orig * item.quantity);
  }, 0);
  const totalSavings = Math.max(0, totalOriginalPrice - cartSubtotal);
  const discountAmount = Math.round(cartSubtotal * (discountPercent / 100));
  const shippingFee = cartSubtotal > 20000 || cartSubtotal === 0 ? 0 : 800;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'HONEX10' || code === 'DEMO10' || code === `${storeId.toUpperCase()}10`) {
      setDiscountPercent(10);
      showToast('✓ تم تفعيل كود الخصم 10% بنجاح!');
    } else {
      showToast('كود الخصم غير صحيح (جرب HONEX10 للنموذج التجريبي)');
    }
  };

  return {
    cart,
    favorites,
    isCartOpen,
    setIsCartOpen,
    isFavsOpen,
    setIsFavsOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    orderConfirmed,
    setOrderConfirmed,
    toastMessage,
    showToast,
    couponCode,
    setCouponCode,
    discountPercent,
    applyCoupon,
    addToCart,
    addMultipleToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    isFavorite,
    cartSubtotal,
    totalOriginalPrice,
    totalSavings,
    discountAmount,
    shippingFee,
    cartTotal,
    totalCartCount
  };
};

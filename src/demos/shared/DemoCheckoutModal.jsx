import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertTriangle } from 'lucide-react';
import { ALGERIAN_WILAYAS } from './useStoreCart';

export const DemoCheckoutModal = ({
  isOpen,
  onClose,
  store,
  cartTotal,
  cart,
  onConfirmSuccess
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: ALGERIAN_WILAYAS[15], // 16 - الجزائر العاصمة
    address: '',
    deliveryType: 'home',
    paymentMethod: 'cod',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'يرجى كتابة الاسم واللقب الكامل';
    if (!formData.phone.trim() || !/^0[567][0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم هاتف جزائري صالح (مثال: 0550123456)';
    }
    if (!formData.address.trim()) newErrors.address = 'يرجى كتابة عنوان التوصيل بالتفصيل';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const demoId = `HNX-${store.id.toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`;

    onConfirmSuccess({
      orderId: demoId,
      date: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      total: cartTotal,
      customer: { ...formData }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto border p-6 relative shadow-2xl"
        style={{
          backgroundColor: store.theme.bg || '#09090b',
          borderColor: store.theme.border || 'rgba(255,255,255,0.15)',
          color: store.theme.text || '#ffffff'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-5 text-right">
          <span
            className="text-xs font-black px-2.5 py-1 rounded-full mb-2 inline-block"
            style={{
              backgroundColor: store.theme.badgeBg || 'rgba(0,240,255,0.15)',
              color: store.theme.badgeText || '#00f0ff'
            }}
          >
            إتمام الشراء التجريبي
          </span>
          <h3 className="text-xl sm:text-2xl font-black">تأكيد طلب الشراء في {store.nameAr}</h3>
          <p className="text-xs opacity-75 mt-1">
            املأ بيانات التوصيل لاختبار مسار الطلب السلس والمحاكي للمتاجر الجزائرية.
          </p>
        </div>

        {/* Prominent Demo Notice */}
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-right flex items-start gap-3">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>تنبيه توضيحي:</strong> هذا نموذج تجريبي لمحاكاة الشراء فقط — لن يتم تحصيل أي مبالغ ولن يتم شحن أي طلبات حقيقية.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-right">
          <div>
            <label className="block font-bold mb-1.5">الاسم واللقب *</label>
            <input
              type="text"
              required
              placeholder="مثال: كريم بن عيسى"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none"
              style={{ borderColor: store.theme.border || 'rgba(255,255,255,0.2)' }}
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1.5">رقم الهاتف (الجزائر) *</label>
              <input
                type="tel"
                required
                placeholder="0550 12 34 56"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none"
                style={{ borderColor: store.theme.border || 'rgba(255,255,255,0.2)' }}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block font-bold mb-1.5">الولاية (58 ولاية) *</label>
              <select
                value={formData.wilaya}
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none [&>option]:bg-slate-900"
                style={{ borderColor: store.theme.border || 'rgba(255,255,255,0.2)' }}
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
              placeholder="البلدية، الحي، رقم الشارع أو العمارة..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-white/5 border rounded-xl px-4 py-2.5 focus:outline-none resize-none"
              style={{ borderColor: store.theme.border || 'rgba(255,255,255,0.2)' }}
            />
            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block font-bold mb-1.5">خيار الاستلام:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                className="p-3 rounded-xl border text-right font-bold transition-all text-xs"
                style={{
                  backgroundColor: formData.deliveryType === 'home' ? `${store.theme.primary}25` : 'transparent',
                  borderColor: formData.deliveryType === 'home' ? store.theme.primary : store.theme.border
                }}
              >
                توصيل للمنزل مباشرة
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryType: 'desk' })}
                className="p-3 rounded-xl border text-right font-bold transition-all text-xs"
                style={{
                  backgroundColor: formData.deliveryType === 'desk' ? `${store.theme.primary}25` : 'transparent',
                  borderColor: formData.deliveryType === 'desk' ? store.theme.primary : store.theme.border
                }}
              >
                استلام من نقطة الشحن (Stop Desk)
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
            <span>المبلغ الإجمالي للدفع (تجريبي):</span>
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
            <span>تأكيد الطلب التوضيحي</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DemoCheckoutModal;

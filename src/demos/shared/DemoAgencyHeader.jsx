import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, Sparkles, MessageCircle, X, Check } from 'lucide-react';

export const DemoAgencyHeader = ({ storeNameAr = 'المتجر الإلكتروني', accentColor = '#00f0ff' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', wilaya: 'الجزائر العاصمة', notes: '' });

  const whatsappMessage = encodeURIComponent(
    `مرحباً شركة هونكس، أرغب في طلب متجر إلكتروني احترافي مماثل لنموذج "${storeNameAr}". يرجى تزويدي بالتفاصيل وعرض السعر.`
  );
  const whatsappUrl = `https://wa.me/213791390711?text=${whatsappMessage}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
    }, 3500);
  };

  return (
    <>
      <div className="bg-slate-950 text-slate-300 border-b border-white/10 px-4 py-2.5 text-xs sm:text-sm relative z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Right: Return Link & Brand Title */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 font-bold text-brand-cyan hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-brand-cyan/30"
              title="العودة إلى معرض أعمال شركة هونكس"
            >
              <ArrowRight size={14} />
              <span>العودة لمعرض أعمال هونكس</span>
            </a>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="font-semibold text-slate-200">
              نموذج متجر متكامل — <span style={{ color: accentColor }}>{storeNameAr}</span>
            </span>
          </div>

          {/* Left: Demo Badge & "اطلب متجراً مماثلاً" CTA */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="hidden md:flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 text-[11px] font-semibold">
              <AlertTriangle size={13} className="flex-shrink-0" />
              <span>نموذج تجريبي تفاعلي — لا يتم تحصيل مبالغ حقيقية</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-xs text-slate-950 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: accentColor,
                color: accentColor === '#00f0ff' || accentColor === '#D4AF37' || accentColor === '#22C55E' || accentColor === '#FACC15' ? '#09090b' : '#ffffff'
              }}
              title="طلب متجر إلكتروني مماثل لعلامتك التجارية"
            >
              <Sparkles size={13} />
              <span>اطلب متجراً مماثلاً</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right shadow-2xl relative text-white"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan inline-block mb-2">
                  شركة هونكس للحلول الرقمية
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  طلب متجر إلكتروني مماثل لـ {storeNameAr}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  نبني لك متجراً إلكترونياً متكاملاً بنفس مستوى السرعة، الهوية البصرية، وتجربة المستخدم المخصصة للسوق الجزائري والعربي.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check size={24} />
                  </div>
                  <h4 className="font-black text-lg">تم استلام طلبك بنجاح!</h4>
                  <p className="text-xs text-slate-300">
                    سيتواصل معك مهندسو ومصممو شركة هونكس خلال ساعات قليلة لمناقشة التفاصيل وتحديد خطة العمل.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block font-bold mb-1.5">الاسم واللقب *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: يونس بلقاسم"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold mb-1.5">رقم الهاتف *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0550 12 34 56"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-cyan"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1.5">الولاية</label>
                        <input
                          type="text"
                          placeholder="مثال: الجزائر العاصمة / وهران"
                          value={formData.wilaya}
                          onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-cyan"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold mb-1.5">ملاحظات أو ميزات محددة لمتجرك</label>
                      <textarea
                        rows={2}
                        placeholder={`أرغب في متجر إلكتروني يشبه ${storeNameAr} مع ميزات خاصة بـ...`}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-cyan resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        <Check size={16} />
                        <span>إرسال الطلب لفريق هونكس</span>
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <MessageCircle size={16} />
                        <span>تواصل عبر واتساب فوراً</span>
                      </a>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoAgencyHeader;

import React from 'react';
import { DEMO_STORES, getStoreById } from './data/demoStoresData';
import DemoStoreShell from './components/DemoStoreShell';
import LumiereStore from './stores/LumiereStore';
import NexaTechStore from './stores/NexaTechStore';
import GlowCuraStore from './stores/GlowCuraStore';
import HomeVibeStore from './stores/HomeVibeStore';
import TerraSportStore from './stores/TerraSportStore';
import VayraStore from './stores/VayraStore';
import ReadoraStore from './stores/ReadoraStore';
import PawzStore from './stores/PawzStore';
import ZenFitStore from './stores/ZenFitStore';
import OutletStore from './stores/OutletStore';
import { ArrowRight, ShoppingBag, ExternalLink } from 'lucide-react';

export const DemoPage = ({ storeId }) => {
  const normalizedId = (storeId || '').toLowerCase().trim();
  const store = getStoreById(normalizedId);

  // Route to the dedicated, specialized storefront implementation
  switch (normalizedId) {
    case 'lumiere':
      return <LumiereStore />;
    case 'nexatech':
      return <NexaTechStore />;
    case 'glowcura':
      return <GlowCuraStore />;
    case 'homevibe':
      return <HomeVibeStore />;
    case 'terrasport':
      return <TerraSportStore />;
    case 'vayra':
      return <VayraStore />;
    case 'readora':
      return <ReadoraStore />;
    case 'pawz':
      return <PawzStore />;
    case 'zenfit':
      return <ZenFitStore />;
    case 'outlet':
      return <OutletStore />;
    default:
      if (store) {
        return <DemoStoreShell store={store} />;
      }
      break;
  }

  // Fallback 404 / Directory of All 10 Demo Stores
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan font-black">
              H
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">شركة هونكس — دليل المتاجر التجريبية</h1>
              <p className="text-xs text-slate-400">نماذج متاجر إلكترونية تفاعلية متكاملة (10 متاجر حية)</p>
            </div>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowRight size={14} />
            <span>العودة للرئيسية</span>
          </a>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
          <strong>ملاحظة:</strong> المتجر المطلوب غير موجود، يرجى اختيار أحد المتاجر التجريبية التفاعلية العشرة أدناه للاطلاع على تجربة التسوق الكاملة.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_STORES.map((s) => (
            <a
              key={s.id}
              href={`/demos/${s.id}`}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-cyan/50 hover:bg-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                    style={{ backgroundColor: s.theme.cardBg, color: s.theme.primary, border: `1px solid ${s.theme.primary}` }}
                  >
                    {s.name.slice(0, 1)}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {s.categoryAr}
                  </span>
                </div>
                <h3 className="font-black text-lg text-white group-hover:text-brand-cyan transition-colors mb-1">
                  {s.nameAr}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {s.taglineAr}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-brand-cyan">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag size={14} />
                  <span>تصفح المتجر</span>
                </span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

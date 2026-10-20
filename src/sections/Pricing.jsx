import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CAL_URL = 'https://cal.eu/jvlilb/30min';
const YEARLY_DISCOUNT = 0.80;

const plans = [
  {
    id: 'starter',
    key: 'starterPlan',
    icon: Zap,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-brand-cyan',
    priceMonthly: 25000,
    popular: false,
    features: {
      ar: [
        'موقع ويب احترافي (5 صفحات)',
        'تصميم متجاوب مع الهاتف',
        'نطاق + استضافة (سنة)',
        'لوحة تحكم بسيطة',
        'دعم فني لمدة شهر',
        'تسليم خلال 7 أيام',
      ],
      en: [
        'Professional website (5 pages)',
        'Mobile responsive design',
        'Domain + Hosting (1 year)',
        'Simple admin panel',
        '1 month technical support',
        'Delivered within 7 days',
      ],
      fr: [
        'Site web professionnel (5 pages)',
        'Design responsive mobile',
        "Domaine + Hébergement (1 an)",
        "Panneau d'administration simple",
        '1 mois de support technique',
        'Livraison en 7 jours',
      ],
    },
    cta: 'getStartedPlan',
    action: 'cal',
  },
  {
    id: 'growth',
    key: 'growthPlan',
    icon: Star,
    gradient: 'from-brand-cyan/20 to-brand-purple/20',
    border: 'border-brand-cyan/50',
    iconColor: 'text-brand-cyan',
    priceMonthly: 65000,
    popular: true,
    features: {
      ar: [
        'تطبيق ويب متكامل (15 صفحة)',
        'تصميم UI/UX احترافي مخصص',
        'لوحة تحكم متقدمة',
        'تكامل مع الـ APIs',
        'تحسين SEO متقدم',
        'دعم فني 3 أشهر',
        'تسليم خلال 21 يوم',
        'حماية وأمان HTTPS/SSL',
      ],
      en: [
        'Full web application (15 pages)',
        'Custom UI/UX design',
        'Advanced admin dashboard',
        'API integrations',
        'Advanced SEO optimization',
        '3 months technical support',
        'Delivered within 21 days',
        'HTTPS/SSL security',
      ],
      fr: [
        'Application web complète (15 pages)',
        'Design UI/UX personnalisé',
        'Tableau de bord avancé',
        'Intégrations API',
        'SEO avancé',
        '3 mois de support technique',
        'Livraison en 21 jours',
        'Sécurité HTTPS/SSL',
      ],
    },
    cta: 'getStartedPlan',
    action: 'cal',
  },
  {
    id: 'enterprise',
    key: 'enterprisePlan',
    icon: Building2,
    gradient: 'from-brand-purple/20 to-pink-500/20',
    border: 'border-brand-purple/30',
    iconColor: 'text-brand-purple',
    priceMonthly: null,
    popular: false,
    isCustom: true,
    features: {
      ar: [
        'تطوير مخصص غير محدود',
        'بنية تحتية سحابية مقياسية',
        'تكامل الذكاء الاصطناعي',
        'تطبيق موبايل iOS/Android',
        'فريق تقني مخصص',
        'دعم مستمر 24/7',
        'SLA مضمون 99.9%',
        'تحليلات وتقارير متقدمة',
      ],
      en: [
        'Unlimited custom development',
        'Scalable cloud infrastructure',
        'AI & ML integration',
        'iOS/Android mobile app',
        'Dedicated tech team',
        '24/7 continuous support',
        '99.9% uptime SLA guarantee',
        'Advanced analytics & reports',
      ],
      fr: [
        'Développement personnalisé illimité',
        'Infrastructure cloud scalable',
        'Intégration IA & ML',
        'Application mobile iOS/Android',
        'Équipe technique dédiée',
        'Support continu 24/7',
        'Garantie SLA 99,9%',
        'Analyses et rapports avancés',
      ],
    },
    cta: 'contactSales',
    action: 'scroll',
  },
];

const PricingCard = ({ plan, index }) => {
  const { t, formatPrice, language, billing } = useAppContext();
  const Icon = plan.icon;
  const features = plan.features[language] || plan.features['en'];

  const getPrice = () => {
    if (plan.isCustom) return null;
    if (billing === 'yearly') {
      return Math.round(plan.priceMonthly * 12 * YEARLY_DISCOUNT);
    }
    return plan.priceMonthly;
  };

  const billingLabel = billing === 'yearly' ? t('yearly') : t('monthly');

  const handleAction = () => {
    if (plan.action === 'cal') {
      window.open(CAL_URL, '_blank');
    } else {
      const el = document.getElementById('contact-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl flex flex-col transition-all duration-300 ${
        plan.popular
          ? 'scale-105 z-10 shadow-2xl shadow-brand-cyan/20'
          : 'hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-purple/10'
      }`}
    >
      {plan.popular && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-brand-cyan/20 to-brand-purple/20 blur-sm -z-10 animate-pulse" />
      )}

      <div
        className={`relative rounded-3xl p-8 flex flex-col gap-6 border h-full overflow-hidden ${
          plan.popular
            ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-brand-cyan/40 dark:from-slate-800 dark:to-slate-900'
            : 'glass border-slate-200 dark:border-white/10'
        }`}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        )}

        <div>
          <div className="flex justify-between items-start mb-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center border ${plan.border}`}
            >
              <Icon size={24} className={plan.iconColor} />
            </div>
            {plan.popular && (
              <div className="px-3 py-1.5 rounded-full glass bg-white/5 border border-white/10 text-brand-cyan text-[11px] font-black tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.15)] flex items-center gap-1.5">
                <Star size={12} className="fill-brand-cyan" />
                {t('mostPopular')}
              </div>
            )}
          </div>
          <h3
            className={`text-2xl font-black mb-1 ${
              plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'
            }`}
          >
            {t(plan.key)}
          </h3>
        </div>

        <div className={`py-4 border-y ${plan.popular ? 'border-white/10' : 'border-slate-200 dark:border-white/10'}`}>
          {plan.isCustom ? (
            <div>
              <div className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {t('customPrice')}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {t('customPriceSub')}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-end gap-2">
                <span dir="ltr" className={`text-4xl font-black inline-block ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {formatPrice(getPrice())}
                </span>
              </div>
              <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                <span>{billingLabel}</span>
                {billing === 'yearly' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-green-500/15 text-green-400 border border-green-500/20">
                    {t('saveYearly')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  plan.popular
                    ? 'bg-brand-cyan/20 border border-brand-cyan/40'
                    : 'bg-brand-purple/10 border border-brand-purple/30'
                }`}
              >
                <Check size={11} className={plan.popular ? 'text-brand-cyan' : 'text-brand-purple'} />
              </div>
              <span
                className={`text-sm font-medium ${
                  plan.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAction}
          className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
            plan.popular
              ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-lg shadow-brand-cyan/30 hover:shadow-brand-cyan/50'
              : plan.action === 'scroll'
              ? 'border-2 border-brand-purple text-brand-purple dark:text-brand-cyan dark:border-brand-cyan hover:bg-brand-purple/5 dark:hover:bg-brand-cyan/5'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
          }`}
        >
          {t(plan.cta)}
        </motion.button>
      </div>
    </motion.div>
  );
};


export const PricingCards = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
      {plans.map((plan, index) => (
        <PricingCard key={plan.id} plan={plan} index={index} isPage={false} />
      ))}
    </div>
  );
};

const Pricing = ({ isPage = false }) => {
  const { t, billing, toggleBilling, language } = useAppContext();

  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-purple/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {!isPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              {t('pricingTitle')}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {t('pricingSubtitle')}
            </p>
          </motion.div>
        )}

        <div className="flex justify-center mb-12">
          <div className="relative flex items-center p-1 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-white/10 w-[340px]">
            <button
              onClick={() => billing !== 'monthly' && toggleBilling()}
              className={`relative z-10 flex-1 flex justify-center items-center py-2.5 text-sm font-bold transition-colors rounded-full ${
                billing === 'monthly' ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('billingMonthly')}
            </button>
            <button
              onClick={() => billing !== 'yearly' && toggleBilling()}
              className={`relative z-10 flex-1 flex justify-center items-center py-2.5 text-sm font-bold transition-colors rounded-full ${
                billing === 'yearly' ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('billingYearly')}
              <span className={`mx-2 px-2 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                billing === 'yearly' ? 'bg-white/20 text-white' : 'bg-green-500/15 text-green-500 dark:text-green-400'
              }`}>
                {t('saveYearly')}
              </span>
            </button>
            
            {/* Animated Slider */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-brand-purple rounded-full transition-transform duration-300 ease-in-out`}
              style={{
                width: 'calc(50% - 4px)', // Adjust width for padding
                [language === 'ar' ? 'right' : 'left']: '4px',
                transform: billing === 'yearly' 
                  ? (language === 'ar' ? 'translateX(-100%)' : 'translateX(100%)') 
                  : 'translateX(0)',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} isPage={isPage} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

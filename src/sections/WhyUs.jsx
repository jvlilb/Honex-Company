import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, Lightbulb, Clock, Shield, HeartHandshake } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const whyUsData = [
  {
    icon: Zap,
    gradient: 'from-brand-cyan/20 to-blue-500/20',
    border: 'border-brand-cyan/30',
    iconBg: 'bg-brand-cyan/10',
    iconColor: 'text-brand-cyan',
    titleAr: 'سرعة التسليم',
    titleEn: 'Lightning Fast Delivery',
    titleFr: 'Livraison Ultra-Rapide',
    descAr: 'نلتزم بالمواعيد ونسلّم مشاريعك في الوقت المحدد دائماً. السرعة ليست اختياراً — هي ضمان.',
    descEn: "We always deliver on time. Speed isn't optional — it's our guarantee.",
    descFr: "Nous livrons toujours dans les délais. La rapidité n'est pas optionnelle — c'est notre garantie.",
    stat: '7',
    statLabel: { ar: 'أيام للمشاريع الصغيرة', en: 'Days for small projects', fr: 'Jours pour petits projets' },
  },
  {
    icon: Award,
    gradient: 'from-brand-purple/20 to-pink-500/20',
    border: 'border-brand-purple/30',
    iconBg: 'bg-brand-purple/10',
    iconColor: 'text-brand-purple',
    titleAr: 'جودة استثنائية',
    titleEn: 'Exceptional Quality',
    titleFr: 'Qualité Exceptionnelle',
    descAr: 'كل مشروع نبنيه يمر عبر مراجعات جودة متعددة. لا نطلق أي شيء حتى يكون مثالياً.',
    descEn: 'Every project undergoes multiple quality reviews. We ship nothing until it is perfect.',
    descFr: 'Chaque projet passe par de multiples contrôles qualité. Nous ne livrons rien avant que ce soit parfait.',
    stat: '99%',
    statLabel: { ar: 'رضا العملاء', en: 'Client satisfaction', fr: 'Satisfaction client' },
  },
  {
    icon: Lightbulb,
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    titleAr: 'ابتكار حقيقي',
    titleEn: 'True Innovation',
    titleFr: 'Innovation Réelle',
    descAr: 'لا نبني نسخاً من القوالب. نصمم حلولاً فريدة تعكس هوية علامتك التجارية بالكامل.',
    descEn: "We don't build templates. We design unique solutions that fully reflect your brand identity.",
    descFr: "Nous ne créons pas des templates. Nous concevons des solutions uniques reflétant votre identité.",
    stat: '150+',
    statLabel: { ar: 'مشروع مخصص', en: 'Custom projects', fr: 'Projets personnalisés' },
  },
  {
    icon: Clock,
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    titleAr: 'دعم مستمر',
    titleEn: 'Continuous Support',
    titleFr: 'Support Continu',
    descAr: 'علاقتنا لا تنتهي عند التسليم. نقدم دعماً تقنياً مستمراً لضمان نجاح مشروعك.',
    descEn: 'Our relationship does not end at delivery. We provide ongoing tech support for your success.',
    descFr: 'Notre relation ne se termine pas à la livraison. Nous assurons un support technique continu.',
    stat: '24/7',
    statLabel: { ar: 'دعم متاح', en: 'Support available', fr: 'Support disponible' },
  },
  {
    icon: Shield,
    gradient: 'from-red-500/20 to-rose-500/20',
    border: 'border-red-500/30',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    titleAr: 'أمان وموثوقية',
    titleEn: 'Security & Reliability',
    titleFr: 'Sécurité & Fiabilité',
    descAr: 'نبني بأعلى معايير الأمان السيبراني. منصاتك محمية ومستضافة على بنية تحتية موثوقة.',
    descEn: 'We build to the highest cybersecurity standards. Your platforms are protected and reliably hosted.',
    descFr: 'Nous construisons selon les normes de cybersécurité les plus élevées.',
    stat: '99.9%',
    statLabel: { ar: 'uptime مضمون', en: 'Guaranteed uptime', fr: 'Disponibilité garantie' },
  },
  {
    icon: HeartHandshake,
    gradient: 'from-sky-500/20 to-blue-500/20',
    border: 'border-sky-500/30',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    titleAr: 'شراكة حقيقية',
    titleEn: 'True Partnership',
    titleFr: 'Véritable Partenariat',
    descAr: 'نستثمر في نجاحك كأنه نجاحنا. نجاحك هو مقياس نجاحنا الحقيقي.',
    descEn: 'We invest in your success as if it were our own. Your success is our true measure.',
    descFr: 'Nous investissons dans votre succès comme si c\'était le nôtre.',
    stat: '50+',
    statLabel: { ar: 'عميل دائم', en: 'Long-term clients', fr: 'Clients fidèles' },
  },
];

const WhyUs = () => {
  const { t, language } = useAppContext();

  const getTitle = (item) =>
    language === 'ar' ? item.titleAr : language === 'fr' ? item.titleFr : item.titleEn;
  const getDesc = (item) =>
    language === 'ar' ? item.descAr : language === 'fr' ? item.descFr : item.descEn;
  const getStatLabel = (item) =>
    language === 'ar' ? item.statLabel.ar : language === 'fr' ? item.statLabel.fr : item.statLabel.en;

  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/4 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/4 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t('whyUsTitle')}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('whyUsSubtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`glass rounded-2xl p-7 border ${item.border} group cursor-default hover:shadow-xl hover:shadow-brand-cyan/5 transition-shadow duration-300`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={26} className={item.iconColor} />
                </div>

                {/* Stat highlight */}
                <div className={`text-3xl font-black mb-1 ${item.iconColor}`}>{item.stat}</div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">
                  {getStatLabel(item)}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  {getTitle(item)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {getDesc(item)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

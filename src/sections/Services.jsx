import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Megaphone, Smartphone, Search, PenTool, BarChart3,
  Shield, Cloud, Cpu, Globe, CheckCircle, ArrowRight, ArrowLeft, Zap
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CAL_URL = 'https://cal.eu/jvlilb/30min';

const servicesData = [
  {
    titleAr: 'تطوير الويب المتقدم',
    titleEn: 'Premium Web Development',
    titleFr: 'Développement Web Premium',
    descAr: 'نبني تطبيقات ويب عالية الأداء، قابلة للتوسع وبتصاميم استثنائية. من المواقع التسويقية إلى منصات التجارة الإلكترونية والأنظمة المعقدة.',
    descEn: 'We build high-performance, scalable web applications with exceptional designs. From marketing sites to e-commerce platforms and complex enterprise systems.',
    descFr: 'Nous construisons des applications web haute performance, scalables avec des designs exceptionnels.',
    icon: Code,
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-brand-cyan',
    features: { ar: ['React / Next.js / Vue', 'تصميم مخصص 100%', 'تحسين الأداء', 'لوحات تحكم متقدمة'], en: ['React / Next.js / Vue', '100% Custom design', 'Performance optimization', 'Advanced dashboards'], fr: ['React / Next.js / Vue', 'Design 100% personnalisé', 'Optimisation des performances', 'Tableaux de bord avancés'] },
  },
  {
    titleAr: 'تصميم UI/UX',
    titleEn: 'UI/UX Design',
    titleFr: 'Design UI/UX',
    descAr: 'واجهات مستخدم بديهية وجمالية رائعة توفر تجربة مستخدم سلسة تحوّل الزوار إلى عملاء دائمين.',
    descEn: 'Intuitive and aesthetically stunning interfaces that provide seamless user experiences, converting visitors into loyal customers.',
    descFr: 'Interfaces intuitives et esthétiques qui offrent des expériences utilisateur fluides.',
    icon: PenTool,
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-brand-purple',
    features: { ar: ['أبحاث المستخدم', 'نماذج أولية تفاعلية', 'تصميم نظام متكامل', 'اختبارات الاستخدام'], en: ['User research', 'Interactive prototypes', 'Design systems', 'Usability testing'], fr: ['Recherche utilisateur', 'Prototypes interactifs', 'Systèmes de design', 'Tests d\'utilisabilité'] },
  },
  {
    titleAr: 'تطوير تطبيقات الموبايل',
    titleEn: 'Mobile App Development',
    titleFr: 'Développement Mobile',
    descAr: 'تطبيقات موبايل أصلية ومتعددة المنصات تُوصل خدماتك إلى جيوب مستخدميك على iOS و Android.',
    descEn: 'Native and cross-platform mobile applications delivering your services to users\' pockets on iOS and Android.',
    descFr: 'Applications mobiles natives et cross-platform pour iOS et Android.',
    icon: Smartphone,
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
    features: { ar: ['React Native / Flutter', 'iOS & Android', 'إشعارات فورية', 'تكامل APIs'], en: ['React Native / Flutter', 'iOS & Android', 'Push notifications', 'API integration'], fr: ['React Native / Flutter', 'iOS & Android', 'Notifications push', 'Intégration API'] },
  },
  {
    titleAr: 'التسويق الرقمي',
    titleEn: 'Digital Marketing',
    titleFr: 'Marketing Digital',
    descAr: 'استراتيجيات تسويق مدفوعة بالبيانات تزيد من مدى وصولك وتفاعل جمهورك وتحويلاتك بشكل قابل للقياس.',
    descEn: 'Data-driven marketing strategies designed to increase reach, engagement, and conversions with measurable ROI.',
    descFr: 'Stratégies marketing basées sur les données pour augmenter votre portée et vos conversions.',
    icon: Megaphone,
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    features: { ar: ['إدارة وسائل التواصل', 'إعلانات مدفوعة (PPC)', 'تسويق بالمحتوى', 'تحليل المنافسين'], en: ['Social media management', 'Paid advertising (PPC)', 'Content marketing', 'Competitor analysis'], fr: ['Gestion réseaux sociaux', 'Publicité payante (PPC)', 'Marketing de contenu', 'Analyse concurrentielle'] },
  },
  {
    titleAr: 'تحسين محركات البحث',
    titleEn: 'SEO Optimization',
    titleFr: 'Optimisation SEO',
    descAr: 'تحسين متقدم لمحركات البحث يضمن اكتشاف علامتك التجارية من قبل الجمهور المستهدف في الوقت المناسب.',
    descEn: 'Advanced search engine optimization ensuring your brand gets discovered by the right audience at the right time.',
    descFr: 'Optimisation avancée des moteurs de recherche pour être découvert au bon moment.',
    icon: Search,
    color: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    features: { ar: ['بحث الكلمات المفتاحية', 'تحسين تقني', 'بناء الروابط', 'تقارير شهرية'], en: ['Keyword research', 'Technical SEO', 'Link building', 'Monthly reports'], fr: ['Recherche de mots-clés', 'SEO technique', 'Création de liens', 'Rapports mensuels'] },
  },
  {
    titleAr: 'الأمن السيبراني',
    titleEn: 'Cybersecurity',
    titleFr: 'Cybersécurité',
    descAr: 'حماية شاملة لمنصاتك الرقمية ضد التهديدات والهجمات السيبرانية لضمان استمرارية عملك.',
    descEn: 'Comprehensive protection for your digital platforms against cyber threats to ensure business continuity.',
    descFr: 'Protection complète de vos plateformes numériques contre les cybermenaces.',
    icon: Shield,
    color: 'from-red-500/20 to-rose-500/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
    features: { ar: ['اختبار الاختراق', 'SSL/HTTPS', 'نسخ احتياطي تلقائي', 'مراقبة مستمرة'], en: ['Penetration testing', 'SSL/HTTPS setup', 'Automated backups', 'Continuous monitoring'], fr: ['Tests de pénétration', 'Configuration SSL/HTTPS', 'Sauvegardes automatisées', 'Surveillance continue'] },
  },
];

const processSteps = {
  ar: [
    { num: '01', title: 'الاكتشاف', desc: 'نفهم احتياجاتك وأهدافك ونحلل السوق والمنافسين.' },
    { num: '02', title: 'التصميم', desc: 'نبني نماذج أولية وتصاميم مرئية للتأكد من رؤيتنا المشتركة.' },
    { num: '03', title: 'التطوير', desc: 'نبرمج باستخدام أحدث التقنيات مع مراجعات دورية.' },
    { num: '04', title: 'الإطلاق والدعم', desc: 'نطلق مشروعك ونقدم دعماً مستمراً لضمان نجاحه.' },
  ],
  en: [
    { num: '01', title: 'Discovery', desc: 'We understand your needs, goals, and analyze the market.' },
    { num: '02', title: 'Design', desc: 'We build prototypes and visual designs to align on a shared vision.' },
    { num: '03', title: 'Development', desc: 'We code using the latest technologies with periodic reviews.' },
    { num: '04', title: 'Launch & Support', desc: 'We launch your project and provide ongoing support.' },
  ],
  fr: [
    { num: '01', title: 'Découverte', desc: 'Nous comprenons vos besoins et analysons le marché.' },
    { num: '02', title: 'Design', desc: 'Nous créons des prototypes et des designs visuels.' },
    { num: '03', title: 'Développement', desc: 'Nous codons avec les dernières technologies.' },
    { num: '04', title: 'Lancement & Support', desc: 'Nous lançons votre projet et assurons le suivi.' },
  ],
};

const techStack = [
  { name: 'React', icon: '⚛️' }, { name: 'Next.js', icon: '▲' }, { name: 'Vue.js', icon: '💚' },
  { name: 'Node.js', icon: '🟢' }, { name: 'Python', icon: '🐍' }, { name: 'TypeScript', icon: '🔷' },
  { name: 'PostgreSQL', icon: '🐘' }, { name: 'MongoDB', icon: '🍃' }, { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' }, { name: 'Figma', icon: '🎨' }, { name: 'Flutter', icon: '💙' },
];

const Services = () => {
  const { t, language, setView } = useAppContext();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const steps = processSteps[language] || processSteps['en'];

  const getTitle = (svc) => language === 'ar' ? svc.titleAr : language === 'fr' ? svc.titleFr : svc.titleEn;
  const getDesc = (svc) => language === 'ar' ? svc.descAr : language === 'fr' ? svc.descFr : svc.descEn;
  const getFeatures = (svc) => svc.features[language] || svc.features['en'];

  return (
    <div className="section-fade-in">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-brand-cyan/8 blur-[100px] rounded-full" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-brand-purple/8 blur-[80px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              {language === 'ar' ? 'خدماتنا' : language === 'fr' ? 'Nos ' : 'Our '}
              <span className="text-gradient">{language === 'ar' ? '' : language === 'fr' ? 'Services' : 'Services'}</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              const features = getFeatures(service);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl p-7 border border-slate-200 dark:border-white/10 hover:border-brand-cyan/30 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-cyan/5"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border ${service.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={service.iconColor} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{getTitle(service)}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{getDesc(service)}</p>
                  <ul className="flex flex-col gap-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle size={14} className="text-brand-cyan flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 relative z-10 bg-slate-50 dark:bg-white/2">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">{t('ourProcess')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center border border-slate-200 dark:border-white/10 relative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-cyan/20">
                  {step.num}
                </div>
                <h4 className="font-black text-slate-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 rtl:-left-4 ltr:-right-4 z-10">
                    <ArrowIcon size={20} className="text-brand-cyan/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12">{t('techStack')}</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-5 py-2.5 glass rounded-full border border-slate-200 dark:border-white/10 hover:border-brand-cyan/40 transition-all cursor-default"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 border border-brand-cyan/20 shadow-xl shadow-brand-cyan/5"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'جاهز لبدء مشروعك؟' : language === 'fr' ? 'Prêt à démarrer?' : 'Ready to Start?'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              {language === 'ar' ? 'احجز استشارة مجانية مع فريقنا واكتشف كيف يمكننا تحويل رؤيتك إلى واقع رقمي مذهل.' : language === 'fr' ? 'Réservez une consultation gratuite et découvrez comment nous pouvons transformer votre vision.' : 'Book a free consultation and discover how we can turn your vision into digital reality.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(CAL_URL, '_blank')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                {language === 'ar' ? 'احجز استشارة مجانية' : language === 'fr' ? 'Consultation gratuite' : 'Book Free Consultation'}
                <ArrowIcon size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('work')}
                className="px-8 py-4 rounded-xl glass border border-slate-300 dark:border-white/20 font-bold text-slate-900 dark:text-white"
              >
                {language === 'ar' ? 'شاهد أعمالنا' : language === 'fr' ? 'Voir nos réalisations' : 'View Our Work'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;

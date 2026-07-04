import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Code, Lightbulb, Shield, ArrowRight, ArrowLeft, CheckCircle, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CAL_URL = 'https://cal.eu/jvlilb/30min';

const stats = [
  { valueAr: '150+', valueEn: '150+', labelAr: 'مشروع منجز', labelEn: 'Projects Delivered', labelFr: 'Projets livrés' },
  { valueAr: '50+', valueEn: '50+', labelAr: 'عميل سعيد', labelEn: 'Happy Clients', labelFr: 'Clients satisfaits' },
  { valueAr: '5+', valueEn: '5+', labelAr: 'سنوات خبرة', labelEn: 'Years Experience', labelFr: "Ans d'expérience" },
  { valueAr: '99%', valueEn: '99%', labelAr: 'معدل رضا العملاء', labelEn: 'Client Satisfaction', labelFr: 'Satisfaction client' },
];

const values = [
  {
    icon: Target,
    titleAr: 'الدقة والجودة', titleEn: 'Precision & Quality', titleFr: 'Précision & Qualité',
    descAr: 'نحن لا نقدم أقل من الكمال. كل سطر كود، كل بكسل في التصميم يُراجع بعناية فائقة.',
    descEn: 'We deliver nothing less than perfection. Every line of code, every pixel is meticulously reviewed.',
    descFr: 'Nous ne livrons rien de moins que la perfection.',
    color: 'from-brand-cyan/20 to-blue-500/20', border: 'border-brand-cyan/30', iconColor: 'text-brand-cyan',
  },
  {
    icon: Lightbulb,
    titleAr: 'الابتكار المستمر', titleEn: 'Continuous Innovation', titleFr: 'Innovation Continue',
    descAr: 'نواكب أحدث التقنيات ونطبق المعايير العالمية لضمان أن منتجاتك تظل في صدارة السوق.',
    descEn: 'We keep pace with the latest technologies ensuring your products remain at the forefront.',
    descFr: 'Nous suivons les dernières technologies pour que vos produits restent à la pointe.',
    color: 'from-brand-purple/20 to-pink-500/20', border: 'border-brand-purple/30', iconColor: 'text-brand-purple',
  },
  {
    icon: Heart,
    titleAr: 'الشراكة الحقيقية', titleEn: 'True Partnership', titleFr: 'Véritable Partenariat',
    descAr: 'نعتبر كل عميل شريكاً حقيقياً. نجاحك هو نجاحنا، وهدفك هو هدفنا.',
    descEn: 'We consider every client a true partner. Your success is our success.',
    descFr: 'Chaque client est un véritable partenaire. Votre succès est notre succès.',
    color: 'from-red-400/20 to-orange-400/20', border: 'border-red-400/30', iconColor: 'text-red-400',
  },
  {
    icon: Shield,
    titleAr: 'الموثوقية والأمان', titleEn: 'Reliability & Security', titleFr: 'Fiabilité & Sécurité',
    descAr: 'نضمن أمان منصاتك وموثوقيتها مع دعم مستمر لضمان استمرارية عملك.',
    descEn: 'We ensure security and reliability of your platforms with continuous support.',
    descFr: 'Nous garantissons la sécurité et la fiabilité de vos plateformes.',
    color: 'from-green-400/20 to-emerald-400/20', border: 'border-green-400/30', iconColor: 'text-green-400',
  },
];

const timeline = {
  ar: [
    { year: '2019', title: 'التأسيس', desc: 'انطلقت Honex كفريق صغير من المطورين المتحمسين في الجزائر العاصمة.' },
    { year: '2020', title: 'النمو الأول', desc: 'أكملنا أول 20 مشروع وبنينا قاعدة عملاء قوية في السوق المحلي.' },
    { year: '2022', title: 'التوسع الإقليمي', desc: 'وسّعنا نطاق خدماتنا لتشمل عملاء من تونس والمغرب والإمارات.' },
    { year: '2025', title: 'الريادة التقنية', desc: 'أصبحنا وكالة تقنية رائدة بأكثر من 150 مشروع ناجح و50+ عميل راضٍ.' },
  ],
  en: [
    { year: '2019', title: 'Founded', desc: 'Honex launched as a small team of passionate developers in Algiers, Algeria.' },
    { year: '2020', title: 'First Growth', desc: 'Completed our first 20 projects and built a strong client base in the local market.' },
    { year: '2022', title: 'Regional Expansion', desc: 'Extended services to clients in Tunisia, Morocco, and the UAE.' },
    { year: '2025', title: 'Tech Leadership', desc: 'Became a leading tech agency with 150+ successful projects and 50+ satisfied clients.' },
  ],
  fr: [
    { year: '2019', title: 'Fondation', desc: 'Honex a été lancé comme petite équipe à Alger, Algérie.' },
    { year: '2020', title: 'Première Croissance', desc: 'Nous avons terminé nos 20 premiers projets.' },
    { year: '2022', title: 'Expansion Régionale', desc: 'Services étendus à la Tunisie, au Maroc et aux Émirats arabes unis.' },
    { year: '2025', title: 'Leadership Tech', desc: 'Devenu une agence tech leader avec 150+ projets et 50+ clients.' },
  ],
};

const AboutUs = () => {
  const { t, language } = useAppContext();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const steps = timeline[language] || timeline['en'];

  const getLabel = (item, field) => item[`${field}${language === 'ar' ? 'Ar' : language === 'fr' ? 'Fr' : 'En'}`] || item[`${field}En`];

  return (
    <div className="section-fade-in">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-brand-cyan/6 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-brand-purple/6 blur-[80px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                {language === 'ar' ? 'من ' : 'Who '}
                <span className="text-gradient">{language === 'ar' ? 'نحن' : language === 'fr' ? 'Sommes-nous' : 'We Are'}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t('aboutSubtitle')}</p>
            </motion.div>

            {/* Story + Image */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  {language === 'ar' ? 'نبني مستقبلاً رقمياً' : language === 'fr' ? 'Construire l\'Avenir Numérique' : 'Building a Digital Future'}
                  <span className="text-gradient"> {language === 'ar' ? 'أفضل' : language === 'fr' ? 'Meilleur' : 'Together'}</span>
                </h2>
                <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                  <p>
                    {language === 'ar'
                      ? 'في Honex، نؤمن بأن البرمجيات الجيدة تُغيّر مسار الأعمال. منذ تأسيسنا عام 2019، عملنا مع شركات ناشئة ومؤسسات كبرى لبناء حلول رقمية متكاملة تُحقق نتائج حقيقية وقابلة للقياس.'
                      : language === 'fr'
                      ? 'Chez Honex, nous croyons que les bons logiciels changent la direction des entreprises. Depuis notre fondation en 2019, nous avons travaillé avec des startups et des grandes entreprises.'
                      : 'At Honex, we believe great software changes the direction of businesses. Since our founding in 2019, we\'ve worked with startups and enterprises to build integrated digital solutions.'}
                  </p>
                  <p>
                    {language === 'ar'
                      ? 'فريقنا من المطورين والمصممين والاستراتيجيين يعمل بشغف حقيقي لتحويل أفكارك إلى منتجات رقمية عالمية المستوى تنافس أضخم الشركات التقنية.'
                      : language === 'fr'
                      ? 'Notre équipe de développeurs, designers et stratèges travaille avec une véritable passion pour transformer vos idées en produits numériques de niveau mondial.'
                      : 'Our team of developers, designers, and strategists works with genuine passion to transform your ideas into world-class digital products.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  {stats.slice(0, 4).map((stat, i) => (
                    <div key={i} className="glass rounded-xl p-4 border border-slate-200 dark:border-white/10">
                      <div className="text-2xl font-black text-brand-cyan mb-1">{stat.valueEn}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {language === 'ar' ? stat.labelAr : language === 'fr' ? stat.labelFr : stat.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl glass p-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 rounded-3xl z-0" />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                    alt="Honex Team"
                    className="rounded-2xl object-cover w-full h-full relative z-10 opacity-85 dark:opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-cyan rounded-full blur-[40px] opacity-30 z-0" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-purple rounded-full blur-[50px] opacity-30 z-0" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 rtl:-right-6 ltr:-left-6 glass rounded-2xl p-4 border border-brand-cyan/30 shadow-xl shadow-brand-cyan/10 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                      <Award size={20} className="text-brand-cyan" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-sm">
                        {language === 'ar' ? 'وكالة موثوقة' : 'Trusted Agency'}
                      </div>
                      <div className="text-xs text-slate-400">Algeria 🇩🇿</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50 dark:bg-white/2 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">{t('ourValues')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((val, i) => {
              const Icon = val.icon;
              const title = language === 'ar' ? val.titleAr : language === 'fr' ? val.titleFr : val.titleEn;
              const desc = language === 'ar' ? val.descAr : language === 'fr' ? val.descFr : val.descEn;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-brand-cyan/30 transition-all hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} border ${val.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={val.iconColor} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white mb-2 text-base">{title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">{t('ourStory')}</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute rtl:right-6 ltr:left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-cyan to-brand-purple" />

              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 mb-10 rtl:pr-16 ltr:pl-16 md:rtl:pr-0 md:ltr:pl-0"
                >
                  {/* Dot */}
                  <div className="absolute rtl:right-0 ltr:left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white font-black text-xs shadow-lg shadow-brand-cyan/20 z-10">
                    {step.year.slice(2)}
                  </div>

                  <div className={`md:w-1/2 glass rounded-2xl p-5 border border-slate-200 dark:border-white/10 ${
                    i % 2 === 0 ? 'md:me-auto md:text-start' : 'md:ms-auto md:text-start'
                  }`}>
                    <div className="text-brand-cyan font-black text-sm mb-1">{step.year}</div>
                    <div className="font-black text-slate-900 dark:text-white mb-2">{step.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass rounded-3xl p-12 text-center border border-brand-purple/20 shadow-xl shadow-brand-purple/5"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-cyan/30">
              <Target size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'مهمتنا' : language === 'fr' ? 'Notre Mission' : 'Our Mission'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-lg">
              {language === 'ar'
                ? 'تمكين الشركات الجزائرية والعربية من المنافسة عالمياً من خلال تقنية عالمية المستوى وبأسعار في متناول الجميع.'
                : language === 'fr'
                ? 'Permettre aux entreprises algériennes et arabes de concourir à l\'échelle mondiale grâce à une technologie de classe mondiale.'
                : 'Empowering Algerian and Arabic companies to compete globally through world-class technology at accessible prices.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(CAL_URL, '_blank')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-lg shadow-lg flex items-center gap-2 mx-auto"
            >
              {language === 'ar' ? 'ابدأ مشروعك اليوم' : language === 'fr' ? 'Démarrez votre projet' : 'Start Your Project Today'}
              <ArrowIcon size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

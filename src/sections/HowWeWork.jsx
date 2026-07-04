import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const steps = [
  {
    icon: Search,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-brand-cyan',
    titleAr: '1. الاكتشاف والتحليل',
    titleEn: '1. Discovery & Analysis',
    titleFr: '1. Découverte et Analyse',
    descAr: 'نجتمع معك لفهم رؤيتك، أهدافك، وجمهورك المستهدف. نقوم بتحليل السوق والمنافسين لنضع استراتيجية رقمية متكاملة تضمن نجاحك.',
    descEn: 'We meet with you to understand your vision, goals, and target audience. We analyze the market and competitors to build a comprehensive digital strategy.',
    descFr: 'Nous vous rencontrons pour comprendre votre vision et vos objectifs. Nous analysons le marché pour élaborer une stratégie numérique complète.',
  },
  {
    icon: PenTool,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-brand-purple',
    titleAr: '2. التصميم وتجربة المستخدم',
    titleEn: '2. UI/UX Design',
    titleFr: '2. Design UI/UX',
    descAr: 'نصمم واجهات مستخدم جذابة وتجارب سلسة. نُقدم لك نماذج أولية تفاعلية لتتمكن من رؤية وتجربة المنتج قبل كتابة أي سطر كود.',
    descEn: 'We design stunning interfaces and seamless experiences. We provide interactive prototypes so you can see and feel the product before coding begins.',
    descFr: 'Nous concevons des interfaces époustouflantes et des expériences fluides avec des prototypes interactifs.',
  },
  {
    icon: Code2,
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    titleAr: '3. التطوير والبرمجة',
    titleEn: '3. Development & Coding',
    titleFr: '3. Développement',
    descAr: 'يقوم مهندسونا بتحويل التصاميم إلى منتجات رقمية حية باستخدام أحدث التقنيات وأفضل الممارسات لضمان السرعة والأمان.',
    descEn: 'Our engineers turn designs into live digital products using the latest technologies and best practices to ensure speed and security.',
    descFr: 'Nos ingénieurs transforment les designs en produits numériques en utilisant les dernières technologies.',
  },
  {
    icon: Rocket,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    titleAr: '4. الإطلاق والدعم',
    titleEn: '4. Launch & Support',
    titleFr: '4. Lancement et Support',
    descAr: 'بعد اختبارات الجودة الصارمة، نُطلق مشروعك للعالم. لكن عملنا لا ينتهي هنا، نحن مستمرون في دعمك وتطوير منتجك.',
    descEn: 'After rigorous QA testing, we launch your project to the world. But our work doesn\'t end there; we continue to support and grow your product.',
    descFr: 'Après des tests rigoureux, nous lançons votre projet. Notre travail continue avec un support continu.',
  },
];

const HowWeWork = () => {
  const { t, language } = useAppContext();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getTitle = (item) => language === 'ar' ? item.titleAr : language === 'fr' ? item.titleFr : item.titleEn;
  const getDesc = (item) => language === 'ar' ? item.descAr : language === 'fr' ? item.descFr : item.descEn;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t('howWeWorkTitle')}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('howWeWorkSubtitle')}
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-12 left-1/8 right-1/8 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Circle */}
                <div className="flex justify-center mb-6 relative">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} glass border border-white/10 flex items-center justify-center shadow-lg relative z-10`}>
                    <Icon size={40} className={step.iconColor} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-8 rtl:-left-8 rtl:right-auto rtl:rotate-180 z-20">
                      <ArrowRight size={24} className="text-slate-300 dark:text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="text-center glass p-6 rounded-2xl h-[calc(100%-120px)] border border-slate-200 dark:border-white/10">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                    {getTitle(step)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {getDesc(step)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

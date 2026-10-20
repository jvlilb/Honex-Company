import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Puzzle, Layers, Monitor, Star, ShoppingBag, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import EcommercePortfolioSection from '../components/EcommercePortfolioSection';

// ─────────────────────────────────────────────
// Centralized Project Data Array
// ─────────────────────────────────────────────
const honexProjects = [
  // ── 2 Websites ──────────────────────────────
  {
    id: 1,
    category: 'website',
    titleAr: 'لومينا — وكالة إبداعية',
    titleEn: 'Lumina Creative Agency',
    titleFr: 'Lumina Agence Créative',
    descAr: 'موقع وكالة إبداعية راقي بتأثيرات بصرية ثلاثية الأبعاد، وتجربة تمرير سينمائية مع حركات متقنة.',
    descEn: 'A high-end creative agency site with 3D visual effects, cinematic scroll experience, and refined animations.',
    descFr: 'Site d\'agence créative haut de gamme avec effets visuels 3D et expérience de défilement cinématique.',
    placeholder_image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['تصميم بصري ثلاثي الأبعاد', 'تأثيرات بارالاكس', 'رسوم متحركة Framer Motion', 'دعم متعدد اللغات', 'تحسين SEO'],
      en: ['3D visual design', 'Parallax effects', 'Framer Motion animations', 'Multi-language support', 'SEO optimization'],
      fr: ['Design visuel 3D', 'Effets de parallaxe', 'Animations Framer Motion', 'Support multilingue', 'Optimisation SEO'],
    },
    tech: ['React', 'Tailwind', 'Framer Motion'],
    color: 'from-cyan-500 to-blue-600',
    mock_demo_content: {
      type: 'website',
      bgColor: '#0a0a1a',
      accentColor: '#00f0ff',
      headline: 'LUMINA',
      subheadline: 'Creative Agency',
      navItems: ['Home', 'Work', 'About', 'Contact'],
      sections: [
        { title: 'Our Work', items: ['Brand Identity', 'Web Design', 'Motion Graphics'] },
        { title: 'Process', items: ['Discovery', 'Design', 'Develop', 'Deploy'] },
      ],
    },
  },
  {
    id: 2,
    category: 'website',
    titleAr: 'ريالتي برو — عقارات فاخرة',
    titleEn: 'RealtyPro — Luxury Properties',
    titleFr: 'RealtyPro — Propriétés de Luxe',
    descAr: 'منصة عقارية راقية بواجهة بحث تفاعلية متقدمة، خرائط تفاعلية، وتصاميم بصرية تعكس الفخامة.',
    descEn: 'A premium real estate platform with advanced interactive search, dynamic maps, and luxury-grade visual design.',
    descFr: 'Plateforme immobilière premium avec recherche interactive avancée et design visuel de luxe.',
    placeholder_image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['بحث تفاعلي متقدم', 'خرائط Google تفاعلية', 'نظام تصفية ذكي', 'معرض صور 360°', 'لوحة إدارة عقارات'],
      en: ['Advanced interactive search', 'Google Maps integration', 'Smart filtering system', '360° image gallery', 'Property admin panel'],
      fr: ['Recherche interactive avancée', 'Intégration Google Maps', 'Système de filtrage intelligent', 'Galerie 360°', 'Panneau admin'],
    },
    tech: ['Next.js', 'PostgreSQL', 'Maps API'],
    color: 'from-amber-500 to-orange-600',
    mock_demo_content: {
      type: 'website',
      bgColor: '#1a1205',
      accentColor: '#f59e0b',
      headline: 'RealtyPro',
      subheadline: 'Luxury Properties',
      navItems: ['Properties', 'Agents', 'Blog', 'Contact'],
      sections: [
        { title: 'Featured', items: ['Villa Azur — 4 BDR', 'Penthouse Elite', 'Garden Residence'] },
        { title: 'Stats', items: ['2,400+ Listings', '98% Client Sat.', '12 Years Exp.'] },
      ],
    },
  },
  // ── 2 Web Apps ──────────────────────────────
  {
    id: 3,
    category: 'webapp',
    titleAr: 'نكسس داشبورد — تحليلات الأعمال',
    titleEn: 'Nexus Dashboard — Business Analytics',
    titleFr: 'Nexus Dashboard — Analyse Commerciale',
    descAr: 'منصة تحليلات أعمال متقدمة مع رسوم بيانية تفاعلية حية، تقارير تلقائية، وتكامل مع APIs متعددة.',
    descEn: 'Advanced business analytics platform with live interactive charts, automated reports, and multi-API integration.',
    descFr: 'Plateforme d\'analyse avancée avec graphiques interactifs en direct et rapports automatisés.',
    placeholder_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['رسوم بيانية حية مع Recharts', 'تقارير PDF تلقائية', 'إدارة الفريق وصلاحياتهم', 'تكامل Stripe للمدفوعات', 'تنبيهات ذكية'],
      en: ['Live charts with Recharts', 'Auto PDF reports', 'Team & role management', 'Stripe payment integration', 'Smart alerts'],
      fr: ['Graphiques en direct', 'Rapports PDF auto', 'Gestion équipe & rôles', 'Intégration Stripe', 'Alertes intelligentes'],
    },
    tech: ['React', 'Node.js', 'MongoDB', 'Recharts'],
    color: 'from-purple-500 to-indigo-600',
    mock_demo_content: {
      type: 'webapp',
      bgColor: '#0d0d1f',
      accentColor: '#b026ff',
      headline: 'Nexus',
      subheadline: 'Business Intelligence',
      navItems: ['Dashboard', 'Reports', 'Team', 'Settings'],
      metrics: [
        { label: 'Revenue', value: '847K', change: '+12.4%', up: true },
        { label: 'Users', value: '24,891', change: '+5.2%', up: true },
        { label: 'Conv. Rate', value: '3.8%', change: '-0.3%', up: false },
        { label: 'Avg. Order', value: '$124', change: '+8.1%', up: true },
      ],
    },
  },
  {
    id: 4,
    category: 'webapp',
    titleAr: 'إيدو لرن — منصة تعليم إلكتروني',
    titleEn: 'EduLearn — Online Education Platform',
    titleFr: 'EduLearn — Plateforme E-Learning',
    descAr: 'منصة تعليم إلكتروني شاملة مع فيديو مباشر، نظام اختبارات ذكي، وتتبع تقدم الطلاب بالذكاء الاصطناعي.',
    descEn: 'Full e-learning platform with live video, AI-powered quiz system, and intelligent student progress tracking.',
    descFr: 'Plateforme e-learning complète avec vidéo en direct, quiz IA et suivi de progression.',
    placeholder_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['فيديو مباشر WebRTC', 'اختبارات بالذكاء الاصطناعي', 'تتبع التقدم التفصيلي', 'شهادات رقمية آمنة', 'منتدى نقاش تفاعلي'],
      en: ['WebRTC live video', 'AI-powered quizzes', 'Detailed progress tracking', 'Secure digital certificates', 'Interactive forum'],
      fr: ['Vidéo en direct WebRTC', 'Quiz IA', 'Suivi de progression', 'Certificats numériques', 'Forum interactif'],
    },
    tech: ['Next.js', 'WebRTC', 'AI/ML', 'PostgreSQL'],
    color: 'from-green-500 to-teal-600',
    mock_demo_content: {
      type: 'webapp',
      bgColor: '#051a10',
      accentColor: '#10b981',
      headline: 'EduLearn',
      subheadline: 'Learn Without Limits',
      navItems: ['Courses', 'Live', 'Progress', 'Community'],
      metrics: [
        { label: 'Courses', value: '1,240', change: '+23 this week', up: true },
        { label: 'Students', value: '89K', change: '+1.2K', up: true },
        { label: 'Completion', value: '78%', change: '+4%', up: true },
        { label: 'Rating', value: '4.9★', change: 'Top rated', up: true },
      ],
    },
  },
  // ── 2 Plugins ───────────────────────────────
  {
    id: 5,
    category: 'plugin',
    titleAr: 'سمارت فورمز — إضافة نماذج ذكية',
    titleEn: 'SmartForms — AI Form Builder Plugin',
    titleFr: 'SmartForms — Plugin de Formulaires IA',
    descAr: 'إضافة متصفح تبني نماذج ذكية بالذكاء الاصطناعي، تحلل بيانات المستخدمين وتُحسّن معدلات التحويل تلقائياً.',
    descEn: 'Browser plugin that builds AI-powered smart forms, analyzes user data, and automatically improves conversion rates.',
    descFr: 'Plugin navigateur qui construit des formulaires intelligents IA et améliore automatiquement les conversions.',
    placeholder_image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['بناء نماذج بالذكاء الاصطناعي', 'تحليل سلوك المستخدم', 'A/B Testing تلقائي', 'تصدير البيانات CSV/JSON', 'تكامل مع CRM'],
      en: ['AI form builder', 'User behavior analysis', 'Automatic A/B testing', 'CSV/JSON data export', 'CRM integration'],
      fr: ['Générateur de formulaires IA', 'Analyse comportementale', 'A/B testing automatique', 'Export CSV/JSON', 'Intégration CRM'],
    },
    tech: ['TypeScript', 'Chrome APIs', 'OpenAI'],
    color: 'from-pink-500 to-rose-600',
    mock_demo_content: {
      type: 'plugin',
      bgColor: '#1a0512',
      accentColor: '#ec4899',
      headline: 'SmartForms',
      subheadline: 'AI Form Builder',
      navItems: ['Builder', 'Analytics', 'Templates', 'Settings'],
      pluginUI: {
        title: 'AI Form Generator',
        input: 'Describe your form...',
        fields: ['Full Name', 'Email Address', 'Company Size', 'Budget Range'],
        actions: ['Generate with AI', 'Preview', 'Export'],
      },
    },
  },
  {
    id: 6,
    category: 'plugin',
    titleAr: 'سيو بوست — إضافة تحسين محركات البحث',
    titleEn: 'SEO Boost — Chrome SEO Analyzer Plugin',
    titleFr: 'SEO Boost — Plugin Analyseur SEO Chrome',
    descAr: 'إضافة كروم احترافية تُحلل أي صفحة ويب فوراً وتقدم توصيات SEO تفصيلية وتقارير منافسين.',
    descEn: 'Professional Chrome extension that instantly analyzes any webpage and provides detailed SEO recommendations and competitor reports.',
    descFr: 'Extension Chrome professionnelle qui analyse instantanément n\'importe quelle page et fournit des recommandations SEO.',
    placeholder_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1280&auto=format&fit=crop',
    features: {
      ar: ['تحليل SEO فوري', 'فحص الكلمات المفتاحية', 'تقرير منافسين مفصل', 'اقتراحات Meta تلقائية', 'مراقبة الروابط'],
      en: ['Instant SEO analysis', 'Keyword density check', 'Competitor report', 'Auto Meta suggestions', 'Link monitoring'],
      fr: ['Analyse SEO instantanée', 'Vérification densité mots-clés', 'Rapport concurrentiel', 'Suggestions Meta auto', 'Surveillance des liens'],
    },
    tech: ['JavaScript', 'Chrome APIs', 'REST APIs'],
    color: 'from-yellow-500 to-orange-500',
    mock_demo_content: {
      type: 'plugin',
      bgColor: '#1a1000',
      accentColor: '#f59e0b',
      headline: 'SEO Boost',
      subheadline: 'Chrome Extension',
      navItems: ['Analysis', 'Keywords', 'Competitors', 'Reports'],
      pluginUI: {
        title: 'Page SEO Score',
        score: 87,
        fields: ['Title Tag ✓', 'Meta Description ✓', 'H1 Structure ✓', 'Image Alt Tags ⚠'],
        actions: ['Full Report', 'Fix Issues', 'Export PDF'],
      },
    },
  },
];

// ─────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────
const ProjectCard = ({ project, onPreview }) => {
  const { t, language } = useAppContext();

  const title = language === 'ar' ? project.titleAr : language === 'fr' ? project.titleFr : project.titleEn;
  const desc = language === 'ar' ? project.descAr : language === 'fr' ? project.descFr : project.descEn;
  const catLabel = {
    website: t('filterWebsite'),
    webapp: t('filterWebApp'),
    plugin: t('filterPlugin'),
  }[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group glass rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.placeholder_image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
          <span className={`px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${project.color} shadow-lg`}>
            {catLabel}
          </span>
        </div>

        {/* Tech stack */}
        <div className={`absolute bottom-4 ${language === 'ar' ? 'right-4' : 'left-4'} flex gap-1.5`}>
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2">{desc}</p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onPreview(project)}
          className={`w-full py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${project.color} shadow-md hover:shadow-lg transition-shadow`}
        >
          {t('livePreview')} →
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Modal — Simulated Live Preview
// ─────────────────────────────────────────────
const PreviewModal = ({ project, onClose }) => {
  const { t, language } = useAppContext();
  const demo = project.mock_demo_content;
  const title = language === 'ar' ? project.titleAr : language === 'fr' ? project.titleFr : project.titleEn;
  const features = project.features[language] || project.features['en'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
              {project.category === 'website' && <Globe size={18} className="text-white" />}
              {project.category === 'webapp' && <Monitor size={18} className="text-white" />}
              {project.category === 'plugin' && <Puzzle size={18} className="text-white" />}
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">{title}</h3>
              <p className="text-xs text-slate-400">{project.tech.join(' · ')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto">
          <div className="grid lg:grid-cols-5 gap-0 h-full">

            {/* Simulated Preview Viewport */}
            <div className="lg:col-span-3 relative" style={{ backgroundColor: demo.bgColor, minHeight: '420px' }}>

              {/* Browser chrome mock */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/30">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-3 bg-white/10 rounded-md px-3 py-1 text-[10px] text-white/50 flex items-center gap-1">
                  <span className="text-green-400">🔒</span>
                  <span>honex.dz/{project.id === 1 ? 'lumina' : project.id === 2 ? 'realtypro' : project.id === 3 ? 'nexus' : project.id === 4 ? 'edulearn' : project.id === 5 ? 'smartforms' : 'seoboost'}</span>
                </div>
                <ExternalLink size={12} className="text-white/30" />
              </div>

              {/* Simulated App Content */}
              <div className="p-4 h-full">
                {/* Navbar mock */}
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="font-black text-lg" style={{ color: demo.accentColor }}>
                    {demo.headline}<span className="text-white/60 font-light text-xs ms-1">{demo.subheadline}</span>
                  </div>
                  <div className="hidden md:flex gap-4">
                    {demo.navItems.map((item) => (
                      <span key={item} className="text-white/50 text-xs hover:text-white cursor-default transition-colors">{item}</span>
                    ))}
                  </div>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: demo.accentColor }} />
                </div>

                {/* Content based on type */}
                {(demo.type === 'website') && (
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <div className="text-3xl font-black text-white mb-2">{demo.headline}</div>
                      <div className="text-sm text-white/40 mb-4">{demo.subheadline}</div>
                      <div className="flex justify-center gap-3">
                        <div className="px-5 py-2 rounded-full text-xs font-bold text-black" style={{ backgroundColor: demo.accentColor }}>Get Started</div>
                        <div className="px-5 py-2 rounded-full text-xs font-bold text-white border border-white/20">Learn More</div>
                      </div>
                    </div>
                    {demo.sections.map((sec) => (
                      <div key={sec.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-xs font-black text-white/60 uppercase tracking-widest mb-3">{sec.title}</div>
                        <div className="grid grid-cols-3 gap-2">
                          {sec.items.map((item) => (
                            <div key={item} className="bg-white/5 rounded-lg px-3 py-2 text-xs text-white/70 text-center border border-white/5">{item}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(demo.type === 'webapp') && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {demo.metrics.map((metric) => (
                        <div key={metric.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="text-[10px] text-white/40 mb-1">{metric.label}</div>
                          <div className="text-lg font-black text-white">{metric.value}</div>
                          <div className={`text-[10px] font-bold mt-1 ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.up ? '↑' : '↓'} {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Mock chart */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-xs text-white/40 mb-3">Analytics Overview</div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm opacity-80 transition-all"
                            style={{ height: `${h}%`, backgroundColor: demo.accentColor }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-xs text-white/40 mb-2">Recent Activity</div>
                      {['User signup: Ahmed M.', 'Payment: $249 received', 'Report generated'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: demo.accentColor }} />
                          <span className="text-[11px] text-white/60">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(demo.type === 'plugin') && (
                  <div className="max-w-xs mx-auto">
                    <div className="bg-white/8 rounded-2xl p-5 border border-white/10 shadow-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: demo.accentColor }}>
                          <Puzzle size={12} className="text-white" />
                        </div>
                        <div className="font-black text-sm text-white">{demo.headline}</div>
                      </div>

                      {demo.pluginUI.score !== undefined && (
                        <div className="text-center mb-4">
                          <div className="text-4xl font-black" style={{ color: demo.accentColor }}>{demo.pluginUI.score}</div>
                          <div className="text-xs text-white/40">SEO Score / 100</div>
                          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${demo.pluginUI.score}%`, backgroundColor: demo.accentColor }} />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        {demo.pluginUI.fields.map((field, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: demo.accentColor }} />
                            <span className="text-xs text-white/70">{field}</span>
                          </div>
                        ))}
                      </div>

                      {demo.pluginUI.actions.map((action, i) => (
                        <div
                          key={i}
                          className={`w-full py-2 rounded-lg text-xs font-bold text-center mb-2 cursor-default ${
                            i === 0 ? 'text-black' : 'border border-white/20 text-white/60'
                          }`}
                          style={i === 0 ? { backgroundColor: demo.accentColor } : {}}
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features Panel */}
            <div className="lg:col-span-2 p-6 flex flex-col gap-5 border-t lg:border-t-0 lg:border-s border-slate-200 dark:border-white/10 overflow-y-auto">
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base mb-1">{t('viewFeatures')}</h4>
                <p className="text-xs text-slate-400">{language === 'ar' ? project.descAr : language === 'fr' ? project.descFr : project.descEn}</p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br ${project.color}`}>
                      <Star size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${project.color}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open('https://cal.eu/jvlilb/30min', '_blank')}
                className={`mt-auto w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${project.color} shadow-lg`}
              >
                {language === 'ar' ? 'ابدأ مشروعاً مشابهاً' : language === 'fr' ? 'Démarrer un projet similaire' : 'Start a Similar Project'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Work Component
// ─────────────────────────────────────────────
// Main Work Component
// ─────────────────────────────────────────────
const Work = ({ isHome = false }) => {
  const { t, language, setView } = useAppContext();
  const [activeSection, setActiveSection] = useState('ecommerce'); // 'ecommerce' | 'custom'
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { key: 'all', label: t('filterAll'), icon: Layers },
    { key: 'website', label: t('filterWebsite'), icon: Globe },
    { key: 'webapp', label: t('filterWebApp'), icon: Monitor },
    { key: 'plugin', label: t('filterPlugin'), icon: Puzzle },
  ];

  const filtered = activeFilter === 'all'
    ? honexProjects
    : honexProjects.filter((p) => p.category === activeFilter);

  // If on homepage, only show first 3 projects
  const displayedProjects = isHome ? filtered.slice(0, 3) : filtered;

  return (
    <div className={isHome ? "py-24 relative overflow-hidden bg-slate-50 dark:bg-white/2" : "section-fade-in"}>
      {/* Hero Banner (Only on dedicated page) */}
      {!isHome && (
        <section className="relative pt-32 pb-14 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-brand-purple/8 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-brand-cyan/8 blur-[90px] rounded-full" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-cyan/30 text-brand-cyan text-xs font-black mb-4">
                <Sparkles size={14} />
                <span>معرض الأعمال والنماذج التفاعلية</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-5">
                {language === 'ar' ? 'أعمالنا ' : 'Our '}
                <span className="text-gradient">{language === 'ar' ? 'المتميزة والنماذج' : language === 'fr' ? 'Réalisations' : 'Portfolio'}</span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                اكتشف مجموعة من 10 نماذج متاجر إلكترونية حية قابلة للتصفح والشراء التجريبي، بالإضافة إلى مشاريع وتطبيقات الويب المخصصة.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Simple Header for Homepage */}
      {isHome && (
        <div className="container mx-auto px-6 relative z-10 text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              {t('ourWork')}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              تصفح نماذج المتاجر الإلكترونية التفاعلية ومشاريعنا التقنية المصممة بأعلى معايير الأداء والجمال.
            </p>
          </motion.div>
        </div>
      )}

      {/* Main Showcase Switcher Tabs */}
      <div className="container mx-auto px-6 relative z-10 mb-10">
        <div className="max-w-md mx-auto p-1.5 rounded-2xl glass border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 shadow-sm">
          <button
            onClick={() => setActiveSection('ecommerce')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeSection === 'ecommerce'
                ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-md shadow-brand-cyan/20 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag size={16} />
            <span>المتاجر الإلكترونية (10 نماذج)</span>
          </button>

          <button
            onClick={() => setActiveSection('custom')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeSection === 'custom'
                ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-md shadow-brand-cyan/20 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor size={16} />
            <span>الأنظمة والمواقع المخصصة</span>
          </button>
        </div>
      </div>

      {/* ── SECTION 1: E-COMMERCE DEMO STOREFRONTS (10 STORES) ─────────────── */}
      {activeSection === 'ecommerce' ? (
        <section className="container mx-auto px-6 relative z-10">
          <EcommercePortfolioSection isHome={isHome} onNavigateAll={() => setView('work')} />
        </section>
      ) : (
        /* ── SECTION 2: CUSTOM SOFTWARE & WEB APPS ───────────────────────── */
        <>
          {/* Filter Tabs for Custom Projects */}
          <section className="pb-6 relative z-10">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-250 ${
                      activeFilter === key
                        ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-lg shadow-brand-cyan/25'
                        : 'glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-brand-cyan/30'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === key ? 'bg-white/20' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                      {key === 'all' ? honexProjects.length : honexProjects.filter(p => p.category === key).length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-6 relative z-10">
            <div className="container mx-auto px-6">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {displayedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onPreview={setSelectedProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* View All Button for Homepage */}
      {isHome && (
        <div className="text-center mt-12 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('work')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold shadow-lg shadow-brand-cyan/25 inline-flex items-center gap-2"
          >
            {t('viewAllWork')}
          </motion.button>
        </div>
      )}

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedProject && (
          <PreviewModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;

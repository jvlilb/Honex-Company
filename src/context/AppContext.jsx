import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const USD_RATE = 135; // 1 USD = 135 DZD

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [activeView, setActiveView] = useState('home');
  const [currency, setCurrency] = useState('DZD');
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const changeLanguage = (lang) => setLanguage(lang);
  const setView = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleCurrency = () => setCurrency(prev => prev === 'DZD' ? 'USD' : 'DZD');
  const toggleBilling = () => setBilling(prev => prev === 'monthly' ? 'yearly' : 'monthly');

  const formatPrice = (dzdAmount) => {
    if (currency === 'USD') {
      const usd = Math.round(dzdAmount / USD_RATE);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `${dzdAmount.toLocaleString('ar-DZ')} دج`;
  };

  const value = {
    language,
    theme,
    toggleTheme,
    changeLanguage,
    activeView,
    setView,
    currency,
    toggleCurrency,
    billing,
    toggleBilling,
    formatPrice,
    t: (key) => translations[language]?.[key] || translations['ar'][key] || key,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

const translations = {
  ar: {
    // Nav
    home: 'الرئيسية',
    services: 'خدماتنا',
    portfolio: 'أعمالنا',
    pricing: 'الأسعار',
    about: 'من نحن',
    privacy: 'سياسة الخصوصية',
    contactUs: 'اتصل بنا',
    contactNav: 'اتصل بنا',
    // Hero
    startProject: 'ابدأ مشروع',
    bookConsult: 'احجز استشارة',
    getStarted: 'تواصل معنا',
    heroTitle1: 'نبني المستقبل',
    heroTitle2: 'الرقمي لشركتك',
    heroSubtitle: 'نقدم حلولاً برمجية مبتكرة وتصاميم استثنائية ترتقي بعلامتك التجارية إلى آفاق جديدة.',
    // Marquee
    trustedBy: 'شركات عالمية ومحلية وثقت فينا',
    moreCompanies: '+50 شركة أخرى',
    ctaSmall: 'احجز استشارة',
    // Pricing
    pricingTitle: 'الأسعار',
    pricingPageTitle: 'خطط الأسعار',
    pricingSubtitle: 'حلول مرنة تناسب كل مرحلة من مراحل نمو مشروعك',
    starterPlan: 'الباقة الأساسية',
    growthPlan: 'باقة النمو',
    enterprisePlan: 'الباقة المتقدمة',
    mostPopular: 'الأكثر طلباً',
    getStartedPlan: 'ابدأ الآن',
    contactSales: 'تواصل مع الفريق',
    monthly: 'شهرياً',
    yearly: 'سنوياً',
    billingMonthly: 'شهري',
    billingYearly: 'سنوي',
    saveYearly: 'وفر 20%',
    // Why Us
    whyUsTitle: 'لماذا Honex؟',
    whyUsSubtitle: 'ما يميزنا عن غيرنا في السوق',
    // Work
    ourWork: 'أعمالنا',
    ourWorkSubtitle: 'محفظة مختارة من مشاريعنا المتميزة التي صممناها وطورناها لعملاء من مختلف القطاعات.',
    filterAll: 'الكل',
    filterWebsite: 'مواقع',
    filterWebApp: 'تطبيقات',
    filterPlugin: 'إضافات',
    livePreview: 'معاينة مباشرة',
    viewFeatures: 'المميزات',
    closeModal: 'إغلاق',
    viewAllWork: 'عرض كل الأعمال',
    // Testimonials
    testimonialsTitle: 'آراء عملائنا',
    testimonialsSubtitle: 'ماذا يقول عملاؤنا عن تجربتهم معنا',
    // How We Work
    howWeWorkTitle: 'كيف نعمل؟',
    howWeWorkSubtitle: 'منهجية واضحة وشفافة من الفكرة إلى الإطلاق',
    // Contact
    contactTitle: 'هل أنت جاهز لبناء مشروعك؟',
    contactSubtitle: 'تواصل معنا اليوم وسنرد عليك خلال 24 ساعة',
    yourName: 'الاسم الكامل',
    yourEmail: 'البريد الإلكتروني',
    yourMessage: 'تفاصيل مشروعك',
    sendMessage: 'أرسل الرسالة',
    namePlaceholder: 'أحمد محمد',
    emailPlaceholder: 'ahmed@example.com',
    messagePlaceholder: 'أخبرنا عن مشروعك، ميزانيتك، وتوقعاتك...',
    messageSent: '✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    contactPageTitle: 'تواصل معنا',
    contactPageSubtitle: 'نحن هنا للإجابة على كل استفساراتك',
    // Footer
    allRights: '© 2026 Honex Company. جميع الحقوق محفوظة.',
    followUs: 'تابعنا',
    // Services page
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'نقدم مجموعة شاملة من الخدمات الرقمية المصممة لرفع مستوى حضورك على الإنترنت وتحقيق نتائج قابلة للقياس.',
    ourProcess: 'آلية عملنا',
    techStack: 'التقنيات التي نعتمدها',
    // About page
    aboutTitle: 'من نحن',
    aboutSubtitle: 'قصة شغف بالتقنية وإيمان بأن البرمجيات تُغيّر العالم',
    ourMission: 'مهمتنا',
    ourValues: 'قيمنا',
    ourTeam: 'فريقنا',
    ourStory: 'قصتنا',
    // Privacy
    privacyTitle: 'سياسة الخصوصية',
    privacySubtitle: 'نلتزم بحماية خصوصيتك وأمان بياناتك',
  },
  en: {
    // Nav
    home: 'Home',
    services: 'Services',
    portfolio: 'Our Work',
    pricing: 'Pricing',
    about: 'About Us',
    privacy: 'Privacy Policy',
    contactUs: 'Contact Us',
    contactNav: 'Contact Us',
    // Hero
    startProject: 'Start a Project',
    bookConsult: 'Book a Consultation',
    getStarted: 'Contact Us',
    heroTitle1: 'Building the Future',
    heroTitle2: 'Digital for You',
    heroSubtitle: 'We provide innovative software solutions and exceptional designs that elevate your brand to new heights.',
    // Marquee
    trustedBy: 'Global and Local Companies That Trusted Us',
    moreCompanies: '+50 more companies',
    ctaSmall: 'Book Consultation',
    // Pricing
    pricingTitle: 'Pricing',
    pricingPageTitle: 'Pricing Plans',
    pricingSubtitle: 'Flexible solutions for every stage of your business growth',
    starterPlan: 'Starter',
    growthPlan: 'Growth',
    enterprisePlan: 'Enterprise',
    mostPopular: 'Most Popular',
    getStartedPlan: 'Get Started',
    contactSales: 'Contact Sales',
    monthly: '/month',
    yearly: '/year',
    billingMonthly: 'Monthly',
    billingYearly: 'Yearly',
    saveYearly: 'Save 20%',
    // Why Us
    whyUsTitle: 'Why Honex?',
    whyUsSubtitle: 'What sets us apart in the market',
    // Work
    ourWork: 'Our Work',
    ourWorkSubtitle: 'A curated portfolio of our standout projects designed and developed for clients across various industries.',
    filterAll: 'All',
    filterWebsite: 'Websites',
    filterWebApp: 'Web Apps',
    filterPlugin: 'Plugins',
    livePreview: 'Live Preview',
    viewFeatures: 'Features',
    closeModal: 'Close',
    viewAllWork: 'View All Work',
    // Testimonials
    testimonialsTitle: 'Client Testimonials',
    testimonialsSubtitle: 'What our clients say about working with us',
    // How We Work
    howWeWorkTitle: 'How We Work',
    howWeWorkSubtitle: 'A clear, transparent methodology from idea to launch',
    // Contact
    contactTitle: 'Ready to Build Your Project?',
    contactSubtitle: "Reach out today and we'll respond within 24 hours",
    yourName: 'Full Name',
    yourEmail: 'Email Address',
    yourMessage: 'Project Details',
    sendMessage: 'Send Message',
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    messagePlaceholder: 'Tell us about your project, budget, and expectations...',
    messageSent: "✓ Message sent successfully! We'll be in touch soon.",
    contactPageTitle: 'Contact Us',
    contactPageSubtitle: "We're here to answer all your inquiries",
    // Footer
    allRights: '© 2026 Honex Company. جميع الحقوق محفوظة.',
    followUs: 'Follow Us',
    // Services page
    servicesTitle: 'Our Services',
    servicesSubtitle: 'We offer a comprehensive suite of digital services designed to elevate your online presence and deliver measurable results.',
    ourProcess: 'Our Process',
    techStack: 'Technologies We Use',
    // About page
    aboutTitle: 'About Us',
    aboutSubtitle: 'A story of passion for technology and belief that software changes the world',
    ourMission: 'Our Mission',
    ourValues: 'Our Values',
    ourTeam: 'Our Team',
    ourStory: 'Our Story',
    // Privacy
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'We are committed to protecting your privacy and data security',
  },
  fr: {
    home: 'Accueil',
    services: 'Services',
    portfolio: 'Réalisations',
    pricing: 'Tarifs',
    about: 'À Propos',
    privacy: 'Confidentialité',
    contactUs: 'Contact',
    contactNav: 'Contact',
    startProject: 'Démarrer un Projet',
    bookConsult: 'Réserver une Consultation',
    getStarted: 'Contactez-nous',
    heroTitle1: "Construire l'Avenir",
    heroTitle2: 'Numérique pour Vous',
    heroSubtitle: 'Nous fournissons des solutions logicielles innovantes et des designs exceptionnels qui propulsent votre marque.',
    trustedBy: 'Entreprises mondiales et locales qui nous ont fait confiance',
    moreCompanies: '+50 autres entreprises',
    ctaSmall: 'Réserver une Consultation',
    pricingTitle: 'Tarifs',
    pricingPageTitle: 'Nos Forfaits',
    pricingSubtitle: 'Solutions flexibles pour chaque étape de votre croissance',
    starterPlan: 'Débutant',
    growthPlan: 'Croissance',
    enterprisePlan: 'Entreprise',
    mostPopular: 'Le Plus Populaire',
    getStartedPlan: 'Commencer',
    contactSales: "Contacter l'équipe",
    monthly: '/mois',
    yearly: '/an',
    billingMonthly: 'Mensuel',
    billingYearly: 'Annuel',
    saveYearly: 'Économisez 20%',
    whyUsTitle: 'Pourquoi Honex?',
    whyUsSubtitle: 'Ce qui nous distingue sur le marché',
    ourWork: 'Nos Réalisations',
    ourWorkSubtitle: 'Un portfolio sélectionné de nos projets remarquables.',
    filterAll: 'Tout',
    filterWebsite: 'Sites Web',
    filterWebApp: 'Applications',
    filterPlugin: 'Extensions',
    livePreview: 'Aperçu Live',
    viewFeatures: 'Fonctionnalités',
    closeModal: 'Fermer',
    viewAllWork: 'Voir Tout',
    testimonialsTitle: 'Témoignages Clients',
    testimonialsSubtitle: 'Ce que nos clients disent de nous',
    howWeWorkTitle: 'Comment Travaillons-nous?',
    howWeWorkSubtitle: "Une méthodologie claire de l'idée au lancement",
    contactTitle: 'Prêt à construire votre projet?',
    contactSubtitle: "Contactez-nous aujourd'hui et nous répondrons dans les 24 heures",
    yourName: 'Nom complet',
    yourEmail: 'Adresse email',
    yourMessage: 'Détails du projet',
    sendMessage: 'Envoyer',
    namePlaceholder: 'Jean Dupont',
    emailPlaceholder: 'jean@exemple.com',
    messagePlaceholder: 'Parlez-nous de votre projet...',
    messageSent: '✓ Message envoyé avec succès!',
    contactPageTitle: 'Contactez-nous',
    contactPageSubtitle: 'Nous sommes là pour répondre à toutes vos questions',
    allRights: '© 2026 Honex Company. جميع الحقوق محفوظة.',
    followUs: 'Suivez-nous',
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Nous offrons une suite complète de services numériques.',
    ourProcess: 'Notre Processus',
    techStack: 'Technologies Utilisées',
    aboutTitle: 'À Propos',
    aboutSubtitle: 'Une histoire de passion pour la technologie',
    ourMission: 'Notre Mission',
    ourValues: 'Nos Valeurs',
    ourTeam: 'Notre Équipe',
    ourStory: 'Notre Histoire',
    privacyTitle: 'Politique de Confidentialité',
    privacySubtitle: 'Nous nous engageons à protéger votre vie privée',
  },
};

// Data store for the 10 Honex E-Commerce Demo Storefronts
// All products have prices in Algerian Dinars (DZD).
// Each store features a distinct color scheme, brand personality, categories, and catalog.

export const ALGERIAN_WILAYAS = [
  '01 - أدرار', '02 - الشلف', '03 - الأغواط', '04 - أم البواقي', '05 - باتنة',
  '06 - بجاية', '07 - بسكرة', '08 - بشار', '09 - البليدة', '10 - البويرة',
  '11 - تمنراست', '12 - تبسة', '13 - تلمسان', '14 - تيارت', '15 - تيزي وزو',
  '16 - الجزائر العاصمة', '17 - الجلفة', '18 - جيجل', '19 - سطيف', '20 - سعيدة',
  '21 - سكيكدة', '22 - سيدي بلعباس', '23 - عنابة', '24 - قالمة', '25 - قسنطينة',
  '26 - المدية', '27 - مستغانم', '28 - المسيلة', '29 - معسكر', '30 - ورقلة',
  '31 - وهران', '32 - البيض', '33 - إليزي', '34 - برج بوعريريج', '35 - بومرداس',
  '36 - الطارف', '37 - تندوف', '38 - تسمسيلت', '39 - الوادي', '40 - خنشلة',
  '41 - سوق أهراس', '42 - تيبازة', '43 - ميلة', '44 - عين الدفلى', '45 - النعامة',
  '46 - عين تموشنت', '47 - غرداية', '48 - غليزان', '49 - تيميمون', '50 - برج باجي مختار',
  '51 - أولاد جلال', '52 - بني عباس', '53 - عين صالح', '54 - عين قزام', '55 - توقرت',
  '56 - جانت', '57 - المغير', '58 - المنيعة'
];

export const DEMO_STORES = [
  // 1) LUMIÈRE — Luxury Fashion
  {
    id: 'lumiere',
    name: 'LUMIÈRE',
    nameAr: 'لوميير للأزياء الراقية',
    taglineAr: 'رمز الفخامة والذوق الرفيع — تشكيلة حصرية من الهوت كوتور والإكسسوارات الفاخرة',
    categoryAr: 'أزياء فاخرة وهوت كوتور',
    theme: {
      primary: '#D4AF37',       // Luxury Gold
      primaryHover: '#b89628',
      secondary: '#18181b',     // Deep Zinc / Onyx
      bg: '#09090b',            // Jet Black
      cardBg: '#121215',
      accent: '#fef08a',
      text: '#fafafa',
      textMuted: '#a1a1aa',
      border: 'rgba(212, 175, 55, 0.25)',
      fontFamily: 'serif',
      badgeBg: 'rgba(212, 175, 55, 0.15)',
      badgeText: '#facc15'
    },
    hero: {
      badgeAr: 'مجموعة خريف وشتاء 2026',
      headlineAr: 'الفخامة التي تليق بحضورك الاستثنائي',
      subheadlineAr: 'تصاميم هوت كوتور إيطالية وفرنسية منتقاة بعناية فائقة، تمزج بين الحرفية اليدوية العريقة واللمسة العصرية الراقية.',
      ctaTextAr: 'استكشف التشكيلة الجديدة',
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'جميع القطع' },
      { id: 'women', nameAr: 'أزياء نسائية راقية' },
      { id: 'men', nameAr: 'بدلات وأزياء رجالية' },
      { id: 'bags', nameAr: 'حقائب جلدية فاخرة' },
      { id: 'shoes', nameAr: 'أحذية كلاسيكية' },
      { id: 'accessories', nameAr: 'إكسسوارات ومجوهرات' }
    ],
    promoNoticeAr: 'توصيل خاص مؤمن لجميع ولايات الوطن مع تجربة القياس في المنزل.',
    products: [
      {
        id: 'lum-1',
        nameAr: 'فستان مخملي ملكي بتطريز ذهبي يدوي',
        category: 'women',
        price: 48500,
        originalPrice: 58000,
        rating: 4.9,
        reviewsCount: 38,
        badge: 'قطعة حصرية',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'فستان سهرة من المخمل الإيطالي الأسود الفاخر، مطرز يدوياً بخيوط حريرية مطلية بماء الذهب.',
        detailsAr: ['قماش مخملي إيطالي 100%', 'تطريز يدوي على الياقة والأكمام', 'بطانة حرير طبيعي ناعمة', 'تنظيف جاف فقط'],
        variants: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)']
      },
      {
        id: 'lum-2',
        nameAr: 'حقيبة كلاسيكية من جلد العجل الإيطالي',
        category: 'bags',
        price: 36000,
        originalPrice: 42000,
        rating: 5.0,
        reviewsCount: 45,
        badge: 'الأكثر طلباً',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حقيبة يد كلاسيكية بقفل دوار مطلي بالذهب عيار 24 ومقبض علوي مريح.',
        detailsAr: ['جلد عجل محبب مقاوم للخدوش', 'قفل ومعدات مطلية بالذهب', 'مقصورة داخلية مقسمة بعناية', 'صناعة فلورنسية يدوية'],
        variants: ['أسود ملكي', 'عاجي ناصع', 'أحمر نبيذي']
      },
      {
        id: 'lum-3',
        nameAr: 'بدلة توكسيدو صوفية فائقة النعومة Super 150s',
        category: 'men',
        price: 59000,
        originalPrice: 68000,
        rating: 4.8,
        reviewsCount: 29,
        badge: 'تشكيلة النخبة',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'بدلة رجالية مصممة خصيصاً للمناسبات الرفيعة من صوف الميرينو فائق النقاء.',
        detailsAr: ['صوف ميرينو 100% Super 150s', 'ياقة ساتان إيطالي ناعم', 'قصة سليم فت عصرية مريحة', 'أزرار عاج طبيعي مستوردة'],
        variants: ['48 (M)', '50 (L)', '52 (XL)', '54 (XXL)']
      },
      {
        id: 'lum-4',
        nameAr: 'حذاء كعب عالي بتصميم مدبب مرصع بالكريستال',
        category: 'shoes',
        price: 28500,
        originalPrice: 33000,
        rating: 4.9,
        reviewsCount: 52,
        badge: 'جديد',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حذاء كعب أنيق بارتفاع 8.5 سم مع لمسات برّاقة من كريستال سواروفسكي المتقن.',
        detailsAr: ['جلد لامع فائق الجودة', 'نعل مبطن لدعم القدم أثناء السهرات', 'مقدمة مدببة كلاسيكية', 'صنع في إيطاليا'],
        variants: ['37', '38', '39', '40', '41']
      },
      {
        id: 'lum-5',
        nameAr: 'ساعة نسائية ماسية مطلية بالذهب الوردي',
        category: 'accessories',
        price: 44000,
        originalPrice: 52000,
        rating: 5.0,
        reviewsCount: 19,
        badge: 'إصدار محدود',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'ساعة يد أوتوماتيكية بسوار شبكي ناعم وميناء من عرق اللؤلؤ الطبيعي.',
        detailsAr: ['ميناء من عرق اللؤلؤ الأبيض', 'زجاج ياقوتي مقاوم للخدش', 'مقاومة للماء حتى عمق 50 متر', 'ضمان رسمي لمدة 3 سنوات'],
        variants: ['ذهب وردي', 'ذهب أصفر عيار 18', 'بلاتينيوم فضي']
      },
      {
        id: 'lum-6',
        nameAr: 'معطف ترنش كشمير فاخر بقصة ملكية',
        category: 'women',
        price: 52000,
        originalPrice: 62000,
        rating: 4.9,
        reviewsCount: 31,
        badge: 'مفضل الموسم',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'معطف شتوي دافئ من مزيج الكشمير والصوف الطبيعي بحزام خصر جلدي قابل للتعديل.',
        detailsAr: ['70% صوف نقي، 30% كشمير منغولي', 'أزرار قرن طبيعي محفورة', 'طول ميدي أنيق ومحتشم', 'جيوب جانبية عميقة ومريحة'],
        variants: ['بيج ملكي', 'أسود فحمي', 'جملي دافئ']
      }
    ]
  },

  // 2) NexaTech — Electronics & Computing
  {
    id: 'nexatech',
    name: 'NexaTech',
    nameAr: 'نكساتك للإلكترونيات الذكية',
    taglineAr: 'بوابتك إلى أحدث تكنولوجيا الحوسبة، الهواتف الذكية، وأجهزة الجيمنج الاحترافية',
    categoryAr: 'إلكترونيات وحواسيب',
    theme: {
      primary: '#00f0ff',       // Electric Cyan
      primaryHover: '#00c8d6',
      secondary: '#1e1b4b',     // Deep Violet Indigo
      bg: '#070913',            // Cyber Night
      cardBg: '#0f172a',
      accent: '#818cf8',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(0, 240, 255, 0.25)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(0, 240, 255, 0.12)',
      badgeText: '#38bdf8'
    },
    hero: {
      badgeAr: 'تكنولوجيا الجيل القادم 2026',
      headlineAr: 'قوة الأداء وسرعة المستقبل بين يديك',
      subheadlineAr: 'حواسيب فائقة القوة، شاشات ألعاب عالية التردد، وهواتف رائدة مع ضمان استبدال رسمي وخدمة ما بعد البيع في الجزائر.',
      ctaTextAr: 'تصفح عروض التكنولوجيا',
      bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل الأجهزة' },
      { id: 'laptops', nameAr: 'حواسيب محمولة Pro' },
      { id: 'smartphones', nameAr: 'هواتف ذكية رائدة' },
      { id: 'audio', nameAr: 'سماعات وعوازل صوت' },
      { id: 'gaming', nameAr: 'عتاد وملحقات الجيمنج' },
      { id: 'wearables', nameAr: 'ساعات وأساور ذكية' }
    ],
    promoNoticeAr: 'شحن آمن مع فحص المحتوى عند الاستلام + ضمان صيانة معتمد لمدة عام كامل.',
    products: [
      {
        id: 'nexa-1',
        nameAr: 'لابتوب NexaBlade Pro X16 — شاشة OLED 240Hz',
        category: 'laptops',
        price: 245000,
        originalPrice: 275000,
        rating: 4.9,
        reviewsCount: 84,
        badge: 'أداء خارق',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'معالج Intel Core i9 Gen 14، كارت شاشة RTX 4080 12GB، وذاكرة 32GB DDR5 لإنتاج المحتوى والجيمنج الثقيل.',
        detailsAr: ['معالج 24 نواة بتردد يصل 5.8GHz', 'شاشة 16 بوصة 3.2K OLED 240Hz', 'تخزين 1TB NVMe Gen4 SSD', 'تبريد بغرفة بخار ثنائية'],
        variants: ['32GB RAM + 1TB SSD', '64GB RAM + 2TB SSD']
      },
      {
        id: 'nexa-2',
        nameAr: 'هاتف NexaUltra 5G Titanium — كاميرا 200MP بيريسكوب',
        category: 'smartphones',
        price: 138000,
        originalPrice: 155000,
        rating: 4.8,
        reviewsCount: 112,
        badge: 'الأكثر مبيعاً',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'إطار تيتانيوم مصقول، معالج Snapdragon 8 Gen 3، شاشة AMOLED مسطحة بمعدل سطوع 2600 شمعة.',
        detailsAr: ['شاشة 6.8 بوصة Dynamic AMOLED 120Hz', 'بطارية 5400mAh مع شحن سريع 90W', 'مستشعر كاميرا 200MP مع تقريب 100x', 'مقاوم للماء والغبار معيار IP68'],
        variants: ['تيتانيوم أسود (256GB)', 'تيتانيوم فضي (512GB)', 'أزرق كوني (1TB)']
      },
      {
        id: 'nexa-3',
        nameAr: 'سماعة رأس لاسلكية NexaAcoustics ANC Pro',
        category: 'audio',
        price: 34500,
        originalPrice: 39900,
        rating: 5.0,
        reviewsCount: 97,
        badge: 'عزل فائق',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'عزل ضوضاء هجين نشط بمستشعرات ثنائية، وصوت مكاني Spatial Audio عالي الدقة مع بطارية تدوم 45 ساعة.',
        detailsAr: ['مشغلات صوت تيتانيوم 40 مم', 'ترميز LDAC و Hi-Res Audio لاسلكي', 'شحن سريع: 10 دقائق تعطي 6 ساعات', 'وسائد ميموري فوم مريحة للأذن'],
        variants: ['رمادي فحمي', 'فضي مطفي', 'أزرق كحلي']
      },
      {
        id: 'nexa-4',
        nameAr: 'شاشة ألعاب منحنية 34 بوصة UWQHD 175Hz Fast IPS',
        category: 'gaming',
        price: 89000,
        originalPrice: 98000,
        rating: 4.9,
        reviewsCount: 63,
        badge: 'عرض حصري',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'شاشة عريضة 21:9 بانحناء 1500R، دعم تقنية G-Sync و HDR400 لعمق ألوان سينمائي مذهل.',
        detailsAr: ['دقة 3440 × 1440 بكسل فائقة الوضوح', 'زمن استجابة 1ms GTG فوري', 'مكبرات صوت استريو مدمجة 5W × 2', 'حامل قابل لتعديل الارتفاع والزاوية'],
        variants: ['أسود قياسي', 'مع شريط RGB ذكي خلفي']
      },
      {
        id: 'nexa-5',
        nameAr: 'ساعة ذكية رياضية NexaWatch Ultra بدقة GPS مزدوج',
        category: 'wearables',
        price: 29000,
        originalPrice: 35000,
        rating: 4.7,
        reviewsCount: 54,
        badge: 'مقاومة للصدمات',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'هيكل من ألياف الكربون وزجاج ياقوتي، مراقبة مستمرة لنبض القلب والأكسجين في الدم مع عمر بطارية 14 يوماً.',
        detailsAr: ['شاشة AMOLED ساطعة دائماً Always-on', 'أكثر من 120 وضعاً رياضياً واحترافياً', 'مستشعر تخطيط قلب ECG وحرارة الجلد', 'اتصال مكالمات Bluetooth مدمج بميكروفون نقي'],
        variants: ['سوار سيليكون أسود', 'سوار قماشي برتقالي', 'سوار فولاذي فضي']
      },
      {
        id: 'nexa-6',
        nameAr: 'لوحة مفاتيح ميكانيكية مخصصة NexaKey RGB Hot-Swap',
        category: 'gaming',
        price: 18500,
        originalPrice: 22000,
        rating: 4.8,
        reviewsCount: 41,
        badge: 'للمحترفين',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'سويتشات مسبقة التشحيم Pre-lubed Linear Switches، هيكل من الألومنيوم، وتوصيل ثلاثي (Bluetooth / 2.4G / Type-C).',
        detailsAr: ['هيكل عازل للصوت 5 طبقات بساط فوم', 'أغطية مفاتيح PBT مزدوجة الحقن', 'برنامج تخصيص الماكرو والإضاءة الكامل', 'بطارية داخلية 4000mAh تدوم شهوراً'],
        variants: ['Linear Red (هادئ وسلس)', 'Tactile Brown (شعور نقري مريح)']
      }
    ]
  },

  // 3) GlowCura — Beauty & Skincare
  {
    id: 'glowcura',
    name: 'GlowCura',
    nameAr: 'جلوكيورا للعناية والجمال',
    taglineAr: 'إشراقة طبيعية وبشرة صحية مع مستحضرات عناية معتمدة طبياً ومكونات عضوية نقية',
    categoryAr: 'عناية وجمال ومستحضرات',
    theme: {
      primary: '#ec4899',       // Rose Pink
      primaryHover: '#db2777',
      secondary: '#fff1f2',     // Soft Warm Blush
      bg: '#fffafa',            // Soft White Petal
      cardBg: '#ffffff',
      accent: '#f43f5e',
      text: '#1e293b',
      textMuted: '#64748b',
      border: 'rgba(236, 72, 153, 0.2)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(236, 72, 153, 0.12)',
      badgeText: '#db2777'
    },
    hero: {
      badgeAr: 'تركيبات طبيعية خالية من البارابين',
      headlineAr: 'سر النضارة الدائمة والعناية الملكية ببشرتك',
      subheadlineAr: 'مستحضرات عناية بالوجه والشعر، وسيرومات مركزة بمضادات الأكسدة وحمض الهيالورونيك، تم اختبارها من قبل أطباء الجلدية.',
      ctaTextAr: 'اكتشفي روتين النضارة',
      bgImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'جميع المنتجات' },
      { id: 'serums', nameAr: 'سيرومات النضارة والترميم' },
      { id: 'moisturizers', nameAr: 'كريمات الترطيب والحماية' },
      { id: 'hair', nameAr: 'عناية مكثفة بالشعر' },
      { id: 'fragrances', nameAr: 'عطور وميست الجسم' },
      { id: 'bundles', nameAr: 'مجموعات وباقات العناية' }
    ],
    promoNoticeAr: 'هدية مجانية مع كل طلب يفوق 10,000 دج + استشارة مجانية لنوع البشرة عبر الواتساب.',
    products: [
      {
        id: 'glow-1',
        nameAr: 'سيروم فيتامين C المركز مع حمض الفيروليك 20%',
        category: 'serums',
        price: 6800,
        originalPrice: 8500,
        rating: 4.9,
        reviewsCount: 142,
        badge: 'الأكثر مبيعاً',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'يوحد لون البشرة، يقلل من التصبغات والبقع الداكنة، ويمنح نضارة فورية تدوم طوال اليوم.',
        detailsAr: ['فيتامين C نقي 20% مستقر', 'حمض الهيالورونيك النباتي للترطيب العميق', 'خالٍ من العطور الصناعية والسيليكون', 'مناسب لجميع أنواع البشرة خاصة الباهتة'],
        variants: ['عبوة 30 مل', 'عبوة توفيرية 60 مل']
      },
      {
        id: 'glow-2',
        nameAr: 'كريم هيدرا بومب المرطب بالسيراميد ومستخلص الشاي الأخضر',
        category: 'moisturizers',
        price: 5200,
        originalPrice: 6200,
        rating: 4.8,
        reviewsCount: 98,
        badge: 'ترطيب 72 ساعة',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'يرمم حاجز البشرة الواقي، يهدئ الاحمرار والتهيج، ويمتص بسرعة دون ترك أي أثر دهني.',
        detailsAr: ['مركب السيراميد الثلاثي 3x', 'مستخلص الشاي الأخضر المهدئ للبشرة الحساسة', 'قوام خفيف ومائي فائق الانتعاش', 'آمن للاستخدام الصباحي والمسائي'],
        variants: ['50 مل', '100 مل']
      },
      {
        id: 'glow-3',
        nameAr: 'زيت الأرغان والإكليل للشعر التالف والمتساقط',
        category: 'hair',
        price: 4900,
        originalPrice: 5900,
        rating: 5.0,
        reviewsCount: 88,
        badge: 'طبيعي 100%',
        image: 'https://images.unsplash.com/photo-1608248597359-0d3f239fba66?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'مزيج زيوت نقية معصورة على البارد لتحفيز بصيلات الشعر، وتغذية الأطراف المتقصفة بعمق.',
        detailsAr: ['زيت الأرغان العضوي المعتمد', 'زيت إكليل الجبل المركز لتكثيف الفراغات', 'فيتامين E لمنع التكسر والتطاير', 'خالٍ من الزيوت المعدنية والكيماويات'],
        variants: ['100 مل قطارة دقيقة']
      },
      {
        id: 'glow-4',
        nameAr: 'ماء عطر روز فانيليا المركز — نوتات أنثوية دافئة',
        category: 'fragrances',
        price: 9800,
        originalPrice: 12500,
        rating: 4.9,
        reviewsCount: 67,
        badge: 'ثبات يدوم 24 ساعة',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'افتتاحية من الورد الجوري والياسمين الدمشقي مع قاعدة عنبرية دافئة بالفانيليا المدغشقرية.',
        detailsAr: ['تركيز أو دو بارفان نقي Eau de Parfum', 'ثبات وانتشار عالي بلمسة فرنسية رقيقة', 'زجاجة كرستالية فاخرة قابلة لإعادة التعبئة', 'مناسب لجميع فصول السنة والمناسبات'],
        variants: ['50 مل', '100 مل']
      },
      {
        id: 'glow-5',
        nameAr: 'باقة الروتين الذهبي الكامل لتجديد البشرة (4 قطع)',
        category: 'bundles',
        price: 18500,
        originalPrice: 24500,
        rating: 5.0,
        reviewsCount: 156,
        badge: 'أفضل قيمة وتوفير',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'تشمل: غسول لطيف برغوة غنية، تونر مقشر لطيف، سيروم فيتامين C، وكريم حاجز الحماية الليلي.',
        detailsAr: ['روتين كامل لمدة 3 أشهر متواصلة', 'حقيبة مكياج جلدية وردية فاخرة كهدية', 'دليل خطوة بخطوة للروتين اليومي', 'نتائج ملحوظة بعد أول أسبوعين فقط'],
        variants: ['مجموعة البشرة الجافة والعادية', 'مجموعة البشرة الدهنية والمختلطة']
      },
      {
        id: 'glow-6',
        nameAr: 'واقي شمس غير مرئي Invisible Shield SPF 50+',
        category: 'moisturizers',
        price: 4300,
        originalPrice: 5100,
        rating: 4.8,
        reviewsCount: 110,
        badge: 'مقاوم للماء',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حماية قصوى واسعة الطيف من الأشعة فوق البنفسجية UVA/UVB بدون أي طبقة بيضاء إطلاقاً.',
        detailsAr: ['عامل حماية عالي SPF 50+ PA++++', 'قوام غير لزج بملمس مخملي نهائي', 'مقاوم للعرق والماء حتى 80 دقيقة', 'مثالي كأساس تحت المكياج'],
        variants: ['50 مل']
      }
    ]
  },

  // 4) HomeVibe — Home & Interior Decor
  {
    id: 'homevibe',
    name: 'HomeVibe',
    nameAr: 'هوم فايب للديكور والأثاث الراقي',
    taglineAr: 'حيث يلتقي الدفء بالبساطة — قطع أثاث وتنسيقات منزلية تمنح بيتك طابعاً ساحراً',
    categoryAr: 'أثاث وديكور منزلي',
    theme: {
      primary: '#c2410c',       // Warm Clay Terracotta
      primaryHover: '#9a3412',
      secondary: '#4d7c0f',     // Olive Green
      bg: '#faf8f5',            // Warm Ivory Linen
      cardBg: '#ffffff',
      accent: '#854d0e',
      text: '#292524',
      textMuted: '#78716c',
      border: 'rgba(194, 65, 12, 0.2)',
      fontFamily: 'serif',
      badgeBg: 'rgba(194, 65, 12, 0.1)',
      badgeText: '#c2410c'
    },
    hero: {
      badgeAr: 'تشكيلة البيت المودرن 2026',
      headlineAr: 'حوّل مساحتك إلى واحة من الراحة والأناقة',
      subheadlineAr: 'أثاث خشبي مصنوع من البلوط الصلب، إضاءات دافئة خافتة، وسجادات بوهيمية فاخرة تعكس دفء المنازل الراقية.',
      ctaTextAr: 'استكشف غرف الإلهام',
      bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'جميع القطع' },
      { id: 'furniture', nameAr: 'أثاث الصالون وغرف المعيشة' },
      { id: 'lighting', nameAr: 'وحدات وثريات الإضاءة' },
      { id: 'dining', nameAr: 'طاولات وأواني التقديم' },
      { id: 'decor', nameAr: 'لوحات وفازات فنية' },
      { id: 'rugs', nameAr: 'سجاد ومنسوجات طبيعية' }
    ],
    promoNoticeAr: 'توصيل مجاني وتركيب احترافي للأثاث الكبير داخل العاصمة والولايات المجاورة.',
    products: [
      {
        id: 'home-1',
        nameAr: 'كرسي استرخاء نورديك من قماش البوكليه وخشب الزان',
        category: 'furniture',
        price: 38000,
        originalPrice: 46000,
        rating: 4.9,
        reviewsCount: 36,
        badge: 'أكثر طلباً',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'كرسي مريح ذو منحنيات انسيابية بقماش بوكليه تيدي أوف وايت فائق النعومة وقاعدة خشبية صلبة.',
        detailsAr: ['قماش بوكليه سميك مقاوم للبقع', 'إطار خشب زان أوروبي معالج ضد الرطوبة', 'حشوة إسفنجية عالية الكثافة 35D', 'أبعاد: 85 × 80 × 75 سم'],
        variants: ['أوف وايت كريمي', 'بيج رملي دافئ', 'رمادي رمزي']
      },
      {
        id: 'home-2',
        nameAr: 'مصباح أرضي مودرن بتصميم قوسي من النحاس المصقول',
        category: 'lighting',
        price: 22500,
        originalPrice: 27000,
        rating: 4.8,
        reviewsCount: 42,
        badge: 'تصميم أيقوني',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'مصباح قوسي بارتفاع 180 سم مع قاعدة رخامية ثقيلة ومفتاح تخفيت إضاءة دافئة Dimmer.',
        detailsAr: ['عمود نحاسي متين مطلي بطبقة حماية ضد الأكسدة', 'قاعدة من الرخام الأسود الطبيعي الثابت', 'لمبة LED ذكية بدرجات حرارة 2700K - 4000K', 'سلك قماشي بطول 2.5 متر مع دواسة أرضية'],
        variants: ['نحاس ذهبي مطفي', 'أسود غير لامع']
      },
      {
        id: 'home-3',
        nameAr: 'طقم سفرة سراميك يدوي الحرفية (16 قطعة)',
        category: 'dining',
        price: 19800,
        originalPrice: 24000,
        rating: 5.0,
        reviewsCount: 28,
        badge: 'حرف يدوية',
        image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'أطباق وأكواب من الفخار المصقول بدرجات ترابية دافئة، آمنة في غسالة الأطباق والميكروويف.',
        detailsAr: ['4 أطباق رئيسية، 4 أطباق سلطة، 4 أوعية شوربة، 4 مجات قهوة', 'طلاء زجاجي مقاوم للخدش والتصدع', 'طابع إسكندنافي طبيعي بحواف عضوية غير منتظمة'],
        variants: ['ترابي ماتش كوتور', 'أخضر زيتوني هادئ', 'أبيض طيني كلاسيكي']
      },
      {
        id: 'home-4',
        nameAr: 'سجادة بوهيمية منسوجة يدوياً من الصوف النقي',
        category: 'rugs',
        price: 45000,
        originalPrice: 53000,
        rating: 4.9,
        reviewsCount: 19,
        badge: 'صوف طبيعي 100%',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'سجادة صالون مقاس 200 × 290 سم بزخارف هندسية بسيطة وملمس مخملي سميك وفاخر.',
        detailsAr: ['صوف بربري نقي ومحبوك يدوياً بدقة عالية', 'ظهر من الجوت الطبيعي مانع للانزلاق', 'سهلة التنظيف ومقاومة للغبار والتكتل'],
        variants: ['200 × 290 سم', '160 × 230 سم']
      },
      {
        id: 'home-5',
        nameAr: 'طقم فازات سيراميك فنية بفتحات معمارية (3 قطع)',
        category: 'decor',
        price: 11200,
        originalPrice: 14000,
        rating: 4.7,
        reviewsCount: 55,
        badge: 'ديكور ترند',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'قطع ديكورية نحتية بتصميم دونات وحواف دائرية تناسب الأرفف وطاولات القهوة المعاصرة.',
        detailsAr: ['ملمس خشن غير لامع Matte Textured', 'مناسبة للأزهار المجففة وعشب البامباس', 'أحجام متناسقة: 22 سم، 18 سم، 14 سم'],
        variants: ['أبيض طباشيري', 'بيج طيني']
      },
      {
        id: 'home-6',
        nameAr: 'طاولة قهوة مستديرة من خشب البلوط الطبيعي المصمت',
        category: 'furniture',
        price: 32000,
        originalPrice: 38000,
        rating: 4.9,
        reviewsCount: 24,
        badge: 'خشب طبيعي',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'طاولة وسط قطر 90 سم بتصميم مينيماليست وأرجل أسطوانية عريضة تمنحها ثباتاً راسخاً.',
        detailsAr: ['خشب بلوط ماسيف معالج بزيت شمع طبيعي', 'حواف دائرية ناعمة وآمنة للأطفال', 'تحمل أوزان حتى 100 كغ'],
        variants: ['بلوط فاتح طبيعي', 'بلوط مدخن داكن']
      }
    ]
  },

  // 5) TerraSport — Outdoor & Adventure
  {
    id: 'terrasport',
    name: 'TerraSport',
    nameAr: 'تيرا سبورت للمغامرات والرياضة الخارجية',
    taglineAr: 'تحدّى الطبيعة بكل ثقة — عتاد تسلق، تخييم، ومغامرات برية بمواصفات عالمية تتحمل أقسى الظروف',
    categoryAr: 'مغامرات ورياضات خارجية',
    theme: {
      primary: '#15803d',       // Forest Green
      primaryHover: '#166534',
      secondary: '#1e3a8a',     // Alpine Dark Blue
      bg: '#0b130e',            // Deep Wilderness
      cardBg: '#131e17',
      accent: '#22c55e',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: 'rgba(34, 197, 94, 0.25)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeText: '#4ade80'
    },
    hero: {
      badgeAr: 'معدات المغامرات الجبلية والصحراوية',
      headlineAr: 'انطلق في مغامرتك القادمة بأقوى عتاد ميداني',
      subheadlineAr: 'خيام تخييم فورية، أحذية تسلق جبال مقاومة للمياه، وحقائب ظهر استكشافية تتحمل أقصى درجات الطقس والأوزان.',
      ctaTextAr: 'تجهّز لمغامرتك الآن',
      bgImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل العتاد الميداني' },
      { id: 'camping', nameAr: 'خيام ومستلزمات التخييم' },
      { id: 'footwear', nameAr: 'أحذية تسلق ومسارات GTX' },
      { id: 'backpacks', nameAr: 'حقائب سفر واستكشاف' },
      { id: 'apparel', nameAr: 'سترات وملابس حرارية' },
      { id: 'gear', nameAr: 'إضاءة وأدوات نجاة' }
    ],
    promoNoticeAr: 'اختبارات ميدانية معتمدة على كافة الخيام ومقاومة مياه الأمطار حتى 5000 ملم.',
    products: [
      {
        id: 'terra-1',
        nameAr: 'خيمة تخييم استكشافية رباعية مقاومة للرياح والمطر 4P',
        category: 'camping',
        price: 29500,
        originalPrice: 36000,
        rating: 4.9,
        reviewsCount: 71,
        badge: 'مقاومة عواصف',
        image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'خيمة تتسع لـ 4 أشخاص بنظام تركيب سريع، قماش ريبستوب مقاوم للتمزق، وعزل مائي 5000 مم.',
        detailsAr: ['أعمدة ألومنيوم فضائي خفيفة وشديدة المتانة', 'نوافذ تهوية مع شبك ضد الحشرات', 'أرضية سميكة ومقاومة للرطوبة والصخور', 'وزن إجمالي: 3.8 كغ فقط'],
        variants: ['أخضر غابي مدمج', 'برتقالي استكشافي عالي الرؤية']
      },
      {
        id: 'terra-2',
        nameAr: 'حذاء تسلق جبلي احترافي TerraGrip Gore-Tex',
        category: 'footwear',
        price: 24800,
        originalPrice: 29500,
        rating: 5.0,
        reviewsCount: 89,
        badge: 'الأكثر ثقة',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'غشاء Gore-Tex الأصلي المقاوم لتسرب المياه بنسبة 100% مع نعل Vibram عالي الثبات على الصخور الزلقة.',
        detailsAr: ['حماية كاملة لكاحل القدم من الالتواء', 'مقدمة مطاطية مدعمة ضد صدمات الصخور', 'نعل داخلي أورثولايت لامتصاص الصدمات', 'تهوية داخلية ممتازة تمنع التعرق'],
        variants: ['40', '41', '42', '43', '44', '45']
      },
      {
        id: 'terra-3',
        nameAr: 'حقيبة ظهر استكشافية سعة 65+10 لتر بنظام تعليق مريح',
        category: 'backpacks',
        price: 18900,
        originalPrice: 23000,
        rating: 4.8,
        reviewsCount: 53,
        badge: 'رحلات طويلة',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حقيبة مسافات طويلة بتوزيع متساوي للوزن على الحوض، غطاء مطر مدمج، وجيوب خارجية لحمل الخيمة والعصي.',
        detailsAr: ['هيكل ظهر شبكي يتيح مرور تيار الهواء', 'أحزمة كتف وصدر مبطنة قابلة لتعديل الطول', 'منفذ مخصص لكيس مياه الشرب Camelbak', 'قماش كوردورا 600D عالي المتانة'],
        variants: ['أخضر زيتي', 'أزرق كحلي', 'أسود عسكري']
      },
      {
        id: 'terra-4',
        nameAr: 'سترة هاردشيل مضادة للرياح والأمطار الشديدة Pro Shell',
        category: 'apparel',
        price: 19500,
        originalPrice: 24000,
        rating: 4.9,
        reviewsCount: 46,
        badge: 'عزل فائق',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'جاكيت مقاوم للعواصف بثلاث طبقات، سحابات محكمة الغلق عازلة للمياه، وغطاء رأس متوافق مع خوذة التسلق.',
        detailsAr: ['مقاومة ضغط ماء 20,000 مم', 'سحابات تهوية تحت الإبطين عند بذل الجهد', 'جيوب صدرية يسهل الوصول إليها أثناء ارتداء الحقيبة', 'أساور فيلكرو محكمة لمنع دخول الهواء البارد'],
        variants: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'terra-5',
        nameAr: 'كيس نوم حراري شتوي لدرجات حرارة تحت الصفر (-15°C)',
        category: 'camping',
        price: 14200,
        originalPrice: 17500,
        rating: 4.9,
        reviewsCount: 64,
        badge: 'دفء استثنائي',
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حشوة ريش أوز طبيعي عالي العزل مع تصميم المومياء المريح للاحتفاظ بحرارة الجسم في المرتفعات.',
        detailsAr: ['درجة حرارة الراحة: -5°C، الحد الأقصى: -15°C', 'قماش خارجي طارد للندى والرطوبة', 'يأتي مع حقيبة ضغط تقلل حجمه بنسبة 60%'],
        variants: ['طول قياسي (190 سم)', 'طول كبير XL (215 سم)']
      },
      {
        id: 'terra-6',
        nameAr: 'مصباح رأس LED قوي 1200 لومن مع شحن Type-C وحساس حركة',
        category: 'gear',
        price: 6500,
        originalPrice: 8000,
        rating: 4.8,
        reviewsCount: 104,
        badge: 'ضروري للتخييم',
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'إضاءة بيضاء وحمراء ليلية بمدى يصل إلى 150 متراً، إمكانية التشغيل بحركة اليد أمام المصباح.',
        detailsAr: ['بطارية ليثيوم قابلة للشحن تدوم حتى 30 ساعة', 'مقاوم للمطر والسقوط معيار IPX6', 'شريط رأس مطاطي مريح ومقاوم للعرق'],
        variants: ['أسود متين']
      }
    ]
  },

  // 6) VAYRA — Modern Fashion & Streetwear
  {
    id: 'vayra',
    name: 'VAYRA',
    nameAr: 'فايرا للأزياء العصرية والستريتوير',
    taglineAr: 'أسلوبك، طاقتك، وحضورك اليومي — أحدث تصاميم الأزياء الحضرية للشباب والفتيات',
    categoryAr: 'أزياء شبابية وستريتوير',
    theme: {
      primary: '#d946ef',       // Vivid Fuchsia
      primaryHover: '#c026d3',
      secondary: '#0f172a',     // Deep Slate Black
      bg: '#050505',            // Pure Pitch Black
      cardBg: '#121217',
      accent: '#a855f7',
      text: '#fafafa',
      textMuted: '#a1a1aa',
      border: 'rgba(217, 70, 239, 0.25)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(217, 70, 239, 0.15)',
      badgeText: '#f0abfc'
    },
    hero: {
      badgeAr: 'إصدار الشارع المحدود — DROP 03',
      headlineAr: 'أزياء تعبر عن شخصيتك وتكسر الروتين',
      subheadlineAr: 'هوديز أوفرسايزد، بناطيل كارجو واسعة، وجاكيتات ميتاليك مستوحاة من ثقافة الموضة الحضرية الحديثة.',
      ctaTextAr: 'تسوق التشكيلة الجديدة',
      bgImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل الإصدارات' },
      { id: 'hoodies', nameAr: 'هوديز وسويت شيرت Oversized' },
      { id: 'cargo', nameAr: 'بناطيل كارجو وجينز واسع' },
      { id: 'tees', nameAr: 'تيشيرتات جرافيك قطنية' },
      { id: 'jackets', nameAr: 'جاكيتات بومبر وبليزر' },
      { id: 'accessories', nameAr: 'كابات وحقائب كروس' }
    ],
    promoNoticeAr: 'خصم إضافي 10% عند شراء قطعتين أو أكثر عبر كود VAYRA10 في سلة المشتريات.',
    products: [
      {
        id: 'vayra-1',
        nameAr: 'هودي أوفرسايزد VAYRA Heavyweight 480 GSM',
        category: 'hoodies',
        price: 8900,
        originalPrice: 11000,
        rating: 4.9,
        reviewsCount: 130,
        badge: 'ترند تيك توك',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'قطن مصري سميك 100% بنسيج 480 GSM يحافظ على هيكله الفضفاض دون انكماش.',
        detailsAr: ['قصة أوفرسايزد عصرية Boxy Fit', 'طبعة جرافيك حرارية عالية الثبات خلف الظهر', 'قبعة مزدوجة الطبقات متناسقة', 'أكمام مطاطية محكمة'],
        variants: ['فوشيا نيون', 'أسود فحمي', 'رمادي معتق', 'أبيض ثلجي']
      },
      {
        id: 'vayra-2',
        nameAr: 'بنطلون كارجو باراشوت متعدد الجيوب Wide-Leg',
        category: 'cargo',
        price: 7800,
        originalPrice: 9500,
        rating: 4.8,
        reviewsCount: 94,
        badge: 'أكثر طلباً',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'بنطلون فضفاض مريح برباط كاحل قابل للتضييق، قماش كوري خفيف ومقاوم للتمزق.',
        detailsAr: ['6 جيوب تكتيكية عملية وموزعة بذكاء', 'حزام خصر مطاطي برباط معدني', 'مظهر ستريتوير مريح للمشي اليومي'],
        variants: ['S (28-30)', 'M (31-33)', 'L (34-36)', 'XL (37-40)']
      },
      {
        id: 'vayra-3',
        nameAr: 'تيشيرت جرافيك Cyber City نسيج ثقيل Vintage Wash',
        category: 'tees',
        price: 4900,
        originalPrice: 6200,
        rating: 4.7,
        reviewsCount: 81,
        badge: 'وصل حديثاً',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'تيشيرت بقصة Drop Shoulder مع معالجة غسيل عتيق وطباعة حريرية لشعار مستقبلي.',
        detailsAr: ['قطن طبيعي مغسول 260 GSM', 'ياقة مضلعة سميكة لا تتمدد بعد الغسيل', 'خياطة مزدوجة متينة'],
        variants: ['أسود كربوني', 'بيج إيكرو', 'فوشيا فاقع']
      },
      {
        id: 'vayra-4',
        nameAr: 'جاكيت بومبر ياباني منفوخ Puffer Crop',
        category: 'jackets',
        price: 13500,
        originalPrice: 16500,
        rating: 4.9,
        reviewsCount: 52,
        badge: 'إصدار حصري',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'جاكيت شتوي أنيق بقصة قصيرة كروب، بطانة دافئة للغاية وطلاء خارجي عازل لقطرات المطر.',
        detailsAr: ['سحاب معدني عريض ثنائي الاتجاه YKK', 'بطانة حرارية مايكروفايبر خفيفة ودافئة', 'جيوب مبطنة بالصوف لتدفئة اليدين'],
        variants: ['أسود لامع', 'فضي ميتاليك', 'وردي فوشيا']
      },
      {
        id: 'vayra-5',
        nameAr: 'حقيبة كروسبودي تاكتيكال مع حزام حبل تسلق',
        category: 'accessories',
        price: 4200,
        originalPrice: 5500,
        rating: 4.8,
        reviewsCount: 66,
        badge: 'إكسسوار يومي',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حقيبة صغيرة عملية لحفظ الهاتف والمحفظة والمفاتيح مع مشبك ألومنيوم سريع الفك.',
        detailsAr: ['قماش بوليستر 900D مقاوم للخدش', 'جيب مبطن لحماية شاشة الهاتف', 'حزام قابل لتعديل الطول بدقة'],
        variants: ['أسود بالكامل', 'فوشيا مع حزام أسود']
      },
      {
        id: 'vayra-6',
        nameAr: 'قبعة بيسبول VAYRA Retro محفورة بشعار معدني',
        category: 'accessories',
        price: 3200,
        originalPrice: 4000,
        rating: 4.6,
        reviewsCount: 40,
        badge: 'سعر مميز',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'كاب كلاسيكي بـ 6 ألواح مقعرة، قطن مسامي ناعم مع إبزيم معدني خلفي منقوش.',
        detailsAr: ['حافة منحنية كلاسيكية تحجب الشمس', 'شريط تعرق داخلي قطني 100%', 'مقاس موحد قابل للتعديل'],
        variants: ['أسود مطفي', 'أوف وايت', 'وردي']
      }
    ]
  },

  // 7) Readora — Books & Stationery
  {
    id: 'readora',
    name: 'Readora',
    nameAr: 'ريدورا للكتب والقرطاسية الأدبية',
    taglineAr: 'ملاذ عشاق القراءة والفكر — أحدث الروايات العالمية، كتب التطوير، وأدوات الكتابة الفاخرة',
    categoryAr: 'كتب وقرطاسية أدبية',
    theme: {
      primary: '#78350f',       // Warm Espresso Amber
      primaryHover: '#59270d',
      secondary: '#14532d',     // Calm Forest Sage
      bg: '#fcfaf6',            // Warm Parchment Paper
      cardBg: '#ffffff',
      accent: '#d97706',
      text: '#292524',
      textMuted: '#78716c',
      border: 'rgba(120, 53, 15, 0.2)',
      fontFamily: 'serif',
      badgeBg: 'rgba(120, 53, 15, 0.08)',
      badgeText: '#78350f'
    },
    hero: {
      badgeAr: 'معرض القراءة ودار النشر المستقلة',
      headlineAr: 'الكتب التي تصنع فارقاً حقيقياً في حياتك',
      subheadlineAr: 'روايات أدبية حائزة على جوائز، مؤلفات في الفلسفة وعلم النفس والمال، ودفاتر ملاحظات بجلد طبيعي وأقلام حبر كلاسيكية.',
      ctaTextAr: 'تصفح قائمة الكتب الأكثر قراءة',
      bgImage: 'https://images.unsplash.com/photo-1507842229450-79f8e434f210?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل العناوين والأدوات' },
      { id: 'fiction', nameAr: 'روايات وأدب عالمي' },
      { id: 'selfhelp', nameAr: 'تطوير الذات وعلم النفس' },
      { id: 'business', nameAr: 'المال والأعمال والفكر' },
      { id: 'notebooks', nameAr: 'دفاتر جلدية وجورنال' },
      { id: 'pens', nameAr: 'أقلام حبر سائل وفاخرة' }
    ],
    promoNoticeAr: 'تغليف هدايا ورقي فاخر مع بطاقة إهداء مخصصة مجاناً عند طلب أي كتابين.',
    products: [
      {
        id: 'read-1',
        nameAr: 'العادات الذرية — جيمس كلير (طبعة مجلدة فاخرة)',
        category: 'selfhelp',
        price: 2400,
        originalPrice: 2900,
        rating: 5.0,
        reviewsCount: 195,
        badge: 'الكتاب #1 عالمياً',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'الدليل العملي المثبت لبناء عادات جيدة وكسر العادات السيئة عبر تغييرات بسيطة ذات أثر تراكمي مذهل.',
        detailsAr: ['ترجمة عربية معتمدة ورصينة', 'غلاف كرتوني مقوى Hardcover', 'ورق كريمي مريح للعين أثناء القراءة الطويلة', 'عدد الصفحات: 340 صفحة'],
        variants: ['طبعة مجلدة هاردكفر', 'طبعة ورقية مرنة']
      },
      {
        id: 'read-2',
        nameAr: 'رواية مئة عام من العزلة — غابرييل غارسيا ماركيز',
        category: 'fiction',
        price: 2600,
        originalPrice: 3200,
        rating: 4.9,
        reviewsCount: 140,
        badge: 'تحفة نوبل',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'الملحمة الساحرة التي خلدت بلدة ماكوندو وتاريخ عائلة بوينديا عبر سبعة أجيال في قالب الواقعية السحرية.',
        detailsAr: ['ترجمة صالح علماني الشهيرة والمتقنة', 'شاملة شجرة عائلة بوينديا التوضيحية', 'غلاف كلاسيكي أنيق برسوم خاصة', 'عدد الصفحات: 504 صفحات'],
        variants: ['غلاف كلاسيكي أصفر']
      },
      {
        id: 'read-3',
        nameAr: 'سيكولوجية المال — مورغان هاوسل (دروس خالدة في الثروة)',
        category: 'business',
        price: 2200,
        originalPrice: 2700,
        rating: 4.9,
        reviewsCount: 118,
        badge: 'أكثر مبيعاً',
        image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=800&auto=format&fit=crop',
        shortDescAr: '19 قصة قصيرة تستكشف الطرق الغريبة التي يفكر بها الناس في المال، وكيفية اتخاذ قرارات مالية حكيمة.',
        detailsAr: ['أسلوب سلس ومباشر يبتعد عن التعقيد الحسابي', 'أمثلة واقعية ملهمة من كبار المستثمرين', 'عدد الصفحات: 280 صفحة'],
        variants: ['طبعة جديدة منقحة']
      },
      {
        id: 'read-4',
        nameAr: 'دفتر ملاحظات جلدي يدوي الصنع Vintage Leather Journal',
        category: 'notebooks',
        price: 4800,
        originalPrice: 5900,
        rating: 5.0,
        reviewsCount: 76,
        badge: 'صناعة يدوية',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'غلاف من جلد البقر الطبيعي المعتق بحزام جلدي ملتف، يحتوي على 240 صفحة من الورق القطني السميك.',
        detailsAr: ['ورق قطني يدوي 120 GSM خالي من الأحماض', 'مناسب لأقلام الحبر السائل دون تسرب الحبر للظهر', 'حجم مثالي للحمل اليومي: A5 (15 × 21 سم)'],
        variants: ['بني قهوة عتيق', 'أسود فحمي مدبوغ']
      },
      {
        id: 'read-5',
        nameAr: 'قلم حبر سائل كلاسيكي سن إيريديوم ألماني فاخر',
        category: 'pens',
        price: 5500,
        originalPrice: 6800,
        rating: 4.8,
        reviewsCount: 44,
        badge: 'لهواة الكتابة',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'هيكل من النحاس المطلي بالمينا السوداء مع سن ذهبي ياباني ناعم يوفر انسيابية خط استثنائية.',
        detailsAr: ['سن ناعم قياس 0.5 مم Fine Nib', 'يشمل محول حبر قابل لإعادة التعبئة Converter', 'علبة هدايا خشبية فاخرة'],
        variants: ['أسود مطعم بذهب', 'فضي ستانلس ستيل']
      },
      {
        id: 'read-6',
        nameAr: 'مصباح قراءة ليلي قابل للشحن مع ملقط حماية للكتب',
        category: 'pens',
        price: 2800,
        originalPrice: 3500,
        rating: 4.7,
        reviewsCount: 92,
        badge: 'مريح للعين',
        image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'ضوء دافئ خالي من الإشعاع الأزرق مع 3 مستويات سطوع ورقبة مرنة قابلة للدوران 360 درجة.',
        detailsAr: ['درجة إضاءة كهرمانية مريحة 1800K', 'بطارية تدوم حتى 50 ساعة قراءة متواصلة', 'ملقط مبطن بالسيليكون لحماية أوراق الكتب من الخدش'],
        variants: ['أبيض رخامي', 'أسود كلاسيكي']
      }
    ]
  },

  // 8) Pawz — Pet Supplies & Nutrition
  {
    id: 'pawz',
    name: 'Pawz',
    nameAr: 'باوز لمستلزمات ورعاية الحيوانات الأليفة',
    taglineAr: 'لأنهم يستحقون الأفضل دائماً — أغذية ممتازة، ألعاب محفزة، ومستلزمات نوم وصحة لرفاقك الأوفياء',
    categoryAr: 'مستلزمات حيوانات أليفة',
    theme: {
      primary: '#059669',       // Fresh Mint Green
      primaryHover: '#047857',
      secondary: '#0284c7',     // Sky Blue
      bg: '#f0fdf4',            // Soft Pale Mint
      cardBg: '#ffffff',
      accent: '#eab308',        // Friendly Yellow
      text: '#0f172a',
      textMuted: '#64748b',
      border: 'rgba(5, 150, 105, 0.2)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(5, 150, 105, 0.1)',
      badgeText: '#047857'
    },
    hero: {
      badgeAr: 'غذاء صحي ومستلزمات بيطرية معتمدة',
      headlineAr: 'كل ما يحتاجه صديقك الأليف لسعادة وصحة تدوم',
      subheadlineAr: 'دراي فود ممتاز غني بالبروتين، أسرة نوم قطنية مريحة، وألعاب تفاعلية تحافظ على نشاط وحيوية كلابك وقططك.',
      ctaTextAr: 'تسوق لحيوانك الأليف',
      bgImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'جميع المستلزمات' },
      { id: 'cats', nameAr: 'مستلزمات وأغذية القطط' },
      { id: 'dogs', nameAr: 'مستلزمات وأغذية الكلاب' },
      { id: 'beds', nameAr: 'أسرّة وبيوت قطنية' },
      { id: 'toys', nameAr: 'ألعاب وخدّاشات ذكية' },
      { id: 'grooming', nameAr: 'نظافة وعناية وفيتامينات' }
    ],
    promoNoticeAr: 'توصيل سريع خاص لأكياس الدراي فود الكبيرة حتى باب منزلك مع ضمان تاريخ إنتاج حديث.',
    products: [
      {
        id: 'pawz-1',
        nameAr: 'طعام جاف ممتاز للقطط البالغة بالسلمون البري والأرز (10 كغ)',
        category: 'cats',
        price: 11500,
        originalPrice: 13500,
        rating: 4.9,
        reviewsCount: 165,
        badge: 'أعلى تقييم بيطري',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'تركيبة غنية بأوميغا 3 و 6 لصحة الفرو ومنع كرات الشعر، مدعمة بالتورين الضروري لصحة القلب والبصر.',
        detailsAr: ['بروتين خام 34%، دهون صحية 16%', 'خالٍ من ملونات النكهات الصناعية والقمح المكرر', 'حبات مقرمشة تساعد على تنظيف الأسنان'],
        variants: ['كيس 10 كغ توفيري', 'كيس 3 كغ تجريبي']
      },
      {
        id: 'pawz-2',
        nameAr: 'سرير غيمة ميموري فوم مهدئ للحيوانات الأليفة (مقاس L)',
        category: 'beds',
        price: 6800,
        originalPrice: 8200,
        rating: 5.0,
        reviewsCount: 88,
        badge: 'راحة مهدئة للتوتر',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'سرير دائري فائق النعومة بحواف مرتفعة تمنح شعوراً بالأمان وتدعم الرأس والرقبة لنوم هادئ وعميق.',
        detailsAr: ['فرو صناعي فاخر قابل للغسل في الغسالة', 'قاعدة مانعة للانزلاق والماء', 'حشوة قطن لؤلؤي كثيف يدوم دون هبوط'],
        variants: ['مقاس M (قطط وكلاب صغيرة)', 'مقاس L (كلاب متوسطة وكبيرة)']
      },
      {
        id: 'pawz-3',
        nameAr: 'شجرة برج تسلق وخدّاشة متعددة الأدوار للقطط (145 سم)',
        category: 'toys',
        price: 15800,
        originalPrice: 18900,
        rating: 4.8,
        reviewsCount: 54,
        badge: 'أكثر طلباً',
        image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'برج متين بأعمدة ملفوفة بحبال السيزال الطبيعي، مع بيتين مغلقين وأرجوحة مريحة للقيلولة.',
        detailsAr: ['أعمدة سيزال طبيعية 100% تقي أثاث البيت من الخدش', 'قاعدة خشبية ثقيلة تمنع الانقلاب أثناء القفز السريع', 'سهلة التجميع في 15 دقيقة مع دليل مصور'],
        variants: ['رمادي داكن كلاسيكي', 'بيج دافئ']
      },
      {
        id: 'pawz-4',
        nameAr: 'مكافآت كلاب مقرمشة من لحم البقر المجفف الغني بالكولاجين',
        category: 'dogs',
        price: 2400,
        originalPrice: 3000,
        rating: 4.9,
        reviewsCount: 78,
        badge: 'مكونات نقية 100%',
        image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'شرائح لحم بقري طبيعي مجفف بالهواء البارد، مثالية لتدريب الكلاب ومكافأتهم بمكونات صحية.',
        detailsAr: ['خالية من الحبوب والسكر والمواد الحافظة', 'تعزز قوة المفاصل والأسنان', 'عبوة محكمة الإغلاق بوزن 250 غرام'],
        variants: ['لحم بقر بروتين عالي', 'صدر دجاج مقرمش']
      },
      {
        id: 'pawz-5',
        nameAr: 'نافورة مياه ذكية وفلترة رباعية صامتة للقطط والكلاب',
        category: 'cats',
        price: 5900,
        originalPrice: 7200,
        rating: 4.8,
        reviewsCount: 112,
        badge: 'صحة الكلى',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'نافورة تدفق مياه سعة 2.5 لتر تشجع الحيوان على شرب المزيد من الماء النقي بفلتر كربون نشط.',
        detailsAr: ['مضخة صامتة للغاية Ultra-quiet أقل من 20 ديسيبل', 'ضوء LED ذكي يوضح مستوى المياه', 'إيقاف تلقائي عند نفاد المياه لحماية المحرك'],
        variants: ['أبيض ناصع مع 3 فلاتر إضافية']
      },
      {
        id: 'pawz-6',
        nameAr: 'شامبو وبلسم عضوي بالصبار والشوفان لفرو ناعم ورائحة منعشة',
        category: 'grooming',
        price: 2900,
        originalPrice: 3600,
        rating: 4.7,
        reviewsCount: 63,
        badge: 'لطيف على الجلد',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'تركيبة بيطرية متوازنة درجة الحموضة pH تحمي البشرة من الجفاف وتزيل الروائح الكريهة بلطف.',
        detailsAr: ['حجم العبوة: 500 مل مركزة', 'خالٍ من الكبريتات والبارابين', 'يمنح الفرو بريقاً وسهولة في التمشيط'],
        variants: ['برائحة اللافندر المهدئ', 'برائحة جوز الهند']
      }
    ]
  },

  // 9) ZenFit — High-Performance Fitness & Athletic Gear
  {
    id: 'zenfit',
    name: 'ZenFit',
    nameAr: 'زن فيت للمعدات الرياضية واللياقة البدنية',
    taglineAr: 'ارتقِ بلياقتك وقوتك البدنية — ملابس رياضية تقنية، أوزان حديدية، وأجهزة تمرين احترافية للصالات والمنازل',
    categoryAr: 'لياقة ومعدات رياضية',
    theme: {
      primary: '#84cc16',       // Electric Lime Green
      primaryHover: '#65a30d',
      secondary: '#0f172a',     // Slate Carbon
      bg: '#090d16',            // Deep Dark Gym Matte
      cardBg: '#111827',
      accent: '#a3e635',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(132, 204, 22, 0.25)',
      fontFamily: 'sans-serif',
      badgeBg: 'rgba(132, 204, 22, 0.12)',
      badgeText: '#bef264'
    },
    hero: {
      badgeAr: 'عتاد التدريب الاحترافي للرياضيين',
      headlineAr: 'القوة، التحمل، والوصول إلى أفضل نسخة منك',
      subheadlineAr: 'أطقم ملابس ضغط Dry-Fit سريعة الجفاف، حقائب حديدية قابلة لتعديل الأوزان، ومسدسات تدليك لتسريع استشفاء العضلات.',
      ctaTextAr: 'ابدأ تمرينك الآن',
      bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل العتاد الرياضي' },
      { id: 'weights', nameAr: 'دامبلز وأوزان تدريب' },
      { id: 'wear', nameAr: 'ملابس أداء وتدريب Pro' },
      { id: 'recovery', nameAr: 'استشفاء وتدليك العضلات' },
      { id: 'cardio', nameAr: 'حبال قفز ومطاطات مقاومة' },
      { id: 'bottles', nameAr: 'شيكرات وزجاجات بروتين' }
    ],
    promoNoticeAr: 'توصيل مجاني لكافة الأطقم الرياضية + برنامج تدريبي أسبوعي مجاني مع كل طلب.',
    products: [
      {
        id: 'zen-1',
        nameAr: 'طقم أثقال دامبلز ذكية قابلة للتعديل السريع (5 إلى 32 كغ)',
        category: 'weights',
        price: 49000,
        originalPrice: 58000,
        rating: 4.9,
        reviewsCount: 77,
        badge: 'توفر مساحة الصالة',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'آلية قرص دوار ذكية تتيح تغيير الوزن في ثانية واحدة، تحل محل 15 زوجاً من الأثقال التقليدية.',
        detailsAr: ['نطاق أوزان من 5 كغ إلى 32 كغ لكل يد', 'أقراص فولاذية مغطاة بطبقة بوليمر تمنع الخدوش والضجيج', 'تشمل قاعدتي تخزين وتثبيت أرضي'],
        variants: ['زوج دامبلز (2 × 32 كغ)', 'فردة واحدة (32 كغ)']
      },
      {
        id: 'zen-2',
        nameAr: 'طقم ملابس ضغط رياضية ZenFit Pro Tech Seamless (3 قطع)',
        category: 'wear',
        price: 9500,
        originalPrice: 12000,
        rating: 4.8,
        reviewsCount: 114,
        badge: 'ضغط عضلي متقدم',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'يشمل: تيشيرت ضغط بأكمام طويلة، ليجنز تدريب، وشورت خفيف بفتحات تهوية، نسيج طارد للعرق 4-Way Stretch.',
        detailsAr: ['نسيج مسامي يسرع تبخر العرق ويمنع الروائح', 'دعم استقرار المفاصل وتقليل اهتزاز العضلات', 'خياطة فلاتلوك ملساء تمنع الاحتكاك الجلدي'],
        variants: ['أسود مع خطوط ليموني', 'رمادي كربوني مع أسود']
      },
      {
        id: 'zen-3',
        nameAr: 'مسدس تدليك واسترخاء العضلات العميق ZenGun Pro 30 Speed',
        category: 'recovery',
        price: 13500,
        originalPrice: 16900,
        rating: 5.0,
        reviewsCount: 92,
        badge: 'استشفاء فوري',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'محرك بدون فحمات Brushless قوي وعازل للصوت، يخترق الأنسجة العضلية بعمق 12 مم لتفكيك التشنجات.',
        detailsAr: ['30 سرعة ترددية قابلة للتعديل عبر شاشة لمس LCD', '6 رؤوس تدليك مخصصة لمختلف المجموعات العضلية', 'بطارية تدوم حتى 6 ساعات متواصلة بشحنة واحدة', 'حقيبة حمل صلبة لحمايته أثناء التنقل'],
        variants: ['أسود مطفي بريميوم']
      },
      {
        id: 'zen-4',
        nameAr: 'حبل قفز فائق السرعة Speed Rope برولمان مزدوج وأسلاك فولاذية',
        category: 'cardio',
        price: 2600,
        originalPrice: 3400,
        rating: 4.8,
        reviewsCount: 68,
        badge: 'تمارين الكارديو',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'كابل فولاذي مغلف بمحامل دوارة 360 درجة تمكنك من تأدية قفزات Double Unders بأقصى سرعة ممكنة.',
        detailsAr: ['مقبض ألومنيوم مخرش مانع لانزلاق اليد مع التعرق', 'طول الكابل 3 أمتار قابل للتعديل بسهولة', 'يأتي مع سلك احتياطي وحقيبة شبكية'],
        variants: ['أخضر ليموني', 'أسود ستيل']
      },
      {
        id: 'zen-5',
        nameAr: 'طقم أشرطة مقاومة مطاطية لاتكس طبيعي (5 مستويات قوة)',
        category: 'cardio',
        price: 4200,
        originalPrice: 5500,
        rating: 4.9,
        reviewsCount: 85,
        badge: 'تمارين منزلية وسفر',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'مستويات مقاومة تبدأ من 5 كغ حتى 68 كغ لتمارين الإحماء، السحب، ورفع كفاءة تمرين العقلة.',
        detailsAr: ['لاتكس طبيعي متين 100% مقاوم للقطع والارتخاء', 'دليل مصور يحتوي على أكثر من 30 تمريناً رياضياً', 'حقيبة قماشية خفيفة للتنقل'],
        variants: ['طقم 5 ألوان متدرجة المقاومة']
      },
      {
        id: 'zen-6',
        nameAr: 'زجاجة شيكر بروتين عازلة من الستانلس ستيل ZenShaker 750ml',
        category: 'bottles',
        price: 3200,
        originalPrice: 4000,
        rating: 4.7,
        reviewsCount: 59,
        badge: 'تحفظ البرودة 24 ساعة',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'تحافظ على برودة مخفوق البروتين، مزودة بشبك خلط صامت وغطاء محكم مانع للتسرب بنسبة 100%.',
        detailsAr: ['ستانلس ستيل طبي 18/8 لا يمتص الروائح إطلاقاً', 'خالية من البيسفينول BPA-Free', 'مقياس سعة داخلي منقوش بوضوح'],
        variants: ['أسود غير لامع', 'فضي ستانلس']
      }
    ]
  },

  // 10) OUTLET — Discount Mega Clearance Store
  {
    id: 'outlet',
    name: 'OUTLET',
    nameAr: 'أوتلت — متجر التخفيضات الكبرى',
    taglineAr: 'ماركات عالمية وأصلية بأسعار تصفية حقيقية — خصومات تصل إلى 60% على تشكيلات متنوعة منوعة',
    categoryAr: 'تخفيضات وتصفية شاملة',
    theme: {
      primary: '#dc2626',       // Vibrant Clearance Red
      primaryHover: '#b91c1c',
      secondary: '#000000',     // Pure Black
      bg: '#0a0a0a',            // Dark Clearance Hub
      cardBg: '#171717',
      accent: '#ef4444',
      text: '#fafafa',
      textMuted: '#a3a3a3',
      border: 'rgba(220, 38, 38, 0.3)',
      fontFamily: 'sans-serif',
      badgeBg: '#dc2626',
      badgeText: '#ffffff'
    },
    hero: {
      badgeAr: 'تصفية نهاية الموسم — أسعار مباشرة من المصنع',
      headlineAr: 'أقوى الصفقات الحقيقية بدون مبالغات وهمية',
      subheadlineAr: 'ملابس، أحذية رياضية، إلكترونيات، وساعات يدوية أصلية بتخفيضات دقيقة ومحسوبة بدقة مقارنة بأسعار التجزئة السابقة.',
      ctaTextAr: 'تصفح عروض التصفية الفورية',
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop'
    },
    categories: [
      { id: 'all', nameAr: 'كل عروض التصفية' },
      { id: 'sneakers', nameAr: 'أحذية وسنيكرز مخفضة' },
      { id: 'apparel', nameAr: 'ألبسة شتوية وصيفية' },
      { id: 'watches', nameAr: 'ساعات وإكسسوارات' },
      { id: 'tech', nameAr: 'ملحقات إلكترونية' },
      { id: 'bags', nameAr: 'حقائب سفر وظهر' }
    ],
    promoNoticeAr: 'الأسعار السابقة معروضة بشفافية تامة مع نسبة الخصم الدقيقة. الكميات محدودة بمخزون التصفية الحالي.',
    products: [
      {
        id: 'out-1',
        nameAr: 'حذاء سنيكرز كلاسيكي مريح Retro Runner — تصفية',
        category: 'sneakers',
        price: 6900,
        originalPrice: 14500, // 52% off
        rating: 4.8,
        reviewsCount: 148,
        badge: 'خصم 52%',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'سنيكرز خفيف الوزن بنعل إيفا مريح للغاية، قماش شبكي يسمح بمرور الهواء، تصميم رياضي يومي.',
        detailsAr: ['سعر البيع السابق الموثق: 14,500 دج', 'وفر 7,600 دج فورياً', 'نعل مطاطي مقاوم للتآكل', 'ضمان أصالة المنتج بنسبة 100%'],
        variants: ['40', '41', '42', '43', '44']
      },
      {
        id: 'out-2',
        nameAr: 'جاكيت باركا شتوي مبطن بالفرو الصناعي العازل',
        category: 'apparel',
        price: 11900,
        originalPrice: 22000, // 46% off
        rating: 4.9,
        reviewsCount: 95,
        badge: 'خصم 46%',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'سترة شتوية ثقيلة بطبقة خارجية عازلة للمطر والرياح، حشوة دافئة وأزرار معدنية متباينة.',
        detailsAr: ['سعر البيع السابق: 22,000 دج', 'وفر 10,100 دج', 'قبعة دافئة قابلة للإزالة', 'جيوب صدرية وجانبية متعددة'],
        variants: ['M', 'L', 'XL', 'XXL']
      },
      {
        id: 'out-3',
        nameAr: 'ساعة كرونوغراف ستانلس ستيل رجالية رياضية',
        category: 'watches',
        price: 8500,
        originalPrice: 17000, // 50% off
        rating: 4.7,
        reviewsCount: 62,
        badge: 'خصم 50%',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'حركة كوارتز يابانية دقيقة مع عقارب مضيئة في الظلام ومقاومة رذاذ الماء.',
        detailsAr: ['سعر البيع السابق: 17,000 دج', 'وفر 8,500 دج بنصف السعر تماماً', 'سوار فولاذي متين مقاوم للصدأ', 'تأتي في علبة أصلية مع بطاقة الضمان'],
        variants: ['ميناء أزرق بحري', 'ميناء أسود فحمي']
      },
      {
        id: 'out-4',
        nameAr: 'سماعات أذن لاسلكية Bluetooth 5.3 مع علبة شحن سريعة',
        category: 'tech',
        price: 3900,
        originalPrice: 8500, // 54% off
        rating: 4.6,
        reviewsCount: 110,
        badge: 'خصم 54%',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'صوت واضح مع ميكروفون مدمج لإجراء المكالمات بوضوح، اقتران فوري، وبطارية تكفي 20 ساعة مع العلبة.',
        detailsAr: ['سعر البيع السابق: 8,500 دج', 'وفر 4,600 دج', 'مدخل شحن Type-C حديث', 'مقاومة للعرق أثناء التمارين معيار IPX4'],
        variants: ['أبيض لامع', 'أسود غير لامع']
      },
      {
        id: 'out-5',
        nameAr: 'حقيبة سفر ترولي صلبة خفيفة الوزن بعجلات 360° (مقاس كابينة)',
        category: 'bags',
        price: 7900,
        originalPrice: 15000, // 47% off
        rating: 4.8,
        reviewsCount: 73,
        badge: 'خصم 47%',
        image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'هيكل من البولي كربونات المقاوم للصدمات، قفل أمان بأرقام سرية، وتقسيم داخلي مريح لحزم الملابس.',
        detailsAr: ['سعر البيع السابق: 15,000 دج', 'وفر 7,100 دج', 'متوافقة مع معايير الحقائب المحمولة داخل الطائرة', 'أربع عجلات صامتة وسلسة الحركة'],
        variants: ['فضي ميتاليك', 'كحلي داكن', 'أسود']
      },
      {
        id: 'out-6',
        nameAr: 'نظارة شمسية كلاسيكية مستقطبة Polarized UV400',
        category: 'watches',
        price: 2900,
        originalPrice: 6500, // 55% off
        rating: 4.8,
        reviewsCount: 89,
        badge: 'خصم 55%',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
        shortDescAr: 'عدسات بولارايزد تمنع وهج الشمس المنعكس على الطرق والأسطح، إطار خفيف ومريح للأذن والأنف.',
        detailsAr: ['سعر البيع السابق: 6,500 دج', 'وفر 3,600 دج', 'حماية 100% من الأشعة فوق البنفسجية UV400', 'تشمل جراب جلدي ومنديل مايكروفايبر'],
        variants: ['إطار أسود مع عدسات سوداء', 'إطار تايجر عسلي']
      }
    ]
  }
];

export const getStoreById = (id) => {
  return DEMO_STORES.find(store => store.id.toLowerCase() === id?.toLowerCase());
};

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "nl" | "ar";

type Dict = Record<string, { nl: string; ar: string }>;

export const translations: Dict = {
  // nav
  "nav.home": { nl: "Home", ar: "الرئيسية" },
  "nav.services": { nl: "Diensten", ar: "الخدمات" },
  "nav.about": { nl: "Over Ons", ar: "من نحن" },
  "nav.contact": { nl: "Contact", ar: "اتصل بنا" },
  "nav.quote": { nl: "Vraag Offerte", ar: "اطلب عرض سعر" },

  // hero
  "hero.tag": { nl: "Vakmanschap sinds jaren", ar: "حرفية متقنة" },
  "hero.title": { nl: "Premium Klusservice voor uw Huis", ar: "خدمات صيانة منزلية فاخرة" },
  "hero.subtitle": {
    nl: "Van schilderwerk tot timmerwerk — Attar Klusservice levert vakwerk met zorg, snelheid en absolute betrouwbaarheid.",
    ar: "من الدهان إلى النجارة — تقدم Attar Klusservice خدمات حرفية بعناية وسرعة وموثوقية مطلقة.",
  },
  "hero.cta": { nl: "Ontdek Onze Diensten", ar: "اكتشف خدماتنا" },
  "hero.cta2": { nl: "Neem Contact Op", ar: "تواصل معنا" },

  // sections
  "services.title": { nl: "Onze Diensten", ar: "خدماتنا" },
  "services.subtitle": {
    nl: "Specialisaties van één vakman die u vertrouwt.",
    ar: "تخصصات حرفي واحد تثقون به.",
  },
  "services.more": { nl: "Meer Diensten Bekijken", ar: "عرض المزيد من الخدمات" },
  "services.less": { nl: "Minder Tonen", ar: "عرض أقل" },

  "about.title": { nl: "Meer dan 7 jaar vakmanschap en persoonlijke service", ar: "أكثر من 7 سنوات خبرة وحرفية شخصية" },
  "about.lead": {
    nl: "Attar Klusservice levert renovatie- en onderhoudswerkzaamheden met een scherp oog voor detail, betrouwbaarheid en afwerking op topniveau.",
    ar: "تقدم Attar Klusservice أعمال التجديد والصيانة بعين دقيقة للتفاصيل والموثوقية وتشطيب فائق.",
  },
  "about.body": {
    nl: "Sinds de oprichting zeven jaar geleden heeft ons team een reputatie opgebouwd voor verzorgde projecten, transparante offertes en duurzame resultaten. We combineren moderne technieken met traditionele vakkennis en werken volgens duidelijke afspraken. Uw woning wordt behandeld alsof het ons eigen huis is.",
    ar: "منذ تأسيسنا قبل أكثر من سبع سنوات، بنينا سمعة قوية في تنفيذ المشاريع بدقة، عروض أسعار واضحة، ونتائج تدوم. نمزج بين تقنيات حديثة وخبرة تقليدية، ونعمل وفق اتفاقيات شفافة. منزلكم يُعالج كما لو كان منزلنا الخاص.",
  },
  "about.stat1": { nl: "Jaren Ervaring", ar: "سنوات الخبرة" },
  "about.stat2": { nl: "Tevreden Klanten", ar: "عملاء راضون" },
  "about.stat3": { nl: "Projecten Voltooid", ar: "مشاريع منجزة" },

  "contact.title": { nl: "Contact & Feedback", ar: "اتصال وملاحظات" },
  "contact.name": { nl: "Naam", ar: "الاسم" },
  "contact.email": { nl: "E-mail", ar: "البريد الإلكتروني" },
  "contact.phone": { nl: "Telefoon", ar: "الهاتف" },
  "contact.message": { nl: "Bericht", ar: "الرسالة" },
  "contact.send": { nl: "Verzenden", ar: "إرسال" },
  "contact.sent": { nl: "Bedankt! Wij nemen snel contact op.", ar: "شكراً! سنتواصل معكم قريباً." },
  "contact.pageTitle": { nl: "Neem contact op", ar: "تواصل معنا" },
  "contact.pageLead": {
    nl: "Plan een vrijblijvende kennismaking.",
    ar: "احجز موعداً مجانياً.",
  },
  "contact.company": { nl: "Company", ar: "الشركة" },
  "contact.companyDescription": {
    nl: "Premium onderhoud, renovatie en interieurwerk met een professionele aanpak en heldere afspraken.",
    ar: "صيانة وتجديد داخلي احترافية مع نهج شفاف ومواعيد دقيقة.",
  },
  "contact.emergencyLabel": { nl: "24/7", ar: "24/7" },
  "contact.emergencyValue": { nl: "Spoed Service", ar: "خدمة الطوارئ" },
  "footer.powered": { nl: "Powerd by", ar: "Powerd by" },
  "footer.trust": { nl: "Trustbe Geverifieerd", ar: "موثق عبر Trustbe" },
  "footer.kvk": { nl: "KVK-nummer", ar: "رقم KVK" },
  "footer.address": { nl: "Adres", ar: "العنوان" },
  "footer.phone": { nl: "Telefoon", ar: "الهاتف" },
  "footer.email": { nl: "E-mail", ar: "البريد الإلكتروني" },
  "footer.tagline": {
    nl: "Premium klusservice met absolute betrouwbaarheid.",
    ar: "خدمات صيانة فاخرة بموثوقية مطلقة.",
  },

  "s.carpentry.t": { nl: "Timmer- en maatwerk", ar: "أعمال النجارة والتفصيل حسب الطلب" },
  "s.carpentry.d": {
    nl: "Maatwerk kasten, timmerwerk op maat, aftimmerwerk en houten constructies — vakmanschap met precisie.",
    ar: "خزائن مصممة حسب الطلب وأعمال نجارة وتشطيبات خشبية وإنشاءات خشبية — حرفية بدقة.",
  },
  "s.flooring.t": { nl: "Vloeren en trappen", ar: "الأرضيات والسلالم" },
  "s.flooring.d": {
    nl: "Laminaat, PVC en traprenovatie — vloeren en trappen perfect afgewerkt.",
    ar: "لامينيت وPVC وتجديد السلالم — أرضيات وسلالم بتشطيب مثالي.",
  },
  "s.painting.t": { nl: "Schilder- en afwerkingswerk", ar: "أعمال الدهان والتشطيب" },
  "s.painting.d": {
    nl: "Binnen schilderwerk, muren en kozijnen — ruimtes volledig afgewerkt en gerenoveerd.",
    ar: "دهان داخلي وجدران وأبواب ونوافذ — مساحات مُشطّبة ومُجدّدة بالكامل.",
  },
  "s.installation.t": { nl: "Montagewerk", ar: "أعمال التركيب" },
  "s.installation.d": {
    nl: "Montage van meubels, kasten en interieuronderdelen — snel en netjes geplaatst.",
    ar: "تركيب الأثاث والخزائن وعناصر الديكور الداخلي — سريع ومنظم.",
  },
  "s.renovation.t": { nl: "Renovatie en onderhoud", ar: "التجديد والصيانة" },
  "s.renovation.d": {
    nl: "Kleine renovaties, herstelwerkzaamheden en onderhoud — uw woning in topconditie.",
    ar: "تجديدات صغيرة وإصلاحات وصيانة — منزلك في أفضل حالة.",
  },

  "s.drywall.t": { nl: "Gipsplaten & Systeemwanden", ar: "ألواح الجبس والجدران الخفيفة" },
  "s.drywall.d": {
    nl: "Wilt u uw woning of bedrijfsruimte efficiënt indelen of moderniseren? Wij verzorgen de professionele plaatsing van gipsplaten, scheidingswanden en plafonds. Met oog voor detail creëren wij strakke, duurzame en perfect afgewerkte ruimtes die volledig aansluiten bij uw wensen.",
    ar: "هل تريد تقسيم مساحتك بشكل عصري وفعّال؟ نتولى التركيب الاحترافي لألواح الجبس والجدران الخفيفة والأسقف بدقة عالية، لنُبدع مساحات متناسقة ومتينة ومشطّبة بإتقان تام وفق رغباتك.",
  },

  "s.stucco.t": { nl: "Stucwerk & Plamuurwerk", ar: "أعمال التلييس والبلمبر" },
  "s.stucco.d": {
    nl: "Een perfect eindresultaat begint met een perfect voorbereide ondergrond. Wij zorgen voor gladde muren en plafonds door professioneel plamuur- en stucwerk. Zo creëren wij de ideale basis voor verf, behang of andere afwerkingen.",
    ar: "النتيجة المثالية تبدأ من الأساس المثالي. نُعدّ الجدران والأسقف بعمل تلييس وبلمبر احترافي يضمن سطحاً ناعماً ومستوياً تماماً، جاهزاً للطلاء أو ورق الجدران أو أي تشطيب آخر.",
  },

  "s.insulation.t": { nl: "Isolatie", ar: "العزل الحراري والصوتي" },
  "s.insulation.d": {
    nl: "Bespaar op energiekosten en verhoog uw wooncomfort met professionele isolatie. Wij bieden oplossingen voor thermische en akoestische isolatie die zorgen voor een aangename temperatuur en minder geluidsoverlast.",
    ar: "وفّر على فاتورة الطاقة وعزّز راحتك في المنزل مع العزل الاحترافي. نقدم حلول العزل الحراري والصوتي التي توفر درجة حرارة مريحة وتُقلل الضوضاء.",
  },

  "s.wallpaper.t": { nl: "Behang Verwijderen & Nieuw Behang Plaatsen", ar: "إزالة الورق وتركيب ورق جديد" },
  "s.wallpaper.d": {
    nl: "Toe aan een nieuwe uitstraling? Wij verwijderen oud behang zorgvuldig en plaatsen nieuw behang vakkundig voor een strak en stijlvol resultaat. Van klassiek tot modern, wij zorgen voor een perfecte afwerking.",
    ar: "هل تريد مظهراً جديداً؟ نزيل الورق القديم بعناية ونركّب الجديد باحتراف لنتيجة أنيقة ومتناسقة. من الكلاسيكي إلى العصري، نضمن تشطيباً مثالياً.",
  },

  "s.doorpainting.t": { nl: "Schilderwerk van Deuren & Keukens", ar: "طلاء الأبواب والمطابخ" },
  "s.doorpainting.d": {
    nl: "Geef uw deuren en keuken een tweede leven zonder hoge vervangingskosten. Met professionele verf- en laktechnieken zorgen wij voor een frisse, moderne uitstraling die jarenlang meegaat.",
    ar: "امنح أبوابك ومطبخك حياة جديدة دون تكاليف الاستبدال الباهظة. بتقنيات الطلاء والورنيش الاحترافية، نضمن مظهراً عصرياً وأنيقاً يدوم لسنوات.",
  },

  "s.customcarpentry.t": { nl: "Maatwerk Timmerwerk", ar: "النجارة المخصصة" },
  "s.customcarpentry.d": {
    nl: "Elke ruimte is uniek. Daarom maken wij maatwerk meubels, kasten en houtconstructies volledig afgestemd op uw wensen en beschikbare ruimte. Functionaliteit, kwaliteit en design komen samen in één oplossing.",
    ar: "كل مساحة فريدة من نوعها. لذا نصنع لك أثاثاً وخزائن وتراكيب خشبية مصممة بالكامل وفق احتياجاتك وأبعاد مساحتك. وظيفية وجودة وتصميم راقٍ في حل واحد متكامل.",
  },

  "contact.formLead": {
    nl: "Laat ons weten wat u nodig heeft en wij nemen snel contact op.",
    ar: "أخبرنا بما تحتاجه وسنعاود الاتصال بك في أسرع وقت.",
  },
  "contact.description": {
    nl: "Neem vandaag contact op voor een gratis, vrijblijvende offerte. Wij transformeren huizen met innovatieve oplossingen en vakmanschap.",
    ar: "اتصل بنا اليوم وحصل على استشارة مجانية، نحن نحول المنازل بأفكار مبتكرة ومهارة عالية.",
  },
  "contact.companyInfo": {
    nl: "Premium onderhoud, renovatie en interieurwerk met een professionele aanpak en heldere afspraken.",
    ar: "نقدّم خدمات عالية الجودة في: الدهانات، الأعمال الخشبية، الترميم، وتركيب الأرضيات. خبرة واحترافية تناسب منزلك.",
  },
  "footer.copyright": {
    nl: "© {year} Alle rechten voorbehouden aan",
    ar: "© {year} جميع الحقوق محفوظة لـ",
  },
  "footer.formSent": {
    nl: "Bedankt! Wij nemen snel contact op.",
    ar: "تم الإرسال — شكرًا لك!",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations) => string;
  dir: "ltr" | "rtl";
};

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "nl" || saved === "ar") setLangState(saved);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: keyof typeof translations) => translations[key]?.[lang] ?? String(key);

  return <LangCtx.Provider value={{ lang, setLang, t, dir }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

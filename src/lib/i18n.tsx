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

  "footer.powered": { nl: "Powerd by اسم الشركة", ar: "Powerd by اسم الشركة" },
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

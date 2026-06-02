import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { useLang, translations } from "@/lib/i18n";

import carpentry from "@/assets/service-carpentry.jpg";
import flooring from "@/assets/service-flooring.jpg";
import painting from "@/assets/service-painting.jpg";
import installation from "@/assets/service-gypsum.jpg";
import renovation from "@/assets/service-ceilings.jpg";

type Key = keyof typeof translations;

const services: { img: string; titleKey: Key; descKey: Key; bullets: { nl: string; ar: string }[] }[] = [
  { img: carpentry, titleKey: "s.carpentry.t", descKey: "s.carpentry.d",
    bullets: [
      { nl: "Maatwerkkasten", ar: "خزائن مصممة حسب الطلب" },
      { nl: "Timmerwerk op maat", ar: "أعمال نجارة حسب الطلب" },
      { nl: "Aftimmerwerk", ar: "أعمال التشطيبات الخشبية" },
      { nl: "Plinten en afwerking", ar: "تركيب الحواف والتشطيبات النهائية" },
      { nl: "Houten constructies en interieurwerk", ar: "إنشاءات خشبية وأعمال داخلية" },
    ] },
  { img: flooring, titleKey: "s.flooring.t", descKey: "s.flooring.d",
    bullets: [
      { nl: "Laminaat leggen", ar: "تركيب أرضيات اللامينيت" },
      { nl: "PVC-vloeren leggen", ar: "تركيب أرضيات PVC" },
      { nl: "Traprenovatie", ar: "تجديد السلالم" },
      { nl: "Afwerking van vloeren en trappen", ar: "تشطيب الأرضيات والسلالم" },
    ] },
  { img: painting, titleKey: "s.painting.t", descKey: "s.painting.d",
    bullets: [
      { nl: "Binnen schilderwerk", ar: "دهان داخلي" },
      { nl: "Muren en kozijnen schilderen", ar: "دهان الجدران وإطارات النوافذ والأبواب" },
      { nl: "Afwerking en renovatie van ruimtes", ar: "تشطيب وتجديد المساحات الداخلية" },
    ] },
  { img: installation, titleKey: "s.installation.t", descKey: "s.installation.d",
    bullets: [
      { nl: "Montage van meubels", ar: "تركيب الأثاث" },
      { nl: "Montage van kasten", ar: "تركيب الخزائن" },
      { nl: "Montage van interieuronderdelen", ar: "تركيب عناصر الديكور الداخلي" },
      { nl: "Kleine installaties en afwerking", ar: "أعمال تركيب بسيطة وتشطيبات نهائية" },
    ] },
  { img: renovation, titleKey: "s.renovation.t", descKey: "s.renovation.d",
    bullets: [
      { nl: "Kleine renovaties", ar: "تجديدات صغيرة" },
      { nl: "Herstelwerkzaamheden", ar: "أعمال إصلاح" },
      { nl: "Opknappen van ruimtes", ar: "تحسين وتجهيز المساحات" },
      { nl: "Onderhoudswerkzaamheden", ar: "أعمال صيانة" },
    ] },
];

export function Services({ initial = 3 }: { initial?: number }) {
  const { t, lang } = useLang();
  const [count, setCount] = useState(initial);
  const visible = services.slice(0, count);
  const canMore = count < services.length;

  const showMore = () => setCount(Math.min(count + 3, services.length));
  const showLess = () => setCount(initial);

  return (
    <section className="py-24 px-6 lg:px-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {t("services.title")}
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-950 mb-4">
            {t("services.subtitle")}
          </h2>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-16">
          <AnimatePresence>
            {visible.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  key={s.titleKey}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-2 gap-10 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative group overflow-hidden rounded-[32px] shadow-soft border border-slate-200 bg-white">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={s.img}
                      alt={t(s.titleKey)}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-[380px] object-cover"
                    />
                    <div className="absolute top-5 start-5 bg-slate-950 text-orange px-3 py-1.5 rounded-full text-xs font-bold tracking-widest">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-soft p-8">
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950 mb-4 leading-tight">
                      {t(s.titleKey)}
                    </h3>
                    <div className="h-1 w-16 bg-orange rounded-full mb-5" />
                    <p className="text-slate-700 text-lg leading-relaxed mb-6">{t(s.descKey)}</p>
                    <ul className="space-y-3">
                      {s.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-slate-700">
                          <span className="mt-1 h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5 text-orange" strokeWidth={3} />
                          </span>
                          <span className="font-medium">{b[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center mt-20 gap-4">
          {canMore && (
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={showMore}
              className="btn-primary"
            >
              {t("services.more")}
            </motion.button>
          )}
          {count > initial && (
            <button
              onClick={showLess}
              className="text-xs uppercase tracking-widest text-slate-500 hover:text-orange flex items-center gap-2 mt-4"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              {t("services.less")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

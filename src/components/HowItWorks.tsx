import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { MessageCircle, ClipboardList, Wrench } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    nl: {
      title: "Neem contact op",
      desc: "Vertel ons wat u nodig heeft via telefoon, WhatsApp of het contactformulier. Wij reageren snel.",
    },
    ar: {
      title: "تواصل معنا",
      desc: "أخبرنا بما تحتاجه عبر الهاتف أو واتساب أو نموذج التواصل. سنرد بسرعة.",
    },
  },
  {
    icon: ClipboardList,
    nl: {
      title: "Gratis inspectie & offerte",
      desc: "Wij komen langs, beoordelen de situatie ter plekke en bezorgen u een heldere, vrijblijvende offerte.",
    },
    ar: {
      title: "معاينة مجانية وعرض سعر",
      desc: "نزورك، نقيّم الوضع في عين المكان، ونقدم لك عرض سعر واضح وغير ملزم.",
    },
  },
  {
    icon: Wrench,
    nl: {
      title: "Vakkundige uitvoering",
      desc: "Ons team voert het werk netjes, snel en met oog voor detail uit — op de afgesproken datum en tijd.",
    },
    ar: {
      title: "تنفيذ احترافي بإتقان",
      desc: "فريقنا ينفذ العمل بنظافة وسرعة واهتمام بكل التفاصيل — في التاريخ والوقت المتفق عليه.",
    },
  },
];

export function HowItWorks() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  return (
    <section className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {isAr ? "العملية" : "Werkwijze"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-950 mb-4">
            {isAr ? "كيف نعمل؟" : "Hoe werkt het?"}
          </h2>
          <p className="text-slate-500 text-base">
            {isAr
              ? "ثلاث خطوات بسيطة تفصلك عن نتيجة مثالية"
              : "Drie eenvoudige stappen naar een perfect resultaat"}
          </p>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full mt-5" />
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* connecting line — desktop only */}
          <div className="hidden md:block absolute top-[52px] start-[calc(16.666%+24px)] end-[calc(16.666%+24px)] h-px bg-gradient-to-r from-orange/30 via-orange to-orange/30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              {/* icon circle */}
              <div className="relative mb-7 z-10">
                <div className="h-[104px] w-[104px] rounded-full bg-slate-950 flex items-center justify-center shadow-elegant ring-4 ring-white">
                  <step.icon className="h-10 w-10 text-orange" />
                </div>
                <span className="absolute -top-1 -end-1 h-7 w-7 rounded-full bg-orange text-white text-xs font-display font-black flex items-center justify-center shadow">
                  {i + 1}
                </span>
              </div>

              {/* text */}
              <div className="bg-slate-50 rounded-[28px] border border-slate-100 p-7 w-full flex-1">
                <h3 className="text-xl font-display font-bold text-slate-950 mb-3">
                  {step[lang].title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step[lang].desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

const reviews = [
  {
    name: "Sanne de Vries",
    city: "Amsterdam",
    nl: "Ongelooflijk vakwerk! Het schilderwerk in onze woonkamer is perfect afgewerkt. Attar werkt netjes, op tijd en met oog voor elk detail.",
    ar: "حرفية مذهلة! دهان غرفة الجلوس تم بإتقان مثالي. فريق عطار يعمل بنظافة وفي الوقت المحدد ومع اهتمام بكل التفاصيل.",
  },
  {
    name: "Mark Janssen",
    city: "Utrecht",
    nl: "De nieuwe badkamer overtreft al onze verwachtingen. Eerlijke prijs, premium materialen en een vriendelijk team. Echte aanrader!",
    ar: "الحمام الجديد فاق كل توقعاتنا. سعر عادل ومواد فاخرة وفريق ودود. أنصح به بشدة!",
  },
  {
    name: "Layla Hassan",
    city: "Rotterdam",
    nl: "Trap gestoffeerd met moket — het resultaat is luxe en comfortabel. Communicatie was uitstekend, ik voelde me echt gehoord.",
    ar: "تم تنجيد الدرج بالموكيت — النتيجة فاخرة ومريحة. التواصل كان ممتازاً وشعرت بأنني مسموعة فعلاً.",
  },
  {
    name: "Pieter Bakker",
    city: "Den Haag",
    nl: "Maatwerk kasten van topkwaliteit. Vakman pur sang. Attar Klusservice is voor mij dé partner voor toekomstige projecten.",
    ar: "خزائن مخصصة بجودة عالية جداً. حرفي حقيقي. عطار هو شريكي المفضل لكل المشاريع القادمة.",
  },
  {
    name: "Noor El Amrani",
    city: "Eindhoven",
    nl: "Snel, schoon en professioneel. De gipswanden zijn perfect glad afgewerkt. Een team dat je met een gerust hart in huis laat.",
    ar: "سريع ونظيف ومحترف. جدران الجبس مصقولة بشكل مثالي. فريق تستطيع أن تستقبله في بيتك بكل اطمئنان.",
  },
  {
    name: "Tom Visser",
    city: "Haarlem",
    nl: "Elektra-werk veilig en netjes uitgevoerd. Alles werkt feilloos. Heldere communicatie en eerlijke offerte zonder verrassingen.",
    ar: "أعمال الكهرباء تمت بأمان ونظافة. كل شيء يعمل بشكل مثالي. تواصل واضح وعرض سعر صادق بدون مفاجآت.",
  },
];

export function Testimonials() {
  const { lang } = useLang();
  const [page, setPage] = useState(0);
  const pageSize = 2;
  const pageCount = Math.ceil(reviews.length / pageSize);

  const visibleReviews = useMemo(() => {
    const start = page * pageSize;
    const next = reviews.slice(start, start + pageSize);
    if (next.length < pageSize) {
      return next.concat(reviews.slice(0, pageSize - next.length));
    }
    return next;
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, 4500);

    return () => clearInterval(interval);
  }, [pageCount]);

  return (
    <section className="py-14 px-6 lg:px-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {lang === "nl" ? "Klantbeoordelingen" : "آراء العملاء"}
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-950 mb-4">
            {lang === "nl" ? "Wat onze klanten zeggen" : "ماذا يقول عملاؤنا"}
          </h2>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full" />
        </motion.div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {visibleReviews.map((r) => (
                <motion.article
                  key={r.name}
                  className="relative bg-white border border-slate-200 rounded-[32px] p-8 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all group"
                >
                  <Quote className="absolute top-6 end-6 h-8 w-8 text-orange/20 group-hover:text-orange/40 transition-colors" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-orange text-orange" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed mb-6 italic">
                    "{lang === "nl" ? r.nl : r.ar}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                    <div className="h-10 w-10 rounded-full bg-orange/10 flex items-center justify-center text-orange font-display font-bold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-display font-bold text-slate-950">{r.name}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{r.city}</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

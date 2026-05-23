import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Award, Heart, Hammer, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Over Ons — Attar Klusservice" },
      { name: "description", content: "Vakmanschap en vertrouwen sinds jaren. Leer ons team en onze waarden kennen." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useLang();
  const values = [
    { icon: Hammer, t: { nl: "Vakmanschap", ar: "حرفية" }, d: { nl: "Elke klus met precisie en zorg.", ar: "كل عمل بدقة وعناية." } },
    { icon: Heart, t: { nl: "Toewijding", ar: "التزام" }, d: { nl: "We werken voor uw thuis als ons eigen.", ar: "نعمل في منزلكم كأنه منزلنا." } },
    { icon: Award, t: { nl: "Kwaliteit", ar: "جودة" }, d: { nl: "Premium materialen en duurzame resultaten.", ar: "مواد فاخرة ونتائج دائمة." } },
    { icon: Users, t: { nl: "Vertrouwen", ar: "ثقة" }, d: { nl: "Heldere prijzen, eerlijke afspraken.", ar: "أسعار واضحة واتفاقيات صادقة." } },
  ];

  return (
    <section className="px-6 lg:px-10 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {t("nav.about")}
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-black text-black mb-6 leading-tight">
            {t("about.title")}
          </h1>
          <p className="text-xl text-black/70 leading-relaxed mb-6">{t("about.lead")}</p>
          <p className="text-base text-black/60 leading-relaxed">{t("about.body")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black text-white p-8 rounded-2xl group hover:bg-orange transition-colors cursor-default"
            >
              <v.icon className="h-8 w-8 text-orange group-hover:text-white mb-4 transition-colors" />
              <div className="font-display font-bold text-xl mb-2">{v.t[lang]}</div>
              <div className="text-sm text-white/70 group-hover:text-white/90">{v.d[lang]}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 bg-black rounded-3xl p-10 lg:p-14">
          {[
            { n: "15+", l: t("about.stat1") },
            { n: "500+", l: t("about.stat2") },
            { n: "1200+", l: t("about.stat3") },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="font-display font-black text-6xl text-orange mb-2">{s.n}</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

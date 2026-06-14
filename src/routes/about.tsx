import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Award, Heart, Hammer, Users, BadgeCheck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Over Ons — Attar Klusservice" },
      { name: "description", content: "Vakmanschap en vertrouwen sinds jaren. Leer ons team en onze waarden kennen." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Hammer,
    nl: { t: "Vakmanschap", d: "Elke klus met precisie en zorg, van begin tot oplevering." },
    ar: { t: "حرفية", d: "كل عمل بدقة وعناية، من البداية حتى التسليم." },
  },
  {
    icon: Heart,
    nl: { t: "Toewijding", d: "We werken in uw woning alsof het ons eigen huis is." },
    ar: { t: "التزام", d: "نعمل في منزلكم كأنه منزلنا الخاص." },
  },
  {
    icon: Award,
    nl: { t: "Kwaliteit", d: "Premium materialen en duurzame resultaten die jaren meegaan." },
    ar: { t: "جودة", d: "مواد فاخرة ونتائج متينة تدوم لسنوات." },
  },
  {
    icon: Users,
    nl: { t: "Vertrouwen", d: "Heldere prijzen, eerlijke afspraken, geen verrassingen." },
    ar: { t: "ثقة", d: "أسعار واضحة واتفاقيات صادقة، بلا مفاجآت." },
  },
];

const timeline = [
  {
    year: "2017",
    nl: { title: "Oprichting", desc: "Attar Klusservice start als eenmanszaak in de regio Geldrop, met focus op kwaliteit en persoonlijk contact." },
    ar: { title: "التأسيس", desc: "انطلقت Attar Klusservice كمشروع فردي في منطقة Geldrop، بالتركيز على الجودة والخدمة الشخصية." },
  },
  {
    year: "2019",
    nl: { title: "Uitbreiding diensten", desc: "Toevoeging van gipswerk, isolatie, stucwerk en complete renovatieprojecten aan het aanbod." },
    ar: { title: "توسع الخدمات", desc: "إضافة أعمال الجبس والعزل والتلييس ومشاريع التجديد الكاملة إلى قائمة الخدمات." },
  },
  {
    year: "2021",
    nl: { title: "250+ projecten voltooid", desc: "Een mijlpaal: meer dan 250 tevreden klanten en een groeiende reputatie door de gehele regio." },
    ar: { title: "إتمام 250+ مشروع", desc: "محطة بارزة: أكثر من 250 عميل راضٍ وسمعة متنامية في جميع أنحاء المنطقة." },
  },
  {
    year: "2023",
    nl: { title: "500+ tevreden klanten", desc: "Verdubbeling van de klantenbase. Erkend als betrouwbare premium vakdienst in de regio Geldrop." },
    ar: { title: "500+ عميل راضٍ", desc: "مضاعفة قاعدة العملاء. الاعتراف كخدمة حرفية موثوقة ومتميزة في منطقة Geldrop." },
  },
  {
    year: "2025",
    nl: { title: "11 specialisaties, vandaag", desc: "Met een breed dienstenpakket en een team dat dagelijks groeit, blijven we de lat steeds hoger leggen." },
    ar: { title: "11 تخصصاً، اليوم", desc: "بخدمات متنوعة وفريق يتطور يومياً، نواصل رفع سقف التميز أعلى وأعلى." },
  },
];

const creds = [
  {
    icon: BadgeCheck,
    nl: { label: "KVK-nummer", value: "42052229" },
    ar: { label: "رقم KVK", value: "42052229" },
  },
  {
    icon: ShieldCheck,
    nl: { label: "Btw-identificatienummer", value: "NL869487371B01" },
    ar: { label: "رقم ضريبة القيمة المضافة", value: "NL869487371B01" },
  },
  {
    icon: Award,
    nl: { label: "Gevestigd in", value: "Geldrop, Nederland" },
    ar: { label: "مقر الشركة", value: "Geldrop, هولندا" },
  },
];

function AboutPage() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  return (
    <div className="bg-slate-50">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
              {t("nav.about")}
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-black text-slate-950 mb-6 leading-tight">
              {t("about.title")}
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed mb-4">{t("about.lead")}</p>
            <p className="text-base text-slate-600 leading-relaxed">{t("about.body")}</p>
          </motion.div>

          {/* values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-soft hover:shadow-elegant transition-all"
              >
                <v.icon className="h-8 w-8 text-orange mb-4" />
                <div className="font-display font-bold text-xl mb-2 text-slate-950">{v[lang].t}</div>
                <div className="text-sm text-slate-600">{v[lang].d}</div>
              </motion.div>
            ))}
          </div>

          {/* stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
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
                className="text-center rounded-[32px] bg-slate-950 p-10 shadow-soft"
              >
                <div className="font-display font-black text-5xl text-orange mb-2">{s.n}</div>
                <div className="text-sm text-slate-300 uppercase tracking-widest">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {isAr ? "مسيرتنا" : "Onze Geschiedenis"}
            </p>
            <h2 className="text-4xl font-display font-bold text-slate-950">
              {isAr ? "قصة الشركة" : "Het Verhaal van Attar"}
            </h2>
            <div className="h-1 w-20 bg-orange mx-auto rounded-full mt-5" />
          </motion.div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute start-[27px] md:start-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />

            <div className="space-y-10">
              {timeline.map((item, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isRight ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* dot — desktop center */}
                    <div className="shrink-0 relative z-10 md:absolute md:start-1/2 md:-translate-x-1/2 md:top-5">
                      <div className="h-14 w-14 rounded-full bg-orange flex items-center justify-center text-white font-display font-black text-sm shadow-elegant">
                        {item.year.slice(2)}
                      </div>
                    </div>

                    {/* card */}
                    <div className={`flex-1 md:w-[calc(50%-48px)] ${isRight ? "md:me-auto md:pe-12" : "md:ms-auto md:ps-12"} ms-6 md:ms-0`}>
                      <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-6 shadow-soft hover:shadow-elegant transition-all">
                        <div className="text-orange font-display font-bold text-sm mb-1">{item.year}</div>
                        <h3 className="text-lg font-display font-bold text-slate-950 mb-2">
                          {item[lang].title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item[lang].desc}
                        </p>
                      </div>
                    </div>

                    {/* spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {isAr ? "موثوقية وشفافية" : "Officieel & Transparant"}
            </p>
            <h2 className="text-3xl font-display font-bold text-white">
              {isAr ? "مسجل رسمياً" : "Officieel Geregistreerd"}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {creds.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-[24px] p-6 text-center"
              >
                <c.icon className="h-7 w-7 text-orange mx-auto mb-3" />
                <div className="text-slate-400 text-xs mb-1">{c[lang].label}</div>
                <div className="text-white font-mono font-semibold text-sm">{c[lang].value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

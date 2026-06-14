import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import teamPhoto from "@/assets/team-photo.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Attar Klusservice" },
      { name: "description", content: "Neem contact op voor een vrijblijvende offerte." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  const info = [
    { icon: Phone, label: t("footer.phone"), v: "+31 6 28 34 12 40", href: "tel:+31628341240" },
    { icon: Mail, label: t("footer.email"), v: "sales@attarklusservice.nl", href: "mailto:sales@attarklusservice.nl" },
    { icon: MapPin, label: t("footer.address"), v: "Smient 9, 5667 NH Geldrop", href: undefined },
  ];

  return (
    <>
      {/* hero */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-4">
              {t("nav.contact")}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-950 mb-3">
              {t("contact.pageTitle")}
            </h1>
            <p className="max-w-2xl mx-auto text-slate-600">{t("contact.description")}</p>
          </motion.div>

          {/* contact info cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {info.map((item, k) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: k * 0.1 }}
                className="flex flex-col items-center gap-3 rounded-[28px] border border-slate-200 p-6 bg-white shadow-soft text-center"
              >
                <div className="h-12 w-12 rounded-3xl gradient-accent flex items-center justify-center shadow-soft">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-slate-950 hover:text-orange transition-colors">
                      <span dir="ltr" className="inline-block">{item.v}</span>
                    </a>
                  ) : (
                    <div className="font-semibold text-slate-950">{item.v}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* form + team photo */}
      <section className="py-12 px-6 lg:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">

          {/* section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {isAr ? "تواصل معنا" : "Contact"}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-950">
              {t("contact.pageTitle")}
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
              {t("contact.formLead")}
            </p>
          </motion.div>

          {/* 2-col: form + photo */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* form */}
            <div>
              <ContactSection embedded />
            </div>

            {/* team photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block sticky top-28"
            >
              <div className="relative">
                <img
                  src={teamPhoto}
                  alt="Attar Klusservice team"
                  className="w-full rounded-[32px] object-cover shadow-elegant"
                />
                {/* overlay badge */}
                <div className="absolute bottom-5 start-5 end-5 bg-slate-950/80 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-white font-display font-bold text-sm">Attar Klusservice</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {isAr ? "فريقنا في خدمتكم" : "Ons team staat voor u klaar"}
                    </div>
                  </div>
                  <div className="text-orange font-display font-black text-2xl">15+</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

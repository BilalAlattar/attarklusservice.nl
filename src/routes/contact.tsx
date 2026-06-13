import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";

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
  const { t } = useLang();

  const info = [
    { icon: Phone, label: t("footer.phone"), v: "+31628341240", href: "tel:+31628341240" },
    { icon: Mail, label: t("footer.email"), v: "Sales@attarklusservice.nl", href: "mailto:Sales@attarklusservice.nl" },
    { icon: MapPin, label: t("footer.address"), v: "Smient 9, 5667 NH Geldrop", href: undefined },
  ];

  return (
    <>
      {/* hero */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
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

      {/* contact form */}
      <ContactSection />
    </>
  );
}

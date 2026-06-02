import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const info = [
    { icon: Phone, label: t("footer.phone"), v: "+31628341240" },
    { icon: Mail, label: t("footer.email"), v: "sale@attarklusservice.nl" },
    { icon: MapPin, label: t("footer.address"), v: "Smient 9, 5667 NH Geldrop" },
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {t("nav.contact")}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-950 mb-3">{t("contact.pageTitle")}</h1>
          <p className="max-w-2xl mx-auto text-slate-600">{t("contact.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="relative bg-white rounded-[32px] shadow-elegant p-8 lg:p-12 border border-slate-200"
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange/5 rounded-[36px] rotate-12" />
            <h3 className="font-display font-bold text-2xl mb-1 text-slate-950">{t("contact.title")}</h3>
            <p className="text-sm text-slate-600 mb-6">{t("contact.formLead")}</p>

            <div className="grid gap-4">
              <input required placeholder={t("contact.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange" />
              <input required type="email" placeholder={t("contact.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange" />
              <input placeholder={t("contact.phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange" />
              <textarea required rows={5} placeholder={t("contact.message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange resize-none" />
            </div>

            <div className="mt-6">
              <button type="submit" className="btn-primary">{t("contact.send")}</button>
              {sent && <p className="mt-3 text-emerald-600">{t("footer.formSent")}</p>}
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="rounded-[32px] bg-slate-950 text-white p-8 shadow-elegant border border-slate-900/60">
              <div className="text-orange text-xs uppercase tracking-[0.35em] mb-4">{t("contact.company")}</div>
              <h2 className="text-2xl font-display font-bold mb-2">Attar Klusservice</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{t("contact.companyInfo")}</p>
            </div>

            <div className="grid gap-3">
              {info.map((i, k) => (
                <div key={k} className="flex items-start gap-4 rounded-[28px] border border-slate-200 p-5 bg-white shadow-soft">
                  <div className="h-12 w-12 rounded-3xl gradient-accent flex items-center justify-center shrink-0 shadow-soft">
                    <i.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{i.label}</div>
                    <div className="font-semibold text-slate-950 mt-1">{i.icon === Phone || i.icon === Mail ? (<span dir="ltr">{i.v}</span>) : i.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
    { icon: Phone, label: t("footer.phone"), v: "+31 6 1234 5678" },
    { icon: Mail, label: t("footer.email"), v: "sale@attarklusservice.nl" },
    { icon: MapPin, label: t("footer.address"), v: "Hoofdstraat 12, 1011 AB Amsterdam" },
    { icon: Clock, label: "24/7", v: "Spoed Service" },
  ];

  return (
    <section className="px-6 lg:px-10 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {t("nav.contact")}
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-black text-black mb-4">
            {t("contact.pageTitle")}
          </h1>
          <p className="text-lg text-black/60">{t("contact.pageLead")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {info.map((i, k) => (
              <div key={k} className="flex items-start gap-4 p-6 bg-white border border-black/10 rounded-2xl hover:border-orange transition-colors">
                <div className="h-12 w-12 rounded-xl gradient-accent flex items-center justify-center shrink-0">
                  <i.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-black/40 mb-1">{i.label}</div>
                  <div className="font-semibold text-black">{i.v}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="bg-black text-white p-8 lg:p-10 rounded-3xl shadow-elegant space-y-4"
          >
            <h3 className="font-display font-bold text-2xl mb-2">{t("contact.title")}</h3>
            <input
              required placeholder={t("contact.name")} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange outline-none"
            />
            <input
              required type="email" placeholder={t("contact.email")} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange outline-none"
            />
            <input
              placeholder={t("contact.phone")} value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange outline-none"
            />
            <textarea
              required rows={5} placeholder={t("contact.message")} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange outline-none resize-none"
            />
            <button type="submit" className="w-full gradient-accent text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 shadow-elegant">
              <Send className="h-4 w-4" /> {t("contact.send")}
            </button>
            {sent && <p className="text-orange text-sm text-center">{t("contact.sent")}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

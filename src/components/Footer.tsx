import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Facebook, Instagram, Star, MapPin, Phone, Mail, Send } from "lucide-react";
import footerLogo from "@/assets/logo footer.png";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={footerLogo}
                alt="Attar Klusservice"
                className="h-14 w-14 rounded-3xl object-cover border border-slate-700"
              />
              <div>
                <div className="text-sm font-semibold text-white">Attar Klusservice</div>
                <div className="text-xs text-slate-400">Premium Vakwerk & Vertrouwen</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t("footer.tagline")}</p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><span className="text-slate-500">{t("footer.kvk")}:</span> 42052229</li>
              <li><span className="text-slate-500">Btw-id:</span> NL869487371B01</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-orange shrink-0" /> Smient 9, 5667 NH Geldrop</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange shrink-0" /> <a href="tel:+31628341240" className="hover:text-orange"><span dir="ltr" className="inline-block">+31628341240</span></a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange shrink-0" /> <a href="mailto:Sales@attarklusservice.nl" className="hover:text-orange"><span dir="ltr" className="inline-block">Sales@attarklusservice.nl</span></a></li>
            </ul>
          </motion.div>

          {/* MIDDLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start lg:items-center text-start lg:text-center"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 w-full max-w-xs shadow-soft">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-orange text-orange" />
                ))}
              </div>
              <div className="text-center font-display font-bold text-lg">Trustbe</div>
              <div className="text-center text-sm text-slate-400 mt-1">{t("footer.trust")}</div>
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: TikTokIcon, href: "https://tiktok.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 w-12 rounded-3xl bg-white/5 border border-slate-800 flex items-center justify-center hover:bg-orange hover:border-orange transition-all"
                >
                  <Icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-xl mb-5 text-white">{t("contact.title")}</h3>
            <form onSubmit={onSubmit} className="space-y-4 bg-slate-900/80 border border-slate-800 rounded-[32px] p-6">
              <input
                required
                placeholder={t("contact.name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange"
              />
              <input
                required
                type="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange"
              />
              <input
                placeholder={t("contact.phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange"
              />
              <textarea
                required
                rows={3}
                placeholder={t("contact.message")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange resize-none"
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                <Send className="h-4 w-4" />
                {t("contact.send")}
              </button>
              {sent && (
                <p className="text-orange text-xs text-center pt-1">{t("contact.sent")}</p>
              )}
            </form>
          </motion.div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-xs text-slate-500">
          <div className="text-center">{t("footer.copyright").replace("{year}", new Date().getFullYear().toString())} <a href="/" className="text-orange font-semibold hover:text-white transition-colors">Attar Klusservice</a></div>
        </div>
      </div>
    </footer>
  );
}

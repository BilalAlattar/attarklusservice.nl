import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, BadgeCheck, ExternalLink } from "lucide-react";
import footerLogo from "@/assets/logo footer.png";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-slate-950 text-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT — company info */}
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

            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              {t("footer.tagline")}
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <span className="text-slate-500">{t("footer.kvk")}:</span>{" "}
                <a
                  href="https://www.kvk.nl/zoeken/?source=all&q=42052229"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange transition-colors"
                >
                  42052229
                </a>
              </li>
              <li>
                <span className="text-slate-500">Btw-id:</span> NL869487371B01
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-orange shrink-0" />
                Smient 9, 5667 NH Geldrop
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange shrink-0" />
                <a href="tel:+31628341240" className="hover:text-orange transition-colors">
                  <span dir="ltr" className="inline-block">+31628341240</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange shrink-0" />
                <a href="mailto:Sales@attarklusservice.nl" className="hover:text-orange transition-colors">
                  <span dir="ltr" className="inline-block">Sales@attarklusservice.nl</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT — trust + social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* KVK trust card */}
            <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Officieel Geregistreerd</div>
                  <div className="text-slate-400 text-xs">Kamer van Koophandel</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "KVK-nummer", value: "42052229", link: "https://www.kvk.nl/zoeken/?source=all&q=42052229" },
                  { label: "Btw-identificatienummer", value: "NL869487371B01" },
                  { label: "Vestigingsplaats", value: "Geldrop, Nederland" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
                    <span className="text-slate-400 text-xs">{item.label}</span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange text-xs font-mono flex items-center gap-1 hover:text-orange/80 transition-colors"
                      >
                        {item.value}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-200 text-xs font-mono">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["7+ Jaar Ervaring", "Volledig Verzekerd", "Gratis Offerte"].map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/attarklusservice"
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 rounded-3xl bg-white/5 border border-slate-800 flex items-center justify-center hover:bg-orange hover:border-orange transition-all"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <div>
                <div className="text-white text-sm font-medium">@attarklusservice</div>
                <div className="text-slate-500 text-xs">Volg ons op Instagram</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* copyright */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-xs text-slate-500 text-center">
          {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}{" "}
          <a href="/" className="text-orange font-semibold hover:text-white transition-colors">
            Attar Klusservice
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import footerLogo from "@/assets/logo footer.png";

const TAGLINE_1 = {
  nl: "Vakmanschap waarop u kunt vertrouwen",
  ar: "حرفية يمكنكم الوثوق بها",
};
const TAGLINE_2 = {
  nl: "Kwaliteit, precisie en klanttevredenheid staan centraal in alles wat wij doen.",
  ar: "الجودة والدقة ورضا العملاء في صميم كل ما نقوم به.",
};

export function Footer() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

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

          {/* RIGHT — Instagram + taglines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            {/* Instagram */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/attarklusservice"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-12 w-12 rounded-3xl bg-white/5 border border-slate-800 flex items-center justify-center hover:bg-orange hover:border-orange transition-all duration-200 shrink-0"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <div>
                <div className="text-white text-sm font-medium">@attarklusservice</div>
                <div className="text-slate-500 text-xs">
                  {isAr ? "تابعنا على انستغرام" : "Volg ons op Instagram"}
                </div>
              </div>
            </div>

            {/* Taglines */}
            <div className="border-t border-slate-800 pt-6 space-y-3">
              <p className="text-white font-semibold text-base leading-snug">
                {TAGLINE_1[lang]}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {TAGLINE_2[lang]}
              </p>
            </div>
          </motion.div>

        </div>

        {/* copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-xs text-slate-500 text-center">
          {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}{" "}
          <a href="/" className="text-orange font-semibold hover:text-white transition-colors">
            Attar Klusservice
          </a>
        </div>
      </div>
    </footer>
  );
}

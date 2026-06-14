import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import footerLogo from "@/assets/logo footer.png";

const TAGLINE_1 = {
  nl: "Vakmanschap waarop u kunt vertrouwen",
  ar: "حرفية يمكنكم الوثوق بها",
};
const TAGLINE_2 = {
  nl: "Kwaliteit, precisie en klanttevredenheid staan centraal in alles wat wij doen.",
  ar: "الجودة والدقة ورضا العملاء في صميم كل ما نقوم به.",
};

const hours = [
  { nl: "Ma – Vr", ar: "الإثنين – الجمعة", time: "08:00 – 18:00", open: true },
  { nl: "Zaterdag",  ar: "السبت",            time: "09:00 – 14:00", open: true },
  { nl: "Zondag",    ar: "الأحد",            time: null,            open: false },
];

function isOpenNow(): boolean {
  const now  = new Date();
  const day  = now.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const h    = now.getHours();
  const m    = now.getMinutes();
  const mins = h * 60 + m;
  if (day >= 1 && day <= 5) return mins >= 480 && mins < 1080; // 08:00-18:00
  if (day === 6)            return mins >= 540 && mins < 840;  // 09:00-14:00
  return false;
}

export function Footer() {
  const { t, lang } = useLang();
  const isAr  = lang === "ar";
  const open  = isOpenNow();

  return (
    <footer id="site-footer" className="bg-slate-950 text-slate-200 relative overflow-hidden">

      {/* decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-60" />

      {/* subtle background glow */}
      <div className="absolute -top-32 start-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        {/* ── main grid ─────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">

          {/* COL 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <img
                src={footerLogo}
                alt="Attar Klusservice"
                className="h-14 w-14 rounded-2xl object-cover border border-slate-700/60 shadow-lg"
              />
              <div>
                <div className="text-base font-bold text-white tracking-wide">Attar Klusservice</div>
                <div className="text-xs text-orange font-medium tracking-widest uppercase mt-0.5">
                  Premium Vakwerk
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-semibold text-[15px] leading-snug">
                {TAGLINE_1[lang]}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {TAGLINE_2[lang]}
              </p>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/attar.klusservice"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start"
            >
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-200">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold group-hover:text-orange transition-colors">
                  @attar.klusservice
                </div>
                <div className="text-slate-500 text-xs">
                  {isAr ? "تابعنا على انستغرام" : "Volg ons op Instagram"}
                </div>
              </div>
            </a>
          </motion.div>

          {/* COL 2 — Working hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-4 w-4 text-orange" />
              <span className="text-white font-semibold text-sm uppercase tracking-widest">
                {isAr ? "ساعات العمل" : "Openingstijden"}
              </span>
            </div>

            {/* open now badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${
              open
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
              {open
                ? (isAr ? "مفتوح الآن" : "Nu open")
                : (isAr ? "مغلق حالياً" : "Nu gesloten")}
            </div>

            <ul className="space-y-3">
              {hours.map((row, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{row[lang]}</span>
                  {row.open ? (
                    <span className="text-slate-200 text-sm font-medium tabular-nums" dir="ltr">
                      {row.time}
                    </span>
                  ) : (
                    <span className="text-slate-600 text-sm">
                      {isAr ? "مغلق" : "Gesloten"}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-slate-800">
              <p className="text-slate-500 text-xs leading-relaxed">
                {isAr
                  ? "للمواعيد خارج أوقات العمل، تواصل معنا عبر واتساب."
                  : "Voor afspraken buiten openingstijden, neem contact op via WhatsApp."}
              </p>
            </div>
          </motion.div>

          {/* COL 3 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {isAr ? "معلومات الاتصال" : "Contactgegevens"}
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-orange shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">
                    {isAr ? "العنوان" : "Adres"}
                  </div>
                  <span className="text-slate-200 text-sm">Smient 9, 5667 NH Geldrop</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-orange shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">
                    {isAr ? "الهاتف" : "Telefoon"}
                  </div>
                  <a href="tel:+31628341240" className="text-slate-200 text-sm hover:text-orange transition-colors">
                    <span dir="ltr" className="inline-block">+31 6 28 34 12 40</span>
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-orange shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">
                    {isAr ? "البريد الإلكتروني" : "E-mail"}
                  </div>
                  <a href="mailto:sales@attarklusservice.nl" className="text-slate-200 text-sm hover:text-orange transition-colors">
                    <span dir="ltr" className="inline-block">sales@attarklusservice.nl</span>
                  </a>
                </div>
              </li>

              <li className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{isAr ? "رقم KVK" : "KVK-nummer"}</span>
                  <a
                    href="https://www.kvk.nl/zoeken/?source=all&q=42052229"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 font-mono hover:text-orange transition-colors"
                  >
                    42052229
                  </a>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Btw-id</span>
                  <span className="text-slate-300 font-mono">NL869487371B01</span>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* ── bottom bar ────────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}{" "}
            <a href="/" className="text-orange font-semibold hover:text-white transition-colors">
              Attar Klusservice
            </a>
          </span>
          <span className="text-slate-700">
            {isAr ? "Geldrop, هولندا" : "Geldrop, Nederland"}
          </span>
        </div>

      </div>
    </footer>
  );
}

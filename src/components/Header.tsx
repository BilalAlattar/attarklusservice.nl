import { Link, useLocation } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import mainLogo from "@/assets/mine logo.png";

const navItems = [
  { to: "/", key: "nav.home" as const },
  { to: "/services", key: "nav.services" as const },
  { to: "/about", key: "nav.about" as const },
  { to: "/contact", key: "nav.contact" as const },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-slate-200/70 backdrop-blur-xl ${
        scrolled ? "bg-white/90 shadow-soft" : "bg-white/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={mainLogo}
            alt="Attar Klusservice"
            className="h-12 w-12 rounded-2xl object-cover shadow-soft group-hover:scale-105 transition-transform"
          />
          <span className="hidden sm:inline-block text-sm font-semibold tracking-wide text-slate-900">Attar Klusservice</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm font-medium text-black/80 hover:text-orange transition-colors"
              activeProps={{ className: "text-orange" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "nl" ? "ar" : "nl")}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:border-orange hover:text-orange transition-all"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {lang === "nl" ? "العربية" : "Nederlands"}
          </button>
          <button
            className="md:hidden p-2 rounded-full border border-slate-200 bg-white/90 shadow-soft"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-slate-200 bg-white/95 overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-3 text-base font-medium text-slate-800 hover:text-orange transition-colors"
                activeProps={{ className: "text-orange" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "nl" ? "ar" : "nl")}
              className="flex items-center gap-2 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-full px-4 hover:text-orange transition-colors"
            >
              <Globe className="h-4 w-4" />
              {lang === "nl" ? "العربية" : "Nederlands"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

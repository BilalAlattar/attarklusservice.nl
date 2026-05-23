import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Attar Klusservice — Premium Vakwerk voor uw Huis" },
      { name: "description", content: "Premium klusservice: schilderwerk, timmerwerk, vloeren, badkamers en meer. Absolute betrouwbaarheid en vakmanschap." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background video */}
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-32 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange text-black text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero.tag")}
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.05] mb-6">
              {t("hero.title").split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="inline-block me-3"
                >
                  {w === "Premium" || w === "فاخرة" ? <span className="text-orange">{w}</span> : w}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 bg-orange text-white px-7 py-4 rounded-full font-semibold shadow-elegant hover:bg-white hover:text-black transition-colors"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-7 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
              >
                {t("hero.cta2")}
              </Link>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/20 max-w-lg">
              {[
                { icon: Award, n: "15+", l: t("about.stat1") },
                { icon: Shield, n: "500+", l: t("about.stat2") },
                { icon: Clock, n: "24/7", l: "Service" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <s.icon className="h-5 w-5 text-orange mb-2" />
                  <div className="font-display font-black text-2xl text-white">{s.n}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Gallery />
      <Testimonials />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import heroVideo from "@/assets/worker-demo.mp4";

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
      <section className="relative isolate overflow-hidden min-h-[88vh] flex items-center">
        {/* Background video */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-32 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero.tag")}
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-[5.25rem] font-display font-black text-white leading-[0.98] mb-6">
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
              className="text-lg md:text-xl text-slate-200/90 leading-relaxed mb-8 max-w-xl"
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
                className="btn-primary group inline-flex items-center gap-2"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center gap-2"
              >
                {t("hero.cta2")}
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14 pt-10 border-t border-white/15 max-w-4xl">
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
                  className="rounded-3xl bg-slate-900/70 p-6 text-white"
                >
                  <s.icon className="h-5 w-5 text-orange mb-3" />
                  <div className="font-display font-black text-3xl mb-2">{s.n}</div>
                  <div className="text-sm text-slate-200 uppercase tracking-wider">{s.l}</div>
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

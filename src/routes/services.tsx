import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/Services";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Diensten — Attar Klusservice" },
      { name: "description", content: "Negen specialisaties: schilderwerk, timmerwerk, vloeren, trappen, gipswanden, plafonds, loodgieterswerk, elektra en tegelwerk." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLang();
  return (
    <>
      <section className="px-6 lg:px-10 pt-20 pb-8 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-black text-orange text-xs font-bold tracking-widest uppercase mb-5">
            {t("nav.services")}
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-black text-black mb-4">
            {t("services.subtitle")}
          </h1>
          <div className="h-1 w-24 bg-orange mx-auto rounded-full" />
        </motion.div>
      </section>
      <Services initial={3} />
    </>
  );
}

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
      <Services initial={3} />
    </>
  );
}

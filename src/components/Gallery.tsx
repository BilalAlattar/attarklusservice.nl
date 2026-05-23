import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import painting from "@/assets/service-painting.jpg";
import carpentry from "@/assets/service-carpentry.jpg";
import flooring from "@/assets/service-flooring.jpg";
import stairs from "@/assets/service-stairs.jpg";
import gypsum from "@/assets/service-gypsum.jpg";
import ceilings from "@/assets/service-ceilings.jpg";
import plumbing from "@/assets/service-plumbing.jpg";
import electrical from "@/assets/service-electrical.jpg";
import tiling from "@/assets/service-tiling.jpg";

const slides = [painting, carpentry, flooring, stairs, gypsum, ceilings, plumbing, electrical, tiling];

export function Gallery() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[420px] md:h-[560px] rounded-3xl overflow-hidden shadow-elegant">
          <AnimatePresence mode="sync">
            <motion.img
              key={i}
              src={slides[i]}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "bg-orange w-8" : "bg-white/60 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

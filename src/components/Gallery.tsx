import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// جلب جميع الصور من مجلد gallery تلقائياً
const galleryImages = import.meta.glob<{ default: string }>(
  "@/assets/gallery/*",
  { eager: true }
);

// استخراج مسارات الصور وترتيبها
const slides = Object.values(galleryImages)
  .map((module) => module.default)
  .sort();

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // عدد الصور في كل شريحة (عمودين)
  const imagesPerSlide = 2;
  const totalSlides = Math.ceil(slides.length / imagesPerSlide);

  // الحصول على الصور الحالية للشريحة
  const getCurrentSlideImages = () => {
    const start = currentIndex * imagesPerSlide;
    return slides.slice(start, start + imagesPerSlide);
  };

  // الانتقال للشريحة التالية
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlay(false);
  };

  // الانتقال للشريحة السابقة
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlay(false);
  };

  // التشغيل التلقائي
  useEffect(() => {
    if (!isAutoPlay || slides.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(id);
  }, [isAutoPlay, totalSlides]);

  // إعادة تشغيل التشغيل التلقائي بعد 10 ثوانٍ من آخر تفاعل
  useEffect(() => {
    if (!isAutoPlay && slides.length > 0) {
      const id = setTimeout(() => setIsAutoPlay(true), 10000);
      return () => clearTimeout(id);
    }
  }, [isAutoPlay]);

  if (slides.length === 0) {
    return (
      <section className="py-24 px-6 lg:px-10 bg-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">لا توجد صور في مجلد المعرض</p>
        </div>
      </section>
    );
  }

  const currentImages = getCurrentSlideImages();

  return (
    <section className="py-24 px-6 lg:px-10 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full rounded-[40px] overflow-hidden shadow-elegant border border-white/10 bg-slate-900">
          {/* صور الشريحة */}
          <div className="grid grid-cols-2 gap-4 p-6 lg:p-8 min-h-[420px] md:min-h-[560px]">
            <AnimatePresence>
              {currentImages.map((image, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden aspect-square"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${currentIndex * imagesPerSlide + idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={prevSlide}
            aria-label="الشريحة السابقة"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="الشريحة التالية"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* مؤشرات الشرائح */}
          <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center gap-2 z-10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoPlay(false);
                }}
                aria-label={`اذهب للشريحة ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-orange w-10"
                    : "bg-white/60 w-2 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* معلومات العدد */}
        <div className="mt-6 text-center text-white/60 text-sm">
          الشريحة {currentIndex + 1} من {totalSlides} ({slides.length} صورة)
        </div>
      </div>
    </section>
  );
}

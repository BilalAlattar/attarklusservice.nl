import { useLang } from "@/lib/i18n";

const galleryImages = import.meta.glob<{ default: string }>(
  "@/assets/gallery/*",
  { eager: true }
);

const slides = Object.values(galleryImages)
  .map((m) => m.default)
  .sort();

export function Gallery() {
  const { lang } = useLang();

  if (slides.length === 0) return null;

  const row1 = slides.filter((_, i) => i % 2 === 0);
  const row2 = slides.filter((_, i) => i % 2 !== 0);

  // Duplicate each row so the seamless loop works
  const marquee1 = [...row1, ...row1];
  const marquee2 = [...row2, ...row2];

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14 text-center">
        <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
          {lang === "ar" ? "معرض الأعمال" : "Portfolio"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {lang === "ar" ? "مشاريعنا المنجزة" : "Onze Gerealiseerde Projecten"}
        </h2>
        <p className="text-white/40 text-sm mt-3">
          {lang === "ar"
            ? "اضغط على الشريط لإيقاف الحركة"
            : "Beweeg over de rij om te pauzeren"}
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1 — scrolls left */}
        <div className="marquee-container">
          <div className="marquee-track">
            {marquee1.map((src, i) => (
              <div key={i} className="marquee-item group">
                <img
                  src={src}
                  alt=""
                  className="h-52 w-auto rounded-2xl object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-110 shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-container">
          <div className="marquee-track-reverse">
            {marquee2.map((src, i) => (
              <div key={i} className="marquee-item group">
                <img
                  src={src}
                  alt=""
                  className="h-52 w-auto rounded-2xl object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-110 shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

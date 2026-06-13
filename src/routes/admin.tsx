import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  LogIn,
  RefreshCw,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  deleteGalleryImage,
  listGalleryImages,
  uploadGalleryImage,
  verifyAdminPassword,
  type GalleryFile,
} from "@/lib/github";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// ─── helpers ────────────────────────────────────────────
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

type Status = { type: "success" | "error"; msg: string };

// ─── component ──────────────────────────────────────────
function AdminPage() {
  const [inputPw, setInputPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const storedPw = useRef("");

  const [images, setImages] = useState<GalleryFile[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showStatus = (type: Status["type"], msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus(null), 7000);
  };

  const loadImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const imgs = await listGalleryImages();
      setImages(imgs);
    } catch {
      showStatus("error", "فشل تحميل قائمة الصور من GitHub.");
    } finally {
      setLoadingImages(false);
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      storedPw.current = saved;
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (isAuth) loadImages();
  }, [isAuth, loadImages]);

  // ── login ──────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await verifyAdminPassword({ data: { password: inputPw } });
      sessionStorage.setItem("admin_pw", inputPw);
      storedPw.current = inputPw;
      setIsAuth(true);
    } catch {
      setLoginError("كلمة المرور غير صحيحة — Onjuist wachtwoord");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    storedPw.current = "";
    setIsAuth(false);
    setImages([]);
    setInputPw("");
  };

  // ── upload ─────────────────────────────────────────────
  const processFiles = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    let ok = 0;
    let fail = 0;
    for (const file of files) {
      try {
        const content = await fileToBase64(file);
        const filename = `${Date.now()}_${sanitizeFilename(file.name)}`;
        await uploadGalleryImage({
          data: { password: storedPw.current, filename, content },
        });
        ok++;
      } catch {
        fail++;
      }
    }
    setUploading(false);
    if (fail === 0) {
      showStatus(
        "success",
        `تم رفع ${ok} صورة بنجاح! ستظهر على الموقع خلال ~1-2 دقيقة بعد إعادة البناء.`
      );
    } else {
      showStatus(
        "error",
        `تم رفع ${ok} صورة — فشل رفع ${fail}. تحقق من صلاحيات GITHUB_TOKEN.`
      );
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadImages();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files ?? []));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  };

  // ── delete ─────────────────────────────────────────────
  const handleDelete = async (img: GalleryFile) => {
    if (!confirm(`حذف "${img.name}"؟\nVerwijder "${img.name}"?`)) return;
    setDeletingId(img.sha);
    try {
      await deleteGalleryImage({
        data: { password: storedPw.current, filename: img.name, sha: img.sha },
      });
      showStatus(
        "success",
        `تم حذف "${img.name}". ستختفي من الموقع خلال ~1-2 دقيقة.`
      );
      loadImages();
    } catch (err) {
      showStatus("error", `فشل الحذف: ${String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  // ══════════════════════════════════════════════════════
  // Login screen
  // ══════════════════════════════════════════════════════
  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-5 ring-1 ring-orange/20">
              <LogIn className="w-7 h-7 text-orange" />
            </div>
            <h1 className="text-2xl font-bold text-white">Gallery Admin</h1>
            <p className="text-white/40 text-sm mt-1">Attar Klusservice</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                placeholder="كلمة المرور / Wachtwoord"
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-orange/60 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                tabIndex={-1}
              >
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {loginError && (
              <p className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading || !inputPw}
              className="w-full btn-primary gap-2 rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loginLoading ? "Controleren…" : "Inloggen / دخول"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // Admin dashboard
  // ══════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 overflow-auto flex flex-col">
      {/* ── top bar ── */}
      <header className="shrink-0 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-semibold">Gallery Beheer</h1>
          <p className="text-white/40 text-xs">إدارة معرض الصور — Attar Klusservice</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          Uitloggen / خروج
        </button>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-6">
        {/* ── status banner ── */}
        {status && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl ${
              status.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20"
                : "bg-red-500/10 border border-red-500/20"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm flex-1 ${status.type === "success" ? "text-emerald-300" : "text-red-300"}`}
            >
              {status.msg}
            </p>
            <button
              onClick={() => setStatus(null)}
              className="text-white/30 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── rebuild notice ── */}
        <div className="flex items-start gap-3 bg-blue-500/8 border border-blue-500/15 rounded-xl px-4 py-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
          <div className="text-blue-300/80 text-sm leading-relaxed">
            بعد الرفع أو الحذف، يقوم Vercel بإعادة البناء تلقائياً وتظهر التغييرات على الموقع خلال{" "}
            <strong className="text-blue-300">~1–2 دقيقة</strong>.
            <span className="block text-blue-400/50 text-xs mt-0.5">
              Na elke wijziging bouwt Vercel automatisch opnieuw — zichtbaar na ~1-2 min.
            </span>
          </div>
        </div>

        {/* ── upload drop zone ── */}
        <div
          role="button"
          tabIndex={0}
          className="border-2 border-dashed border-white/15 hover:border-orange/40 rounded-2xl p-10 text-center cursor-pointer hover:bg-orange/5 transition-all duration-300 group"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-orange animate-spin" />
              <p className="text-white/60 text-sm">جاري الرفع… / Uploaden…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-orange/10 flex items-center justify-center transition-colors">
                <Upload className="w-6 h-6 text-white/40 group-hover:text-orange transition-colors" />
              </div>
              <div>
                <p className="text-white/70 font-medium">
                  اسحب الصور هنا أو انقر للاختيار
                </p>
                <p className="text-white/35 text-xs mt-1">
                  Klik of sleep afbeeldingen — JPG, PNG, WEBP, AVIF · meerdere tegelijk mogelijk
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── images grid header ── */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">
            الصور الحالية في المستودع
            <span className="text-white/40 font-normal text-sm mr-2">
              ({images.length})
            </span>
          </h2>
          <button
            onClick={loadImages}
            disabled={loadingImages}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingImages ? "animate-spin" : ""}`} />
            Verversen
          </button>
        </div>

        {/* ── images grid ── */}
        {loadingImages && images.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-white/25 flex flex-col items-center gap-3">
            <ImageIcon className="w-12 h-12 opacity-40" />
            <p>لا توجد صور في مجلد المعرض</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-8">
            {images.map((img) => (
              <div
                key={img.sha}
                className="group relative rounded-xl overflow-hidden bg-white/5 aspect-square"
              >
                <img
                  src={img.download_url}
                  alt={img.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
                />
                {/* overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <p className="text-white text-[10px] bg-black/70 rounded px-1.5 py-0.5 w-fit max-w-full truncate leading-snug">
                    {img.name}
                  </p>
                  <button
                    onClick={() => handleDelete(img)}
                    disabled={deletingId === img.sha}
                    className="self-end w-8 h-8 bg-red-500 hover:bg-red-400 rounded-lg flex items-center justify-center transition-colors disabled:opacity-60"
                  >
                    {deletingId === img.sha ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

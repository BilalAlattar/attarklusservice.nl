import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Form = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Form>;

const INITIAL: Form = { name: "", email: "", phone: "", message: "" };

// ─── validation ─────────────────────────────────────────
function validate(f: Form, isAr: boolean): Errors {
  const e: Errors = {};
  const r = (nl: string, ar: string) => (isAr ? ar : nl);

  // Name: letters only, no digits or special chars
  if (!f.name.trim()) {
    e.name = r("Naam is verplicht", "الاسم مطلوب");
  } else if (/[\d!@#$%^&*()+={}\[\]|\\<>,.?/:;"'~`_]/.test(f.name)) {
    e.name = r("Naam mag geen cijfers of symbolen bevatten", "الاسم لا يجب أن يحتوي على أرقام أو رموز");
  }

  // Email
  if (!f.email.trim()) {
    e.email = r("E-mail is verplicht", "البريد الإلكتروني مطلوب");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) {
    e.email = r("Ongeldig e-mailadres", "البريد الإلكتروني غير صحيح");
  }

  // Phone: 10–13 digits (Dutch / international)
  if (!f.phone.trim()) {
    e.phone = r("Telefoonnummer is verplicht", "رقم الهاتف مطلوب");
  } else {
    const digits = f.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      e.phone = r(
        "Ongeldig telefoonnummer (10–13 cijfers)",
        "رقم الهاتف غير صحيح (يجب بين 10 و 13 رقم)"
      );
    }
  }

  // Message: minimum 5 words
  if (!f.message.trim()) {
    e.message = r("Bericht is verplicht", "الرسالة مطلوبة");
  } else if (f.message.trim().split(/\s+/).length < 5) {
    e.message = r(
      "Bericht moet minimaal 5 woorden bevatten",
      "يجب أن تحتوي الرسالة على 5 كلمات على الأقل"
    );
  }

  return e;
}

// ─── component ──────────────────────────────────────────
export function ContactSection() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  const [form, setForm] = useState<Form>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...form, [field]: value }, isAr) }));
    }
  };

  const blur = (field: keyof Form) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validate(form, isAr) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(form, isAr);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm(INITIAL);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (field: keyof Form) =>
    `w-full border rounded-2xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-orange ${
      touched[field] && errors[field]
        ? "border-red-400 bg-red-50 focus:ring-red-300"
        : "border-slate-200 bg-white focus:border-orange"
    }`;

  return (
    <section className="py-24 px-6 lg:px-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-orange text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {isAr ? "تواصل معنا" : "Contact"}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-950">
            {t("contact.pageTitle")}
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
            {t("contact.formLead")}
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            noValidate
            className="bg-white rounded-[32px] shadow-elegant border border-slate-100 p-8 lg:p-10 space-y-5"
          >
            {/* Name */}
            <div>
              <input
                placeholder={t("contact.name")}
                value={form.name}
                onChange={set("name")}
                onBlur={blur("name")}
                className={inputCls("name")}
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={set("email")}
                onBlur={blur("email")}
                className={inputCls("email")}
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder={t("contact.phone")}
                value={form.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
                className={inputCls("phone")}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={5}
                placeholder={t("contact.message")}
                value={form.message}
                onChange={set("message")}
                onBlur={blur("message")}
                className={`${inputCls("message")} resize-none`}
              />
              {touched.message && errors.message && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {status === "sending"
                ? isAr ? "جاري الإرسال…" : "Verzenden…"
                : t("contact.send")}
            </button>

            {/* Success */}
            {status === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                {t("footer.formSent")}
              </motion.div>
            )}

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {isAr
                  ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً."
                  : "Er is iets misgegaan. Probeer het opnieuw."}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

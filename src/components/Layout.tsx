import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ScrollToTop } from "./ScrollToTop";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />

      {/* floating action buttons — stacked bottom-end */}
      <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3">
        <ScrollToTop />
        <WhatsAppButton />
      </div>
    </div>
  );
}

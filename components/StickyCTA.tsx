"use client";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-50 md:bottom-6 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-2xl border border-[#d0dfe0] bg-white p-3 sm:p-4 shadow-2xl shadow-black/15">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
                Passez à l’action
              </p>
              <h3 className="text-sm sm:text-base font-semibold text-[#04163a]">
                Comparez 5+ devis gratuitement
              </h3>
              <p className="text-[11px] sm:text-xs text-[#04163a]/55">
                Estimation rapide sans photos ou avec photos grâce à l’IA, c’est vous qui décidez.
              </p>
            </div>
            <div className="flex sm:flex-row sm:items-center sm:justify-end">
              <a
                href="/inventaire-ia/"
                className="btn-accent text-center text-sm"
                aria-label="Recevez 5+ devis fiables gratuitement"
              >
                Recevez 5+ devis fiables gratuitement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}